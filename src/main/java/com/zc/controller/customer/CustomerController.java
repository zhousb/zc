package com.zc.controller.customer;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.zc.common.utils.DateUtil;
import com.zc.common.web.model.RespCode;
import com.zc.common.web.model.ResponseData;
import com.zc.controller.customer.model.CustomerReqVO;
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
	public ResponseData<String> addCustomer(HttpServletRequest req,HttpServletResponse resp,CustomerReqVO customer){
		ResponseData<String> respData = new ResponseData<String>();
		LOG.info(">>>>>>>>>customer={}>>>>>>>>>>>>>>>>",JSON.toJSONString(customer));
		try{
			//参数校验 //TODO
			
			TCustomer record = new TCustomer();
			record.setAddress(StringUtils.isEmpty(customer.getAddress())?"":customer.getAddress().trim());
			record.setAnnualincome(Integer.parseInt(customer.getAnnualIncome()));
			record.setCompany(StringUtils.isEmpty(customer.getCompany())?"":customer.getCompany().trim());
			record.setCreateddate(DateUtil.getSysDate()	);
			record.setCustomersource(StringUtils.isEmpty(customer.getCustomerSource())?"":customer.getCustomerSource().trim());
			record.setNotes(StringUtils.isEmpty(customer.getDesc())?"":customer.getDesc().trim());
			record.setEmail(StringUtils.isEmpty(customer.getEmail())?"":customer.getEmail().trim());
			record.setIdentitycard(StringUtils.isEmpty(customer.getIdentityCard())?"":customer.getIdentityCard().trim());
			record.setMarriage(StringUtils.isEmpty(customer.getMarriage())?"":customer.getMarriage().trim());
			record.setOperuserid(13L);
			record.setPhone(StringUtils.isEmpty(customer.getPhone())?"":customer.getPhone().trim());
			record.setProfession(StringUtils.isEmpty(customer.getProfession())?"":customer.getProfession().trim());
			record.setSex(StringUtils.isEmpty(customer.getSex())?"":customer.getSex().trim());
			record.setUsername(StringUtils.isEmpty(customer.getUserName())?"":customer.getUserName().trim());
			record.setWechat(StringUtils.isEmpty(customer.getWechat())?"":customer.getWechat().trim());
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
	
	@ResponseBody
	@RequestMapping("updateCustomer.do")
	public ResponseData<String> updateCustomer(HttpServletRequest req,HttpServletResponse resp,CustomerReqVO customer){
		ResponseData<String> respData = new ResponseData<String>();
		LOG.info(">>>>>>>>>customer={}>>>>>>>>>>>>>>>>",JSON.toJSONString(customer));
		try{
			//参数校验 //TODO
			TCustomer record = new TCustomer();
			record.setAddress(StringUtils.isEmpty(customer.getAddress())?"":customer.getAddress().trim());
			record.setAnnualincome(Integer.parseInt(customer.getAnnualIncome()));
			record.setCompany(StringUtils.isEmpty(customer.getCompany())?"":customer.getCompany().trim());
			record.setCreateddate(DateUtil.getSysDate()	);
			record.setCustomersource(StringUtils.isEmpty(customer.getCustomerSource())?"":customer.getCustomerSource().trim());
			record.setNotes(StringUtils.isEmpty(customer.getDesc())?"":customer.getDesc().trim());
			record.setEmail(StringUtils.isEmpty(customer.getEmail())?"":customer.getEmail().trim());
			record.setIdentitycard(StringUtils.isEmpty(customer.getIdentityCard())?"":customer.getIdentityCard().trim());
			record.setMarriage(StringUtils.isEmpty(customer.getMarriage())?"":customer.getMarriage().trim());
			record.setOperuserid(13L);
			record.setPhone(StringUtils.isEmpty(customer.getPhone())?"":customer.getPhone().trim());
			record.setProfession(StringUtils.isEmpty(customer.getProfession())?"":customer.getProfession().trim());
			record.setSex(StringUtils.isEmpty(customer.getSex())?"":customer.getSex().trim());
			record.setUsername(StringUtils.isEmpty(customer.getUserName())?"":customer.getUserName().trim());
			record.setWechat(StringUtils.isEmpty(customer.getWechat())?"":customer.getWechat().trim());
			customerSV.updateCustomerById(record);
		}
		catch(Exception e){
			LOG.error("updateCustomer error!",e);
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
	@RequestMapping("queryCustomerById.do")
	public ResponseData<TCustomer> queryCustomerById(String id){
		ResponseData<TCustomer> resp = new ResponseData<TCustomer>();
		try{
			TCustomer customer = customerSV.queryTCustomerById(Long.valueOf(id).longValue());
			if(null!=customer){
				resp.setData(customer);
			}
			else{
				resp.setStatusCode(RespCode.CommonRespCode.FAIL.getCode());
				resp.setStatusInfo(RespCode.CommonRespCode.FAIL.getMsg());
			}
			return resp;
		}
		catch(Exception e){
			LOG.error("queryCustomerById error!",e);
			resp.setStatusCode(RespCode.CommonRespCode.FAIL.getCode());
			resp.setStatusInfo(RespCode.CommonRespCode.FAIL.getMsg());
			return resp;
		}
	}
		
	@ResponseBody
	@RequestMapping("deleteCustomerById.do")
	public ResponseData<String> deleteCustomerById(String id){
		ResponseData<String> resp = new ResponseData<String>();
		try{
			customerSV.deleteTCustomerById(Long.valueOf(id).longValue());
			return resp;
		}
		catch(Exception e){
			LOG.error("deleteCustomerById error!",e);
			resp.setStatusCode(RespCode.CommonRespCode.FAIL.getCode());
			resp.setStatusInfo(RespCode.CommonRespCode.FAIL.getMsg());
			return resp;
		}
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
