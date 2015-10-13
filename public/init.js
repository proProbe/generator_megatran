$('.grid').imagesLoaded(function() {
	$('.grid').masonry({
		columnWidth: 310,
		itemSelector: '.grid-item'
	});
	// $('.grid').masonry('reloadItems');
});
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