var idPage = $('body').attr('id');
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
///* BLOG POSTS *///
var posts = [{
    "id": "#TBD",
    "title": "Under Construction",
    "body": "<p>I&rsquo;m in the process of a data migration from my old blog to this fancy new one. Come back soon?</p>",
    "created": "2018-09-10 00:00:00",
    "tags": "data, migration, upgrade",
    "status": "1",
    "modified": "2018-09-10 09:13:01"
}];
function listPosts(posts, tag){
	var fullList = '',
		postLimit = 15,
		postCount = 1,
		template = $('.blog-fill').html();
	for (i = (posts.length - 1); i >= 0; i--){
		var postHasTag = false, // set flag for later
			tempHTML = template, // get HTML template
			repUrl = tempHTML.replace('[url]', '/blog/post/'+posts[i].id+'-'+posts[i].title.toLowerCase().replace(/[^0-9a-z-]/g,'-')),
			repTitle = repUrl.replace('[title]', posts[i].title),
			tempDate = new Date(posts[i].created),
			repDate = repTitle.replace('[date]', months[tempDate.getMonth()]+' '+tempDate.getDay()+', '+tempDate.getFullYear()),
			tagArr = posts[i].tags.toString().replace(' ','').split(','),
			tagString = '',
			postText = posts[i].body.replace(/<(?:.|\n)*?>/gm, ''),
			tempIntro;
		if (postText.length > 250) {
			tempIntro = postText.substr(0, 250).trim() + '&hellip;';
		} else {
			tempIntro = postText;
		}
		var repIntro = repDate.replace('[intro]', tempIntro),
			repBody = repIntro.replace('[body]', posts[i].body);
		for (j = 0; j < tagArr.length; j++){
			if (tagArr[j].length > 1) {
				if (tagArr[j].toLowerCase() === tag.toLowerCase() || tag.toLowerCase() == 'all') {
					postHasTag = true;
				}
				tagString += '<a href="/blog/tag/'+tagArr[j]+'" class="badge badge-pill badge-secondary"> '+tagArr[j]+'</a> ';
			}
		}
		var repTags = repBody.replace('[tags]', tagString);
		if (postHasTag == true && postCount <= 15) {
			fullList += repTags;
			postCount++;
		}
	}
	$('.blog-fill').html(fullList);
}