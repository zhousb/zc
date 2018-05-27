package com.zc.common.web.model;

import java.io.Serializable;

public class BaseResponse implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4543877989181098126L;
	private ResponseHeader responseHeader;

	public ResponseHeader getResponseHeader() {
		return this.responseHeader;
	}

	public void setResponseHeader(ResponseHeader responseHeader) {
		this.responseHeader = responseHeader;
	}
}
