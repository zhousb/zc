package com.zc.controller.settlement;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 结算
 * @author zhoushanbin
 * @date 2018年5月27日
 */
@Controller
@RequestMapping("settlement")
public class SettlementController {
	
	@RequestMapping("queryStaffSettlement.do")
	public String queryStaff(){
		return "settlement/queryStaffSettlement";
	}
	
	
}
