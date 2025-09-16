<template>
  <section class="founder">
    <div class="tile">
      <div class="tile__item">
        <span class="tile__percent">9-12<span class="tile__count">%</span></span>
        <p class="tile__description">Projected Annual ROI</p>
      </div>
      <div class="tile__item">
        <span class="tile__count">$<span class="tile__percent">245K</span></span>
        <p class="tile__description">Starting Investment</p>
      </div>
      <div class="tile__item">
        <span class="tile__percent">Q1 2027</span>
        <p class="tile__description">Income Generation</p>
      </div>
      <div class="tile__item">
        <span class="tile__count">11</span>
        <p class="tile__description">Exclusive Units Only</p>
      </div>
    </div>
    <div class="founder__content">

      <div class="founder__title">
        <h2 class="founder__heading">FOUNDER MESSAGE</h2>
        <span class="founder__subheading"><span class="montecarloscriptb">W</span>e are</span>
      </div>
      <div class="founder__image">
        <img src="@/assets/images/GEORGY.jpg" alt="GEORGY" class="founder__img">
      </div>
      <div class="founder__description">
        <span class="founder__symbol">”</span>
        <p class="founder__text" v-prevent-widow>We&nbsp;believe luxury isn&rsquo;t about excess. It&rsquo;s about
          creating places
          people genuinely connect with. Homes and spaces designed around lifestyle, culture, and long-term value.
          We&nbsp;see Southeast Asia as&nbsp;one of&nbsp;the most exciting markets in&nbsp;the world, where growth and
          cultural richness come together. We&rsquo;re combining smart design, sustainability, and authenticity
          to&nbsp;create lasting impact for residents, investors, and communities.
        </p>
      </div>
      <div class="founder__about">
        <p class="founder__about-text">
          Labna Capital was built on&nbsp;a&nbsp;shared vision and 50+&nbsp;years of&nbsp;experience in&nbsp;real
          estate, strategy, and finance. From global boardrooms to&nbsp;local communities, we&rsquo;ve seen what makes
          projects truly meaningful.</p>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.tile {
  grid-column: 1/3;
  grid-row: 1;
  display: flex;
  gap: vw(10);

  @include mobile {
    flex-wrap: wrap;
    gap: vmin(6);
  }

  &__item {
    flex: 1;
    border: vw(1) solid rgb($yellow, 0.24);
    border-radius: vw(15);
    padding: vw(20) vw(45);
    display: flex;
    flex-direction: column;
    gap: vw(10);

    @include mobile {
      border: vmin(1) solid rgb($yellow, 0.24);
      border-radius: vmin(11);
      flex: 0 1 48.9%;
      padding: vmin(16);
      gap: vmin(10);
    }
  }

  // &__count {
  //   font-family: 'Vollkorn';
  //   font-weight: 700;
  //   font-size: vw(40);
  //   line-height: 100%;
  //   letter-spacing: 0px;
  //   text-transform: uppercase;
  //   color: $yellow;
  // }
  &__count {
    font-family: 'Agatho';
    font-weight: 700;
    font-size: vw(40);
    line-height: 100%;
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $yellow;

    @include mobile {
      font-weight: 400;
      font-size: vmin(30);
    }
  }

  &__percent {
    font-family: 'Agatho';
    font-weight: 700;
    font-size: vw(40);
    line-height: 100%;
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $yellow;

    @include mobile {
      font-weight: 400;
      font-size: vmin(30);
    }
  }

  &__description {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(12);
    line-height: 130%;
    letter-spacing: 0px;
    color: rgb($white, 0.77);

    @include mobile {
      font-size: vmin(10);
    }
  }
}

.founder {

  padding: 0 vw(45) vw(65);

  @include mobile {
    padding: 0 vmin(10) vmin(40);
    // margin-top: calc(100vw - 100.25vmin);
    // padding-top: calc(100vw - 50.25vmin);
    padding-top: vmin(50);
  }

  &__content {
    margin-top: vw(130);
    align-items: flex-start;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: vw(42);

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__title {
    display: grid;
    width: min-content;
    grid-row: 1 / 3;
    grid-column: 1;

    @include mobile {
      grid-row: 1;
    }
  }

  &__heading {
    font-family: 'Agatho';
    font-weight: 500;
    font-size: vw(56);
    line-height: vw(56);
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $white;

    @include mobile {
      font-size: vmin(38);
      line-height: vmin(39);
    }
  }

  &__subheading {
    font-family: 'MonteCarlo';
    font-weight: 400;
    font-size: vw(48);
    line-height: vw(65);
    letter-spacing: 0px;
    color: $yellow;
    display: inline-block;
    margin-left: auto;
    margin-right: vw(-19);
    margin-top: vw(-29);

    @include mobile {
      font-size: vmin(32);
      line-height: vmin(52);
      margin-top: vmin(-31);
      margin-right: vmin(-56);
    }
  }

  &__image {
    grid-row: 1/3;
    grid-column: 2;
    position: relative;
    z-index: 1;
    display: inline-block;
    border-radius: vw(200) vw(200) vw(12) vw(12);
    overflow: hidden;

    @include mobile {
      grid-row: 3;
      grid-column: 1;
      border-radius: vmin(160) vmin(160) vw(9) vw(9);
    }
  }

  &__img {
    width: 100%;
    object-fit: cover;
  }

  &__description {
    margin-top: vw(35);
    grid-column: 3;
    grid-row: 1 / 3;
    display: flex;
    flex-direction: column;

    @include mobile {
      margin-top: vmin(30);
      grid-row: 4;
      grid-column: 1;
    }
  }

  &__symbol {
    font-family: 'Adamina';
    font-weight: 400;
    font-size: vw(128);
    line-height: vw(65);
    letter-spacing: 0px;
    color: $yellow-light;
    margin-bottom: vw(-25);

    @include mobile {
      font-size: vmin(90);
      line-height: vmin(52);
      margin-bottom: vmin(-25);
    }
  }

  &__text {
    text-wrap: pretty;
    font-family: 'Wix Madefor Display';
    font-weight: 400;
    font-size: vw(16);
    line-height: vw(22);
    letter-spacing: 0px;
    color: $white;
    hanging-punctuation: allow-end;

    @include mobile {
      font-size: vmin(12);
      line-height: vmin(17);
    }
  }

  &__about {
    padding-top: vw(45);
    margin-left: vw(-45);
    margin-right: vw(-45);
    padding-left: vw(45);
    padding-right: vw(45);
    grid-column: 1 / 4;
    grid-row: 2 / 3;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: vw(42);

    @include mobile {
      grid-row: 2;
      grid-column: 1;
      display: block;

      padding-top: vmin(20);
      padding-bottom: vmin(20);
      margin-left: 0;
      margin-right: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }

  &__about-text {
    font-family: 'Plus Jakarta Sans';
    font-size: vw(16);
    line-height: vw(22);
    letter-spacing: 0px;
    color: $white;

    @include mobile {
      font-size: vmin(12);
      line-height: vmin(17);
    }
  }
}
</style>