
document.addEventListener("DOMContentLoaded", function () {

    if (window.lucide) {
        lucide.createIcons();
    }

    const navLinks = document.querySelectorAll(".sidebar-menu-wrapper .nav-link");
    const sections = document.querySelectorAll(".tab-section");
    const headerTitle = document.querySelector(".header-title h1");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetTab = this.getAttribute("data-tab");
            if (!targetTab) return;

            navLinks.forEach(l => l.classList.remove("active"));
            sections.forEach(s => s.classList.remove("active"));

            this.classList.add("active");
            const activeSection = document.getElementById(targetTab);
            if (activeSection) {
                activeSection.classList.add("active");
            }

            const tabName = this.querySelector(".tab-text")?.innerText;
            if (headerTitle && tabName) {
                const isUser = headerTitle.getAttribute("data-dash-type") === "user";
                headerTitle.innerText = isUser ? `User Dashboard – ${tabName}` : `Admin Dashboard – ${tabName}`;
            }

            const sidebar = document.querySelector(".dashboard-sidebar");
            if (window.innerWidth <= 900 && sidebar) {
                sidebar.classList.remove("open");
            }
        });
    });

    const menuToggleBtn = document.getElementById("menuToggleBtn");
    const sidebar = document.querySelector(".dashboard-sidebar");
    if (menuToggleBtn && sidebar) {
        menuToggleBtn.addEventListener("click", function () {
            sidebar.classList.toggle("open");
        });
    }

    const notifBtn = document.getElementById("notifBtn");
    const notifDropdown = document.getElementById("notifDropdown");
    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            notifDropdown.classList.toggle("show");
        });

        document.addEventListener("click", function () {
            notifDropdown.classList.remove("show");
        });
    }

    const themeBtn = document.getElementById("themeToggleBtn");
    function updateThemeIcon(isLight) {
        if (!themeBtn) return;
        themeBtn.innerHTML = isLight ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
        document.body.classList.add("light-mode");
        updateThemeIcon(true);
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            document.body.classList.toggle("light-mode");
            const isLight = document.body.classList.contains("light-mode");
            localStorage.setItem("theme", isLight ? "light" : "dark");
            updateThemeIcon(isLight);
            renderCharts();
        });
    }

    let revenueChartInstance = null;
    let serviceBarChartInstance = null;
    let userSpendChartInstance = null;
    let userSessionsChartInstance = null;

    function renderCharts() {
        const isLight = document.body.classList.contains("light-mode");
        const gridColor = isLight ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.08)";
        const textColor = isLight ? "#64748B" : "#CBD5E1";

        const revCanvas = document.getElementById("revenueLineChart");
        if (revCanvas) {
            if (revenueChartInstance) revenueChartInstance.destroy();
            const ctx = revCanvas.getContext("2d");

            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, "rgba(212, 175, 55, 0.35)");
            gradient.addColorStop(1, "rgba(212, 175, 55, 0.0)");

            revenueChartInstance = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                        {
                            label: "Revenue 2026 (₹ in Thousands)",
                            data: [180, 240, 310, 290, 420, 560, 680, 750, 842, 910, 1050, 1200],
                            borderColor: "#D4AF37",
                            backgroundColor: gradient,
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: "#D4AF37",
                            pointRadius: 4,
                            pointHoverRadius: 6
                        },
                        {
                            label: "Revenue 2025 (₹ in Thousands)",
                            data: [120, 160, 210, 230, 310, 400, 490, 520, 600, 680, 750, 890],
                            borderColor: "#64748B",
                            borderWidth: 2,
                            borderDash: [5, 5],
                            fill: false,
                            tension: 0.4,
                            pointRadius: 0
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: textColor, font: { family: 'Poppins', size: 12 } }
                        }
                    },
                    scales: {
                        x: {
                            grid: { color: gridColor },
                            ticks: { color: textColor, font: { family: 'Poppins' } }
                        },
                        y: {
                            grid: { color: gridColor },
                            ticks: { color: textColor, font: { family: 'Poppins' } }
                        }
                    }
                }
            });
        }

        const barCanvas = document.getElementById("servicesBarChart");
        if (barCanvas) {
            if (serviceBarChartInstance) serviceBarChartInstance.destroy();
            const ctx = barCanvas.getContext("2d");

            serviceBarChartInstance = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["Wedding", "Pre-Wedding", "Corporate", "Maternity", "Portraits", "Fashion"],
                    datasets: [{
                        label: "Bookings Completed",
                        data: [142, 98, 76, 54, 112, 38],
                        backgroundColor: [
                            "#D4AF37",
                            "#E5C158",
                            "#10B981",
                            "#3B82F6",
                            "#F59E0B",
                            "#8B5CF6"
                        ],
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: { color: textColor, font: { family: 'Poppins' } }
                        },
                        y: {
                            grid: { color: gridColor },
                            ticks: { color: textColor, font: { family: 'Poppins' } }
                        }
                    }
                }
            });
        }

        const userSpendCanvas = document.getElementById("userSpendChart");
        if (userSpendCanvas) {
            if (userSpendChartInstance) userSpendChartInstance.destroy();
            const ctx = userSpendCanvas.getContext("2d");

            userSpendChartInstance = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["Jan", "Mar", "May", "Jul", "Aug", "Oct"],
                    datasets: [{
                        label: "Package Invoiced (₹)",
                        data: [25000, 65000, 45000, 85000, 95000, 35000],
                        borderColor: "#D4AF37",
                        backgroundColor: "rgba(212, 175, 55, 0.15)",
                        borderWidth: 3,
                        fill: true,
                        tension: 0.35,
                        pointBackgroundColor: "#D4AF37",
                        pointRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: textColor, font: { family: 'Poppins' } }
                        }
                    },
                    scales: {
                        x: { grid: { color: gridColor }, ticks: { color: textColor } },
                        y: { grid: { color: gridColor }, ticks: { color: textColor } }
                    }
                }
            });
        }

        const userSessionsCanvas = document.getElementById("userSessionsChart");
        if (userSessionsCanvas) {
            if (userSessionsChartInstance) userSessionsChartInstance.destroy();
            const ctx = userSessionsCanvas.getContext("2d");

            userSessionsChartInstance = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["Weddings", "Portraits", "Pre-Wedding", "Events"],
                    datasets: [{
                        label: "Sessions Booked",
                        data: [2, 4, 1, 3],
                        backgroundColor: "#D4AF37",
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false }, ticks: { color: textColor } },
                        y: { grid: { color: gridColor }, ticks: { color: textColor, stepSize: 1 } }
                    }
                }
            });
        }
    }

    renderCharts();
});
