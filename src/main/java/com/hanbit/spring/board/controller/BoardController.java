package com.hanbit.spring.board.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BoardController {

	@RequestMapping("/")
	public void start(HttpServletResponse response) throws IOException {
		response.sendRedirect("/board.html");
	}
	
}
