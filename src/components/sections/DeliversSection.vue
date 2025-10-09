<template>
  <section class="delivery">
    <div class="delivery__container">
      <div class="delivery__header">
        <div class="delivery__title-container">
          <div class="delivery__title-wrapper">
            <h2 class="delivery__heading">Why VERDANA Delivers Superior Returns</h2>
            <!-- <span class="delivery__subheading"><span><span class="montecarloscriptb">g</span>rade</span>
              <span> investment</span></span> -->
          </div>
        </div>

        <div class="delivery__intro">
          <p class="delivery__intro-text" v-prevent-widow>
            Institutional-grade investment opportunity with complete transparency, professional management, and
            performance in Bali's premium market.
          </p>
        </div>
      </div>
      <div class="slider">
        <img class="swipe-icon" src="@/assets/images/arrow-slider.svg" alt="arrow-slider">
        <swiper-container :slides-per-view="4" class="slider__wrapper" :breakpoints="{
          0: { slidesPerView: 1.2, enabled: true },
          768: { slidesPerView: 4, enabled: false }
        }">
          <swiper-slide>
            <div class="delivery__item">
              <UiCircle>
                <template #content>
                  <div class="delivery__item-content">
                    <span class="delivery__item-title">Professional Rental Management</span>
                    <p class="delivery__item-text">
                      Our in-house team handles guest bookings, property care, and marketing. We ensure stable,
                      optimized
                      returns with zero operational burden.
                    </p>
                  </div>
                </template>
              </UiCircle>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="delivery__item">
              <UiCircle>
                <template #content>
                  <div class="delivery__item-content">
                    <span class="delivery__item-title">Established Location Advantages</span>
                    <p class="delivery__item-text">
                      Sanur delivers consistent, predictable returns, supported by steady tourist demand and major
                      ongoing infrastructure investments.
                    </p>
                  </div>
                </template>
              </UiCircle>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="delivery__item">
              <UiCircle>
                <template #content>
                  <div class="delivery__item-content">
                    <span class="delivery__item-title">Complete<br />Legal<br />Compliance</span>
                    <p class="delivery__item-text">
                      All villas come with full legal documentation, clear titles, and direct purchase from
                      the developer.
                    </p>
                  </div>
                </template>
              </UiCircle>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="delivery__item">
              <UiCircle>
                <template #content>
                  <div class="delivery__item-content">
                    <span class="delivery__item-title">Complete<br />Legal<br />Compliance</span>
                    <p class="delivery__item-text">
                      Institutional-level documentation, government permits, and transparent legal structure. Full due
                      diligence support provided.
                    </p>
                  </div>
                </template>
              </UiCircle>

            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import UiCircle from '../ui/uiCircle.vue';
import { register } from 'swiper/element/bundle';

register();


</script>

<style scoped lang="scss">
.delivery {
  background-color: $gray-light;
  padding: vw(30) vw(45) vw(45) vw(45);

  @include mobile {
    padding: vmin(30) vmin(10);
  }

  &__container {
    position: relative;
  }

  &__header {
    padding: vw(50) 0;
    display: flex;
    gap: vw(10);

    @include mobile {
      flex-direction: column;
      padding-top: 0;
      padding-bottom: vmin(30);
      gap: vmin(20);
    }
  }

  &__title-container {
    flex: 0 1 70%;
  }

  &__title-wrapper {
    display: grid;
    align-items: flex-end;
    width: 76%;

    @include mobile {
      width: 100%;
    }
  }

  &__heading {
    font-family: 'Agatho';
    font-weight: 500;
    font-size: vw(56);
    line-height: vw(56);
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $black;
    grid-row: 1;
    grid-column: 1;

    @include mobile {
      font-size: vmin(38);
      line-height: vmin(39);
    }
  }

  &__subheading {

    font-family: 'MonteCarlo';
    font-weight: 400;
    font-size: vw(52);
    line-height: vw(48);
    letter-spacing: 0px;
    color: $yellow-dark;
    display: inline-block;
    grid-row: 1;
    grid-column: 1;
    position: relative;
    margin-left: auto;
    bottom: vw(-26);
    right: vw(70);

    @include mobile {
      font-size: vmin(32);
      line-height: vmin(35);
      bottom: vmin(-12);
      right: vmin(42);
    }

    span:first-child {
      text-transform: capitalize;
    }
  }

  &__intro {
    flex: 0 1 30%;

    @include mobile {
      flex: 0 1 100%;
    }
  }

  &__intro-text {
    text-wrap: balance;
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(16);
    line-height: 1.2;
    letter-spacing: 0px;
    color: $black-light;

    @include mobile {
      font-size: vmin(12);
    }
  }

  .slider {
    position: relative;
    overflow: hidden;
    padding: vw(20);
    padding-top: vw(50);
    padding-left: vw(10);
    padding-right: vw(10);
    // padding-left: vw(45);
    // padding-right: vw(0);
    margin: vw(-20);
    margin-left: vw(-45);
    margin-right: vw(-45);

    @include mobile {
      padding: vmin(10);
      padding-top: vmin(30);
      margin: vmin(-10);
    }
  }

  .swipe-icon {
    top: vmin(0);
    right: vmin(20);
  }

  swiper-container::part(container) {
    padding: vw(10);
    margin: vw(-10);

    @include mobile {
      padding: vmin(10);
      margin: vmin(-10);
    }
  }

  :deep(swiper-slide) {
    height: fit-content !important;
  }

  &__tile {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: vw(40);
    padding-left: vw(10);
    padding-right: vw(10);
    margin: vw(-40);
    overflow: hidden;

    @include mobile {
      margin: 0 vmin(-10);
      padding: 0;
      padding-top: vmin(10);
      padding-bottom: vmin(10);
    }
  }

  &__item {
    width: 100%;
    aspect-ratio: 1;
    position: relative;

    @include mobile {
      min-width: vmin(235);

    }
  }

  &__item-content {
    display: flex;
    flex-direction: column;
    padding: vw(80) vw(30) vw(60) vw(56);
    width: 100%;
    height: 100%;

    @include mobile {
      justify-content: center;
      padding: vmin(45) vmin(30) vmin(45) vmin(45);
    }
  }

  &__item-title {
    text-wrap: balance;
    font-family: 'Agatho';
    font-weight: 500;
    font-size: vw(24);
    line-height: vw(25);
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $yellow-dark;
    display: block;
    margin-bottom: vw(20);
    display: inline-block;
    min-height: vw(55);
    display: grid;
    align-items: flex-end;

    @include mobile {
      min-height: vmin(55);
      font-size: vmin(17);
      line-height: vmin(18);
      margin-bottom: vmin(20);
    }
  }

  &__item-text {
    font-family: 'Plus Jakarta Sans';
    font-weight: 300;
    font-size: vw(14);
    line-height: 1.2;
    letter-spacing: 0px;
    color: $black-light;

    @include mobile {
      font-size: vmin(10);
    }
  }
}
</style>