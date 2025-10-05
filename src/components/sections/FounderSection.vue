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
    <div class="founder__content-wrapper">
      <AppTabs class="founder__tabs" v-model="activeAuthor" :list="authors" />
      <div class="tabs-select founder__tabs-select">
        <el-select v-model="activeAuthor" placeholder="Select" class="calculator__select">
          <el-option v-for="item in authors" :key="item.id" :label="item.heading" :value="item.id" />
        </el-select>
      </div>
      <transition name="fade" mode="out-in">
        <div v-if="currentAuthor" class="founder__content" :key="activeAuthor">
          <div class="founder__title">
            <h2 class="founder__heading">{{ currentAuthor.heading }}</h2>
            <span class="founder__subheading">
              <span class="montecarloscriptb">W</span>e are
            </span>
          </div>

          <div class="founder__image">
            <img :src="currentAuthor.image" :alt="currentAuthor.name" class="founder__img" />
          </div>

          <div class="founder__description">
            <span class="founder__symbol">”</span>
            <p class="founder__text" v-prevent-widow>
              {{ currentAuthor.message }}
            </p>
          </div>

          <div class="founder__about">
            <p class="founder__about-text" v-dompurify-html="currentAuthor.about" />
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import ImageJafni from '@/assets/images/jafni.png';
import ImageNicholas from '@/assets/images/nicholas.png';
import ImageSven from '@/assets/images/SVEN.jpg';
import { computed, ref } from 'vue';
import AppTabs from '../AppTabs.vue';

const activeAuthor = ref(`Chairman’s Message`)
const authors = [
  // {
  //   id: "Landscape designer's message",
  //   name: "Landscape designer's message",
  //   image: ImageNicholas,
  //   heading: "Landscape designer's message",
  //   subheading: "We are",
  //   message:
  //     "We&nbsp;believe luxury isn&rsquo;t about excess. It&rsquo;s about creating places people genuinely connect with. Homes and spaces designed around lifestyle, culture, and long-term value. We&nbsp;see Southeast Asia as&nbsp;one of&nbsp;the most exciting markets in&nbsp;the world, where growth and cultural richness come together. We&rsquo;re combining smart design, sustainability, and authenticity to&nbsp;create lasting impact for residents, investors, and communities.",
  //   about:
  //     "Nicholas Longfellow,<br />landscaping artist,<br />Bali Living Design founder"
  // },
  // {
  //   id: "Architect's message",
  //   name: "Architect's message",
  //   image: ImageJafni,
  //   heading: "Architect's message",
  //   subheading: "We are",
  //   message:
  //     "The Verdana Residences embraces natural light, encourages cross-ventilation through strategic airflow, and uses sustainable materials like wood and stone. The result is a harmonious connection with the surrounding environment.",
  //   about: "Jafni Zul Fahnmi,<br />Nawangseta Architect"
  // },
  {
    id: "Chairman’s Message",
    name: "Chairman’s Message",
    image: ImageSven,
    heading: "Chairman’s Message",
    subheading: "We are",
    message:
      "Labna Capital was built on a shared vision and 50+ years of experience in real estate, strategy, and finance. From global boardrooms to local communities, we’ve seen what makes projects truly meaningful. We believe luxury isn’t about excess. It’s about creating places people genuinely connect with. Homes and spaces designed around lifestyle, culture, and long-term value. We see Southeast Asia as one of the most exciting markets in the world, where growth and cultural richness come together. We’re combining smart design, sustainability, and authenticity to create lasting impact for residents, investors, and communities.",
    about: "Sven Osmers,<br />Chairman & Co-Founder of Labna Capital"
  }
];

const currentAuthor = computed(() =>
  authors.find(author => author.id === activeAuthor.value)
)
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
    padding: vw(20) vw(30) vw(20) vw(30);
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

    &:nth-child(1) .tile__percent {
      font-family: 'Agatho';
      font-weight: 700;

      @include mobile {
        font-weight: 400;
      }
    }

    &:nth-child(2) .tile__percent {
      font-family: 'Vollkorn';
      font-weight: 400;

      @include mobile {
        font-family: 'Agatho';
        font-weight: 400;
      }
    }

    &:nth-child(3) .tile__percent {
      font-family: 'Agatho';
      font-weight: 400;
    }

    &:nth-child(4) .tile__percent {
      font-family: 'Vollkorn';
      font-weight: 400;

      @include mobile {
        font-family: 'Agatho';
        font-weight: 400;
      }
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
    font-size: vw(32);
    line-height: 100%;
    letter-spacing: 0px;
    text-transform: uppercase;
    color: $yellow;

    @include mobile {
      font-weight: 400;
      font-size: vmin(21);
    }
  }

  &__description {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(12);
    line-height: 1.2;
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
    padding-top: vmin(20);
  }

  &__content-wrapper {
    margin-top: vw(130);

  }

  &__content {
    margin-top: vw(40);
    align-items: flex-start;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: vw(42);
    min-height: vw(430);

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__tabs {
    @include mobile {
      display: none;
    }
  }

  &__tabs-select {
    display: none;

    @include mobile {
      display: block;
    }

    :deep(.el-select__wrapper) {
      padding: vw(4) vw(6) vw(12) 0;

      @include mobile {
        padding: vmin(4) vmin(6) vmin(12) 0;
      }
    }

    :deep(.el-select__wrapper.is-focused) {
      box-shadow: none;
    }

    :deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
      box-shadow: none;
    }

    :deep(.el-select__placeholder) {
      font-family: 'Plus Jakarta Sans';
      font-weight: 400;
      font-size: vw(14);
      line-height: vw(15);
      letter-spacing: 0%;
      text-transform: uppercase;
      color: $yellow;

      @include mobile {
        font-size: vmin(9);
        line-height: vmin(9);
      }
    }

    :deep(.el-select__caret) {
      width: vw(14);
      height: vw(8);

      @include mobile {
        width: vmin(12);
        height: vmin(12);
      }
    }

    :deep(.el-icon svg) {
      color: $yellow;
      width: vw(14);
      height: vw(8);

      @include mobile {
        width: 100%;
        height: 100%;
      }
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
    color: $yellow-light;
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
    height: 100%;

    @include mobile {
      height: auto;
      margin-top: vmin(24);
      grid-row: 3;
      grid-column: 1;
      border-radius: vmin(160) vmin(160) vw(9) vw(9);
    }
  }

  &__img {
    height: 100%;
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
      grid-row: 5;
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
    line-height: 1.2;
    letter-spacing: 0px;
    color: $white;
    hanging-punctuation: allow-end;

    @include mobile {
      font-size: vmin(12);
      line-height: vmin(17);
    }
  }

  &__about {
    margin-top: auto;
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
      grid-row: 4;
      grid-column: 1;
      display: flex;
      justify-content: flex-end;

      padding-top: vmin(15);
      padding-bottom: vmin(0);
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
    grid-column: 3;
    font-weight: 400;
    color: $yellow;

    @include mobile {

      font-size: vmin(10);
      line-height: vmin(12);
    }
  }
}
</style>