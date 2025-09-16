<!-- ROI Calculator Component -->
<template>
  <div class="investment-calculator">
    <div class="calculator-container">
      <!-- Левая панель с настройками -->
      <div class="settings-panel">
        <h1 class="calculator-title">INVESTMENT CALCULATOR</h1>
        <p class="calculator-description">
          Calculate your detailed returns, including taxes, management fees, and seasonal variations.
          We provide real-time analysis based on current conditions.
        </p>

        <!-- Construction Phase -->
        <div class="setting-group">
          <label class="setting-label">Construction Phase</label>
          <select v-model="selectedPhase" @change="updateCalculations" class="setting-select">
            <option value="1">PHASE 1 (EARLY BIRD - 9% DISCOUNT)</option>
            <option value="2">PHASE 2 (DURING CONSTRUCTION - 4% DISCOUNT)</option>
            <option value="3">PHASE 3 (BASE PRICE)</option>
          </select>
        </div>

        <!-- Villa Unit Selection -->
        <div class="setting-group">
          <label class="setting-label">Villa Unit Selection</label>
          <select v-model="selectedUnit" @change="updateCalculations" class="setting-select">
            <option v-for="unit in availableUnits" :key="unit.unit" :value="unit.unit">
              {{ unit.unit }} - {{ unit.typology.toUpperCase() }}
            </option>
          </select>
        </div>

        <!-- Choose Type of Finish -->
        <div class="setting-group">
          <label class="setting-label">Choose Type of Finish</label>
          <div class="finish-buttons">
            <button :class="['finish-btn', { active: selectedFinish === 'premium' }]"
              @click="selectedFinish = 'premium'; updateCalculations()">
              PREMIUM
            </button>
            <button :class="['finish-btn', { active: selectedFinish === 'balanced' }]"
              @click="selectedFinish = 'balanced'; updateCalculations()">
              BALANCED
            </button>
          </div>
        </div>

        <!-- Rental Strategy -->
        <div class="setting-group">
          <label class="setting-label">Rental Strategy</label>
          <select v-model="selectedStrategy" @change="updateCalculations" class="setting-select">
            <option value="daily">DAILY VACATION RENTALS</option>
            <option value="monthly">MONTHLY RENTALS</option>
          </select>
        </div>

        <!-- ADR Scenario -->
        <div class="setting-group">
          <label class="setting-label">ADR Scenario</label>
          <div class="adr-buttons">
            <button :class="['adr-btn', { active: selectedScenario === 'optimistic' }]"
              @click="selectedScenario = 'optimistic'; updateCalculations()">
              OPTIMISTIC
            </button>
            <button :class="['adr-btn', { active: selectedScenario === 'base' }]"
              @click="selectedScenario = 'base'; updateCalculations()">
              BASE
            </button>
          </div>
        </div>

        <!-- Display Currency -->
        <div class="setting-group">
          <label class="setting-label">Display Currency</label>
          <div class="currency-buttons">
            <label class="currency-option">
              <input type="radio" name="currency" value="idr" v-model="selectedCurrency" @change="updateDisplay">
              <span>INDONESIAN RUPIAH (IDR)</span>
            </label>
            <label class="currency-option">
              <input type="radio" name="currency" value="usd" v-model="selectedCurrency" @change="updateDisplay">
              <span>US DOLLAR (USD)</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Правая панель с результатами -->
      <div class="results-panel">
        <div class="results-header">
          <h2>INVESTMENT ANALYSIS RESULTS</h2>
          <p class="analysis-note">
            Investment Parameters: Analysis based on {{ occupancyRate }}% occupancy rate,
            {{ marketingFeeText }} marketing fee, 30% management fee.
            Net monthly proceedings: {{ formatCurrency(netProceedings) }}.
            Calculations reflect current market conditions and selected rental strategy.
          </p>
        </div>

        <div class="results-grid">
          <!-- Purchase Price -->
          <div class="result-item">
            <label>Purchase Price</label>
            <div class="result-value">{{ formatCurrency(purchasePrice) }}</div>
          </div>

          <!-- Monthly ROI -->
          <div class="result-item">
            <label>Monthly ROI</label>
            <div class="result-value result-percentage">{{ (monthlyRoi * 100).toFixed(2) }}%</div>
          </div>

          <!-- Annualised ROI -->
          <div class="result-item">
            <label>Annualised ROI</label>
            <div class="result-value result-percentage">{{ (annualizedRoi * 100).toFixed(2) }}%</div>
          </div>

          <!-- Payback Period -->
          <div class="result-item">
            <label>Payback Period</label>
            <div class="result-value result-years">{{ paybackPeriod.toFixed(2) }} YEARS</div>
          </div>
        </div>

        <div class="disclaimer">
          <p><em>Note: The information provided is theoretical data for which is not responsible. Decisions are made by
              the user independently at their own risk. This is not an investment recommendation.</em></p>
        </div>

        <button class="detailed-analysis-btn" @click="showDetailedAnalysis">
          DETAILED FINANCIAL ANALYSIS
        </button>
      </div>
    </div>

    <!-- Loading overlay -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>Loading investment data...</p>
    </div>

    <!-- Error message -->
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="retryLoad">Retry</button>
    </div>
  </div>
