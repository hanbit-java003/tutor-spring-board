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
	
}
