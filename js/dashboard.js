document.addEventListener("DOMContentLoaded", () => {
    console.log("Pagina Dashboard încărcată.");

    // Configurăm particulele
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#9333ea" }, // Violet pentru particule
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#9333ea", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "repulse": { "distance": 100, "duration": 0.4 } }
        },
        "retina_detect": true
    });

    // Obținem clienții din localStorage
    const clients = getClients();
    const totalClients = clients.length;
    const activeClients = clients.filter(c => c.status === "Activ").length;
    const inactiveClients = clients.filter(c => c.status === "Inactiv").length;

    // Actualizăm numerele
    document.getElementById("total-clients").textContent = totalClients;
    document.getElementById("active-clients").textContent = activeClients;
    document.getElementById("inactive-clients").textContent = inactiveClients;

    // Configurăm graficul pie chart
    const ctx = document.getElementById("clientsDistributionChart").getContext("2d");
    const clientsChart = new Chart(ctx, {
        type: "pie", // Tipul graficului
        data: {
            labels: ["Clienți Activi", "Clienți Inactivi"],
            datasets: [{
                data: [activeClients, inactiveClients],
                backgroundColor: ["#10b981", "#ef4444"], // Culori conform site-ului: verde pentru activ, roșu pentru inactiv
                borderColor: ["#1e293b", "#1e293b"], // Bordură gri închis
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "#a0aeca", // Text gri deschis, conform site-ului
                        font: {
                            size: 10 // Font foarte mic
                        }
                    }
                },
                title: {
                    display: false // Fără titlu pe grafic, pentru a economisi spațiu
                }
            }
        }
    });

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
