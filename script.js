const slides = Array.from(document.querySelectorAll(".slide"));
const progress = document.querySelector("#slider-progress");

if (slides.length && progress) {
  let currentIndex = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    currentIndex = index;
    progress.value = String(index);
  };

  progress.max = String(slides.length - 1);

  progress.addEventListener("input", (event) => {
    showSlide(Number(event.target.value));
  });

  setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }, 3500);
}
