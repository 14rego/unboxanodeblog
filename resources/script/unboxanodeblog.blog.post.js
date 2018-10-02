var postID = parseInt(window.location.pathname.replace('/blog/post/','').split('-')[0], 10) || 0;
    var api_param = '/posts';
    if (postID > 0){
    	api_param += '/'+postID;
    }
$.ajax({
    beforeSend: function(request) {
        request.setRequestHeader('X-Api-Key', api_key);
    },
    url: api_url + api_param,
    success: function (response) {
    	listPosts(response.resource, 'all');
    },
    error: function (xhr, ajaxOptions, thrownError) {
    	listPosts(posts, 'all');
    }
}).then(function(data) {
	var title = $('.unbox-card-heading').hide().html();
	$('h1').html(title);
});