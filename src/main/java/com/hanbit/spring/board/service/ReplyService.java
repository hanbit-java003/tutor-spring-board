package com.hanbit.spring.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hanbit.spring.board.dao.ReplyDAO;
import com.hanbit.spring.board.vo.ReplyVO;

@Service
public class ReplyService {

	@Autowired
	private ReplyDAO replyDAO;
	
	public List<ReplyVO> getReplyList(int no) {
		return replyDAO.selectReplies(no);
	}
	
}
