// index.js

// Form Validation
document.addEventListener('DOMContentLoaded', () => {
      const form = document.querySelector('#myForm'); // Replace with your form ID
  
      form.addEventListener('submit', function (event) {
          const nameInput = document.querySelector('#name'); // Replace with your input ID
          const emailInput = document.querySelector('#email'); // Replace with your input ID
  
          if (nameInput.value === '' || emailInput.value === '') {
              alert('Please fill out all required fields.');
              event.preventDefault(); // Prevent form submission
          }
      });
  });
  
  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
  
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
  
  // Light/Dark Mode Toggle
  document.addEventListener('DOMContentLoaded', () => {
      const toggleButton = document.querySelector('#themeToggle'); // Replace with your button ID
  
      toggleButton.addEventListener('click', () => {
          document.body.classList.toggle('dark-mode');
      });
  });
  