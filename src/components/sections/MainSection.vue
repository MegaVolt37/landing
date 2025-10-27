<template>
  <div class="main-section">
    <div class="main-section_content">
      <!-- <div class="main-section__background"></div> -->
      <header class="header">
        <div class="header__burger" @click="toggleMenu">
          <span class="header__burger-line"></span>
          <span class="header__burger-line"></span>
        </div>

        <div class="header__logo">
          <img src="@/assets/images/logo.svg" width="145" height="160" alt="Verdana Residence" />
        </div>

        <div class="header__actions">

          <UiButton class="header__btn" variant="solid-yellow" shape="rounded" size="lg" @click="$emit('openForm')">
            Contact us
          </UiButton>
        </div>
      </header>
      <div class="main-info">
        <div class="main-info__content">
          <div class="main-info__title-wrapper">
            <h1 class="main-info__title">
              Invest<br />
              in VERDANA<br />Sanur
            </h1>
            <span class="main-info__description"><span class="montecarloscriptb">R</span>esidences</span>
          </div>

          <div class="main-info__top">
            <p class="main-info__text" v-prevent-widow>Invest in a premium Bali estate with turnkey management,
              transparent returns,
              and developer-direct access with full legal clarity.</p>
            <div class="main-info__actions">
              <UiButton class="main-info__button" variant="solid-yellow" shape="rounded" size="lg"
                @click="$emit('openForm')">Calculate Returns
              </UiButton>
              <UiButton class="main-info__button" variant="outline-transparent-yellow" shape="rounded" size="lg"
                @click="$emit('openForm')">View
                Presentation
              </UiButton>
            </div>
          </div>


        </div>
      </div>
    </div>
    <Transition name="slide-left">
      <MainMenu v-if="isOpenMenu" :class="{ 'opened': isOpenMenu }" :isOpen="isOpenMenu"
        @openForm="$emit('openForm'); toggleMenu()" @close="toggleMenu" />
    </Transition>

  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import UiButton from '../ui/uiButton.vue';
import MainMenu from './main/mainMenu.vue';

const isOpenMenu = ref(false)

const toggleMenu = () => {
  console.log('1')
  isOpenMenu.value = !isOpenMenu.value
  if (document.body && document.body.style) {
    document.body.style.overflow = isOpenMenu.value ? 'hidden' : ''
  }
}
</script>

<style scoped lang="scss">
.main-section {
  height: 100svh;
  padding: vw(30) vw(45) 0;

  @include mobile {
    padding: vmin(20) vmin(10) 0 vmin(10);
    height: 100svh;
    height: auto;
    position: relative;
  }



  &_content {
    position: relative;
    z-index: 2;
    margin: vw(-30) vw(-45) 0;
    padding: vw(30) vw(45) 0;

    display: flex;
    flex-direction: column;
    height: 100svh;

    @include mobile {
      margin: vmin(-20) vmin(-10) 0 vmin(-10);
      padding: vmin(20) vmin(10) 0 vmin(10);
      // height: calc(100svh - 12% - 26vmin);
      // height: calc(100svh - 12%);
      height: 100svh;
      height: auto;
    }
  }

  &__background {
    z-index: 1;
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    background-image: url('@/assets/images/background-home.webp');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    padding-bottom: calc(100svh - 12.1%);

    @include mobile {
      // padding-bottom: 90svh;
      padding-bottom: calc(100svh - 64%);
      padding-bottom: 128%;
    }

    // &:before {
    //   content: "";
    //   position: absolute;
    //   z-index: 2;
    //   left: 0;
    //   top: 0;
    //   width: 100%;
    //   height: 100%;
    //   background-color: rgb(#000, 0.6);
    // }
  }
}


.header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: flex-start;
  // justify-content: space-between;
  z-index: 10;
  color: #fff;
}

/* бургер */
.header__burger {
  justify-self: flex-start;
  padding: vw(16) vw(25);
  border: vw(1.5) solid $yellow;
  border-radius: vw(50);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: vw(6);
  cursor: pointer;

  @include mobile {
    border: vmin(1.5) solid $yellow;
    padding: vmin(12) vmin(14);
    gap: vmin(6);
    border-radius: vmin(50);
  }
}

