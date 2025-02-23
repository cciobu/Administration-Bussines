document.addEventListener("DOMContentLoaded", () => {
    console.log("Pagina Clienți încărcată.");

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

    // Logica existentă pentru pagina Clienți...
    const clients = getClients();
    const tableBody = document.querySelector("#clients-table tbody");
    clients.forEach((client, index) => {
        const row = document.createElement("tr");
        row.className = "table-row";
        row.innerHTML = `
            <td class="p-4 border-b border-gray-700">${client.name}</td>
            <td class="p-4 border-b border-gray-700">${client.email}</td>
            <td class="p-4 border-b border-gray-700">${client.phone || 'N/A'}</td>
            <td class="p-4 border-b border-gray-700"><span class="status-${client.status.toLowerCase()}">${client.status}</span></td>
            <td class="p-4 border-b border-gray-700"><a href="client-details.html?id=${index}" class="text-blue-400 hover:text-blue-500">Detalii</a></td>
        `;
        tableBody.appendChild(row);
    });

    // Paginare (logica existentă rămâne neschimbată)
    let currentPage = 1;
    const rowsPerPage = 5;
    const rows = tableBody.getElementsByTagName("tr");
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    function displayRows(page) {
        for (let i = 0; i < rows.length; i++) {
            rows[i].style.display = "none";
        }
        for (let i = (page - 1) * rowsPerPage; i < page * rowsPerPage && i < rows.length; i++) {
            rows[i].style.display = "table-row";
        }
    }

    displayRows(currentPage);

    const pageButtons = document.querySelector(".pagination");
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.className = `page-btn ${i === currentPage ? "active" : ""}`;
        button.addEventListener("click", () => {
            currentPage = i;
            displayRows(currentPage);
            pageButtons.querySelectorAll(".page-btn").forEach(btn => btn.className = "page-btn");
            button.className = "page-btn active";
        });
        pageButtons.appendChild(button);
    }
});
