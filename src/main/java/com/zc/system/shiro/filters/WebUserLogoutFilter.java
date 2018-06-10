package com.zc.system.shiro.filters;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.shiro.session.SessionException;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.LogoutFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 用户登出过滤器
 */
public class WebUserLogoutFilter extends LogoutFilter{
	
	private static final Logger LOG = LoggerFactory.getLogger(WebUserLogoutFilter.class);
	@Override
	protected boolean preHandle(ServletRequest request, ServletResponse response)
			throws Exception {
		
		Subject subject = getSubject(request, response);
		String redirectUrl = getRedirectUrl(request, response, subject);
			
		 try {
			 beforeLogout();
	         subject.logout();

	     } catch (SessionException e) {
	    	 LOG.error("退出异常",e);
	    }
		issueRedirect(request, response, redirectUrl);
		
		return false;
	}
	
	
	private void beforeLogout(){
		//退出前清理
		//todo
	}
}
