$('.grid').imagesLoaded(function() {
	$('.grid').masonry({
		columnWidth: 310,
		itemSelector: '.grid-item'
	});
	$('.grid').masonry('reloadItems');
}).done(function(instance){
	console.log('all pics loaded');
});

lightbox.option({
      'resizeDuration': 400,
      'wrapAround': false,
      'fitImagesInViewport': true
});

function imgOnLoad(img){
	$(img).parent().parent().find('p').css({
		'width': img.width + 'px',
		'height': img.height/2 + 'px'
	});
}
