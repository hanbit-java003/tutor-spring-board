$(function() {
	function changeSection(section) {
		$('.board-section').hide();
		$('.board-' + section).show();
		
		history.pushState({}, null, '#' + section);
	}
	
	$(window).on('popstate', function() {
		var section = location.hash.replace('#', '');
		
		changeSection(section);
	});
	
	$('.board-link').on('click', function() {
		var link = $(this).attr('link');
		
		changeSection(link);
	});
	
	changeSection('list');
});