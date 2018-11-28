//function to remove query params form a url
const queryParams = {
	remove: (parameter, pushToState=true) => {
		const url = window.location.href;
		const urlparts = url.split('?');

		if (urlparts.length >= 2) {
			const prefix = encodeURIComponent(parameter)+'=';
			const parts = urlparts[1].split(/[&;]/g);

			for (let i = parts.length; i-- > 0;) {    
				if (parts[i].lastIndexOf(prefix, 0) !== -1) {  
					parts.splice(i, 1);
				}
			}

			const newurl = urlparts[0] + (parts.length > 0 ? '?' + parts.join('&') : "");

			if (pushToState) {
				window.history.pushState({path:newurl},'',newurl);
			}
			
			return newurl;
		} else {
			return url;
		}
	},
	
	add: (key, value) => {
		if (history.pushState) {
			let currentUrl = window.location.href;
			//remove any param for the same key
			currentUrl = queryParams.remove(key, false);

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
