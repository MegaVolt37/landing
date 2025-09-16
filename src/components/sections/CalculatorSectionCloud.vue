<template>
  <section class="calculator">
    <div class="calculator__header">
      <h4 class="calculator__title">Investment Calculator</h4>
      <span class="calculator__subtitle">Calculate detailed</span>
    </div>

    <div class="calculator__content">
      <div class="calculator__intro">
        <p class="calculator__description" v-prevent-widow>
          Calculate your detailed returns including taxes, management fees, and seasonal
          variations. Real-time analysis based on current market conditions.
        </p>
        <div class="calculator__filter">
          <UiButton class="calculator__button-flt" variant="outline-yellow" shape="rounded" size="md"
            @click="toggleFilters">
            filter Analysis Results
          </UiButton>
        </div>
        <Transition name="slide-left">
          <div class="calculator__fields" v-if="!isHiddenFilters">
            <span class="calculator__fields-title">filter</span>
            <span class="calculator__fields-close" @click="toggleFilters">
              <img src="@/assets/images/close.svg" alt="close">
            </span>

            <!-- Construction Phase -->
            <div class="calculator__field">
              <span class="calculator__label">Construction Phase</span>
              <el-select v-model="selectedPhase" placeholder="Select" class="calculator__select" :suffix-icon="IconPlus"
                @change="updateCalculations">
                <el-option v-for="phase in phaseOptions" :key="phase.value" :label="phase.label" :value="phase.value" />
              </el-select>
            </div>

            <!-- Villa Unit Selection -->
            <div class="calculator__field">
              <span class="calculator__label">Villa Unit Selection</span>
              <el-select v-model="selectedUnit" placeholder="Select" class="calculator__select" :suffix-icon="IconPlus"
                @change="updateCalculations">
                <el-option v-for="unit in availableUnits" :key="unit.unit"
                  :label="`${unit.unit} - ${unit.typology.toUpperCase()}`" :value="unit.unit" />
              </el-select>
            </div>

            <!-- Choose Type of Finish -->
            <div class="calculator__field">
              <span class="calculator__label">Type of Finish</span>
              <div class="calculator__field__buttons">
                <UiButton class="calculator__field__button"
                  :variant="selectedFinish === 'premium' ? 'solid-yellow' : 'outline-yellow'" shape="rounded" size="lg"
                  @click="selectedFinish = 'premium'; updateCalculations()">
                  premium
                </UiButton>
                <UiButton class="calculator__field__button"
                  :variant="selectedFinish === 'balanced' ? 'solid-yellow' : 'outline-yellow'" shape="rounded" size="lg"
                  @click="selectedFinish = 'balanced'; updateCalculations()">
                  balanced
                </UiButton>
              </div>
            </div>

            <!-- Rental Strategy -->
            <div class="calculator__field">
              <span class="calculator__label">Rental Strategy</span>
              <el-select v-model="selectedStrategy" placeholder="Select" class="calculator__select"
                :suffix-icon="IconPlus" @change="updateCalculations">
                <el-option v-for="strategy in strategyOptions" :key="strategy.value" :label="strategy.label"
                  :value="strategy.value" />
              </el-select>
            </div>

            <!-- ADR Scenario -->
            <!-- <div class="calculator__field">
              <span class="calculator__label">ADR Scenario</span>
              <div class="calculator__field__buttons">
                <UiButton class="calculator__field__button"
                  :variant="selectedScenario === 'optimistic' ? 'solid-yellow' : 'outline-yellow'" shape="rounded"
                  size="lg" @click="selectedScenario = 'optimistic'; updateCalculations()">
                  Optimistic
                </UiButton>
                <UiButton class="calculator__field__button"
                  :variant="selectedScenario === 'base' ? 'solid-yellow' : 'outline-yellow'" shape="rounded" size="lg"
                  @click="selectedScenario = 'base'; updateCalculations()">
                  Base
                </UiButton>
              </div>
            </div> -->

            <!-- Display Currency -->
            <div class="calculator__field">
              <span class="calculator__label">Display Currency</span>
              <el-radio-group class="calculator__radio" v-model="selectedCurrency" @change="updateDisplay">
                <el-radio value="idr">Indonesian Rupiah (IDR)</el-radio>
                <el-radio value="usd">US Dollar (USD)</el-radio>
              </el-radio-group>
            </div>
          </div>
        </Transition>
      </div>

      <div class="calculator__results">
        <!-- Investment Analysis Results -->
        <div class="calculator__results-item calculator__chart">
          <span class="calculator__chart-label">Investment Analysis Results</span>
          <p class="calculator__chart-desc" v-prevent-widow>
            Investment Parameters: Analysis based on {{ occupancyRate }} % occupancy
            rate, {{ marketingFeeText }} marketing fee, 30% management fee.
            Net monthly proceedings: {{ formatCurrency(netProceedings) }}.
            Calculations reflect current market conditions and selected rental strategy.
          </p>
        </div>

        <!-- Purchase Price -->
        <div class="calculator__results-item calculator__result">
          <span class="calculator__result-label">Purchase Price</span>
          <span class="calculator__result-value">{{ formatCurrency(purchasePrice) }}</span>
        </div>

        <!-- Monthly ROI -->
        <div class="calculator__results-item calculator__result">
          <span class="calculator__result-label">Monthly ROI</span>
          <span class="calculator__result-value">{{ (monthlyRoi * 100).toFixed(2) }}%</span>
        </div>

        <!-- Annualised ROI -->
        <div class="calculator__results-item calculator__result">
          <span class="calculator__result-label">Annualised ROI</span>
          <span class="calculator__result-value">{{ (annualizedRoi * 100).toFixed(2) }}%</span>
        </div>

        <!-- Payback Period -->
        <div class="calculator__results-item calculator__result">
          <span class="calculator__result-label">Payback Period</span>
          <span class="calculator__result-value">{{ paybackPeriod.toFixed(2) }} years</span>
        </div>

        <!-- Note and Button -->
        <div class="calculator__note">
          <p class="calculator__note-text" v-prevent-widow>
            Note: The information provided is theoretical data for which is not responsible.
            Decisions are made by the user independently at their own risk.
            This is not an investment recommendation.
          </p>
          <UiButton variant="solid-yellow" shape="rounded" size="lg" class="calculator__button"
            @click="showDetailedAnalysis">
            Detailed Financial Analysis
          </UiButton>
        </div>
      </div>
    </div>

    <!-- Loading overlay -->
    <div v-if="loading" class="calculator__loading">
      <div class="calculator__spinner"></div>
      <p>Loading investment data...</p>
    </div>

    <!-- Error message -->
    <div v-if="error" class="calculator__error">
      <p>{{ error }}</p>
      <UiButton variant="outline-yellow" @click="retryLoad">Retry</UiButton>
    </div>
  </section>
