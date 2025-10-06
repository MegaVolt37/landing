<template>
  <section class="investment">
    <div class="investment__wrapper">

      <div class="investment__background">
        <img class="investment__background-image" src="@/assets/images/bg-investment.svg" alt="">
      </div>
      <div class="investment__layout__content">
        <div class="investment__layout">

          <!-- левая часть -->
          <div class="investment__aside">
            <h5 class="investment__title">Select Your<br />Investment Unit</h5>
            <div class="investment__image-wrapper">
              <AppBedrooms class="investment__image-bedrooms" :units="unitData" :selectedUnit="selectedUnit"
                :selectedCurrency="selectedCurrency" :clearUnit="clearUnit" />
              <img class="investment__image" src="@/assets/images/investment.png" alt="">
            </div>
          </div>

          <!-- правая часть -->
          <div class="investment__content">

            <!-- фильтры -->
            <div class="investment__filters">
              <div class="investment__filters-group">
                <span class="investment__filters-label">Available Investment Units</span>
                <p class="investment__filters-subtitle">Choose currency:</p>
                <div class="investment__filters-buttons">
                  <UiButton v-for="(value, idx) in currency" :key="idx" class="investment__button"
                    variant="outline-brown" size="lg" shape="rounded" @click="changeCurrency(value.id)"
                    :class="{ 'active': selectedCurrency === value.id }">{{ value.name }}
                  </UiButton>
                </div>
              </div>

              <div class="investment__filters-group">
                <span class="investment__filters-subtitle">Choose Type of Villa:</span>
                <div class="investment__filters-buttons">
                  <UiButton class="investment__button"
                    :class="{ 'active': selectedBr === br.br || selectedBr === br.count_br }" variant="outline-brown"
                    size="lg" shape="rounded" v-for="(br, idx) in brs" :key="idx" @click="selectBr(br)">
                    {{ br.count_br ? br.count_br + ' Bedroom' : br.br }}
                  </UiButton>
                </div>
              </div>
            </div>

            <!-- список юнитов -->
            <div class="investment__list" :class="{ 'investment__list--more': isMore }">
              <div class="investment__item" v-for="(unit, idx) in filteredUnits" :key="idx" @click="selectUnit(unit)">
                <div class="investment__item-top">
                  <span class="investment__item-name">{{ unit.id }} - {{ getUnitBr(unit) }}</span>
                  <div class="investment__item-tags">
                    <!-- <UiButton class="investment__button investment__button-tag" variant="outline-dark-yellow"
                      shape="rounded" size="md">Phase 2
                    </UiButton> -->
                    <UiButton class="investment__button investment__button-tag" variant="outline-dark-yellow"
                      shape="rounded" size="md">{{ getUnitTypology(unit) }}</UiButton>
                  </div>
                </div>
                <div class="investment__item-middle">
                  <p class="investment__description">{{ unit.land_area_m2 }}m²</p>

                </div>
                <div class="investment__item-bottom">
                  <p class="investment__description">Premium Location</p>
                  <!-- <UiButton class="investment__roi" variant="solid-yellow" shape="rounded" size="md">Annualised ROI:
                    10.6%
                  </UiButton> -->
                  <span class="investment__price">{{ formatCurrency(unit) }}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="investment__more">
      <span class="investment__more-label">see more</span>
      <div class="investment__more-btn" @click="toggleMore">
        <div class="investment__more-btn_wrapper">
          <IconArrowDown :class="{ 'rotate': isMore }" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import GoogleSheetsService from '@/services/googlesheets'
import { computed, ref } from 'vue';
import IconArrowDown from '../icons/IconArrowDown.vue';
import UiButton from '../ui/uiButton.vue';
import AppBedrooms from '../AppBedrooms.vue';

const unitData = GoogleSheetsService.unitsData

const typology = [
  {
    id: 'basic',
    name: 'balanced'
  },
  {
    id: 'premium',
    name: 'Premium'
  }
]

const currency = [
  {
    id: 'idr',
    name: 'IDR'
  },
  {
    id: 'usd',
    name: 'USD'
  }
]

const isMore = ref(false)
const selectedBr = ref(null)
const selectedFinish = ref(null)
const selectedCurrency = ref('idr')
const selectedUnit = ref(null)

const filteredUnits = computed(() => {
  let filtered = unitData.value;

  // Фильтрация по BR
  if (selectedBr.value) {
    filtered = filtered.filter(unit => getUnitBr(unit) === selectedBr.value);
  }

  // Фильтрация по finish (typology)
  if (selectedFinish.value) {
    filtered = filtered.filter(unit =>
      unit.typology.toLowerCase().includes(selectedFinish.value.toLowerCase())
    );
  }

  return filtered;
});

const unitsBr = computed(() => {
  return unitData.value.map(unit => {
    const br = unit.typology.split(' ')[0];
    return {
      unit: unit.id,
      br: br,
      house: 1 // как в примере, всегда 1
    };
  });
})

