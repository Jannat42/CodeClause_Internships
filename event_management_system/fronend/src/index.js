// index.js

// DOM elements
const button = document.getElementById('myButton');
const output = document.getElementById('output');

// Event listener
button.addEventListener('click', () => {
  output.textContent = 'Button clicked!';
});