</template>

<script>
import GoogleSheetsService from '@/services/googlesheetsCloud.js';
import { Plus as IconPlus } from '@element-plus/icons-vue';
import { ElSelect, ElOption } from 'element-plus';

export default {
  name: 'InvestmentCalculator',
  components: {
    IconPlus,
    'el-select': ElSelect,
    'el-option': ElOption,
  },
  data() {
    return {
      // UI State
      isHiddenFilters: false,
      loading: true,
      error: null,

      // Form selections
      selectedPhase: '3',
      selectedUnit: 'Unit 1',
      selectedFinish: 'premium',
      selectedStrategy: 'daily',
      selectedScenario: 'base',
      selectedCurrency: 'idr',

      // Data from Google Sheets
      availableUnits: [],
      roiData: null,
      exchangeRates: { usdIdr: 16400, idrUsd: 1 / 16400 },

      // Options for selects
      phaseOptions: [
        { value: '1', label: 'PHASE 1 (EARLY BIRD - 9% DISCOUNT)' },
        { value: '2', label: 'PHASE 2 (DURING CONSTRUCTION - 4% DISCOUNT)' },
        { value: '3', label: 'PHASE 3 (BASE PRICE)' }
      ],
      strategyOptions: [
        { value: 'daily', label: 'DAILY VACATION RENTALS' },
        { value: 'monthly', label: 'MONTHLY RENTALS' }
      ]
    };
  },

  computed: {
    currentUnit() {
      return this.availableUnits.find(unit => unit.unit === this.selectedUnit) || {};
    },

    purchasePrice() {
      if (!this.roiData) return 0;
      const price = this.roiData.investment;
      return this.selectedCurrency === 'usd' ? price * this.exchangeRates.idrUsd : price;
    },

    monthlyRoi() {
      return this.roiData ? this.roiData.monthlyRoi : 0;
    },

    annualizedRoi() {
      return this.roiData ? this.roiData.annualizedRoi : 0;
    },

    paybackPeriod() {
      return this.roiData ? this.roiData.paybackPeriod : 0;
    },

    netProceedings() {
      if (!this.roiData) return 0;
      const proceedings = this.roiData.investorProceedings;
      return this.selectedCurrency === 'usd' ? proceedings * this.exchangeRates.idrUsd : proceedings;
    },

    occupancyRate() {
      console.log(this.roiData && this.roiData.occupancy)
      return this.roiData ? Math.round(this.roiData.occupancy * 100) : 0;
    },

    marketingFeeText() {
      const fee = this.roiData ? this.roiData.marketingFee : 0;
      return fee > 0 ? `${Math.round(fee * 100)}%` : '0%';
    }
  },

  async mounted() {
    await this.loadInitialData();
  },

  methods: {
    toggleFilters() {
      this.isHiddenFilters = !this.isHiddenFilters;
    },

    async loadInitialData() {
      try {
        this.loading = true;
        this.error = null;

        // Загружаем данные о юнитах
        this.availableUnits = await GoogleSheetsService.getUnitsData();

        // Загружаем курсы валют
        this.exchangeRates = await GoogleSheetsService.getExchangeRates();

        // Загружаем ROI данные для первого юнита
        if (this.availableUnits.length > 0) {
          this.selectedUnit = this.availableUnits[0].unit;
          await this.updateCalculations();
        }

        this.loading = false;
      } catch (error) {
        this.error = `Failed to load data: ${error.message}`;
        this.loading = false;
        console.error('Error loading initial data:', error);
      }
    },

    async updateCalculations() {
      if (!this.selectedUnit) return;

      try {
        this.roiData = await GoogleSheetsService.getRoiData(this.selectedUnit, this.selectedStrategy);
      } catch (error) {
        this.error = `Failed to calculate ROI: ${error.message}`;
        console.error('Error updating calculations:', error);
      }
    },

    updateDisplay() {
      // Просто вызываем перерендеринг computed свойств
      this.$forceUpdate();
    },

    formatCurrency(value) {
      if (!value) return '0';

      if (this.selectedCurrency === 'usd') {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value);
      } else {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value);
      }
    },

    showDetailedAnalysis() {
      // Здесь можно открыть модальное окно или перейти на страницу детального анализа
      console.log('Show detailed analysis for:', this.selectedUnit);
      // Пример: this.$router.push(`/analysis/${this.selectedUnit}`);
      // Или: this.$emit('showDetailedAnalysis', this.roiData);
    },

    async retryLoad() {
      await this.loadInitialData();
    }
  }
};
</script>

