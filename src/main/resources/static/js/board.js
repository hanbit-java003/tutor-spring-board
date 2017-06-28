$(function() {
	function changeSection(section, init) {
		$('.board-section').hide();
		$('.board-' + section).show();
		
		if (init) {
			history.replaceState({}, null, '#' + section);
		}
		else {
			history.pushState({}, null, '#' + section);
		}
		
		if (section === 'list') {
			requestList();
		}
		else if (section === 'edit') {
			
		}
		else if (section === 'detail') {
			
		}		
	}
	
	function requestList() {
		$.ajax({
			url: '/list',
			success: function(result) {
				setList(result);
			}
		});
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
	
	changeSection('list', true);
});













