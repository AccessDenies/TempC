
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

const splashScreen = document.getElementById("splashScreen");
const splashImage = document.getElementById("splashImage");
const app = document.getElementById("app");

async function showConverterAfterSplash() {
    try {
        if (splashImage.complete && splashImage.naturalWidth > 0) {
            await splashImage.decode();
        } else {
            await new Promise((resolve, reject) => {
                splashImage.addEventListener("load", resolve, { once: true });
                splashImage.addEventListener("error", reject, { once: true });
            });

            await splashImage.decode();
        }
    } catch (error) {
        console.error("Splash image failed to load:", error);
    }

    // Image load/decode ke baad short display duration
    await new Promise(resolve => setTimeout(resolve, 1200));

    splashScreen.classList.add("is-hidden");
    app.classList.remove("app--hidden");
}

showConverterAfterSplash();
