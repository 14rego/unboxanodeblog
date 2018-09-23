var template = $('.blog-fill').html(),
	posts = [{
        "id": "#TBD",
        "title": "Under Construction",
        "body": "<p>I&rsquo;m in the process of a data migration from my old blog to this fancy new one. Come back soon?</p>",
        "created": "2018-09-10 00:00:00",
        "tags": "data, migration, upgrade",
        "status": "1",
        "modified": "2018-09-10 09:13:01"
    }];
	
$.ajax({
    beforeSend: function(request) {
        request.setRequestHeader('X-Api-Key', api_key);
    },
    url: api_url+'/posts'
}).then(function(data) {
	var fullList = '';
	if (data.response.code === 200){
		posts = data.resource;
	}
	listPosts(posts, 'all');
});