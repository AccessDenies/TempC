
const celsiusEl = document.getElementById("celsius");
const fahrenheitEl = document.getElementById("fahrenheit");
const kelvinEl = document.getElementById("kelvin");
const resetBtn = document.getElementById("resetBtn");

const inputs = [celsiusEl, fahrenheitEl, kelvinEl];

function formatTemperature(value) {
    return value.toFixed(2);
}

function computeTemp(event) {
    const source = event.target;
    const rawValue = source.value;

    // Empty field hone par baaki results bhi clear karo
    if (rawValue.trim() === "") {
        inputs.forEach(input => {
            if (input !== source) {
                input.value = "";
            }
        });
        return;
    }

    const value = Number(rawValue);

    if (!Number.isFinite(value)) {
        return;
    }

    let celsius;

    switch (source.name) {
        case "celsius":
            celsius = value;
            break;

        case "fahrenheit":
            celsius = (value - 32) * 5 / 9;
            break;

        case "kelvin":
            celsius = value - 273.15;
            break;

        default:
            return;
    }

    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    // User jis field ko edit kar raha hai,
    // uski original value ko change mat karo.
    if (source !== celsiusEl) {
        celsiusEl.value = formatTemperature(celsius);
    }

    if (source !== fahrenheitEl) {
        fahrenheitEl.value = formatTemperature(fahrenheit);
    }

    if (source !== kelvinEl) {
        kelvinEl.value = formatTemperature(kelvin);
    }
}

inputs.forEach(input => {
    input.addEventListener("input", computeTemp);
});

resetBtn.addEventListener("click", () => {
    inputs.forEach(input => {
        input.value = "";
    });

    celsiusEl.focus();
});
