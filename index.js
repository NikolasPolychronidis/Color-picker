const colorBtn = document.getElementById('colorBtn');
const colorPicker = document.getElementById('color-picker');
const schemeSelector = document.getElementById('scheme-selector');

let color = colorPicker.value;
let paletteType = schemeSelector.value;
let colorArray = [];

colorPicker.addEventListener('change', function (event) {
  color = event.target.value;
});

schemeSelector.addEventListener('change', function (event) {
  paletteType = event.target.value;
});

// Code for fetching color scheme using the updated color and paletteType will go here
colorBtn.addEventListener('click', function () {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${color.replace(
      '#',
      ''
    )}&mode=${paletteType}`
  )
    .then(res => res.json())
    .then(data => renderColorHtml(data));
});

function renderColorHtml(data) {
  data.colors.forEach(c => colorArray.unshift(c.hex.value));
  let colorHtml = colorArray
    .map(
      c => `
        <div class="color-section-container">
            <div class="color-section" style="background-color: ${c}"></div>
            <p class="hexcode-section"> ${c}</p>
        </div>`
    )
    .join('');
  document.getElementById('scheme-container').innerHTML = colorHtml;
  colorArray = [];
}
