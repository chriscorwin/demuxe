//function to remove query params form a url
const queryParams = {
	remove: (url, parameter) => {
		const urlparts = url.split('?');   
		if (urlparts.length>=2) {
			const prefix= encodeURIComponent(parameter)+'=';
			const parts= urlparts[1].split(/[&;]/g);

			//reverse iteration as may be destructive
			for (var i= parts.length; i-- > 0;) {    
				//idiom for string.startsWith
				if (parts[i].lastIndexOf(prefix, 0) !== -1) {  
					parts.splice(i, 1);
				}
			}

			return urlparts[0] + (parts.length > 0 ? '?' + parts.join('&') : "");
		} else {
			return url;
		}
	},
	
	add: (key, value) => {
		if (history.pushState) {
			let currentUrl = window.location.href;
			//remove any param for the same key
			currentUrl = queryParams.remove(currentUrl, key);

			//figure out if we need to add the param with a ? or a &
			let queryStart;
			if(currentUrl.indexOf('?') !== -1){
				queryStart = '&';
			} else {
				queryStart = '?';
			}

			const newurl = currentUrl + queryStart + key + '=' + value
			window.history.pushState({path:newurl},'',newurl);
		}
	}
};
