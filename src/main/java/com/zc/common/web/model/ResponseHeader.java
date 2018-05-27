package com.zc.common.web.model;

import java.io.Serializable;

public class ResponseHeader implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3231757219294795203L;
	private boolean isSuccess;
	private String resultCode;
	private String resultMessage;
	private Object info = "";

	public ResponseHeader(boolean isSuccess, String resultCode,
			String resultMessage) {
		this.isSuccess = isSuccess;
		this.resultCode = resultCode;
		this.resultMessage = resultMessage;
	}

	public ResponseHeader(boolean isSuccess, String resultCode,
			String resultMessage, Object info) {
		this.isSuccess = isSuccess;
		this.resultCode = resultCode;
		this.resultMessage = resultMessage;
		this.info = info;
	}

	public ResponseHeader() {
	}

	public String getResultCode() {
		return this.resultCode;
	}

	public void setResultCode(String resultCode) {
		this.resultCode = resultCode;
	}

	public String getResultMessage() {
		return this.resultMessage;
	}

	public void setResultMessage(String resultMessage) {
		this.resultMessage = resultMessage;
	}

	public boolean isSuccess() {
		return this.isSuccess;
	}

	public boolean getIsSuccess() {
		return this.isSuccess;
	}

	public void setIsSuccess(boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

	public void setSuccess(boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

	public Object getInfo() {
		return this.info;
	}

	public void setInfo(Object info) {
		this.info = info;
	}
}
