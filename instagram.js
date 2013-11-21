// Instagram.js
// By Joe Verderber

var instagram = {
	client_id : "", //Add your client ID here
	uri: "",  // Add your return URI here
	scope: "likes+comments",  
	last_tag : "",
	token: "",
	max_id: 0,
	
	// instagram.login 
	// Returns login url
	login: function() {
		return "https://api.instagram.com/oauth/authorize/" + "?client_id=" + instagram.client_id + "&" + "redirect_uri=" + instagram.uri + "&" + "response_type=token&scope=" + instagram.scope;
	},
	
	// instagram.changeTag()
	// Use this to set the tag for your search
	changeTag: function(tag) {
		if(tag != instagram.last_tag)
		{
			instagram.last_tag = tag;
			instagram.max_id = 0;
			return true;
		} else
			return false;
	},
	
	// instagram.randomTag
	// returns a random tag from the list included
	randomTag: function() {
		
		var tags = "#love #instagood #me #cute #follow #photooftheday #like #tbt #girl #followme #picoftheday #beautiful #tagsforlikes #instadaily #happy #mylikes #summer #instamood #bestoftheday #fun #smile #food #instalike #mylikes #fashion #all_shots #swag #webstagram #iphoneonly #friends #like4like #l4l #tflers #eyes #nfl #mlp #mlb #nba".split(" ");
		var r = Math.floor((Math.random()*tags.length));
		return tags[r];
	},
	
	// instagram.recent(function(r) {})
	// (async) returns most recent imgs associated with last tag set in changeTag
	recent: function(pass) 
	{	
		if(instagram.token.length > 0) {
			var myUrl = "https://api.instagram.com/v1/tags/" + instagram.last_tag + "/media/recent?access_token=" + instagram.token;
			if(instagram.max_id != 0)
				myUrl += "&max_tag_id=" + instagram.max_id;
			else
				myUrl = "https://api.instagram.com/v1/tags/" + instagram.last_tag + "/media/recent?access_token=" + instagram.token;
			$.ajax({
				url: myUrl,
				type: "GET",
				dataType: "jsonp",
				cache: false,
				success: function(r) {
					instagram.max_id = r.pagination.next_max_tag_id;
					pass(r);	
				},
				error: function(err) {
					alert(err.message);
				}
			});
		}
		else
			alert("Cannot call instagram.recent() without setting a token!");
	},
	
	// Instagram.like('', function() {});
	// Like only works when like.php is set up correctly
	like: function(MID, pass, fail) {
		if(testing == false) 
			$.ajax({
				url: "like.php?mid=" + MID + "&access_token=" + instagram.token,
				type: "GET",
				dataType: "text",
				success: function (result) {
					if(result == "200") 
						pass();
					else 
						fail();
				},
				error: function (result) {fail();}
					
			});
		else
			pass();
	}, 
	
	// instagram.mediaCount(function(r){});
	// returns total media associated with last tag
	mediaCount: function (pass) 
	{
		$.ajax({
			url: "https://api.instagram.com/v1/tags/"+ instagram.last_tag + "?access_token=" + instagram.token,
			type: "GET",
			dataType: "jsonp",
			cache: false,
			success: function (result) {
				if(result.meta.code == "200") 
					pass(result);
				else 
					alert("An error occured calling instagram.mediaCount() : " + result.meta.code);
			}
		});		
	},
	
	// instagram.tagSearch
	// returns similar tags and media counts
	tagSearch: function (pass) 
	{
		$.ajax({
			url: "https://api.instagram.com/v1/tags/search?q="+ instagram.last_tag + "&access_token=" + instagram.token,
			type: "GET",
			dataType: "jsonp",
			cache: false,
			success: function (result) {
				if(result.meta.code == "200") 
					pass(result);
				else 
					alert("An error occured calling instagram.mediaCount() : " + result.meta.code);
			}
		});		
	},
	
	// Returns a specific media object from instagram
	media: function(id, pass) {
		$.ajax({
			url: "https://api.instagram.com/v1/media/" + id + "?access_token=" + instagram.token,
			type: "GET",
			dataType: "jsonp",
			cache: false,
			success: function (result) {
				if(result.meta.code == "200") 
					pass(result);
				else 
					alert("An error occured calling instagram.media(" + id + ") : " + result.meta.code);
			}
		});			
	}
};