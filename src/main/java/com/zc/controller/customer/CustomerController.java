package com.zc.controller.customer;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.zc.common.utils.DateUtil;
import com.zc.common.web.model.RespCode;
import com.zc.common.web.model.ResponseData;
import com.zc.controller.customer.model.AddCustomerReqVO;
import com.zc.controller.customer.model.QueryCustomerReq;
import com.zc.controller.model.WebPage;
import com.zc.dao.mapper.bo.TCustomer;
import com.zc.service.customer.ICustomerSV;;
/**
 * 客户管理
 * @author zhoushanbin
 * @date 2018年5月26日
 */
@Controller
@RequestMapping("customers")
public class CustomerController {
	
	private static final Logger LOG = LoggerFactory.getLogger(CustomerController.class);
	@Autowired
	private ICustomerSV customerSV;
	/**
	 * @return
	 */
	@RequestMapping("addIndex.do")
	public String addCustomerIndex(){
		
		return "customers/addIndex";
	}
	
	@ResponseBody
	@RequestMapping("addCustomer.do")
	public ResponseData<String> addCustomer(HttpServletRequest req,HttpServletResponse resp,AddCustomerReqVO customer){
		ResponseData<String> respData = new ResponseData<String>();
		LOG.info(">>>>>>>>>customer={}>>>>>>>>>>>>>>>>",JSON.toJSONString(customer));
		try{
			TCustomer record = new TCustomer();
			record.setAddress(customer.getAddress());
			record.setAnnualincome(Integer.parseInt(customer.getAnnualIncome()));
			record.setCompany(customer.getCompany());
			record.setCreateddate(DateUtil.getSysDate()	);
			record.setCustomersource(customer.getCustomerSource());
			record.setNotes(customer.getDesc());
			record.setEmail(customer.getEmail());
			record.setIdentitycard(customer.getIdentityCard());
			record.setMarriage(customer.getMarriage());
			record.setOperuserid(13L);
			record.setPhone(customer.getPhone());
			record.setProfession(customer.getProfession());
			record.setSex(customer.getSex());
			record.setUsername(customer.getUserName());
			record.setWechat(customer.getWechat());
			int status = customerSV.addCustomer(record);
			if(status == 1){
				respData.setStatusCode(RespCode.CustomerRespCode.PHONE_EXISTS.getCode());
				respData.setStatusInfo(RespCode.CustomerRespCode.PHONE_EXISTS.getMsg());
			}
		}
		catch(Exception e){
			LOG.error("addCustomer error!",e);
			respData.setStatusCode(RespCode.CommonRespCode.FAIL.getCode());
			respData.setStatusInfo(RespCode.CommonRespCode.FAIL.getMsg());
		}
		return respData;
	}
	
	@RequestMapping("queryIndex.do")
	public String queryCustomerIndex(){
		
		return "customers/queryIndex";
	}
	@ResponseBody
	@RequestMapping("queryCustomer.do")
	public ResponseData<WebPage> queryCustomer(QueryCustomerReq req){
		ResponseData<WebPage> resp = new ResponseData<WebPage>();
		WebPage page = new WebPage();
		resp.setData(page);
		try{
			List<TCustomer> list = customerSV.queryCustomers(
					req.getUserName(), 
					req.getIdentityCard(), 
					req.getPhone(), 
					Integer.valueOf(req.getOffset()), 
					Integer.valueOf(req.getLimit()).intValue());
			
			page.setRows(list);
			page.setTotal(customerSV.countCustomers());
			return resp;
		}
		catch(Exception e){
			LOG.error("queryCustomer error!",e);
			resp.setStatusCode(RespCode.CommonRespCode.FAIL.getCode());
			resp.setStatusInfo(RespCode.CommonRespCode.FAIL.getMsg());
			return resp;
		}
	}
}
