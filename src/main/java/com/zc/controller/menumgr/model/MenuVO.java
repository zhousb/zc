package com.zc.controller.menumgr.model;

import java.io.Serializable;
import java.util.List;


/**
 * 菜单VO
 * @author zhoushanbin
 * @date 2018年5月27日
 */
public class MenuVO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -89768841808948080L;
	
	private String menuId;
	
	private String menuName;
	
	private String parentMenuId;
	
	private Long orderNum;
	
	private boolean enable;
	
	private String menuUrl = "none";
	
	private String iconClass;
	
	private String desc;
	
	private List<MenuVO> subMenu;

	public String getMenuId() {
		return menuId;
	}

	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public String getParentMenuId() {
		return parentMenuId;
	}

	public void setParentMenuId(String parentMenuId) {
		this.parentMenuId = parentMenuId;
	}

	public Long getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(Long orderNum) {
		this.orderNum = orderNum;
	}

	public boolean isEnable() {
		return enable;
	}

	public void setEnable(boolean enable) {
		this.enable = enable;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getMenuUrl() {
		return menuUrl;
	}

	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl;
	}

	public List<MenuVO> getSubMenu() {
		return subMenu;
	}

	public void setSubMenu(List<MenuVO> subMenu) {
		this.subMenu = subMenu;
	}

	public String getIconClass() {
		return iconClass;
	}

	public void setIconClass(String iconClass) {
		this.iconClass = iconClass;
	}
	
	
	
}
