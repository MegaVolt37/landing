<template>
  <section class="gallery">
    <div class="gallery__container">
      <!-- <div class="gallery__background">
        <img class="gallery__background-image" src="@/assets/images/bg-investment.svg" alt="">
      </div> -->
      <div class="gallery__list-container">
        <h5 class="gallery__title">True luxury</h5>
        <div class="gallery__list">
          <div class="gallery__item">
            <img src="@/assets/images/gallery-image-1.png" alt="" class="gallery__img">
          </div>
          <div class="gallery__item">
            <img src="@/assets/images/gallery-image-2.png" alt="" class="gallery__img">
          </div>
          <div class="gallery__item">
            <img src="@/assets/images/gallery-image-3.png" alt="" class="gallery__img">
          </div>
        </div>
      </div>


      <UiButton class="gallery__button" variant="solid-green" shape="circle" size="lg">
        <span class="gallery__button-text">LEARN MORE</span>
      </UiButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import UiButton from '../ui/uiButton.vue';

</script>

<style scoped lang="scss">
.gallery {
  padding-top: vw(60);

  @include mobile {
    padding-top: vmin(30);
  }

  &__container {
    position: relative;
    z-index: 1;
  }

  &__title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;

    font-family: 'MonteCarlo';
    font-weight: 400;
    font-size: vw(96);
    line-height: vw(65);
    letter-spacing: 0px;
    text-align: center;
    color: $yellow;

    @include mobile {
      font-size: vmin(40);
      line-height: vw(27);
    }
  }

  &__list-container {
    width: 100%;
    overflow: hidden; // скрываем лишнее за пределами
    margin-bottom: vw(40);
    position: relative;

    @include mobile {
      overflow-x: auto;
      scrollbar-width: none;
    }
  }

  &__list {
    display: flex;
    gap: vw(35);
    will-change: transform;
    transition: transform 0.3s ease;
    width: max-content;
    position: relative;
  }

  &__img {
    width: vw(619);
    height: initial;
    aspect-ratio: 619 / 550;
    border-radius: vw(15);
    object-fit: cover;
    object-position: center;

    @include mobile {
      width: vmin(260);
      aspect-ratio: 260 / 290;
    }
  }

  &__button {
    position: absolute;
    left: 50%;
    bottom: -15%;
    transform: translateX(-50%) translateY(15%);
    aspect-ratio: 1;
    height: vw(160);
    border: vw(2) solid $yellow-light;

    @include mobile {
      aspect-ratio: auto;
      border: vmin(2) solid $yellow-light;
      height: vmin(100);
      width: vmin(100);
      bottom: -12.5%;
      transform: translateX(-50%) translateY(12.5%);
    }
  }

  &__button-text {

    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(17);
    line-height: vw(18);
    letter-spacing: 0%;
    text-align: center;
    text-transform: uppercase;
    width: min-content;
    color: $white;

    @include mobile {
      font-size: vmin(11);
      line-height: vmin(10);
    }
  }
}
</style>