package com.hanbit.spring.board.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hanbit.spring.board.service.BoardService;
import com.hanbit.spring.board.vo.BoardVO;

@Controller
public class BoardController {
	
	@Autowired
	private BoardService boardService;

	@RequestMapping("/")
	public void start(HttpServletResponse response) throws IOException {
		response.sendRedirect("/board.html");
	}
	
	@RequestMapping("/list")
	@ResponseBody
	public List<BoardVO> list(
			@RequestParam(value="page", defaultValue="1") int page) {
		return boardService.getList(page);
	}
	
	@RequestMapping("/total")
	@ResponseBody
	public Map total() {
		int totalCount = boardService.getTotalCount();
		
		Map result = new HashMap();
		result.put("total", totalCount);
		
		return result;
	}
	
}










