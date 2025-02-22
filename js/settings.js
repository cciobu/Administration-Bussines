document.addEventListener("DOMContentLoaded", () => {
    console.log("Pagina Setări încărcată.");

    // Gestionare meniu hamburger pe mobil și tablete
    const hamburger = document.createElement("div");
    hamburger.className = "hamburger";
    hamburger.innerHTML = "☰"; // Simbol hamburger
    document.querySelector(".flex").insertBefore(hamburger, document.querySelector(".main-content"));

    hamburger.addEventListener("click", () => {
        const sidebar = document.querySelector(".sidebar");
        const mainContent = document.querySelector(".main-content");
        sidebar.classList.toggle("active");
        mainContent.classList.toggle("active");
    });

    // Ajustăm comportamentul pe tablete pentru a preveni suprapunerea
    const handleResize = () => {
        const width = window.innerWidth;
        const sidebar = document.querySelector(".sidebar");
        const mainContent = document.querySelector(".main-content");

        if (width <= 767) {
            sidebar.classList.remove("active");
            mainContent.classList.remove("active");
            sidebar.style.transform = "translateX(-100%)";
            mainContent.style.marginLeft = "0";
        } else if (width <= 1024) {
            sidebar.classList.remove("active");
            mainContent.classList.remove("active");
            sidebar.style.transform = "none";
            mainContent.style.marginLeft = "16rem";
        } else {
            sidebar.classList.remove("active");
            mainContent.classList.remove("active");
            sidebar.style.transform = "none";
            mainContent.style.marginLeft = "20rem";
        }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Aplica inițial
});
