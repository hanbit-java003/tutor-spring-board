$(function() {
	var currentPage = 1;
	var rowsPerPage = 5;
	var pagesToShow = 2;
	
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
		
		requestPaging();
	}
	
	function requestPaging() {
		$.ajax({
			url: '/total',
			success: function(result) {
				var total = result.total;
				
				setPaging(total);
			}
		});
	}
	
	function setPaging(total) {
		var rowsPerPage = 5;
		var totalPages = total / rowsPerPage
			+ (total % rowsPerPage === 0 ? 0 : 1);
		var firstPage = 1;
		var lastPage = totalPages;
		var startPage = ((currentPage - 1) / pagesToShow)
			* pagesToShow + 1;
		var endPage = Math.min(startPage + pagesToShow - 1, lastPage);
		var prevPage = startPage - 1;
		var nextPage = endPage + 1;
		
		$('.board-list .pagination').empty();
		
		var pagingHtml = '';
		pagingHtml += '<li>';
		pagingHtml += '<a class="board-page"';
		pagingHtml += ' page="' + prevPage + '"';
		pagingHtml += ' href="#" aria-label="Previous">';
		pagingHtml += '<span aria-hidden="true">&laquo;</span>';
		pagingHtml += '</a>';			
		pagingHtml += '</li>';
		
		for (var i=startPage; i<=endPage; i++) {
			pagingHtml += '<li';
			
			if (i === currentPage) {
				pagingHtml += ' class="active"';
			}
			
			pagingHtml += '><a class="board-page"';
			pagingHtml += ' page="' + i + '"';
			pagingHtml += ' href="#">' + i + '</a></li>';
		}
		
		pagingHtml += '<li>';
		pagingHtml += '<a class="board-page"';
		pagingHtml += ' page="' + nextPage + '"';
		pagingHtml += ' href="#" aria-label="Next">';
		pagingHtml += '<span aria-hidden="true">&raquo;</span>';
		pagingHtml += '</a>';
		pagingHtml += '</li>';
		
		$('.board-list .pagination').html(pagingHtml);
		
		handlePagingEvent();
	}
	
	function handlePagingEvent() {
		$('.board-page').on('click', function(event) {
			event.preventDefault();
			
			var page = $(this).attr('page');
		});
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













