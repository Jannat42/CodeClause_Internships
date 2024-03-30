document.addEventListener('DOMContentLoaded', function() {
  const colorPickersContainer = document.getElementById('colorPickers');
  const addColorButton = document.getElementById('addColor');
  const gradientType = document.getElementById('gradientType');
  const backgroundPreview = document.getElementById('backgroundPreview');

  let colorPickerCount = 1;

  function createColorPicker() {
    const colorPickerDiv = document.createElement('div');
    colorPickerDiv.className = 'color-picker';
    colorPickerDiv.innerHTML = `
      <label>Color ${colorPickerCount + 1}:</label>
      <input type="color" class="colorInput">
    `;
    colorPickersContainer.appendChild(colorPickerDiv);
    colorPickerCount++;
  }

  function updateBackground() {
    const selectedGradient = gradientType.value;
    const colorInputs = document.querySelectorAll('.colorInput');
    let colors = [];
    colorInputs.forEach(input => {
      colors.push(input.value);
    });
    const background = `${selectedGradient}(${colors.join(', ')})`;
    backgroundPreview.style.background = background;
  }

  addColorButton.addEventListener('click', createColorPicker);

  colorPickersContainer.addEventListener('change', function(event) {
    if (event.target.classList.contains('colorInput')) {
      updateBackground();
    }
  });

  gradientType.addEventListener('change', updateBackground);

  // Initial update
  updateBackground();
});
