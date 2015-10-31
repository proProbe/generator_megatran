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
	// console.log(img.parentNode.childNodes[0]);
	$(img).parent().parent().find('p').css({
		'width': img.width + 'px',
		'height': img.height/2 + 'px'
	});
	// $('#paragraph').css("width" ,img.width + 'px');
	// console.log($('#paragraph').parent()[0];
	// img.parentNode.lastChild.style.width = img.width + 'px';
}
// $('.grid').masonry({
// 	itemSelector: '.grid-item',
// 	columnWidth: 200
// });
// $(function(){
// 	$('.grid').masonry({
// 			// options
// 			itemSelector : '.grid-item',
// 			// columnWidth: function( containerWidth ) {
// 			// 	return containerWidth / 5;
// 			// }
// 			columnWidth: 100
// 		});
// });
// var $container = $('.grid');
// $container.imagesLoaded(function(){
// 	$container.masonry({
// 		itemSelector : '.grid-item',
// 		columnWidth : 240
// 	});
// });