document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          // Add the class when the section comes into view
          entry.target.classList.add("is-visible");
        } else {
          // Optional: Remove the class when the section goes out of view
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the section is visible
    }
  );

  // Observe all sections
  sections.forEach((section) => {
    observer.observe(section);
  });

  const imageWrapper = document.querySelector(".image-wrapper");
  const image = imageWrapper.querySelector("img");

  imageWrapper.addEventListener("mousemove", (e) => {
    // Get the bounding rectangle of the image wrapper
    const rect = imageWrapper.getBoundingClientRect();

    // Calculate the mouse position relative to the center of the image
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // Apply the 3D tilt effect
    const tiltX = (mouseY / rect.height) * 20; // Tilt on X-axis (vertical mouse movement)
    const tiltY = -(mouseX / rect.width) * 20; // Tilt on Y-axis (horizontal mouse movement)

    image.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  // Reset the image when the mouse leaves
  imageWrapper.addEventListener("mouseleave", () => {
    image.style.transform = "rotateX(0deg) rotateY(0deg)";
  });

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});