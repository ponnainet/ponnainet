console.log("JS is loaded!");

// ---------- Scroll effect ----------
window.addEventListener('scroll', () => {
    document.body.classList.toggle('scrolled', window.scrollY > 20);
});

document.addEventListener("DOMContentLoaded", function () {

    // ---------- Lightbox ----------
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-image");
    const closeBtn = document.querySelector(".close");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    const lightboxCaption = document.getElementById("lightbox-caption");

    let currentGalleryImages = [];
    let currentIndex = 0;

    function showImage(index) {
    if (!currentGalleryImages.length || index < 0 || index >= currentGalleryImages.length) return;
    currentIndex = index;
    
    if (lightboxImg) lightboxImg.src = currentGalleryImages[currentIndex].src;
    
    // Set caption text
    if (lightboxCaption) {
        // Use data attribute 'data-caption' for each image
        const captionText = currentGalleryImages[currentIndex].dataset.caption || "";
        lightboxCaption.textContent = captionText;
    }

    if (lightbox) lightbox.style.display = "flex";
}

    // Select all galleries
    const galleries = document.querySelectorAll(".myGallery");
    galleries.forEach(gallery => {
        const galleryImages = gallery.querySelectorAll(".lightbox-img");
        galleryImages.forEach((img, index) => {
            img.addEventListener("click", () => {
                currentGalleryImages = Array.from(galleryImages);
                showImage(index);
            });
        });
    });

    // Lightbox controls
    // Lightbox controls
if (closeBtn) closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (lightbox) lightbox.style.display = "none";
});

if (nextBtn) nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % currentGalleryImages.length;
    showImage(currentIndex);
});

if (prevBtn) prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    showImage(currentIndex);
});

    if (lightbox) {
        // Click outside closes lightbox
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) lightbox.style.display = "none";
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].screenX; });
        lightbox.addEventListener("touchend", (e) => { touchEndX = e.changedTouches[0].screenX; handleSwipe(); });

        function handleSwipe() {
            const deltaX = touchEndX - touchStartX;
            if (Math.abs(deltaX) > 50) {
                if (deltaX < 0) {
                    currentIndex = (currentIndex + 1) % currentGalleryImages.length;
                    showImage(currentIndex);
                } else {
                    currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
                    showImage(currentIndex);
                }
            }
        }
    }

    // ---------- Hamburger menu ----------
     // ---------- Hamburger menu ----------
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const mainNav = document.querySelector('.main-nav');

    if (hamburger && navList) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navList.classList.toggle('active');
            
            hamburger.classList.toggle('active');
        });

        // Clicking outside closes the mobile nav
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target)) {
                navList.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // ---------- Dropdown menus ----------
    const dropdownBtns = document.querySelectorAll('.dropdown > .dropbtn');

    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();      // Prevent navigation
            e.stopPropagation();     // Prevent document click from closing

            const parent = this.parentElement;

            // Toggle the clicked dropdown
            parent.classList.toggle('active');

            // Close other dropdowns
            dropdownBtns.forEach(otherBtn => {
                if(otherBtn !== this) {
                    otherBtn.parentElement.classList.remove('active');
                }
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        dropdownBtns.forEach(btn => {
            btn.parentElement.classList.remove('active');
        });
    });
    
   // ---------- Active page highlight ----------
const currentPath = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll('.main-nav a').forEach(link => {
    const linkPath = link.getAttribute('href');

    // Normalize paths: remove leading "./" and convert empty to index.html
    const normalizedLink = (linkPath === "" || linkPath === "./") ? "index.html" : linkPath.replace("./", "");

    if (normalizedLink === currentPath) {
        link.classList.add('active-page');

        // If this link is inside a dropdown, also highlight the parent button
        const dropdown = link.closest('.dropdown');
        if (dropdown) {
            const dropBtn = dropdown.querySelector('.dropbtn');
            if (dropBtn) dropBtn.classList.add('active-page');
        }
    }
    
// ---------- Mobile only: Expand submenu if active page is inside ----------
if (window.innerWidth <= 768) { // Mobile breakpoint
    const activeLink = document.querySelector('.nav-list a.active-page');
    if (activeLink) {
        const parentDropdown = activeLink.closest('.dropdown');
        if (parentDropdown) {
            parentDropdown.classList.add('active'); // Expand the submenu
        }
    }
}

});



});
