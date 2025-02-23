document.addEventListener("DOMContentLoaded", () => {
    console.log("Pagina Setări încărcată.");

    // Funcție comună pentru a seta tema pe toate paginile
    function applyTheme(theme) {
        if (theme === "light") {
            document.body.style.background = "linear-gradient(135deg, #ffffff, #f3f4f6)";
            document.body.style.color = "#1e293b";
            // Ajustăm culorile card-urilor și textului pentru tema luminoasă
            document.querySelectorAll(".card").forEach(card => {
                card.style.background = "#ffffff";
                card.style.borderColor = "#d1d5db"; // Bordură gri deschis
                card.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
            });
            document.querySelectorAll(".text-gray-300").forEach(el => {
                el.style.color = "#374151"; // Text gri închis pentru contrast
            });
            document.querySelectorAll(".text-white").forEach(el => {
                el.style.color = "#1e293b"; // Text negru pentru contrast
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
                el.style.color = "#a0aeca"; // Text gri deschis pentru contrast
            });
            document.querySelectorAll(".text-white").forEach(el => {
                el.style.color = "#ffffff"; // Text alb pentru contrast
            });
            document.querySelectorAll(".btn-neon").forEach(btn => {
                btn.style.background = "linear-gradient(45deg, #3b82f6, #9333ea)";
                btn.style.boxShadow = "0 0 10px rgba(59, 130, 246, 0.5)";
            });
        }
    }

    // Obținem datele existente din localStorage sau setăm valori implicite
    let userSettings = JSON.parse(localStorage.getItem("userSettings")) || {
        adminName: "Admin Default",
        adminEmail: "admin@example.com",
        adminPassword: "",
        appLanguage: "ro",
        appTheme: "dark"
    };

    // Aplicăm tema curentă la încărcare
    applyTheme(userSettings.appTheme);

    // Populam câmpurile cu datele existente
    document.getElementById("admin-name").value = userSettings.adminName;
    document.getElementById("admin-email").value = userSettings.adminEmail;
    document.getElementById("app-language").value = userSettings.appLanguage;
    document.getElementById("app-theme").value = userSettings.appTheme;

    // Gestionăm formularul de setări utilizator
    const userSettingsForm = document.getElementById("user-settings-form");
    userSettingsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        userSettings.adminName = document.getElementById("admin-name").value;
        userSettings.adminEmail = document.getElementById("admin-email").value;
        userSettings.adminPassword = document.getElementById("admin-password").value || userSettings.adminPassword; // Păstrăm parola veche dacă nu e modificată
        localStorage.setItem("userSettings", JSON.stringify(userSettings));
        alert("Setările utilizatorului au fost salvate cu succes!");
    });

    // Gestionăm setările aplicației
    const applySettingsBtn = document.getElementById("apply-settings");
    applySettingsBtn.addEventListener("click", () => {
        userSettings.appLanguage = document.getElementById("app-language").value;
        userSettings.appTheme = document.getElementById("app-theme").value;
        localStorage.setItem("userSettings", JSON.stringify(userSettings));
        alert("Setările aplicației au fost aplicate cu succes!");
        applyTheme(userSettings.appTheme); // Aplicăm tema imediat
        // Reîncarcă pagina pentru a aplica tema pe toate elementele
        window.location.reload();
    });
});
