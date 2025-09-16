<template>
  <section class="perfomance">
    <div class="perfomance__header">
      <div class="perfomance__title-block">
        <h2 class="perfomance__heading">Market Performance & Projections</h2>
        <span class="perfomance__subheading">Future projections</span>
      </div>
      <p class="perfomance__description" v-prevent-widow>
        Historical performance and forward-looking projections from Sanur’s real estate and tourism growth trends.
      </p>
    </div>
    <div class="perfomance__list">
      <div class="perfomance__item">
        <span class="perfomance__item-count">8.5<span class="perfomance__item-percent">%</span></span>
        <p class="perfomance__item-decription">Historical Annual Appreciation</p>
        <UiButton class="perfomance__item-button" variant="solid-yellow" size="md" shape="rounded">
          <IconArrowTopRight /><span>Consistent growth since 2018</span>
        </UiButton>
      </div>
      <div class="perfomance__item">
        <span class="perfomance__item-count">78<span class="perfomance__item-percent">%</span></span>
        <p class="perfomance__item-decription">Average Annual Occupancy</p>
        <UiButton class="perfomance__item-button" variant="solid-yellow" size="md" shape="rounded">
          <IconArrowTopRight /><span> +12% vs 2019 levels</span>
        </UiButton>
      </div>
      <div class="perfomance__item">
        <span class="perfomance__item-count">$285</span>
        <p class="perfomance__item-decription">Average Daily Rate (ADR)</p>
        <UiButton class="perfomance__item-button" variant="solid-yellow" size="md" shape="rounded">
          <IconArrowTopRight /><span>Premium market positioning</span>
        </UiButton>
      </div>
      <div class="perfomance__item">
        <span class="perfomance__item-count">12<span class="perfomance__item-percent">%</span></span>
        <p class="perfomance__item-decription">Projected Net Yield</p>
        <UiButton class="perfomance__item-button" variant="solid-yellow" size="md" shape="rounded">
          <IconArrowTopRight /><span>Conservative estimate</span>
        </UiButton>
      </div>
      <div class="perfomance__item">
        <span class="perfomance__item-count">99<span class="perfomance__item-percent">%</span></span>
        <p class="perfomance__item-decription">Sanur Development Completion</p>
        <UiButton class="perfomance__item-button" variant="solid-yellow" size="md" shape="rounded">
          <IconArrowTopRight /><span>Scarcity value protection</span>
        </UiButton>
      </div>
      <div class="perfomance__item">
        <span class="perfomance__item-count">15M<span class="perfomance__item-percent">+</span></span>
        <p class="perfomance__item-decription">Annual Bali Visitors</p>
        <UiButton class="perfomance__item-button" variant="solid-yellow" size="md" shape="rounded">
          <IconArrowTopRight /><span>Growing tourism demand</span>
        </UiButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import IconArrowTopRight from '../icons/IconArrowTopRight.vue';
import UiButton from '../ui/uiButton.vue';


</script>

<style scoped lang="scss">
.perfomance {
  padding: vw(45) vw(43) vw(40) vw(43);

  @include mobile {
    padding: vmin(25) vmin(10) vmin(28) vmin(10);
  }

  &__header {
    display: grid;
    grid-template-columns: 1fr 24%;
    justify-content: space-between;
    margin-bottom: vw(60);

    @include mobile {
      grid-template-columns: 1fr;
      margin-bottom: vmin(15);
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
      margin-bottom: vmin(20);
    }
  }

  &__heading {
    text-wrap: balance;
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
      line-height: vmin(38);
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
    margin-top: vw(-34);
    margin-right: vw(149);

    // TODO: continue pixel perfect

    @include mobile {
      font-size: vmin(32);
      line-height: vmin(31);
      margin-top: vmin(-15);
      margin-right: vmin(24);
    }
  }

  &__description {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(16);
    line-height: 130%;
    letter-spacing: 0px;
    color: $white;

    @include mobile {
      font-size: vmin(12);
    }
  }

  &__list {
    border: vw(1) solid rgb($yellow, 0.26);
    border-radius: vw(15);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(6, 1fr);
    // grid-template-rows: repeat(auto-fit, minmax(250px, 1fr));

    @include mobile {
      border: none;
      border-radius: 0;
      grid-template-columns: 1fr 1fr;
      gap: vmin(6);
    }
  }

  &__item {
    min-height: 250px;
    // aspect-ratio: 3 / 2;
    padding: vw(35) vw(55);
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 3;
    /* Добавляем внутренние границы */
    border-right: vw(1) solid rgb($yellow, 0.26);
    border-bottom: vw(1) solid rgb($yellow, 0.26);

    @include mobile {
      // display: grid;
      aspect-ratio: auto;
      padding: vmin(15) vmin(15);
      border: vmin(1) solid rgb($yellow, 0.26);
      border-radius: vmin(15);
    }

    /* Убираем границы у последних элементов в ряду */
    &:nth-child(3n) {
      border-right: none;

      @include mobile {
        border: vmin(1) solid rgb($yellow, 0.26);
      }
    }

    /* Убираем границы у последнего ряда */
    &:nth-last-child(-n+3) {
      border-bottom: none;

      @include mobile {
        border: vmin(1) solid rgb($yellow, 0.26);
      }
    }
  }

  &__item-count {
    font-family: 'Agatho';
    font-weight: 500;
    font-size: vw(64);
    line-height: 100%;
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $yellow-light;
    display: inline-block;

    @include mobile {
      font-size: vmin(30);
    }
  }

  &__item-percent {
    font-family: 'Vollkorn';
  }

  &__item-decription {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(14);
    line-height: 130%;
    letter-spacing: 0px;
    color: $white;

    @include mobile {
      height: 100%;
      font-size: vmin(10);
    }
  }

  &__item-button {
    margin-top: auto;
    width: fit-content;
    display: flex;
    gap: vw(8);
    padding-left: vw(15);
    padding-right: vw(15);

    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(12);
    line-height: vw(15);
    letter-spacing: 0%;

    @include mobile {
      justify-content: flex-start;
      width: auto;
      margin-top: vmin(15);
      padding-left: vmin(5);
      padding-right: vmin(5);
      gap: vmin(2);
      font-size: vmin(7);
      line-height: vmin(7);
    }

    svg {
      width: vw(10);

      @include mobile {
        width: vmin(5);
      }
    }
  }

}
</style>