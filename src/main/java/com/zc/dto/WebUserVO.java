package com.zc.dto;

import java.io.Serializable;
import java.sql.Timestamp;

public class WebUserVO implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -5852176500412714151L;

	private String userId;
	
	private String userName;
	
	private String password;
	
	private boolean enable;
	
	private boolean lock;
	
	private Timestamp lockTime;
	
	private Timestamp activeTime;
	
	private Timestamp inactiveTime;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isEnable() {
		return enable;
	}

	public void setEnable(boolean enable) {
		this.enable = enable;
	}

	public Timestamp getActiveTime() {
		return activeTime;
	}

	public void setActiveTime(Timestamp activeTime) {
		this.activeTime = activeTime;
	}

	public Timestamp getInactiveTime() {
		return inactiveTime;
	}

	public void setInactiveTime(Timestamp inactiveTime) {
		this.inactiveTime = inactiveTime;
	}

	public boolean isLock() {
		return lock;
	}

	public void setLock(boolean lock) {
		this.lock = lock;
	}

	public Timestamp getLockTime() {
		return lockTime;
	}

	public void setLockTime(Timestamp lockTime) {
		this.lockTime = lockTime;
	}

	
	
	
	
}
