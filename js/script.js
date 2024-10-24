// Navbar

document.getElementById('toggleButton').addEventListener('click', function() {
    document.getElementById('offcanvasMenu').classList.add('open');
  });
  
  document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('offcanvasMenu').classList.remove('open');
  });
  
  // Toggle Dropdown
  document.getElementById('dropdownToggle').addEventListener('click', function() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu.style.display === 'block') {
      dropdownMenu.style.display = 'none';
    } else {
      dropdownMenu.style.display = 'block';
    }
  });
  