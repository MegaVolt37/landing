<template>
  <div class="custom-tooltip-center">
    <div class="tooltip-content">
      <span class="time">{{ marker.title }}</span>
      <!-- <p class="title">{{ marker.title }}</p> -->
      <!-- <p class="distance">{{ marker.distance }}</p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';

const root = getCurrentInstance()
console.log(root)
interface IMarker {
  id: string,
  title?: string,
  type: any,
  position: { lat: number, lng: number },
  icon: any,
  travelTime?: string | null,
  distance?: string | null,
  default?: boolean
}
const props = defineProps<{ marker: IMarker, activeFilter: string | null }>()

const activeTime = computed(() => {
  if (Array.isArray(props.marker.type)) {
    if (props.activeFilter) {
      return props.marker.type.find((m: any) => m.key === props.activeFilter)?.time
    }
    return props.marker.type.find((m: any) => m.key === 'BY CAR')?.time || props.marker.type[0]?.time
  }
  return props.marker.type
})

// console.log(custom - tooltip - center)
</script>

<style scoped lang="scss">
.custom-tooltip-center {
  // background: green;
  // border: 1px solid #ccc;
  // border-radius: 6px;
  // padding: 6px 10px;
  // box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  pointer-events: none;
}

.tooltip-content {
  display: flex;
  line-height: 1.3;
  background-color: $white;
  border: 1px solid $yellow-dark;
  align-items: center;
  border-radius: 30px;
  padding: 5px;
  padding-right: 0;
  gap: 6px;
}

.title {
  font-family: 'Plus Jakarta Sans';
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0px;
  color: $black-light;

  @include mobile {
    font-size: vmin(7);
  }
}

.time {
  display: inline-block;
  margin-left: -5px;
  // width: 100%;
  margin-top: -5px;
  margin-bottom: -5px;
  display: inline-block;
  border-radius: 30px;
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0px;
  text-align: center;
  color: $white;
  padding: 9px 10px;
  background-color: $green;

  @include mobile {
    font-size: vmin(7);
  }
}
</style>