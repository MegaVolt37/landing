<template>
  <div>
    <MainSection @openForm="toggleForm" />
    <FounderSection id="about" />
  </div>

  <DeliversSection id="residents" />
  <GallerySection />
  <InvestmentSection v-if="!isProduction" />
  <!-- <CalculatorSection id="calculator" /> -->
  <CalculatorSectionCloud v-if="!isProduction" id="calculator" />
  <AnalysisSection />
  <DecorSection />
  <!-- <PerfomanceSection id="location" /> -->
  <DocumentationSection />
  <SecureSection @openForm="toggleForm" />
  <AppFooter />
  <Transition name="fade">
    <AppForm v-if="isOpenModal" @closeForm="toggleForm" />
  </Transition>
  <!-- <AppTest /> -->
  <!-- <AppTestCloud /> -->
  <!-- <iframe src="https://ths.li/i0JobSQ" frameborder="0" allowfullscreen allow="fullscreen; vr; accelerometer; gyroscope;"
    style="width: 100%; height: 600px;">
  </iframe> -->
</template>

<script setup lang="ts">
import DeliversSection from '@/components/sections/DeliversSection.vue';
import FounderSection from '@/components/sections/FounderSection.vue';
import MainSection from '@/components/sections/MainSection.vue';
import GallerySection from '@/components/sections/GallerySection.vue';
import InvestmentSection from '@/components/sections/InvestmentSection.vue';
import CalculatorSection from '@/components/sections/CalculatorSection.vue';
import AnalysisSection from '@/components/sections/AnalysisSection.vue';
import DecorSection from '@/components/sections/DecorSection.vue';
import PerfomanceSection from '@/components/sections/PerfomanceSection.vue';
import DocumentationSection from '@/components/sections/DocumentationSection.vue';
import SecureSection from '@/components/sections/SecureSection.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppForm from '@/components/AppForm.vue';
import AppTest from '@/components/AppTest.vue';
import AppTestCloud from '@/components/AppTestCloud.vue';
import CalculatorSectionCloud from '@/components/sections/CalculatorSectionCloud.vue';
import { ref } from 'vue';

const isProduction = ref(import.meta.env.PROD)
const isOpenModal = ref(false);

const toggleForm = () => {
  isOpenModal.value = !isOpenModal.value
}

console.log(import.meta.env.PROD)
</script>

<style scoped lang="scss"></style>