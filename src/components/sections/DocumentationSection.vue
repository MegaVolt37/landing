<template>
  <section class="documentation">
    <div class="documentation__header">
      <div class="documentation__title-block">
        <h2 class="documentation__heading">Legal Structure
          & Documentation</h2>
      </div>
      <p class="documentation__description" v-prevent-widow>
        We ensure secure international investment with full legal compliance, clear documentation, and
        institutional-grade transparency.
      </p>
    </div>
    <swiper-container class="my-swiper" :slides-per-view="3" :autoHeight="false" :space-between="spaceBetween"
      :breakpoints="{
        768: {
          slidesPerView: 3,
        },
        320: {
          slidesPerView: 1.2,
        },
      }" @swiperprogress="onProgress" @swiperslidechange="onSlideChange" :navigation="{
        nextEl: '.documentation__list-button--right',
        prevEl: '.documentation__list-button--left',
      }">
      <swiper-slide class="swiper-slide">
        <div class="documentation__item">
          <IconFolder class="documentation__item-icon" />
          <span class="documentation__item-title">Ownership Structure</span>
          <ul class="documentation__item-list">
            <li class="documentation__item-list_item">Indonesian company formation (PT PMA)</li>
            <li class="documentation__item-list_item">Hak Pakai land rights (25+25 years)</li>
            <li class="documentation__item-list_item">Nominee director arrangements</li>
            <li class="documentation__item-list_item">Shareholder agreements</li>
            <li class="documentation__item-list_item">Exit strategy protocols</li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <div class="documentation__item">
          <IconMuseum class="documentation__item-icon" />
          <span class="documentation__item-title">Government Compliance</span>
          <ul class="documentation__item-list">
            <li class="documentation__item-list_item">Building permits & approvals</li>
            <li class="documentation__item-list_item">Environmental compliance certificates</li>
            <li class="documentation__item-list_item">Tourism business licenses</li>
            <li class="documentation__item-list_item">Tax compliance documentation</li>
            <li class="documentation__item-list_item">Local authority agreements</li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <div class="documentation__item">
          <IconUnlock class="documentation__item-icon documentation__item-icon--unlock" />
          <span class="documentation__item-title">Investor Protection</span>
          <ul class="documentation__item-list">
            <li class="documentation__item-list_item">Rental guarantee agreements</li>
            <li class="documentation__item-list_item">Property management contracts</li>
            <li class="documentation__item-list_item">Insurance coverage policies</li>
            <li class="documentation__item-list_item">Dispute resolution procedures</li>
            <li class="documentation__item-list_item">Performance monitoring systems</li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <div class="documentation__item">
          <IconLibrary class="documentation__item-icon" />
          <span class="documentation__item-title">Financial Transparency</span>
          <ul class="documentation__item-list">
            <li class="documentation__item-list_item">Developer financial statements</li>
            <li class="documentation__item-list_item">Project budget breakdowns</li>
            <li class="documentation__item-list_item">Revenue sharing models</li>
            <li class="documentation__item-list_item">Quarterly reporting systems</li>
            <li class="documentation__item-list_item">Independent auditing processes</li>
          </ul>
        </div>
      </swiper-slide>
    </swiper-container>
    <div class="documentation__list-buttons">
      <div class="documentation__list-button documentation__list-button--left">
        <IconArrowLeft />
      </div>
      <div class="documentation__list-button documentation__list-button--right">
        <IconArrowLeft />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

import IconArrowLeft from '../icons/IconArrowLeft.vue';
import IconFolder from '../icons/iconFolder.vue';
import IconLibrary from '../icons/iconLibrary.vue';
import IconMuseum from '../icons/iconMuseum.vue';
import IconUnlock from '../icons/iconUnlock.vue';

import { onMounted } from "vue";


import { register } from 'swiper/element/bundle';

register();

const spaceBetween = 10;
const onProgress = (e: any) => {
  const [swiper, progress] = e.detail;
};

const onSlideChange = () => {
  console.log('slide changed')
}

onMounted(() => {
  const slides = document.querySelectorAll("swiper-slide");
  let maxHeight = 0;

  slides.forEach((slide) => {
    const h = (slide as HTMLElement).offsetHeight;
    if (h > maxHeight) maxHeight = h;
  });

  slides.forEach((slide) => {
    (slide as HTMLElement).style.height = maxHeight + "px";
  });
});
</script>

