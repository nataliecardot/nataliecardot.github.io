const menu = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menu.onclick = () => {
  menu.classList.toggle('change');

  if (window.getComputedStyle(navLinks).display === 'block') {
    navLinks.style.display = 'none';
  } else  {
    navLinks.style.display = 'block';
  }
}