<style scoped lang="scss">
/* Дополнительные стили для loading и error состояний */
.calculator__loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 1000;
}

.calculator__spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #d4af37;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.calculator__error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #dc3545;
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  z-index: 1000;
}

.calculator__error p {
  margin-bottom: 15px;
}

:deep(.el-select__popper.el-popper) {
  border: vw(1) solid rgb($yellow, 0.26);
  background: #012210;
  box-shadow: var(--el-box-shadow-light);

  @include mobile {
    border: vmin(0.65) solid rgb($yellow, 0.26);
  }
}

.calculator {
  padding: vw(65) vw(43) vw(90);

  @include mobile {
    padding: vmin(40) vmin(10);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: vw(50);

    @include mobile {
      flex-direction: column;
      margin-bottom: vmin(20);
    }
  }

  &__title {
    font-family: 'Agatho';
    font-weight: 400;
    font-size: vw(56);
    line-height: vw(56);
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $white;

    @include mobile {
      font-size: vmin(38);
      line-height: vmin(36);
    }
  }

  &__subtitle {
    font-family: 'MonteCarlo';
    font-weight: 400;
    font-size: vw(48);
    line-height: vw(65);
    letter-spacing: 0px;
    text-align: right;
    color: $yellow;

    @include mobile {
      font-size: vmin(32);
      line-height: vmin(42);
      margin-top: vmin(-20);
      margin-right: vmin(17);
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 0.7fr 1fr;

    @include mobile {
      display: contents;
    }

  }

  &__button-flt {
    display: none;

    @include mobile {
      display: flex;
      font-family: 'Plus Jakarta Sans';
      font-weight: 400;
      font-size: vmin(9);
      line-height: vmin(9);
      letter-spacing: 0%;
      text-align: center;
      text-transform: uppercase;
      color: $white;
      padding: vmin(5) vmin(20);
      margin-bottom: vmin(20);
    }
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: vw(25);

    @include mobile {
      overflow-y: auto;
      max-height: 100%;
      gap: vmin(20);
      min-width: vmin(320);
      background-color: $green;
      padding: vmin(25);
      // display: none;
      z-index: 10;
      position: fixed;
      left: 0;
      // width: 100%;
      top: 0;

      // TODO: add modal
    }

    &-title {
      display: none;
      font-family: 'Agatho';
      font-weight: 400;
      font-size: vmin(32);
      line-height: vmin(36);
      letter-spacing: 0px;
      text-transform: uppercase;
      color: $white;
      margin-bottom: vmin(15);

      @include mobile {
        display: block;
      }
    }

    &-close {
      display: none;
      cursor: pointer;
      position: absolute;
      z-index: 2;
      right: vw(30);
      top: vw(50);
      width: vw(40);
      height: vw(40);
      justify-content: center;
      align-items: center;
      justify-items: center;

      border: vw(0.56) solid $yellow-middle;

      @include mobile {
        display: grid;
        right: vmin(15);
        top: vmin(15);
        width: vmin(25);
        height: vmin(25);
        border: vmin(0.56) solid $yellow-middle;
      }

      img {
        margin-top: vw(3);
        width: 80%;
        aspect-ratio: 1;

        @include mobile {
          margin-top: vmin(2);
          width: 80%;
        }
      }
    }
  }

  &__intro {
    padding-right: vw(98);
    display: flex;
    flex-direction: column;
    gap: vw(25);

    @include mobile {
      gap: vmin(15);
      padding-right: 0;
    }
  }

  &__description {
    margin-top: vw(-25);
    margin-bottom: vw(25);
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(16);
    line-height: vw(22);
    letter-spacing: 0px;
    color: $white;

    @include mobile {
      font-size: vmin(12);
      line-height: vmin(14);
    }
  }

  &__field {
    width: 100%;
    display: grid;
    gap: vw(20);

    @include mobile {
      gap: vmin(8);
    }
  }

  &__field__buttons {
    display: flex;
    gap: vw(8);

    @include mobile {
      gap: vmin(10);
    }
  }

  &__field__button {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(14);
    line-height: vw(15);
    letter-spacing: 0%;
    text-align: center;
    text-transform: uppercase;

    @include mobile {
      font-size: vmin(9);
      line-height: vmin(9);
      padding: vmin(8) vmin(15);
    }
  }

  &__label {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(17);
    line-height: vw(22);
    letter-spacing: 0px;
    color: $white;

    @include mobile {
      font-size: vmin(11);
      line-height: vmin(14);
    }
  }

  &__select {
    --el-fill-color-blank: transparent;
    --el-border-color: transparent;
    --el-select-input-color: #{$yellow};
    --el-select-input-focus-border-color: transparent;

    border-bottom: vw(1) solid $yellow;

    @include mobile {
      border-bottom: vmin(0.65) solid $yellow;
    }

    :deep(.el-select__wrapper) {
      padding: vw(4) vw(6) vw(12) 0;

      @include mobile {
        padding: vmin(4) vmin(6) vmin(12) 0;
      }
    }

    :deep(.el-select__wrapper.is-focused) {
      box-shadow: none;
    }

    :deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
      box-shadow: none;
    }

    :deep(.el-select__placeholder) {
      font-family: 'Plus Jakarta Sans';
      font-weight: 400;
      font-size: vw(14);
      line-height: vw(15);
      letter-spacing: 0%;
      text-transform: uppercase;
      color: $yellow;

      @include mobile {
        font-size: vmin(9);
        line-height: vmin(9);
      }
    }

    :deep(.el-select__caret) {
      width: vw(14);
      height: vw(8);

      @include mobile {
        width: vmin(7);
        height: vmin(3);
      }
    }

    :deep(.el-icon svg) {
      width: vw(14);
      height: vw(8);

      @include mobile {
        width: vmin(7);
        height: vmin(3);
      }
    }
  }

  &__radio {
    --el-color-primary: #{$yellow};
    --el-text-color-regular: #{$yellow};


    display: flex;
    flex-wrap: wrap;
    gap: vw(15);
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(14);
    line-height: vw(15);
    letter-spacing: 0%;
    text-align: center;
    text-transform: uppercase;

    @include mobile {
      gap: vmin(10);
      font-size: vmin(9);
      line-height: vmin(9);
    }

    :deep(.el-radio) {
      margin-right: 0;
    }

    :deep(.el-radio__inner) {
      --el-radio-input-height: #{vw(20)};
      --el-radio-input-width: #{vw(20)};
      --el-radio-input-bg-color: transparent;
      --el-radio-input-border: #{vw(1)} solid #{$yellow};

      @include mobile {
        --el-radio-input-height: #{vmin(14)};
        --el-radio-input-width: #{vmin(14)};
        --el-radio-input-border: #{vmin(0.65)} solid #{$yellow};
      }
    }

    :deep(.el-radio__label) {
      font-size: vw(14);
      padding-left: vw(10);

      @include mobile {
        font-size: vmin(9);
        padding-left: vmin(5);
      }
    }

    :deep(.el-radio__inner:after) {
      // position: absolute;
      height: vw(10);
      width: vw(10);
      // left: 50%;
      // top: 50%;
      // transform: translate(-50%, -50%) scale(0);
      transition: transform .15s ease-in;

      @include mobile {
        height: vmin(6);
        width: vmin(6);
      }
    }

    :deep(.el-radio__input.is-checked .el-radio__inner) {
      background: transparent;
    }

    :deep(.el-radio__input.is-checked .el-radio__inner:after) {
      background-color: #{$yellow};
      transform: translate(-50%, -50%) scale(1);
    }
  }

  &__results {
    border: vw(1) solid rgb($yellow, 0.26);
    padding: vw(10);
    border-radius: vw(15);
    display: grid;
    gap: vw(10);

    @include mobile {
      border: vmin(1) solid rgb($yellow, 0.26);
      padding: vmin(5);
      border-radius: vmin(9);
      display: grid;
      gap: vmin(5);
    }
  }

  &__results-item {
    border: vw(1) solid rgb($yellow, 0.26);
    padding: vw(30);
    border-radius: vw(15);
    display: flex;
    gap: vw(70);
    justify-content: space-between;

    @include mobile {
      border: vmin(1) solid rgb($yellow, 0.26);
      padding: vmin(13) vmin(10);
      border-radius: vmin(7);
      display: flex;
      gap: vmin(10);
    }

    &:first-child {
      @include mobile {
        flex-direction: column;
      }
    }
  }

  &__chart {
    @include mobile {}
  }

  &__chart-label {
    font-family: 'Agatho';
    font-weight: 500;
    font-style: Medium;
    font-size: vw(26);
    line-height: vw(30);
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $yellow;
    flex: 0 1 49%;

    @include mobile {
      display: inline-block;
      flex: 1;
      max-width: 55%;
      font-size: vmin(16);
      line-height: vmin(16);
    }
  }

  &__chart-desc {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(16);
    line-height: vw(22);
    letter-spacing: 0px;
    color: $white;
    flex: 0 1 51%;

    @include mobile {
      font-size: vmin(10);
      line-height: vmin(14);
      flex: 1;
    }
  }

  &__result {}

  &__result-label {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(17);
    line-height: vw(22);
    letter-spacing: 0px;
    color: $white;

    @include mobile {
      font-size: vmin(10);
      line-height: vmin(14);
    }
  }

  &__result-value {
    font-family: 'Vollkorn';
    font-weight: 400;
    font-size: vw(24);
    line-height: 100%;
    letter-spacing: 0px;
    text-align: right;
    text-transform: uppercase;
    color: $yellow;

    @include mobile {
      font-size: vmin(16);
    }
  }

  &__note {
    margin-top: vw(15);
    margin-bottom: vw(20);
    padding-left: vw(30);
    display: grid;
    grid-template-columns: 1fr auto;
    gap: vw(28);
    align-items: start;

    @include mobile {
      grid-template-columns: 1fr;
      margin-top: vmin(15);
      margin-bottom: vmin(5);
      padding-left: vmin(10);
      padding-right: vmin(10);
      gap: vmin(20);
    }
  }

  &__note-text {
    font-family: 'Vollkorn500';
    font-weight: 500;
    font-style: Italic;
    font-size: vw(16);
    line-height: vw(22);
    letter-spacing: 0px;
    color: $white;

    @include mobile {
      font-size: vmin(10);
      line-height: vmin(14);
    }
  }

  &__button {
    width: fit-content;
    padding-top: vw(20);
    padding-bottom: vw(20);
    align-self: center;
    font-family: 'Wix Madefor Display';
    font-weight: 400;
    font-size: vw(14);
    line-height: vw(15);
    letter-spacing: 0%;
    text-align: center;
    text-transform: uppercase;
    color: $black;

    @include mobile {
      width: calc(100% + vmin(20));
      padding-top: vmin(10);
      padding-bottom: vmin(10);
      font-size: vmin(9);
      line-height: vmin(9);
      margin-left: vmin(-10);
    }
  }
}
</style>