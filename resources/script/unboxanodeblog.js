var urlParams = new URLSearchParams(window.location.search),
	qelm = urlParams.get('l'),
	qmsg = urlParams.get('m');
var idPage = $('body').attr('id');
//?post=1234&action=edit
//console.log(urlParams.has('post')); // true
//console.log(urlParams.get('action')); // "edit"
//console.log(urlParams.getAll('action')); // ["edit"]
//console.log(urlParams.toString()); // "?post=1234&action=edit"
//console.log(urlParams.append('active', '1')); // "?post=1234&action=edit&active=1"

$(function(){
	$('.unbox-nav li.'+idPage).addClass('active');
	$('#btnSubmit').on('click',function(event){
		$(this).find('.fa-loading').show();
		return true;
	});
	if (qmsg === 'failed') {
		$('#'+qelm+' .form-result.failure, #'+qelm+' form').show();
		$('#'+qelm+' #btnSubmit .fa-loading').hide();
	}
	$('.blink-social').on('click', function(event){
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $('html').height()
		}, 250);
		var time = 250;
		$('.unbox-footer-widget .unbox-social li').each(function(index, value) {
			var _this = $(this);
		    setTimeout(function() {
		        _this.addClass('blink');
		    }, time);
			setTimeout(function() {
			    _this.removeClass('blink');
			}, (time * 1.5) );
		    time += 250;
		});
	});
	$('#cookieWarning').on('shown.bs.modal', function () {
		$('#cookieWarning .btn').trigger('focus');
	}).on('hidden.bs.modal', function () {
		setCookie('cookies','accepted',30);
	});
	if (getCookie('cookies') !== 'accepted'){
		$('#cookieWarning').modal('show').addClass('show');
	}
});
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}