package com.zc.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.zc.common.web.model.RespCode;
import com.zc.common.web.model.ResponseData;

@Controller
public class LoginController {
	
		private static final Logger LOG = LoggerFactory.getLogger(LoginController.class);
		
		@RequestMapping(value = {"/","/index.do"})
		public String index(){
			return "customers/addIndex";
		}
		
		@RequestMapping(value = "/user/login.do")
		public ModelAndView loginHome(){
			ModelAndView view = new ModelAndView();
			view.setViewName("/login/login");
			return view;
		}
		
		@RequestMapping(value = "/user/logout.do")
		public ModelAndView logoutHome(){
			ModelAndView view = new ModelAndView();
			view.setViewName("/login/login");
			return view;
		}
		
		
		@ResponseBody
		@RequestMapping(value = "/user/loginAction")
		public ResponseData<String> loginAction(String userName,String password){
			ResponseData<String> resp = new ResponseData<String>();
			try{
				SecurityUtils.getSubject().login(new UsernamePasswordToken(userName,password));
				resp.setStatusCode(RespCode.CommonRespCode.SUCCESS.getCode());
				resp.setStatusInfo("登陆成功");
			}
			catch(Exception e){
				
				resp.setStatusCode(RespCode.CommonRespCode.FAIL.getCode());
				if(e instanceof UnknownAccountException){
					//账号密码有误
					resp.setStatusInfo("登陆失败，账号密码有误");
				}
				else if(e instanceof IncorrectCredentialsException){
					//账号密码有误
					resp.setStatusInfo("登陆失败，账号密码有误");
				}
				else if(e instanceof ExcessiveAttemptsException){
					resp.setStatusInfo("登陆失败，账号密码连续"+5+"次有误");
					//连续失败次数
				}
				else if(e instanceof LockedAccountException){
					resp.setStatusInfo("登陆失败，账号已被锁定");
					//账号已被锁定
				}
				else{
					resp.setStatusInfo("登陆失败，账号密码有误");
				}
				LOG.error("登陆失败",e);
			}
			return resp;
		}
		
}
