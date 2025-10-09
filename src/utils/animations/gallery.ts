
export function animateGallery(gsap: GSAP): GSAPTimeline | null {
  const galleryList = document.querySelector('.gallery__list');

  // Check if galleryList exists
  if (!galleryList) {
    console.error('Gallery list element not found');
    return null;
  }

  const container = galleryList.parentElement;

  // Check if container exists
  if (!container) {
    console.error('Container element not found');
    return null;
  }

  // Рассчитываем процент смещения
  const totalContentWidth = galleryList.scrollWidth;
  const visibleWidth = container.offsetWidth;
  const overflowWidth = totalContentWidth - visibleWidth;

  // Процент смещения, необходимый для прокрутки до конца
  const percentOffset = -(overflowWidth / totalContentWidth * 100);

  const tlHeader = gsap.timeline({
    // defaults: {
    //   ease: "none",
    // },
    // paused: true,

    scrollTrigger: {
      trigger: ".gallery",
      start: "top center",
      scrub: 1,
      // scrub: false,
      // scrub: true,

      end: "bottom center",
      // pin: true,
    },
  });
  // tlHeader.fromTo(
  //   ".gallery__list",
  //   {
  //     x: '0%',
  //   },
  //   {
  //     x: `${percentOffset}%`,
  //     // duration: 24,
  //   }
  // );
  gsap.fromTo(
    ".gallery__list",
    {
      x: '0%',
    },
    {
      scrollTrigger: {
        trigger: ".gallery",
        start: "top center",
        scrub: 1,
        // scrub: false,
        // scrub: true,

        end: "bottom center",
        // pin: true,
      },
      x: `${percentOffset}%`,
      // duration: 24,
    }
  );


  return tlHeader
}