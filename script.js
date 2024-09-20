// script.js

// Modal Popup
document.addEventListener('DOMContentLoaded', () => {
      const modal = document.querySelector('#myModal'); // Replace with your modal ID
      const openModalBtn = document.querySelector('#openModal'); // Replace with your button ID
      const closeModalBtn = document.querySelector('.close'); // Replace with your close button class
  
      openModalBtn.addEventListener('click', () => {
          modal.style.display = 'block';
      });
  
      closeModalBtn.addEventListener('click', () => {
          modal.style.display = 'none';
      });
  
      window.addEventListener('click', (event) => {
          if (event.target === modal) {
              modal.style.display = 'none';
          }
      });
  });
  
  // Countdown Timer
  const countdownDate = new Date('2024-12-31T00:00:00').getTime(); // Set your countdown date
  
  const countdownFunction = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
  
      // Time calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      // Display result in an element
      document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  
      // If the countdown is over, write some text
      if (distance < 0) {
          clearInterval(countdownFunction);
          document.getElementById('countdown').innerHTML = "EXPIRED";
      }
  }, 1000);
  