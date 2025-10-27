<script setup lang="ts">

import axios from 'axios';
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { nextTick, onMounted, ref, watch } from 'vue';
import { useBreakpoint } from "@/composables/useBreakpoint"

const { isMobile } = useBreakpoint()

// import TestPage from '@/components/testPage.vue';
import HomePage from '@/components/pages/HomePage.vue';
import {
  animateDelivery,
  animateMobileDelivery,
  animateGallery,
  animateSecure,
  animateMobileSecure
} from "@/utils/animations";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const rows = ref<string[][]>([])

let currentTimeline: gsap.core.Timeline | null = null;
let scrollTriggers: ScrollTrigger[] = [];

// Функция для очистки всех анимаций
const cleanupAnimations = () => {
  if (currentTimeline) {
    currentTimeline.kill();
    currentTimeline = null;
  }

  // Очищаем все ScrollTriggers
  scrollTriggers.forEach(trigger => {
    trigger.kill();
  });
  scrollTriggers = [];

  // Дополнительно убиваем все ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => {
    const triggerElement = trigger.trigger;
    if (triggerElement &&
      (triggerElement.classList.contains("main") ||
        triggerElement.classList.contains("gallery"))) {
      trigger.kill();
    }
  });
};

// Функция для создания десктопных анимаций
const createDesktopAnimations = () => {
  cleanupAnimations();
  currentTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".main",
      start: "top top",
      end: `+=30000`,
      scrub: 1,
      id: "main-timeline"
    },
  });
  const galleryTimeline = animateGallery(gsap);
  if (galleryTimeline) {
    currentTimeline.add(galleryTimeline);
  }
  // Добавьте другие анимации...
};

// Функция для создания мобильных анимаций
const createMobileAnimations = () => {
  cleanupAnimations();

  // Создаем мобильные анимации (если нужны)
  // const mobileTimeline = gsap.timeline({});
  // mobileTimeline.add(animateHeaderMobile(gsap, mobileTimeline));
  // Добавьте другие мобильные анимации...
};


onMounted(async () => {
  // try {
  //   const sheetId = '1CDaIrPsdO4MWI7h80yWNcow9Od0U_SDZGJvd2Z9Vigo' // твой ID
  //   const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vSkiSxlkiKCITuSRhwufp436BFpHg3BF1A2pZobmSMOvrAUQ-FRPVsXOe-iLDq60A/pub?gid=48642444&single=true&output=csv`
  //   const { data } = await axios.get(url)

  //   // CSV → массив
  //   rows.value = data
  //     .split('\n')
  //     .map((row: string) => row.split(','))
  // } catch (e) {
  //   console.error('Ошибка при загрузке таблицы', e)
  // }
  await nextTick();

  watch(
    () => isMobile.value,
    (isMobile) => {
      nextTick(() => {
        if (!isMobile) {
          createDesktopAnimations();
          animateDelivery(gsap)
          animateSecure(gsap)
        } else {
          createMobileAnimations();
          animateMobileDelivery(gsap)
          animateMobileSecure(gsap)
        }
      });
    },
    { immediate: true }
  );
})

// onUnmounted(() => {
//   // Очистка при размонтировании компонента
//   if (currentTimeline) {
//     currentTimeline.kill();
//   }
//   ScrollTrigger.getAll().forEach(trigger => {
//     trigger.kill();
//   });
// });
</script>

<template>
  <main class="main">
    <!-- <TestPage /> -->
    <div class="content">
      <HomePage />
    </div>
  </main>
</template>

<style scoped></style>
