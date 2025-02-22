document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");

    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });

        // Închidem sidebar-ul dacă utilizatorul face click în afara lui pe mobil
        document.addEventListener("click", (e) => {
            if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove("open");
            }
        });

        // Închidem sidebar-ul dacă utilizatorul apasă Esc
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && window.innerWidth <= 768 && sidebar.classList.contains("open")) {
                sidebar.classList.remove("open");
            }
        });
    }
});
