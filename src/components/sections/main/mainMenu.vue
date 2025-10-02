<template>
  <div class="menu" ref="menuElement">
    <div class="menu__wrapper">
      <span class="menu__close" @click="$emit('close')"><img src="@/assets/images/close.svg" alt="close"></span>
      <div class="menu__content">
        <nav class="menu__nav">
          <div class="menu__logo">
            <img src="@/assets/images/logo-menu.svg" alt="logo" class="menu__logo-img">
          </div>
          <ul class="menu__list">
            <li class="menu__item" v-for="item in menu" :key="item.id">
              <span class="menu__link" :class="{ 'active': activeSection === item.id }"
                @click="scrollToSection(item.id)">
                {{ item.label }}
              </span>
            </li>
            <!-- <li class="menu__item">
              <span class="menu__link">select residents</span>
            </li>
            <li class="menu__item">
              <span class="menu__link">Investment calculator</span>
            </li>
            <li class="menu__item">
              <span class="menu__link">location</span>
            </li> -->
          </ul>
          <div class="menu__contacts">
            <a href="tel:+6281139408858" class="menu__phone">+62 811 3940 8858</a>
            <UiButton class="menu__contact" variant="solid-yellow" shape="rounded" size="lg">Contact us</UiButton>
          </div>
        </nav>
      </div>
      <div class="menu__background">
        <img class="menu__background-image" src="@/assets/images/bg-investment.svg" alt="">
      </div>

    </div>
  </div>

</template>

<script setup lang="ts">

interface IProps {
  isOpen: boolean
}
import UiButton from '@/components/ui/uiButton.vue';
import { onClickOutside } from '@vueuse/core';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const emit = defineEmits(['close'])
const props = defineProps<IProps>()

const menu = [
  { id: "about", label: "about us" },
  { id: "residents", label: "select residents" },
  { id: "ExploreSection", label: "Explore VERDANA virtually" },
  { id: "mapSection", label: "location" },
];

const menuElement = ref<HTMLElement>()
const activeSection = ref<string>("");

const closeMenu = () => {
  console.log(menuElement)
  if (props.isOpen) {
    emit('close')
  }
}

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    emit('close')
    el.scrollIntoView({ behavior: "smooth" });
  }
}

let observer: IntersectionObserver | null = null;

onMounted(() => {
  const options = {
    root: null,
    rootMargin: "0px 0px -70% 0px", // подсветка чуть раньше, когда секция уже видна
    threshold: 0.1,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, options);

  menu.forEach((item) => {
    const el = document.getElementById(item.id);
    if (el) observer?.observe(el);
  });
});

onBeforeUnmount(() => {
  observer?.disconnect();
});


onClickOutside(
  menuElement,
  event => closeMenu(),
  { ignore: ['.header__burger'] },
)

defineExpose({ menuElement })
</script>

<style scoped lang="scss">
.menu {
  top: 0;
  left: 0;
  position: absolute;
  background-color: $green;
  display: grid;
  // padding: vw(30) vw(55) vw(50) vw(50);
  // padding-top: 0;
  // padding-bottom: calc(100svh - 12%);
  min-height: 100svh;
  max-width: vw(450);
  width: 100%;
  // height: 100%;
  overflow: hidden;
  z-index: 10;
  // transition: transform .7s ease-in-out, visibility .7s ease-in-out;
  // opacity: 0;
  // visibility: hidden;
  // transform: translateX(-100vw);

  @include mobile {
    position: fixed;
    // padding-bottom: 100svh;
    max-width: 100%;
  }

  &__wrapper {
    // left: 0;
    // right: 0;
    // position: absolute;
    // height: 100%;
    // left: vw(-50);
    // right: vw(-55);
    // padding-bottom: calc(100svh - 12%);
  }

  &__content {
    position: relative;
    padding: vw(30) vw(55) vw(50) vw(50);
    height: 100%;
    max-height: 100svh;
    overflow-y: auto;
    // left: vw(50);
    // right: vw(55);
    // padding-bottom: calc(100svh - 12%);

    @include mobile {
      max-height: 100svh;
      padding: vw(30) vw(30);
    }
  }

  // &.opened {
  //   // opacity: 1;
  //   visibility: visible;
  //   transform: translateX(0);
  // }

  &__background {
    position: absolute;
    bottom: -10vw;
    left: 0;
    width: 100%;

    @include mobile {
      bottom: auto;
      top: 100%;
      transform: translateY(vmin(-40));
    }
  }

  &__background-image {
    width: 100%;
    object-fit: contain;
  }

  &__close {
    cursor: pointer;
    position: absolute;
    z-index: 2;
    right: vw(30);
    top: vw(50);
    width: vw(40);
    height: vw(40);
    display: grid;
    justify-content: center;
    align-items: center;
    justify-items: center;

    border: vw(0.56) solid $yellow-middle;

    @include mobile {
      right: vmin(20);
      top: vmin(30);
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

  &__nav {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 1;

    @include mobile {
      padding-bottom: vmin(60);
    }
  }

  &__logo {
    width: vw(105);
    height: vw(115);
    margin-bottom: vw(30);

    @include mobile {
      width: vmin(80);
      height: vmin(90);
      margin-bottom: vmin(30);
    }
  }

  &__logo-img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  &__list {
    list-style-type: none;
    padding-left: 0;
    margin-bottom: vw(30);
    display: flex;
    flex-direction: column;
    gap: vw(20);

    @include mobile {
      margin-bottom: vmin(30);
      gap: vmin(20);
    }
  }

  &__item {}

  &__link {
    cursor: pointer;
    font-family: 'Agatho';
    font-weight: 400;
    font-size: vw(24);
    line-height: vw(36);
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $white;
    transition: all .3s ease-in-out;

    @include mobile {
      font-size: vmin(16);
      line-height: vmin(24);
    }

    &.active,
    &:hover {
      color: $yellow-middle;
    }

  }

  &__contacts {
    display: flex;
    flex-direction: column;
    gap: vw(15);

    @include mobile {
      gap: vmin(10);
    }
  }

  &__phone {
    font-family: 'Agatho';
    font-weight: 700;
    font-style: Bold;
    font-size: vw(30);
    line-height: 100%;
    letter-spacing: 0px;
    color: $yellow-middle;
    text-decoration: none;

    @include mobile {
      font-size: vmin(20);
    }
  }

  &__contact {
    width: fit-content;
    text-transform: uppercase;
  }
}
</style>