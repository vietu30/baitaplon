// Đảm bảo tất cả mã chạy sau khi DOM đã tải xong
document.addEventListener("DOMContentLoaded", function() {

  // Navbar Offcanvas Toggle
  (function() {
    const toggleButton = document.getElementById('toggleButton');
    const closeButton = document.getElementById('closeButton');
    const offcanvasMenu = document.getElementById('offcanvasMenu');
    
    if (toggleButton && closeButton && offcanvasMenu) {
      toggleButton.addEventListener('click', function() {
        offcanvasMenu.classList.add('open');
      });

      closeButton.addEventListener('click', function() {
        offcanvasMenu.classList.remove('open');
      });
    }
  })();

  // Dropdown Toggle
  (function() {
    const dropdownToggle = document.getElementById('dropdownToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (dropdownToggle && dropdownMenu) {
      dropdownToggle.addEventListener('click', function(event) {
        event.preventDefault();
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
      });
    }
  })();

  // Banner Carousel Functionality
  (function() {
    const slides = document.querySelectorAll(".banner-slider img");
    const slider = document.getElementById("slider");
    const overlay = document.getElementById("bannerOverlay");

    if (slides.length && slider && overlay) {
      let currentSlide = 0;
      let isDragging = false;
      let startPos = 0;
      let currentTranslate = 0;
      let prevTranslate = 0;
      let autoSlideTimeout;
      
      function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
      }

      function touchStart(event) {
        isDragging = true;
        startPos = event.pageX;
        overlay.style.cursor = "grabbing";
        resetAutoSlide();
      }

      function touchEnd() {
        isDragging = false;
        overlay.style.cursor = "grab";
        const movedBy = currentTranslate - prevTranslate;
        currentSlide = movedBy < -100 && currentSlide < slides.length - 3 ? currentSlide + 1 : (movedBy > 100 && currentSlide > 0 ? currentSlide - 1 : currentSlide);
        setPositionByIndex();
        resetAutoSlide();
      }

      function touchMove(event) {
        if (isDragging) currentTranslate = prevTranslate + event.pageX - startPos;
      }

      function setPositionByIndex() {
        currentTranslate = (currentSlide * -33.33 * window.innerWidth) / 100;
        prevTranslate = currentTranslate;
        setSliderPosition();
      }

      function startAutoSlide() {
        autoSlideTimeout = setTimeout(() => {
          currentSlide = currentSlide < slides.length - 3 ? currentSlide + 1 : 0;
          setPositionByIndex();
          startAutoSlide();
        }, 5000);
      }

      function resetAutoSlide() {
        clearTimeout(autoSlideTimeout);
        startAutoSlide();
      }

      startAutoSlide();
      overlay.addEventListener("mousedown", touchStart);
      overlay.addEventListener("mousemove", touchMove);
      overlay.addEventListener("mouseup", touchEnd);
      overlay.addEventListener("mouseleave", touchEnd);
    }
  })();

  // Image Change in Inventory
  window.changeImage = function(imageUrl) {
    const mainImage = document.getElementById("main-image");
    if (mainImage) {
      mainImage.style.opacity = 0;
      setTimeout(() => {
        mainImage.src = imageUrl;
        mainImage.style.opacity = 1;
      }, 300);
    }
  }

  // Inventory Filter
function applyFilter() {
  const brand = document.getElementById("brand").value.toLowerCase();
  const price = parseInt(document.getElementById("price").value, 10);

  document.getElementById("price-output").textContent = `${price.toLocaleString()} VND`;

  const vehicles = document.querySelectorAll(".vehicle-item");
  vehicles.forEach(vehicle => {
    const vehicleBrand = vehicle.querySelector("h3").textContent.toLowerCase();
    const vehiclePriceText = vehicle.querySelector(".smart-price").textContent.replace(/[^\d]/g, "");
    const vehiclePrice = parseInt(vehiclePriceText, 10);

    const brandMatch = (brand === "all") || vehicleBrand.includes(brand);
    const priceMatch = vehiclePrice <= price;
    vehicle.style.display = (brandMatch && priceMatch) ? "block" : "none";
  });
}

const priceInput = document.getElementById("price");
const filterForm = document.getElementById("filterForm");

if (priceInput && filterForm) {
  priceInput.addEventListener("input", function() {
    document.getElementById("price-output").textContent = `${parseInt(priceInput.value, 10).toLocaleString()} VND`;
  });

  filterForm.addEventListener("submit", function(event) {
    event.preventDefault();
    applyFilter();
  });
}
}
)