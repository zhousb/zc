package com.zc.system.handler;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zc.common.exception.ZCException;
import com.zc.common.web.model.RespCode;
import com.zc.common.web.model.ResponseData;



@ControllerAdvice
public class ZCExceptionHandler {
	
	@ExceptionHandler(ZCException.class)
	@ResponseBody
	public ResponseData<?> operateExp(ZCException ex,
			HttpServletRequest request) {
		if (isAjaxRequest(request)) {
			return new ResponseData<>(RespCode.CommonRespCode.FAIL.getCode(),
					RespCode.CommonRespCode.FAIL.getMsg());
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
