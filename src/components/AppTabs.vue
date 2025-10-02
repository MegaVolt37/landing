<template>
  <el-tabs v-model="model" class="tabs" @tab-click="handleClick">

    <template v-if="list">
      <el-tab-pane v-for="item in list" :key="item.id" :label="item.label || item.title || item.name"
        :name="item.id"></el-tab-pane>
    </template>
    <template v-else>
      <el-tab-pane label="Landscape Designer Message" name="Landscape Designer Message"></el-tab-pane>
      <el-tab-pane label="Architect Message" name="Architect Message"></el-tab-pane>
    </template>

  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { TabsPaneContext } from 'element-plus'

const props = defineProps<{
  list?: any,
  active?: string,
}>()

const model = defineModel()

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="scss" scoped>
.tabs {
  :deep(.el-tabs__header) {
    margin: 0;
  }

  :deep(.el-tabs__item) {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(16);
    line-height: vw(15);
    letter-spacing: 0%;
    text-transform: uppercase;
    color: $yellow;
    padding-bottom: vw(14);
    height: auto;

    &.is-active {
      color: $white;
    }
  }

  :deep(.el-tabs__nav-wrap:after) {
    background-color: rgb($yellow, 0.24);
    height: vw(1);
  }

  :deep(.el-tabs__active-bar) {
    background-color: rgb($white, 0.6);
  }
}
</style>