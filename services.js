

document.addEventListener("DOMContentLoaded", function () {


    const filterBtns = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {

            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            galleryItems.forEach(item => {
                if (filter === "all" || item.getAttribute("data-category") === filter) {
                    item.classList.remove("hidden");
                    item.style.animation = "fadeInGallery 0.4s ease forwards";
                } else {
                    item.classList.add("hidden");
                }
            });
        });
    });

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


    const revealElements = document.querySelectorAll(
        ".srv-card, .pkg-card, .proc-step, .why-card, .review-card, .gallery-item"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
            observer.observe(el);
        });
    }

});
