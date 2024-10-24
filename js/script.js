// Navbar Offcanvas Toggle
(function() {
  document.getElementById('toggleButton').addEventListener('click', function() {
    document.getElementById('offcanvasMenu').classList.add('open');
  });
  
  document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('offcanvasMenu').classList.remove('open');
  });
})();

// Dropdown Toggle
(function() {
  document.getElementById('dropdownToggle').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu.style.display === 'block') {
      dropdownMenu.style.display = 'none';
    } else {
      dropdownMenu.style.display = 'block';
    }
  });
})();

// Banner Carousel Functionality
(function() {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".banner-slider img");
  const totalSlides = slides.length;
  const slider = document.getElementById("slider");
  const overlay = document.getElementById("bannerOverlay");

  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;
  let autoSlideTimeout;
  let lastInteractionTime = new Date().getTime();

  function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  function touchStart(event) {
    isDragging = true;
    startPos = event.pageX;
    animationID = requestAnimationFrame(animation);
    overlay.style.cursor = "grabbing";
    resetAutoSlide();
  }

  function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    overlay.style.cursor = "grab";

    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentSlide < totalSlides - 3) {
      currentSlide += 1;
    } else if (movedBy > 100 && currentSlide > 0) {
      currentSlide -= 1;
    }

    setPositionByIndex();
    resetAutoSlide();
  }

  function touchMove(event) {
    if (isDragging) {
      const currentPosition = event.pageX;
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }

  function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  }

  function setPositionByIndex() {
    currentTranslate = (currentSlide * -33.33 * window.innerWidth) / 100;
    prevTranslate = currentTranslate;
    setSliderPosition();
  }

  function startAutoSlide() {
    autoSlideTimeout = setTimeout(() => {
      if (currentSlide < totalSlides - 3) {
        currentSlide += 1;
      } else {
        currentSlide = 0;
      }
      setPositionByIndex();
      startAutoSlide();
    }, 5000);
  }

  function resetAutoSlide() {
    clearTimeout(autoSlideTimeout);
    lastInteractionTime = new Date().getTime();

    const timeSinceLastInteraction = new Date().getTime() - lastInteractionTime;
    if (timeSinceLastInteraction >= 5000) {
      startAutoSlide();
    } else {
      startAutoSlide();
    }
  }

  startAutoSlide();

  overlay.addEventListener("mousedown", touchStart);
  overlay.addEventListener("mousemove", touchMove);
  overlay.addEventListener("mouseup", touchEnd);
  overlay.addEventListener("mouseleave", touchEnd);
})();
