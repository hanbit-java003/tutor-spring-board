$(function() {
	function changeSection(section) {
		$('.board-section').hide();
		$('.board-' + section).show();
		
		history.pushState({}, null, '#' + section);
	}
	
	function setList(rows) {
		$('#board-list > tbody').empty();
		
		for (var i=0; i<rows.length; i++) {
			var row = rows[i];
			
			var rowHtml = '<tr>';
			rowHtml += '<td>' + row.no + '</td>';
			rowHtml += '<td>' + row.title + '</td>';
			rowHtml += '<td>' + row.writer + '</td>';
			rowHtml += '<td>' + row.views + '</td>';
			rowHtml += '</tr>';
			
			$('#board-list > tbody').append(rowHtml);
		}
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