</template>

<script>
import GoogleSheetsService from '@/services/sheetscloud.js';

export default {
  name: 'InvestmentCalculator',
  data() {
    return {
      // Settings
      selectedPhase: '3',
      selectedUnit: 'Unit 1',
      selectedFinish: 'premium',
      selectedStrategy: 'daily',
      selectedScenario: 'base',
      selectedCurrency: 'idr',

      // Data
      availableUnits: [],
      roiData: null,
      exchangeRates: { usdIdr: 16400, idrUsd: 1 / 16400 },

      // State
      loading: true,
      error: null,
    };
  },

  computed: {
    currentUnit() {
      console.log(import.meta.env.VITE_VUE_APP_GOOGLE_SHEETS_API_KEY)
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
      }
    },

    async updateCalculations() {
      try {
        this.roiData = await GoogleSheetsService.getRoiData(this.selectedUnit, this.selectedStrategy);
      } catch (error) {
        this.error = `Failed to calculate ROI: ${error.message}`;
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
    },

    async retryLoad() {
      await this.loadInitialData();
    }
  }
};
</script>

<style scoped>
.investment-calculator {
  background: linear-gradient(135deg, #0a3a2a 0%, #1a4a3a 100%);
  min-height: 100vh;
  color: white;
  font-family: 'Inter', sans-serif;
}

.calculator-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  gap: 40px;
}

.settings-panel {
  flex: 1;
  max-width: 500px;
}

.calculator-title {
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.calculator-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 40px;
}

.setting-group {
  margin-bottom: 30px;
}

.setting-label {
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.9);
}

.setting-select {
  width: 100%;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  appearance: none;
  cursor: pointer;
}

.setting-select:focus {
  outline: none;
  border-color: #d4af37;
}

.finish-buttons,
.adr-buttons {
  display: flex;
  gap: 10px;
}

.finish-btn,
.adr-btn {
  flex: 1;
  padding: 12px 20px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.finish-btn.active,
.adr-btn.active {
  background: #d4af37;
  border-color: #d4af37;
  color: #0a3a2a;
}

.currency-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.currency-option {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
}

.currency-option input[type="radio"] {
  width: 20px;
  height: 20px;
  accent-color: #d4af37;
}

.results-panel {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 40px;
}

.results-header h2 {
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 20px;
  color: #d4af37;
}

.analysis-note {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 40px;
  font-size: 0.9rem;
}

.results-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.result-item {
  text-align: center;
}

.result-item label {
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  margin-bottom: 10px;
}

.result-value {
  font-size: 2rem;
  font-weight: 600;
  color: #d4af37;
}

.result-percentage,
.result-years {
  color: #4ade80;
}

.disclaimer {
  background: rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
}

.detailed-analysis-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  border: none;
  border-radius: 25px;
  color: #0a3a2a;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.detailed-analysis-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-spinner {
  width: 50px;
  height: 50px;
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

.error-message {
  position: fixed;
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

.error-message button {
  margin-top: 10px;
  padding: 10px 20px;
  background: white;
  color: #dc3545;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 1024px) {
  .calculator-container {
    flex-direction: column;
    gap: 30px;
  }

  .results-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>