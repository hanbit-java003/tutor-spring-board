$(function() {
	function changeSection(section) {
		$('.board-section').hide();
		$('.board-' + section).show();
	}
	
	$('.board-link').on('click', function() {
		var link = $(this).attr('link');
		
		changeSection(link);
	});
	
	changeSection('list');
});