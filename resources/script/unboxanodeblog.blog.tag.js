var tag = window.location.pathname.replace('/blog/tag/','');
    console.log(tag);
$.ajax({
    beforeSend: function(request) {
        request.setRequestHeader('X-Api-Key', api_key);
    },
    url: api_url+'/posts'
}).then(function(data) {
	if (data.response.code === 200){
		posts = data.resource;
	}
	listPosts(posts, tag);
});