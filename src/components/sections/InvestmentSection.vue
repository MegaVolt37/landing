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
              <img class="investment__image" src="@/assets/images/investment.png" alt="">
            </div>
          </div>

          <!-- правая часть -->
          <div class="investment__content">

            <!-- фильтры -->
            <div class="investment__filters">
              <div class="investment__filters-group">
                <span class="investment__filters-label">Available Investment Units</span>
                <p class="investment__filters-subtitle">Choose type of finish:</p>
                <div class="investment__filters-buttons">
                  <UiButton class="investment__button" variant="outline-brown" size="lg" shape="rounded">premium
                  </UiButton>
                  <UiButton class="investment__button active" variant="outline-brown" size="lg" shape="rounded">balanced
                  </UiButton>
                </div>
              </div>

              <div class="investment__filters-group">
                <span class="investment__filters-subtitle">Choose Type of Villa:</span>
                <div class="investment__filters-buttons">
                  <UiButton class="investment__button" variant="outline-brown" size="lg" shape="rounded">all units
                  </UiButton>
                  <UiButton class="investment__button active" variant="outline-brown" size="lg" shape="rounded">2
                    Bedroom
                  </UiButton>
                  <UiButton class="investment__button" variant="outline-brown" size="lg" shape="rounded">3 Bedroom
                  </UiButton>
                  <UiButton class="investment__button" variant="outline-brown" size="lg" shape="rounded">4 Bedroom
                  </UiButton>
                  <UiButton class="investment__button" variant="outline-brown" size="lg" shape="rounded">5 Bedroom
                  </UiButton>
                  <UiButton class="investment__button" variant="outline-brown" size="lg" shape="rounded">Best ROI
                  </UiButton>
                </div>
              </div>
            </div>

            <!-- список юнитов -->
            <div class="investment__list" :class="{ 'investment__list--more': isMore }">
              <div class="investment__item" v-for="idx in 13" :key="idx">
                <div class="investment__item-top">
                  <span class="investment__item-name">Unit 7 - 4BR</span>
                  <div class="investment__item-tags">
                    <UiButton class="investment__button investment__button-tag" variant="outline-dark-yellow"
                      shape="rounded" size="md">Phase 2
                    </UiButton>
                    <UiButton class="investment__button investment__button-tag" variant="outline-dark-yellow"
                      shape="rounded" size="md">Premium</UiButton>
                  </div>
                </div>
                <div class="investment__item-middle">
                  <p class="investment__description">160m² • Premium Location</p>
                </div>
                <div class="investment__item-bottom">
                  <UiButton class="investment__roi" variant="solid-yellow" shape="rounded" size="md">Annualised ROI:
                    10.6%
                  </UiButton>
                  <span class="investment__price">$281 239</span>
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

<script setup lang="ts">
import { ref } from 'vue';
import IconArrowDown from '../icons/IconArrowDown.vue';
import UiButton from '../ui/uiButton.vue';

const isMore = ref(false)

const toggleMore = () => {
  isMore.value = !isMore.value
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
    margin-top: vw(5);
    min-height: vw(75);

    @include mobile {
      margin-top: vmin(5);
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