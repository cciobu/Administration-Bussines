document.addEventListener("DOMContentLoaded", () => {
    console.log("Pagina Setări încărcată.");

    // Obținem datele existente din localStorage sau setăm valori implicite
    let userSettings = JSON.parse(localStorage.getItem("userSettings")) || {
        adminName: "Admin Default",
        adminEmail: "admin@example.com",
        adminPassword: "",
        appLanguage: "ro",
        appTheme: "dark"
    };

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
        
        // Aplicăm tema (exemplu simplu)
        if (userSettings.appTheme === "light") {
            document.body.style.background = "linear-gradient(135deg, #ffffff, #f3f4f6)";
            document.body.style.color = "#1e293b";
        } else {
            document.body.style.background = "linear-gradient(135deg, #1e293b, #0f172a)";
            document.body.style.color = "#e2e8f0";
        }
    });
});
