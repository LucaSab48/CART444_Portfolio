const slides = Array.from(document.querySelectorAll("[data-slide]"));
const triggers = Array.from(document.querySelectorAll("[data-slide-trigger]"));

if (slides.length && triggers.length && slides.length === triggers.length) {
  let activeIndex = 0;
  let intervalId;

  const showSlide = (nextIndex) => {
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === nextIndex);
    });

    triggers.forEach((trigger, index) => {
      trigger.classList.toggle("is-active", index === nextIndex);
      trigger.setAttribute("aria-pressed", String(index === nextIndex));
    });

    activeIndex = nextIndex;
  };

  const restartAutoPlay = () => {
    window.clearInterval(intervalId);
    intervalId = window.setInterval(() => {
      showSlide((activeIndex + 1) % slides.length);
    }, 5000);
  };

  triggers.forEach((trigger, index) => {
    trigger.addEventListener("click", () => {
      showSlide(index);
      restartAutoPlay();
    });
  });

  showSlide(0);
  restartAutoPlay();
}
