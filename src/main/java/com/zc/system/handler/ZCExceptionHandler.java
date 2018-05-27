package com.zc.system.handler;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zc.common.exception.SystemException;
import com.zc.common.web.model.ResponseData;



@ControllerAdvice
public class ZCExceptionHandler {
	
	@ExceptionHandler(SystemException.class)
	@ResponseBody
	public ResponseData<?> operateExp(SystemException ex,
			HttpServletRequest request) {
		if (isAjaxRequest(request)) {
			return new ResponseData<>(ResponseData.AJAX_STATUS_FAILURE,
					ex.getMessage());
		}
		throw ex;
	}

	private static boolean isAjaxRequest(HttpServletRequest request) {
		String requestType = request.getHeader("X-Requested-With");
		if ("XMLHttpRequest".equals(requestType)) {
			return true;
		}
		return false;
	}
}
