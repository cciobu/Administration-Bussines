document.addEventListener("DOMContentLoaded", () => {
    console.log("Pagina Clienți încărcată.");

    // Obținem clienții din localStorage
    let clients = getClients();
    renderClients();

    // Gestionare adăugare/editare client
    const addClientBtn = document.getElementById("add-client-btn");
    const clientModal = document.getElementById("client-modal");
    const clientModalTitle = document.getElementById("client-modal-title");
    const clientForm = document.getElementById("client-form");
    const closeClientModal = document.getElementById("close-client-modal");
    const clientNameInput = document.getElementById("client-name");
    const clientEmailInput = document.getElementById("client-email");
    const clientPhoneInput = document.getElementById("client-phone");
    const clientStatusInput = document.getElementById("client-status");
    let editClientIndex = null;

    addClientBtn.addEventListener("click", () => {
        clientModalTitle.textContent = "Adaugă Client";
        clientForm.reset();
        editClientIndex = null;
        clientModal.classList.remove("hidden");
    });

    closeClientModal.addEventListener("click", () => {
        clientModal.classList.add("hidden");
    });

    clientForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newClient = {
            name: clientNameInput.value,
            email: clientEmailInput.value,
            phone: clientPhoneInput.value || "",
            status: clientStatusInput.value
        };

        if (editClientIndex === null) {
            clients.push(newClient);
        } else {
            clients[editClientIndex] = newClient;
            editClientIndex = null;
        }
        saveClients(clients);
        renderClients();
        clientModal.classList.add("hidden");
    });

    function renderClients() {
        const clientsTable = document.getElementById("clients-table");
        clientsTable.innerHTML = "";
        clients.forEach((client, index) => {
            const row = document.createElement("tr");
            row.className = "table-row";
            row.innerHTML = `
                <td class="py-4 px-4 text-sm text-gray-300">${client.name}</td>
                <td class="py-4 px-4 text-sm text-gray-300">${client.email}</td>
                <td class="py-4 px-4 text-sm text-gray-300">${client.phone || "N/A"}</td>
                <td class="py-4 px-4 text-sm"><span class="status-${client.status.toLowerCase()}">${client.status}</span></td>
                <td class="py-4 px-4 text-sm">
                    <button class="edit-client-btn text-blue-400 hover:text-blue-500 text-xs px-2 py-1 bg-transparent border border-blue-600 rounded-lg" data-index="${index}">Editează</button>
                    <button class="delete-client-btn text-red-400 hover:text-red-500 text-xs px-1 py-0.5 bg-transparent border border-red-600 rounded-lg" data-index="${index}">Șterge</button>
                </td>
            `;
            clientsTable.appendChild(row);

            row.querySelector(".edit-client-btn").addEventListener("click", () => editClient(index));
            row.querySelector(".delete-client-btn").addEventListener("click", () => deleteClient(index));
        });
    }

    function editClient(index) {
        editClientIndex = index;
        const client = clients[index];
        clientNameInput.value = client.name;
        clientEmailInput.value = client.email;
        clientPhoneInput.value = client.phone || "";
        clientStatusInput.value = client.status;
        clientModalTitle.textContent = "Editează Client";
        clientModal.classList.remove("hidden");
    }

    function deleteClient(index) {
        if (confirm("Sigur vrei să ștergi acest client?")) {
            clients.splice(index, 1);
            saveClients(clients);
            renderClients();
        }
    }
});
