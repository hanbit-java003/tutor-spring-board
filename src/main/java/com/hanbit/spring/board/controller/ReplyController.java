package com.hanbit.spring.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hanbit.spring.board.service.ReplyService;
import com.hanbit.spring.board.vo.ReplyVO;

@RestController
@RequestMapping("/reply")
public class ReplyController {
	
	@Autowired
	private ReplyService replyService;

	@RequestMapping("/list")
	public List<ReplyVO> list(@RequestParam("no") int no) {
		return replyService.getReplyList(no);
	}
	
}