<style scoped lang="scss">
::v-deep(.my-swiper .swiper-slide) {
  height: auto !important;
}

.documentation {
  padding: vw(45) vw(43) vw(40) vw(43);
  background-color: $gray-light;

  @include mobile {
    overflow: hidden;
    padding: vmin(33) vmin(10) vmin(20) vmin(10);
  }

  &__header {
    display: grid;
    grid-template-columns: 1fr 30%;
    justify-content: space-between;
    margin-bottom: vw(40);

    @include mobile {
      grid-template-columns: 1fr;
      margin-bottom: vmin(20);
    }
  }

  &__title-block {
    display: grid;
    width: fit-content;
    grid-row: 1 / 3;
    grid-column: 1;
  }

  &__heading {
    text-wrap: balance;
    color: $black-light;
    font-family: 'Agatho';
    font-weight: 500;
    font-style: Medium;
    font-size: vw(56);
    line-height: vw(56);
    letter-spacing: 0px;
    text-transform: uppercase;

    @include mobile {
      font-size: vmin(35);
      line-height: vmin(35);
    }
  }

  &__description {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(16);
    line-height: 1.2;
    letter-spacing: 0px;
    color: $black-light;

    @include mobile {
      margin-top: vmin(15);
      font-size: vmin(12);
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: vw(10);

    @include mobile {
      gap: vmin(8);
    }
  }

  &__item {
    height: 100%;
    display: grid;
    padding: vw(35) vw(30);
    border-radius: vw(15);
    border: vw(1) solid rgb($yellow, 0.6);
    // aspect-ratio: 7 / 6;
    grid-template-rows: 38% 0.3fr 1.2fr;

    @include mobile {
      grid-template-rows: 38% 2fr 1.2fr;
      padding: vmin(28) vmin(22);
      border-radius: vmin(10);
      border: vmin(1) solid rgb($yellow, 0.6);
    }
  }

  &__item-icon {
    width: vw(50);
    margin-bottom: vw(45);

    @include mobile {
      margin-bottom: vmin(30);
      width: vmin(30);
    }

    &--unlock {
      width: vw(35);

      @include mobile {
        width: vmin(20);
      }
    }
  }

  &__item-title {
    font-family: 'Agatho';
    font-weight: 500;
    font-size: vw(24);
    line-height: 100%;
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $yellow-middle;
    width: min-content;

    @include mobile {
      font-size: vmin(16);
    }
  }

  &__item-list {
    margin-top: vw(20);
    list-style-type: none;
    padding-left: 0;

    @include mobile {
      margin-top: vmin(20);
    }

    &_item {
      font-family: 'Plus Jakarta Sans';
      font-weight: 400;
      font-size: vw(14);
      line-height: vw(22);
      letter-spacing: 0px;
      color: $black-light;

      @include mobile {
        font-size: vmin(10);
        line-height: vmin(14);
      }

      &::before {
        content: "";
        margin-right: vw(8);
        display: inline-block;
        width: vw(7);
        height: vw(7);
        background-color: rgb($yellow-middle, 0.6);

        @include mobile {
          margin-right: vmin(7);
          width: vmin(4);
          height: vmin(4);
        }
      }
    }
  }

  &__list-buttons {
    display: flex;
    gap: vw(10);
    margin-top: vw(20);

    @include mobile {
      margin-top: vmin(13);
      gap: vmin(5);
    }
  }

  &__list-button {
    cursor: pointer;
    display: grid;
    align-items: center;
    justify-content: center;
    width: vw(43);
    height: vw(43);
    border-radius: vw(12);
    border: vw(1) solid rgb($yellow-light, 0.6);
    transition: all .3s ease-in-out;

    @include mobile {
      width: vmin(28);
      height: vmin(28);
      border-radius: vmin(5);
      border: vmin(1) solid rgb($yellow-light, 0.6);
    }

    svg {
      width: vw(10);

      @include mobile {
        width: vmin(5);
      }
    }

    &:hover {
      border-color: $green;
    }
  }

  &__list-button.swiper-button-disabled {
    opacity: 0.5;
    cursor: auto;

    &:hover {
      border-color: rgb($yellow-light, 0.6);
    }
  }

  &__list-button--left {}

  &__list-button--right {
    svg {
      transform: rotateZ(-180deg);
    }
  }

}
</style>