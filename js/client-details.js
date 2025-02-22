document.addEventListener("DOMContentLoaded", () => {
    console.log("Pagina Detalii Client încărcată.");

    // Obținem clientul din URL (presupunem că ID-ul clientului vine ca parametru)
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get("id");
    let clients = getClients();
    let client = clients.find(c => clients.indexOf(c) === parseInt(clientId));

    if (client) {
        document.getElementById("client-name").textContent = client.name;
        document.getElementById("client-email").textContent = client.email;
        document.getElementById("client-phone").textContent = client.phone || "N/A";
        document.getElementById("client-status").textContent = client.status;

        // Afișăm comenzile clientului (presupunem că există un sistem de comenzi)
        const ordersList = document.getElementById("orders-list");
        // Aici ar trebui să implementăm logica pentru a obține comenzile clientului din localStorage sau un backend
        // Exemplu temporar:
        ordersList.innerHTML = `
            <div class="order-item p-3 bg-gray-900 border border-blue-600 rounded-lg shadow-sm">
                <div class="flex flex-col space-y-2">
                    <h4 class="text-sm font-medium text-white">Comandă #1</h4>
                    <p class="text-xs text-gray-400">Descriere: Produs X</p>
                    <p class="text-xs text-gray-400">Valoare: 100 RON</p>
                    <p class="text-xs text-gray-400">Status: <span class="status-active">Activ</span></p>
                    <img src="https://via.placeholder.com/32" alt="Imagine comandă" class="cursor-pointer">
                </div>
            </div>
        `;
    } else {
        alert("Clientul nu a fost găsit!");
        window.location.href = "clients.html";
    }

    // Gestionare modal pentru adăugare/editare comandă
    const orderModal = document.getElementById("order-modal");
    const orderModalTitle = document.getElementById("order-modal-title");
    const orderForm = document.getElementById("order-form");
    const closeOrderModal = document.getElementById("close-order-modal");
    const orderDescriptionInput = document.getElementById("order-description");
    const orderValueInput = document.getElementById("order-value");
    const orderStatusInput = document.getElementById("order-status");
    let editOrderIndex = null;

    // Presupunem că există un buton pentru a adăuga o comandă (poți adăuga un buton în HTML)
    document.querySelectorAll(".order-item img").forEach(img => {
        img.addEventListener("click", () => {
            // Aici implementăm logica pentru lightbox
            const lightbox = document.getElementById("lightbox");
            const lightboxImage = document.getElementById("lightbox-image");
            lightboxImage.src = img.src;
            lightbox.classList.remove("hidden");
        });
    });

    document.getElementById("close-lightbox").addEventListener("click", () => {
        document.getElementById("lightbox").classList.add("hidden");
    });

    // Exemplu: Buton imaginar pentru adăugare comandă (poți adăuga în HTML)
    const addOrderBtn = document.createElement("button");
    addOrderBtn.textContent = "Adaugă Comandă";
    addOrderBtn.className = "btn-neon text-white px-4 py-1 mt-3 rounded-lg text-sm";
    document.querySelector(".card").appendChild(addOrderBtn);

    addOrderBtn.addEventListener("click", () => {
        orderModalTitle.textContent = "Adaugă Comandă";
        orderForm.reset();
        editOrderIndex = null;
        orderModal.classList.remove("hidden");
    });

    closeOrderModal.addEventListener("click", () => {
        orderModal.classList.add("hidden");
    });

    orderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newOrder = {
            description: orderDescriptionInput.value,
            value: parseFloat(orderValueInput.value),
            status: orderStatusInput.value
        };

        // Presupunem că salvăm comenzile într-un array în localStorage pentru clientul curent
        let clientOrders = JSON.parse(localStorage.getItem(`orders_${clientId}`)) || [];
        if (editOrderIndex === null) {
            clientOrders.push(newOrder);
        } else {
            clientOrders[editOrderIndex] = newOrder;
            editOrderIndex = null;
        }
        localStorage.setItem(`orders_${clientId}`, JSON.stringify(clientOrders));
        renderOrders(clientOrders);
        orderModal.classList.add("hidden");
    });

    function renderOrders(orders) {
        const ordersList = document.getElementById("orders-list");
        ordersList.innerHTML = "";
        orders.forEach((order, index) => {
            const orderItem = document.createElement("div");
            orderItem.className = "order-item p-3 bg-gray-900 border border-blue-600 rounded-lg shadow-sm";
            orderItem.innerHTML = `
                <div class="flex flex-col space-y-2">
                    <h4 class="text-sm font-medium text-white">Comandă #${index + 1}</h4>
                    <p class="text-xs text-gray-400">Descriere: ${order.description}</p>
                    <p class="text-xs text-gray-400">Valoare: ${order.value} RON</p>
                    <p class="text-xs text-gray-400">Status: <span class="status-${order.status.toLowerCase()}">${order.status}</span></p>
                    <img src="https://via.placeholder.com/32" alt="Imagine comandă
