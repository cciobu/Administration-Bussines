document.addEventListener("DOMContentLoaded", () => {
    console.log("Pagina Analize încărcată.");

    // Obținem clienții din localStorage
    const clients = getClients();
    const activeClients = clients.filter(c => c.status === "Activ").length;
    const inactiveClients = clients.filter(c => c.status === "Inactiv").length;

    // Configurăm graficul
    const ctx = document.getElementById("clientsChart").getContext("2d");
    const canvas = document.getElementById("clientsChart");
    canvas.width = 300;
    canvas.height = 300;
    canvas.style.width = "300px";
    canvas.style.height = "300px";

    const clientsChart = new Chart(ctx, {
        type: "pie", // Tipul graficului
        data: {
            labels: ["Clienți Activi", "Clienți Inactivi"],
            datasets: [{
                data: [activeClients, inactiveClients],
                backgroundColor: ["#10b981", "#ef4444"], // Culori din design-ul tău: verde pentru activ, roșu pentru inactiv
                borderColor: ["#1e293b", "#1e293b"], // Bordură gri închis
                borderWidth: 2
            }]
        },
        options: {
            responsive: false, // Dezactivăm complet responsivitatea
            maintainAspectRatio: false, // Dezactivăm raportul de aspect automat
            aspectRatio: 1, // Menținem un raport 1:1 (patrat)
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "#a0aeca", // Text gri deschis, conform site-ului
                        font: {
                            size: 12 // Font mai mic
                        }
                    }
                },
                title: {
                    display: true,
                    text: "Distribuția Clienților",
                    color: "#e2e8f0",
                    font: {
                        size: 16
                    }
                }
            },
            layout: {
                padding: 0 // Eliminăm orice padding suplimentar
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
