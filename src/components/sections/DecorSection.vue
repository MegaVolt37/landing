<template>
  <section class="decor">
    <img src="@/assets/images/decor.webp" alt="decor">
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.decor {
  background-color: $gray-light;
  width: 100%;
  aspect-ratio: 16/7;

  @include mobile {
    aspect-ratio: 16/11;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>