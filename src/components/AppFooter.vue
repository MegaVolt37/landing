<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="footer__contact">
        <a class="footer__link footer__link--phone" href="tel:+6281139408858" target="_blank"
          rel="noopener noreferrer">+62 811 3940 8858</a>
        <a class="footer__link footer__link--email" href="mailto:hello@labnacapital.com" target="_blank"
          rel="noopener noreferrer">hello@labnacapital.com</a>
        <div>
          <p class="footer__address">Jalan Sunset Road Nomor 819,Seminyak, Kec. Kuta, Kabupaten Badung, Bali 80361</p>
          <!-- <p class="footer__address">#02-01, Singapore</p> -->
        </div>
      </div>

      <div class="footer__logo">
        <img class="footer__logo-image" src="@/assets/images/logoFooter.svg" alt="Логотип Labna Capital">
      </div>

      <div class="footer__slogan">
        <span class="footer__slogan-title">LABNA CAPITAL</span>
        <span class="footer__slogan-text">Based on values.</span>
        <span class="footer__slogan-text">Focus on growth.</span>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="footer__policies">
        <a class="footer__policy-link" href="https://labnacapital.com/privacy-policy" target="_blank"
          rel="noopener noreferrer">Privacy Policy</a>
        <a class="footer__policy-link" href="https://labnacapital.com/cookies-policy" target="_blank"
          rel="noopener noreferrer">Cookie Policy</a>
      </div>

      <div class="footer__social">
        <a class="footer__social-link"
          href="https://www.instagram.com/verdana.sanur?igsh=MWQwNWQ2NHAzNDhlbQ%3D%3D&utm_source=qr" target="_blank"
          rel="noopener noreferrer"><img src="@/assets/images/instagram.svg" alt="instagram"></a>
        <!-- <a class="footer__social-link" href="#" target="_blank" rel="noopener noreferrer"><img
            src="@/assets/images/telegram.svg" alt="telegram"></a> -->
        <a class="footer__social-link" href="https://wa.me/6281139408858" target="_blank" rel="noopener noreferrer"><img
            src="@/assets/images/whatsapp.svg" alt="whatsapp"></a>
        <a class="footer__social-link" href="https://www.facebook.com/share/1XWSL26nF2/?mibextid=wwXIfr" target="_blank"
          rel="noopener noreferrer"><img src="@/assets/images/facebook.svg" alt="facebook"></a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.footer {
  position: relative;
  z-index: 1;
  display: grid;
  padding: vw(60) vw(43) vw(43) vw(43);
  background-color: $brown;
  border-radius: vw(15) vw(15) 0 0;
  overflow: hidden;

  @include mobile {
    padding: vmin(16) vmin(10) vmin(35) vmin(10);
    border-radius: vmin(10) vmin(10) 0 0;
  }

  &__top {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;

    @include mobile {
      grid-template-columns: 1fr;
      justify-items: center;
    }
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: vw(25);
    max-width: vw(305);

    @include mobile {
      margin-top: vmin(20);
      align-items: center;
      max-width: vmin(230);
      gap: vmin(20);
    }
  }

  &__link {
    text-decoration: none;
  }

  &__link--phone {
    font-family: 'Agatho';
    font-weight: 700;
    font-size: vw(30);
    line-height: 100%;
    letter-spacing: 0px;
    color: $yellow-light;

    @include mobile {
      font-size: vmin(30);
    }
  }

  &__link--email {
    font-family: 'Wix Madefor Display';
    font-weight: 400;
    font-size: vw(16);
    line-height: vw(22);
    letter-spacing: 0px;
    color: $white;

    @include mobile {
      font-size: vmin(12);
      line-height: vmin(16);
    }
  }

  &__address {
    text-wrap: balance;
    font-family: 'Wix Madefor Display';
    font-weight: 400;
    font-size: vw(14);
    line-height: vw(22);
    letter-spacing: 0px;
    color: $white;

    @include mobile {
      text-align: center;
      font-size: vmin(12);
      line-height: vmin(16);
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: vw(145);
    max-height: vw(160);
    justify-self: center;

    @include mobile {
      grid-row: 1;
      max-width: vmin(97);
      max-height: vmin(108);
    }
  }

  &__logo-image {
    width: 100%;
    object-fit: contain;
  }

  &__slogan {
    display: flex;
    flex-direction: column;
    justify-self: flex-end;

    @include mobile {
      display: none;
      // TODO: нужен ли этот блок?
      justify-self: center;
    }
  }

  &__slogan-title {
    font-family: 'Agatho';
    font-weight: 500;
    font-size: vw(20);
    line-height: 100%;
    letter-spacing: 0px;
    color: $yellow-light;
    margin-bottom: vw(25);
  }

  &__slogan-text {
    font-family: 'Wix Madefor Display';
    font-weight: 400;
    font-size: vw(16);
    line-height: vw(22);
    letter-spacing: 0px;
    color: $white;
  }

  &__bottom {
    margin-top: vw(80);
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @include mobile {
      margin-top: vmin(30);
      grid-template-columns: 1fr;
      justify-self: center;
      gap: vmin(45);
    }
  }

  &__policies {
    display: flex;
    gap: vw(40);

    @include mobile {
      gap: vmin(40);
      grid-row: 2;
    }
  }

  &__policy-link {
    font-family: 'Plus Jakarta Sans';
    font-weight: 400;
    font-size: vw(18);
    line-height: 1.2;
    letter-spacing: 0%;
    text-decoration: underline;
    text-decoration-style: solid;
    text-underline-offset: vw(3);
    color: $yellow-light;

    @include mobile {
      font-size: vmin(13);
      text-underline-offset: vmin(3);
    }
  }

  &__social {
    justify-self: flex-end;
    display: flex;
    gap: vw(15);

    @include mobile {
      justify-self: center;
      gap: vmin(15);
    }
  }

  &__social-link {
    width: vw(25);
    aspect-ratio: 1;

    @include mobile {
      width: vmin(25);
    }
  }
}
</style>