const brs = computed(() => {
  const brMap = {};
  if (!unitData.value) {
    return []
  }

  unitData.value.forEach(unit => {
    const br = unit.typology.split(' ')[0];
    if (!brMap[br]) {
      brMap[br] = {
        count_br: parseInt(br), // берем число из BR (3 из "3Br")
        br: br
      };
    }
  });
  const arr = Object.values(brMap).sort((a, b) => a.count_br - b.count_br)
  arr.unshift({ count_br: null, br: 'all units' })
  console.log(arr)

  return arr;
});

const getUnitBr = (unit) => {
  const unitBr = unit.typology.split(' ')[0]
  return unitBr
}

const getUnitTypology = (unit) => {
  const unitBr = unit.typology.split(' ')[1]
  if (!unitBr) return 'balanced'
  if (unitBr === 'basic') return 'balanced'
  return unitBr
}

const formatCurrency = (price) => {
  const value = selectedCurrency.value === 'usd' ? price.price_usd : price.price_idr
  // return selectedCurrency.value === 'usd'
  //   ? formatToUsd(priceIdr)
  //   : formatCurrency(priceIdr)
  // return new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  //   minimumFractionDigits: 0,
  //   maximumFractionDigits: 0
  // }).format(amount)

  const amount = value == null ? 0 : Number(value)
  if (Number.isNaN(amount)) return '—'

  if (selectedCurrency.value === 'usd') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  } else {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }
}

const toggleMore = () => {
  isMore.value = !isMore.value
}

const selectBr = (br) => {
  if (!br.count_br) {
    selectedBr.value = br.count_br
  } else {
    selectedBr.value = br.br
  }
}

const changeFinish = (finish) => {
  if (selectedFinish.value === finish) {
    selectedFinish.value = null
  } else {
    selectedFinish.value = finish
  }
}

const changeCurrency = (currency) => {
  selectedCurrency.value = currency
}

const selectUnit = (unit) => {
  console.log(unit)
  selectedUnit.value = unit.id
}

const clearUnit = () => {
  selectedUnit.value = null
}
</script>