.header__burger-line {
  display: block;
  width: vw(20);
  height: vw(1);
  background-color: $yellow;
  border-radius: vw(2);

  @include mobile {
    width: vmin(24);
    height: vmin(1);
    border-radius: vmin(2);
  }
}

/* логотип */
.header__logo {
  justify-self: center;
  flex: 1;
  display: flex;
  justify-content: center;
}

.header__logo img {
  width: vw(115);
  height: vw(130);

  @include mobile {
    // margin-top: vmin(-7);
    width: vmin(67);
    height: vmin(74);
  }
}

/* справа */
.header__actions {
  justify-self: flex-end;
  display: flex;
  align-items: center;
  gap: vw(20);
  margin-right: vw(-10);

  @include mobile {
    margin-right: 0;
    gap: vmin(5);
  }
}

.header__lang {
  color: #fff;
  font-family: "Plus Jakarta Sans";
  font-weight: 400;
  font-size: vw(20);
  line-height: 1.2;
  letter-spacing: 0px;

  @include mobile {
    display: none;
  }
}

.header__btn {
  background: $yellow;
  color: #000;
  padding: vw(12) vw(28);
  border-radius: vw(40);
  border: none;
  cursor: pointer;

  font-family: "Wix Madefor Display";
  font-weight: 400;
  font-style: "Regular";
  font-size: vw(14);
  line-height: vw(15);
  letter-spacing: 0%;
  text-align: center;
  text-transform: uppercase;

  @include mobile {
    padding: vmin(10) vmin(10);
    border-radius: vmin(45);
    font-size: vmin(8);
    line-height: vmin(9);
  }

}

.main-info {
  position: relative;
  z-index: 2;
  margin-top: auto;
  // position: absolute;
  bottom: 0;
  // left: vw(45);
  left: 0;
  // right: vw(45);
  right: 0;
  display: grid;
  margin-bottom: 0;

  @include mobile {
    left: 0;
    right: 0;
    position: relative;
    margin-bottom: vmin(16);
    margin-top: 74%;
  }

  &__content {
    position: relative;
    display: grid;
    grid-template-columns: 55% 45%;

    @include mobile {
      display: flex;
      flex-direction: column;
    }
  }

  &__title-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    padding-bottom: vw(72);

    @include mobile {
      width: fit-content;
      padding-bottom: 0;
    }
  }

  &__title {
    font-family: 'Agatho';
    font-weight: 500;
    font-size: vw(100);
    line-height: vw(89);
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $white;
    grid-column: 1;
    grid-row: 1;
    align-self: start;

    @include mobile {
      font-size: vmin(46);
      line-height: vmin(44);
    }
  }

  &__description {
    margin-bottom: vw(-18);
    margin-right: vw(280);
    grid-column: 1;
    grid-row: 1;
    align-self: end;
    justify-self: end;
    font-family: 'MonteCarlo';
    font-weight: 400;
    font-size: vw(52);
    line-height: vw(48);
    letter-spacing: 0px;
    color: $yellow;
    text-transform: initial;
    text-wrap: balance;

    @include mobile {
      margin-bottom: vmin(-16);
      margin-right: vmin(13);
      font-size: vmin(36);
      line-height: vmin(40);
    }
  }

  &__top {
    grid-column: 2;
    grid-row: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: vw(48);
    margin-top: vw(18);
    align-items: flex-start;
    width: fit-content;
    justify-self: flex-end;

    @include mobile {
      gap: vmin(25);
      margin-top: vmin(30);
      align-self: flex-start;
      width: 100%;
    }
  }

  &__text {
    margin-left: vw(10);
    max-width: vw(370);
    font-family: 'Plus Jakarta Sans';
    font-size: vw(16);
    line-height: 1.2;
    letter-spacing: 0px;
    font-weight: 300;
    color: $white;

    @include mobile {
      margin-left: 0;
      max-width: vmin(210);
      font-size: vmin(12);

    }
  }

  &__actions {
    display: flex;
    align-items: flex-start;
    gap: vw(10);

    @include mobile {
      gap: vmin(5);
      width: 100%;
    }
  }

  &__button {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0%;

    @include mobile {
      font-size: vmin(10);
      line-height: vmin(11);
      width: 100%;
    }
  }
}
</style>