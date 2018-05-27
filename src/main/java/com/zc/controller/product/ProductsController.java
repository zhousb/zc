package com.zc.controller.product;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 商品管理
 * @author zhoushanbin
 * @date 2018年5月27日
 */
@Controller
@RequestMapping("products")
public class ProductsController {

	
	@RequestMapping("query.do")
	public String queryProduct(){
		return "products/query";
	}
	
	@RequestMapping("set.do")
	public String productSet(){
		return "products/set";
	}
	
	@RequestMapping("check.do")
	public String productCheck(){
		return "products/check";
	}
	
	@RequestMapping("onsale.do")
	public String productOnsale(){
		return "products/onsale";
	}
	
	@RequestMapping("offsale.do")
	public String productOffsale(){
		return "products/offsale";
	}
}
