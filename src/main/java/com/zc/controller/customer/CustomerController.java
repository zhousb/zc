package com.zc.controller.customer;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.zc.common.web.model.ResponseData;
import com.zc.controller.customer.model.CustomerReqVO;
import com.zc.controller.model.WebPage;

/**
 * 客户管理
 * @author zhoushanbin
 * @date 2018年5月26日
 */
@Controller
@RequestMapping("customers")
public class CustomerController {
	
	private static final Logger LOG = LoggerFactory.getLogger(CustomerController.class);
	/**
	 * @return
	 */
	@RequestMapping("addIndex.do")
	public String addCustomerIndex(){
		
		return "customers/addIndex";
	}
	
	@ResponseBody
	@RequestMapping("addCustomer.do")
	public ResponseData<String> addCustomer(HttpServletRequest req,HttpServletResponse resp,CustomerReqVO customer){
		ResponseData<String> respData = new ResponseData<String>(ResponseData.AJAX_STATUS_SUCCESS, "添加成功！");
		LOG.info(">>>>>>>>>customer={}>>>>>>>>>>>>>>>>",JSON.toJSONString(customer));
		
		return respData;
	}
	
	@RequestMapping("queryIndex.do")
	public String queryCustomerIndex(){
		
		return "customers/queryIndex";
	}
	@ResponseBody
	@RequestMapping("queryCustomer.do")
	public ResponseData<WebPage> queryCustomer(String userName,String identityCard,String phone){
		ResponseData<WebPage> resp = new ResponseData<WebPage>(ResponseData.AJAX_STATUS_SUCCESS,"获取成功");
		WebPage page = new WebPage();
		resp.setData(page);
		CustomerReqVO customer = new CustomerReqVO();
		customer.setAddress("深圳布吉");
		customer.setAnnualIncome("35");
		customer.setCompany("VIVO");
		customer.setCustomerSource("官网");
		customer.setDesc("没出过国");
		customer.setEmail("416964066@qq.com");
		customer.setIdentityCard("450521199009126173");
		customer.setMarriage("已婚");
		customer.setPhone("15067137047");
		customer.setProfession("IT");
		customer.setSex("男");
		customer.setUserName("周善彬");
		customer.setWechat("一座城池");
		List<CustomerReqVO> list = new ArrayList<CustomerReqVO>();
		list.add(customer);
		page.setRows(list);
		page.setTotal(1);
		return resp;
	}
}
