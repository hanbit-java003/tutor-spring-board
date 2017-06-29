$(function() {
	var currentPage = 1;
	var rowsPerPage = 5;
	var pagesToShow = 2;
	
	function changeSection(section, init, data) {
		$('.board-section').hide();
		$('.board-' + section).show();
		
		if (init) {
			history.replaceState({}, null, '#' + section);
		}
		else {
			history.pushState({}, null, '#' + section);
		}
		
		if (section === 'list') {
			requestList(currentPage);
		}
		else if (section === 'edit') {
			
		}
		else if (section === 'detail') {
			var no = data;
			
			requestDetail(no);
		}		
	}
	
	function requestDetail(no) {
		$.ajax({
			url: '/detail',
			data: {
				no: no
			},
			success: function(result) {
				setDetail(result);
			}
		});
	}
	
	function setDetail(article) {
		var title = article.title;
		var writer = article.writer;
		var contents = article.contents;
		
		contents = contents.replace(/\\n/g, '<br>');
		
		$('#detail-title').html(title);
		$('#detail-writer').html(writer);
		$('#detail-contents').html(contents);
	}
	
	function requestList(page) {
		$.ajax({
			url: '/list',
			data: {
				page: page
			},
			success: function(result) {
				currentPage = page;
				$('#board-list > tbody').fadeOut(200, function() {
					setList(result);
				});
			}
		});
	}
	
	function setList(rows) {
		$('#board-list > tbody').empty();
		
		for (var i=0; i<rows.length; i++) {
			var row = rows[i];
			
			var rowHtml = '<tr no="' + row.no + '">';
			rowHtml += '<td>' + row.no + '</td>';
			rowHtml += '<td>' + row.title + '</td>';
			rowHtml += '<td>' + row.writer + '</td>';
			rowHtml += '<td>' + row.views + '</td>';
			rowHtml += '</tr>';
			
			$('#board-list > tbody').append(rowHtml);
		}
		
		$('#board-list > tbody').fadeIn(200);
		
		handleRowEvent();
		requestPaging();
	}
	
	function handleRowEvent() {
		$('#board-list tbody tr').on('click', function() {
			var no = $(this).attr('no');
			
			changeSection('detail', false, no);
		});
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
		var startPage = parseInt((currentPage - 1) / pagesToShow)
			* pagesToShow + 1;
		var endPage = Math.min(startPage + pagesToShow - 1, lastPage);
		var prevPage = startPage - 1;
		var nextPage = endPage + 1;
		
		$('.board-list .pagination').empty();
		
		var pagingHtml = '';
		pagingHtml += '<li';
		
		if (prevPage < firstPage) {
			pagingHtml += ' class="disabled"';
		}
		
		pagingHtml += '>';
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
		
		pagingHtml += '<li';
		
		if (nextPage > lastPage) {
			pagingHtml += ' class="disabled"';
		}
		
		pagingHtml += '>';
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
			
			if ($(this).parent('li').hasClass('disabled')) {
				return;
			}
			
			var page = parseInt($(this).attr('page'));
			
			requestList(page);
		});
	}
	
	$(window).on('popstate', function() {
		var section = location.hash.replace('#', '');
		
		changeSection(section);
	});
	
	$('#board-save').on('click', function() {
		var title = $('#edit-title').val().trim();
		var writer = $('#edit-writer').val().trim();
		var contents = $('#edit-contents').val().trim();
		
		if (!title) {
			alert('제목을 입력하세요.');
			$('#edit-title').val('');
			$('#edit-title').focus();
			return;
		}
		else if (!writer) {
			alert('작성자를 입력하세요.');
			$('#edit-writer').val('');
			$('#edit-writer').focus();
			return;
		}
		else if (!contents) {
			alert('내용을 입력하세요.');
			$('#edit-contents').val('');
			$('#edit-contents').focus();
			return;
		}
		
		requestSave({
			title: title,
			writer: writer,
			contents: contents
		});
	});
	
	function requestSave(params) {
		$.ajax({
			url: '/save',
			data: params,
			success: function(result) {
				
			}
		});
	}
	
	$('.board-link').on('click', function() {
		var link = $(this).attr('link');
		
		changeSection(link);
	});
	
	changeSection('list', true);
});













