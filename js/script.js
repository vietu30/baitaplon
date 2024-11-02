// Ensure all scripts run after DOM has loaded
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

  // Carousel Functionality
  (function initCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function prevSlide() {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function setSlide(index) {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 5000); 

    
    window.prevSlide = prevSlide;
    window.nextSlide = nextSlide;
    window.setSlide = setSlide;
  })();

  // Image Change in Inventory
  window.changeImage = function(imageUrl) {
    const mainImage = document.getElementById("main-image");
    if (mainImage) {
      mainImage.style.opacity = 0;
      setTimeout(() => {
        mainImage.src = imageUrl;
        mainImage.style.opacity = 1;
      }, 500); 
    }
  };

  // Inventory Filter
  (function() {
    function applyFilter() {
      const brand = document.getElementById("brand").value.toLowerCase();
      const price = parseInt(document.getElementById("price").value, 10) || Infinity; // Default to Infinity if NaN

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
  })();

});



//Schedule Drive
const cities = [
  "Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ",
  "Nha Trang", "Huế", "Đà Lạt", "Vũng Tàu", "Bắc Ninh",
  "Thành phố Thủ Đức", "Quảng Ninh", "Nam Định", "Ninh Bình",
  "Thái Nguyên", "Hưng Yên", "Kiên Giang", "Long An", "An Giang",
  "Hà Tĩnh", "Lâm Đồng", "Sóc Trăng", "Bến Tre", "Tiền Giang",
  // Thêm các thành phố khác nếu cần
];

function showSuggestions() {
const value = document.getElementById("searchLocation").value;
const suggestionList = document.getElementById("suggestionList");
suggestionList.innerHTML = ""; 

if (value) {
const filteredCities = cities.filter(city =>
  city.toLowerCase().startsWith(value.toLowerCase())
);

filteredCities.forEach(city => {
  const li = document.createElement("li");
  li.textContent = city;
  li.onclick = () => selectCity(city);
  suggestionList.appendChild(li);
});
}
}

function selectCity(city) {
  document.getElementById("searchLocation").value = city;
  document.getElementById("suggestionList").innerHTML = ""; 
}

function confirmRequest() {
  const carModel = document.getElementById("carModel").value;
  const title = document.getElementById("title").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  if (!carModel || !title || !firstName || !lastName || !phone || !email) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
  }

  alert(`Cảm ơn ${title} ${firstName} ${lastName}! Yêu cầu lái thử cho mẫu ${carModel} đã được ghi nhận.`);
  document.getElementById("scheduleForm").reset();
}
window.addEventListener("load", function () {
  document.querySelector(".header-contact").classList.add("visible");
});
document.addEventListener("DOMContentLoaded", function () {
  // Thêm sự kiện click cho icon và nhãn "Send a Message"
  document.getElementById("toggleForm").addEventListener("click", function () {
    var form = document.getElementById("messageForm");
    if (form.style.display === "none" || form.style.display === "") {
      form.style.display = "block"; // Hiển thị form
      setTimeout(() => {
        // Đợi một chút để áp dụng hiệu ứng opacity
        form.classList.add("show"); // Thêm class để hiển thị từ từ
      }, 10);
    } else {
      form.classList.remove("show"); // Xóa class hiển thị
      setTimeout(() => {
        // Đợi cho hiệu ứng opacity hoàn thành
        form.style.display = "none"; // Ẩn form
      }, 500); // Thời gian trùng khớp với thời gian transition
    }
  });
});