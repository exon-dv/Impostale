const originalXHROpen = XMLHttpRequest.prototype.open;
const originalXHRSend = XMLHttpRequest.prototype.send;
let index = 0;

XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    this._url = url;
    this._method = method;
    return originalXHROpen.apply(this, [method, url, ...rest]);
};

XMLHttpRequest.prototype.send = function(...args) {
    if (this._url && (this._url.includes('api.ecoledirecte') || this._url.includes('apip.ecoledirecte'))) {
        index += 1;
        const uri = new URL(this._url);
        let postParams = null;
        if (args[0] && this._method?.toUpperCase() === 'POST') {
            try {
                postParams = JSON.parse(args[0]);
            } catch(e) {
                postParams = args[0];
            }
        }
        console.log(`Requête ${index} :`, {
            method: this._method,
            pathname: uri.pathname,
            search: uri.search,
            postParams: postParams
        });
        
        this.addEventListener('load', function() {
            let response = this.responseText;
            const json = JSON.parse(response);
			response = json;
            console.log(`Réponse ${index} :`, response);
        });
    }
    return originalXHRSend.apply(this, args);
};
