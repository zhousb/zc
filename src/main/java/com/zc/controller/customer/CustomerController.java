package com.zc.controller.customer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 客户管理
 * @author zhoushanbin
 * @date 2018年5月27日
 */
@Controller
@RequestMapping("customers")
public class CustomerController {
	
	/**
	 * @return
	 */
	@RequestMapping("add.do")
	public String addCustomer(){
		
		return "customers/add";
	}
	@RequestMapping("query.do")
	public String queryCustomer(){
		
		return "customers/query";
	}
	@RequestMapping("test.do")
	public String test(){
		
		return "customers/query";
	}
}
