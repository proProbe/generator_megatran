$('.grid').masonry({
	itemSelector: '.grid-item',
	columnWidth: 200
});
$(function(){
	$('.grid').masonry({
			// options
			itemSelector : '.grid-item',
			columnWidth: function( containerWidth ) {
				return containerWidth / 5;
			}
		});
});
// var $container = $('.grid');
// $container.imagesLoaded(function(){
// 	$container.masonry({
// 		itemSelector : '.grid-item',
// 		columnWidth : 240
// 	});
// });