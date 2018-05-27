package com.zc.controller.order;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 订单管理
 * @author zhoushanbin
 * @date 2018年5月26日
 */
@Controller
@RequestMapping("orders")
public class OrderController {

	@RequestMapping("add.do")
	public String addOrder(){
		return "orders/add";
	}
	
	
	@RequestMapping("query.do")
	public String queryOrder(){
		return "orders/query";
	}
}
