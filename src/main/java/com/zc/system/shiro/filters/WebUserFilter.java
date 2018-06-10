package com.zc.system.shiro.filters;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.web.filter.PathMatchingFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zc.dto.WebUserVO;


/**
 * 用户过滤器
*/
public class WebUserFilter  extends PathMatchingFilter{
	
	private static final Logger LOG = LoggerFactory.getLogger(WebUserFilter.class);
	
	@Override
	protected boolean preHandle(ServletRequest request, ServletResponse response)
			throws Exception {
		LOG.info("进入WebUserFilter方法preHandle");
		
		String username = (String)SecurityUtils.getSubject().getPrincipal();
		//todo 将用户绑定到SESSION会话
		WebUserVO user = new WebUserVO();
		user.setUserId("1");
		user.setUserName(username);
		user.setEnable(true);
		user.setLock(false);
		((HttpServletRequest)request).getSession().setAttribute("user.session.key", user);
		return true;
	}
	
	
	
	
}
