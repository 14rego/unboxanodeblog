var api_url = '/api/1.0.0',
	api_key = 'get-your-own',
	urlParams = new URLSearchParams(window.location.search),
	qelm = urlParams.get('l'),
	qmsg = urlParams.get('m'),
	months = ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//console.log(window.location);
//console.log(window.location.search);
//?post=1234&action=edit
//console.log(urlParams.has('post')); // true
//console.log(urlParams.get('action')); // "edit"
//console.log(urlParams.getAll('action')); // ["edit"]
//console.log(urlParams.toString()); // "?post=1234&action=edit"
//console.log(urlParams.append('active', '1')); // "?post=1234&action=edit&active=1"