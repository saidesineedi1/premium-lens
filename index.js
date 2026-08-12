
(function () {
    const isLight = localStorage.getItem("theme") === "light";
    if (isLight) {
        document.body.classList.add("light-mode");
    }
    if (localStorage.getItem("direction") === "rtl") {
        document.body.classList.add("rtl");
        document.documentElement.dir = "rtl";
    }
})();

const themeBtn = document.getElementById("themeBtn");

function updateThemeIcon(isLight) {
    if (!themeBtn) return;
    themeBtn.innerHTML = isLight ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
    if (window.lucide) {
        lucide.createIcons();
    }
}

if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("light-mode");
        const isLight = document.body.classList.contains("light-mode");
        updateThemeIcon(isLight);
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });
}

const rtlBtn = document.getElementById("rtlBtn");

if (rtlBtn) {
    rtlBtn.addEventListener("click", function () {
        document.body.classList.toggle("rtl");

        if (document.body.classList.contains("rtl")) {
            rtlBtn.innerHTML = "LTR";
            document.documentElement.dir = "rtl";
            localStorage.setItem("direction", "rtl");
        } else {
            rtlBtn.innerHTML = "RTL";
            document.documentElement.dir = "ltr";
            localStorage.setItem("direction", "ltr");
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const isLight = localStorage.getItem("theme") === "light";
    updateThemeIcon(isLight);

    if (localStorage.getItem("direction") === "rtl" && rtlBtn) {
        rtlBtn.innerHTML = "LTR";
    }

    if (window.lucide) {
        lucide.createIcons();
    }

    setTimeout(() => {
        document.body.classList.add("theme-initialized");
    }, 100);

    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        if (question) {
            question.addEventListener("click", () => {
                const isOpen = item.classList.contains("active");
                faqItems.forEach(i => i.classList.remove("active"));
                if (!isOpen) {
                    item.classList.add("active");
                }
            });
        }
    });
});