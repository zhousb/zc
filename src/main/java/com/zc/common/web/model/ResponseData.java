package com.zc.common.web.model;

import java.io.Serializable;

public class ResponseData<T>  implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -921554430050848086L;

	private String statusCode;
	private String statusInfo;
	private T data;

	
	public ResponseData(){
		this.statusCode = RespCode.CommonRespCode.SUCCESS.getCode();
		this.statusInfo= RespCode.CommonRespCode.SUCCESS.getMsg();
	}
	
	public ResponseData(String statusCode, String statusInfo) {
		this.statusCode = statusCode;
		this.statusInfo = statusInfo;
	}

	public ResponseData(String statusCode, String statusInfo, T data) {
		this.statusCode = statusCode;
		this.statusInfo = statusInfo;
		this.data = data;
	}

	public String getStatusCode() {
		return this.statusCode;
	}

	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}

	public String getStatusInfo() {
		return this.statusInfo;
	}

	public void setStatusInfo(String statusInfo) {
		this.statusInfo = statusInfo;
	}

	public T getData() {
		return this.data;
	}

	public void setData(T data) {
		this.data = data;
	}
}
