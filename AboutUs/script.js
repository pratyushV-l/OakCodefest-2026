document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("terminalText");
    const text = el.textContent;
    el.textContent = "";

    let idx = 0;
    let skipping = false;

    // Skip typing on click
    el.addEventListener("click", () => {
        skipping = true;
        el.textContent = text;
    });

    function getDelay(char, nextChars) {
        if (skipping) return 0;
        if (nextChars.startsWith("...")) return 250;
        if (nextChars.trim().startsWith("Done!")) return 180;
        return 20 + Math.random() * 40;
    }

    function type() {
        if (idx < text.length && !skipping) {
            const nextSlice = text.slice(idx, idx + 10); // look ahead for patterns
            el.textContent += text[idx];

            const delay = getDelay(text[idx], nextSlice);

            idx++;
            setTimeout(type, delay);
        }
    }

    type();
});