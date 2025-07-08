window.addEventListener('scroll', () => {
  document.body.classList.toggle('scrolled', window.scrollY > 20);
});
document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-image");
  const closeBtn = document.querySelector(".close");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let currentGalleryImages = [];
  let currentIndex = 0;

  function showImage(index) {
    if (index < 0 || index >= currentGalleryImages.length) return;
    currentIndex = index;
    lightboxImg.src = currentGalleryImages[currentIndex].src;
    lightbox.style.display = "flex";
  }

  // Select all galleries
  const galleries = document.querySelectorAll(".myGallery");

  // Add click listeners to images in each gallery
  galleries.forEach(gallery => {
    const galleryImages = gallery.querySelectorAll(".lightbox-img");

    galleryImages.forEach((img, index) => {
      img.addEventListener("click", () => {
        currentGalleryImages = Array.from(galleryImages); // Use only this gallery
        showImage(index);
      });
    });
  });

  // Close lightbox
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Navigate next/prev within current gallery
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentGalleryImages.length;
    showImage(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    showImage(currentIndex);
  });

  // Click outside image to close
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        // Swipe left
        currentIndex = (currentIndex + 1) % currentGalleryImages.length;
        showImage(currentIndex);
      } else {
        // Swipe right
        currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        showImage(currentIndex);
      }
    }
  }
});
