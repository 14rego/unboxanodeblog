var tag = window.location.pathname.replace('/blog/tag/','');
$.ajax({
    beforeSend: function(request) {
        request.setRequestHeader('X-Api-Key', api_key);
    },
    url: api_url+'/posts',
    success: function (response) {
    	listPosts(response.resource, tag);
    },
    error: function (xhr, ajaxOptions, thrownError) {
    	listPosts(posts, 'all');
    }
});