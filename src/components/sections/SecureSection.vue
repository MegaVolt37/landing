<template>
  <section class="secure">
    <div class="secure__header">
      <div class="secure__title-block">
        <h2 class="secure__heading">Secure<br />Your Spot</h2>
        <span class="secure__subheading">Premium location</span>
      </div>
      <div class="secure__header-content">
        <p class="secure__description" v-prevent-widow>Only 11 villas are available in one of Bali’s most sought-after
          locations. Our
          expert team is here to guide you every step of the way.</p>
        <UiButton class="secure__button" variant="solid-yellow" size="md" shape="rounded" @click="$emit('openForm')">
          Explore Complete VERDANA Experience </UiButton>
      </div>
    </div>
    <div class="slider">
      <img class="swipe-icon" src="@/assets/images/arrow-slider.svg" alt="arrow-slider">
      <swiper-container :slides-per-view="3" class="slider__wrapper" :breakpoints="{
        0: { slidesPerView: 1.2, enabled: true },
        768: { slidesPerView: 3, enabled: false }
      }">
        <swiper-slide>
          <div class="secure__item">
            <UiCircle>
              <template #content>
                <div class="secure__item-content">
                  <span class="secure__item-title">Schedule<br />Investment Consultation</span>
                  <p class="secure__item-description" v-prevent-widow>Connect with our experienced investment team for a
                    personalized
                    session. We’ll walk you through projected returns, legal frameworks, ownership models, and all
                    supporting documentation.
                  </p>
                </div>
              </template>
            </UiCircle>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="secure__item">
            <UiCircle>
              <template #content>
                <div class="secure__item-content">
                  <span class="secure__item-title">Request
                    Financial Model</span>
                  <p class="secure__item-description" v-prevent-widow>Get a clear picture of your investment with
                    easy-to-understand
                    cash
                    flow projections, tax insights, and real-life examples.
                  </p>
                </div>
              </template>
            </UiCircle>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="secure__item">
            <UiCircle>
              <template #content>
                <div class="secure__item-content">
                  <span class="secure__item-title">Book<br />Site Visit
                  </span>
                  <p class="secure__item-description" v-prevent-widow>Experience VERDANA firsthand with a guided tour of
                    our show units,
                    a
                    walk through the neighborhood, and a full overview of the investment opportunity.
                  </p>
                </div>
              </template>
            </UiCircle>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  </section>
</template>

<script setup lang="ts">
import UiButton from '../ui/uiButton.vue';
import UiCircle from '../ui/uiCircle.vue';
import { register } from 'swiper/element/bundle';


import { onMounted, ref } from "vue"

register();
</script>

<style scoped lang="scss">
.secure {
  padding: vw(45) vw(43) vw(20) vw(43);
  // margin-bottom: vw(20);
  overflow: hidden;

  @include mobile {
    padding: vmin(30) vmin(10) vmin(45) vmin(10);
    margin-bottom: 0;
    display: grid;
  }

  &__header {
    display: grid;
    grid-template-columns: 1fr 29%;
    justify-content: space-between;
    margin-bottom: vw(60);

    @include mobile {
      display: contents;
      grid-template-columns: 1fr;
      margin-bottom: vmin(20);
    }
  }

  &__title-block {
    display: grid;
    width: fit-content;
    grid-row: 1 / 3;
    grid-column: 1;
    width: 67%;

    @include mobile {
      width: fit-content;
    }
  }

  &__heading {
    color: $white;
    font-family: 'Agatho';
    font-weight: 500;
    font-style: Medium;
    font-size: vw(56);
    line-height: vw(56);
    letter-spacing: 0px;
    text-transform: uppercase;

    @include mobile {
      font-size: vmin(38);
      line-height: vmin(39);
    }
  }

  &__subheading {
    font-family: 'MonteCarlo';
    font-weight: 400;
    font-size: vw(48);
    line-height: vw(65);
    letter-spacing: 0px;
    color: $yellow-middle;

    display: inline-block;
    margin-left: auto;
    margin-right: vw(84);
    margin-top: vw(-40);

    @include mobile {
      font-size: vmin(32);
      line-height: vmin(65);
      margin-right: vmin(-93);
      margin-top: vmin(-33);
    }
  }

  &__header-content {
    @include mobile {
      display: contents;
    }
  }

  &__description {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(16);
    line-height: 1.2;
    letter-spacing: 0px;
    color: $white;

    @include mobile {
      font-size: vmin(12);
      margin-bottom: vmin(18);
    }
  }

  &__button {
    padding-top: vw(15);
    padding-bottom: vw(15);
    margin-top: vw(25);
    font-family: 'Wix Madefor Display';
    font-weight: 400;
    font-size: vw(14);
    line-height: vw(15);
    letter-spacing: 0%;
    text-align: center;
    text-transform: uppercase;
    color: $black;

    @include mobile {
      grid-row: 5;
      font-size: vmin(12);
      line-height: vmin(15);
      padding-top: vmin(15);
      padding-bottom: vmin(15);
      margin-top: vmin(35);
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: vw(45) vw(105);
    margin: vw(-45);
    overflow: hidden;

    @include mobile {
      padding: vmin(16) vmin(10);
      margin: vmin(-10);
      margin-bottom: vmin(10);
    }
  }

  .slider {
    max-width: 95%;
    overflow: hidden;
    position: relative;
    padding: vw(20);
    margin: vw(-20);
    margin-left: auto;
    margin-right: auto;

    @include mobile {
      max-width: 100%;
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

  &__item {
    width: 100%;
    aspect-ratio: 1;
    position: relative;

    @include mobile {
      aspect-ratio: 1;
      min-width: vmin(235);
      // width: vmin(235) !important;
      // height: vmin(235) !important;
    }

    :deep(.dot) {
      @include mobile {
        width: vmin(16);
        height: vmin(16);
        transform: translateX(-50%) translateY(vmin(-8));
      }
    }
  }

  &__item-content {
    width: 100%;
    aspect-ratio: 1;
    padding: vw(85) vw(50) vw(50) vw(60);
    display: flex;
    flex-direction: column;

    @include mobile {
      padding: vmin(45) vmin(33) vmin(43) vmin(45);
    }
  }

  &__item-title {
    text-wrap: balance;
    font-family: 'Agatho';
    font-weight: 500;
    font-style: Medium;
    font-size: vw(26);
    line-height: vw(27);
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $yellow-light;
    margin-bottom: vw(20);
    display: inline-block;
    min-height: vw(55);
    display: grid;
    align-items: flex-end;

    @include mobile {
      min-height: vmin(55);
      font-size: vmin(17);
      line-height: vmin(18);
      margin-bottom: vmin(6);
    }
  }

  &__item-description {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(15);
    line-height: 1.2;
    letter-spacing: 0px;
    color: $white;

    @include mobile {
      font-size: vmin(10);
    }
  }
}
</style>