<style scoped lang="scss">
.investment {
  position: relative;
  z-index: 0;
  padding-top: vw(110);
  margin-top: vw(60);

  @include mobile {
    // overflow: hidden;
    margin-top: vmin(15);
    padding-top: vmin(52);
    // margin-top: vmin(60);
  }

  &__wrapper {
    @include mobile {
      position: relative;
      overflow: hidden;
    }
  }


  &__more {
    z-index: 1;
    position: absolute;
    bottom: vmin(-20);
    left: 50%;
    justify-items: center;
    transform: translateX(-50%);
    display: none;

    @include mobile {
      display: grid;
    }
  }

  &__more-label {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vmin(10);
    line-height: vmin(13);
    letter-spacing: 0px;
    text-align: center;
    color: $brown;
  }

  &__more-btn {
    padding: vmin(4);
    border-radius: 50%;
    width: fit-content;
    background-color: $gray-light;

    &_wrapper {
      background-color: $brown;
      border-radius: 50%;
      display: grid;
      align-items: center;
      justify-content: center;
      justify-items: center;
      width: vmin(33);
      height: vmin(33);

      svg {
        transition: all 0.3s ease-in-out;

        :deep(path) {
          stroke: $white;
        }

        width: vmin(11);
        height: vmin(6);
      }

      svg.rotate {
        transform: rotateZ(180deg);
      }
    }
  }


  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    @include mobile {
      left: -15%;
      right: -15%;
      width: auto;
    }
  }

  &__background-image {
    width: 100%;
    object-fit: contain;
  }

  &__layout__content {
    position: relative;
    z-index: 1;
    background-color: $gray-light;
    padding: vw(65) 0 vw(55) 0;

    @include mobile {
      padding: vmin(25) 0 vmin(40) 0;
    }

    // &::after {
    //   content: "";
    //   z-index: 1;
    //   top: vw(28);
    //   background-color: $yellow;
    //   height: vw(1);
    //   left: 0;
    //   right: 0;
    //   position: absolute;
    // }

    // &::before {
    //   content: "";
    //   z-index: 1;
    //   bottom: vw(35);
    //   background-color: $yellow;
    //   height: vw(1);
    //   left: 0;
    //   right: 0;
    //   position: absolute;
    // }
  }

  &__layout {
    padding: 0 vw(43);
    display: grid;
    grid-template-columns: 1fr 0.7fr;
    gap: vw(36);

    @include mobile {
      padding: 0 vmin(10);
      grid-template-columns: 1fr;
    }
  }

  &__aside {}

  &__title {
    margin-bottom: vw(30);
    font-family: 'Agatho';
    font-weight: 500;
    font-size: vw(56);
    line-height: vw(56);
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $black-second;

    @include mobile {
      font-size: vmin(38);
      line-height: vmin(39);
      margin-bottom: vmin(20);
    }
  }

  &__image-wrapper {
    overflow: hidden;
    position: relative;
  }

  &__image-bedrooms {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    :deep(svg) {
      width: 100%;
      height: 100%;
    }
  }

  &__image {
    width: 100%;
    aspect-ratio: 694/587;
    object-fit: cover;
    border-radius: vw(15);

    @include mobile {
      aspect-ratio: 319/266;
      border-radius: vmin(10);
    }
  }

  &__content {
    // margin-top: vw(30);
    // padding: vw(15);
  }

  &__filters {}

  &__filters-group:first-child {
    margin-bottom: vw(15);
    padding-bottom: vw(15);

    // border-bottom: vw(1) solid $yellow;
    @include mobile {
      margin-bottom: vmin(15);
    }
  }

  &__filters-group {
    display: grid;

    // margin-bottom: vw(15);
    @include mobile {
      margin-bottom: vmin(15);
    }
  }

  &__filters-label {
    max-width: 55%;
    font-family: 'Agatho';
    font-weight: 500;
    font-size: vw(26);
    line-height: vw(30);
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $yellow-dark;
    display: inline-block;
    margin-bottom: vw(15);

    @include mobile {
      max-width: 100%;
      font-size: vmin(16);
      line-height: vmin(17);
      margin-bottom: vmin(10);
    }
  }

  &__filters-subtitle {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(17);
    line-height: vw(22);
    letter-spacing: 0px;
    color: $black-light;
    display: inline-block;
    margin-bottom: vw(15);

    @include mobile {
      font-size: vmin(12);
      line-height: vmin(15);
      margin-bottom: vmin(10);
    }
  }

  &__filters-buttons {
    gap: vw(10);
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    @include mobile {
      gap: vmin(5);
    }
  }

  &__button {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(14);
    line-height: vw(15);
    letter-spacing: 0%;
    text-align: center;
    text-transform: uppercase;

    @include mobile {
      font-size: vmin(10);
      line-height: vmin(10);
    }
  }

  &__list {
    margin-top: vw(25);
    display: grid;
    gap: vw(10);
    overflow-y: auto;
    max-height: vw(374);
    margin-right: vw(-15);
    padding-right: vw(15);
    transition: max-height 1s ease-in-out;

    @include mobile {
      margin-bottom: 0;
      gap: vmin(5);
      max-height: vmin(260);
      // max-height: none;
      overflow-y: visible;
      margin-right: vmin(-10);
      padding-right: vmin(10);
    }

    &--more {
      @include mobile {
        margin-bottom: 0;
        gap: vmin(5);
        max-height: vmin(2000);
        margin-right: vmin(-10);
        padding-right: vmin(10);
      }
    }
  }

  &__item {
    cursor: pointer;
    border-radius: vw(12);
    padding: vw(20);
    border: vw(1) solid $yellow-dark;

    @include mobile {
      border-radius: vmin(8);
      padding: vmin(14) vmin(10);
      border: vmin(1) solid $yellow-dark;
    }
  }

  &__item-top {
    display: flex;
    justify-content: space-between;
  }

  &__item-name {
    font-family: 'Vollkorn';
    font-weight: 400;
    font-size: vw(24);
    line-height: 100%;
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $brown;

    @include mobile {
      font-size: vmin(16);
    }
  }

  &__item-tags {
    margin-right: vw(-12);
    margin-top: vw(-12);
    display: flex;
    flex-wrap: wrap;
    gap: vw(5);

    @include mobile {
      margin-right: 0;
      margin-top: vmin(-5);
      gap: vmin(5);
    }
  }

  &__button-tag {
    color: $black-light;

    @include mobile {
      text-transform: capitalize;
      letter-spacing: 0%;
      font-size: vmin(8);
      line-height: vmin(10);
    }
  }

  &__tag {}

  &__item-middle {
    margin-top: vw(25);
    min-height: vw(75);

    @include mobile {
      margin-top: vmin(10);
      min-height: vmin(50);
    }
  }

  &__description {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(17);
    line-height: vw(22);
    letter-spacing: 0px;
    color: $black-light;

    @include mobile {
      font-size: vmin(11);
      line-height: vmin(15);
    }
  }

  &__item-bottom {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: vw(20);

    @include mobile {
      gap: vmin(10);
    }
  }

  &__roi {
    background-color: $yellow-middle;
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(12);
    line-height: vw(15);
    letter-spacing: 0%;
    text-align: center;

    @include mobile {
      font-size: vmin(8);
      line-height: vmin(10);
    }
  }

  &__price {
    min-width: vw(165);
    text-align: left;
    font-family: 'Vollkorn';
    font-weight: 400;
    font-size: vw(36);
    line-height: 100%;
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $yellow-dark;

    @include mobile {
      font-size: vmin(24);
      min-width: vmin(115);
    }
  }
}
</style>