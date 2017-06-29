package com.hanbit.spring.board.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hanbit.spring.board.vo.BoardVO;
import com.hanbit.spring.board.vo.PageVO;

@Repository
public class BoardDAO {
	
	@Autowired
	private SqlSession sqlSession;

	public List<BoardVO> selectList(int page) {
		int rowsPerPage = 5;
		int firstIndex = (page - 1) * rowsPerPage;
		
		PageVO pageVO = new PageVO();
		pageVO.setFirstIndex(firstIndex);
		pageVO.setRowsPerPage(rowsPerPage);
		
		return sqlSession.selectList("board.selectList", pageVO);
	}
	
	public int countTotal() {
		return sqlSession.selectOne("board.countTotal");
	}
	
	public BoardVO selectArticle(int no) {
		return sqlSession.selectOne("board.selectArticle", no);
	}
	
	public int updateViews(int no) {
		return sqlSession.update("board.updateViews", no);
	}
	
}








