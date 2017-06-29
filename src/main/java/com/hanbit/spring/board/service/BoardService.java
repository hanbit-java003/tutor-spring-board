package com.hanbit.spring.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hanbit.spring.board.dao.BoardDAO;
import com.hanbit.spring.board.vo.BoardVO;

@Service
public class BoardService {
	
	@Autowired
	private BoardDAO boardDAO;

	public List<BoardVO> getList(int page) {
		return boardDAO.selectList(page);
	}

	public int getTotalCount() {
		return boardDAO.countTotal();
	}
	
	public BoardVO getArticle(int no) {
		BoardVO boardVO = boardDAO.selectArticle(no);
		
		boardDAO.updateViews(no);
		
		return boardVO; 
	}

	public void addAritcle(BoardVO boardVO) {
		int no = boardDAO.selectNextNo();
		
		boardVO.setNo(no);
		
		boardDAO.insertArticle(boardVO);
	}

	public void removeArticle(int no) {
		boardDAO.deleteArticle(no);
	}
	
}









