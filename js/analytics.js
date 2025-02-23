document.addEventListener("DOMContentLoaded", () => {
    console.log("Pagina Analize încărcată.");

    // Funcție comună pentru a seta tema pe toate paginile
    function applyTheme(theme) {
        if (theme === "light") {
            document.body.style.background = "linear-gradient(135deg, #ffffff, #f3f4f6)";
            document.body.style.color = "#1e293b";
            // Ajustăm culorile card-urilor și textului pentru tema luminoasă
            document.querySelectorAll(".card").forEach(card => {
                card.style.background = "#ffffff";
                card.style.borderColor = "#d1d5db";
                card.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
            });
            document.querySelectorAll(".text-gray-300").forEach(el => {
                el.style.color = "#374151";
            });
            document.querySelectorAll(".text-white").forEach(el => {
                el.style.color = "#1e293b";
            });
            document.querySelectorAll(".btn-neon").forEach(btn => {
                btn.style.background = "linear-gradient(45deg, #3b82f6, #9333ea)";
                btn.style.boxShadow = "0 0 10px rgba(59, 130, 246, 0.5)";
            });
        } else {
            document.body.style.background = "linear-gradient(135deg, #1e293b, #0f172a)";
            document.body.style.color = "#e2e8f0";
            // Resetează culorile card-urilor și textului pentru tema întunecată
            document.querySelectorAll(".card").forEach(card => {
                card.style.background = "rgba(30, 41, 59, 0.9)";
                card.style.borderColor = "rgba(255, 255, 255, 0.1)";
                card.style.boxShadow = "0 0 15px rgba(59, 130, 246, 0.2)";
            });
            document.querySelectorAll(".text-gray-300").forEach(el => {
                el.style.color = "#a0aeca";
            });
            document.querySelectorAll(".text-white").forEach(el => {
                el.style.color = "#ffffff";
            });
            document.querySelectorAll(".btn-neon").forEach(btn => {
                btn.style.background = "linear-gradient(45deg, #3b82f6, #9333ea)";
                btn.style.boxShadow = "0 0 10px rgba(59, 130, 246, 0.5)";
            });
        }
    }

    // Obținem tema din localStorage la încărcare
    const userSettings = JSON.parse(localStorage.getItem("userSettings")) || { appTheme: "dark" };
    applyTheme(userSettings.appTheme);

    // Obținem clienții din localStorage
    const clients = getClients();
    const activeClients = clients.filter(c => c.status === "Activ").length;
    const inactiveClients = clients.filter(c => c.status === "Inactiv").length;

    // Configurăm graficul
    const ctx = document.getElementById("clientsChart").getContext("2d");
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
});
