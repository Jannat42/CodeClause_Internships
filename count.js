// Set the date to countdown to
const countdownDate = new Date("2024-04-01T00:00:00").getTime();

// Update the countdown every second
const countdownTimer = setInterval(function() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the countdown
  document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the countdown is over, display a message
  if (distance < 0) {
    clearInterval(countdownTimer);
    document.getElementById("timer").innerHTML = "EXPIRED";
  }
}, 1000);
