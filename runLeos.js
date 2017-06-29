//chrome.storage.local.get(
//	  function(){
//		document.addEventListener( 'DOMContentLoaded', leonow(theLeos), false);
//});

//var changePics = false;

var theLeos = {"leo": [
 {"file": "1.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"},
	{"file": "2.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"},
	{"file": "3.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"},
	{"file": "4.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"},
	{"file": "5.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"},
	{"file": "6.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"},
	{"file": "7.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"},
	{"file": "8.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"},
	{"file": "9.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"},
	{"file": "10.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"},
	{"file": "11.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"},
	{"file": "12.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"},
	{"file": "13.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"},
	{"file": "14.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"},
	{"file": "15.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"},
	{"file": "16.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"},
	{"file": "17.jpg", "Credit": "Leo", "URL": "http://www.leo.org", "type":"0"}
    ]
};

function leonow(theLeos){
//	changePics = true;
	var pagepics=document.getElementsByTagName("img"), i=0, img;
	while (img = pagepics[i++])
	{

			var imgwidth = img.clientWidth;
			var imgheight = img.clientHeight;

					// append old src
					img.setAttribute("leoreplaced", img.src);

					// remove srcsets, forcing browser to the leo - eg, BBC News
					if (img.hasAttribute('srcset')){
						img.removeAttribute('srcset');
					};
					// remove source srcsets if children of same parent <picture> element - eg, the Guardian
					if (img.parentElement.nodeName == 'PICTURE'){
						var theparent = img.parentNode;
						for(var child=theparent.firstChild; child!==null; child=child.nextSibling) {
						    if (child.nodeName == "SOURCE"){
							    child.removeAttribute('src');
							    child.removeAttribute('srcset');
						    };
						};

					};
					// knock out lazyloader data URLs so it doesn't overwrite kittens
					if (img.hasAttribute('data-src')){
						img.removeAttribute('data-src');
					};
					if (img.hasAttribute('data-hi-res-src')){
						img.removeAttribute('data-hi-res-src');
					};
					if (img.hasAttribute('data-low-res-src')){
						img.removeAttribute('data-low-res-src');
					};

					var randk = Math.floor(Math.random() * 16) + 1

					img.src = chrome.runtime.getURL('/Leo/'+theLeos.leo[randk].file+'');

					img.width = imgwidth;
					img.height = imgheight;

					if (theLeos.leo[randk].type == 0){
						img.alt = 'Photo by '+theLeos.leo[randk].Credit+' source '+theLeos.leo[randk].URL+'';
					}
					else {
						img.alt = 'Photo by '+theLeos.leo[randk].Credit+'';
					};
	}
};

function undoleonow(){
//	changePics = false;
	var pagepics=document.getElementsByTagName("img"), i=0, img;
	while (img = pagepics[i++])
	{
		if (img.hasAttribute('leoreplaced')){
			img.src = img.getAttribute('leoreplaced');
			img.removeAttribute('leoreplaced');
		};
	};
}

chrome.extension.onMessage.addListener(function (message, sender, callback) {
	if (message.functiontoInvoke == "changePics") {
		leonow(theLeos);
	}
	else {
		undoleonow();
	};
});




// listener for context menu click invoking the above

//chrome.extension.onMessage.addListener(function (message, sender, callback) {
//    if (message.functiontoInvoke == "undoLEO") {
	    // undo function called
//        undoleonow();
//    };
//});
