package com.zc.controller.customer.model;

import com.zc.controller.model.BaseWebReq;

public class QueryCustomerReq extends BaseWebReq{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6616644758637895459L;
	
	private String userName;
	private String identityCard;
	private String phone;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getIdentityCard() {
		return identityCard;
	}
	public void setIdentityCard(String identityCard) {
		this.identityCard = identityCard;
	}
	
}
