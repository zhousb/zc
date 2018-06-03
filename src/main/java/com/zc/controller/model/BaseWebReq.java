package com.zc.controller.model;

import java.io.Serializable;

import com.zc.common.exception.SystemException;


/**
 * @author zhoushanbin
 * @date 2018年6月2日
 */
public class BaseWebReq implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8121098880562270556L;
	//排序
	private String order;
	//偏移量
	private String offset;
	//分页页面大小
	private String limit;
	//收搜
	private String search;
	
	public String getOrder() {
		return order;
	}
	public void setOrder(String order) {
		this.order = order;
	}
	public String getOffset() {
		return offset;
	}
	public void setOffset(String offset) {
		this.offset = offset;
	}
	public String getLimit() {
		return limit;
	}
	public void setLimit(String limit) {
		this.limit = limit;
	}
	
	public int getPageNum(){
		try{
			Integer.parseInt(offset);
			Integer.parseInt(limit);
		}
		catch(NumberFormatException e){
			throw  new SystemException("偏移量="+offset+"和页面大小="+limit+"不合法");
		}
		if(Integer.parseInt(offset)%Integer.parseInt(limit) != 0 || Integer.parseInt(offset) <0 || Integer.parseInt(limit)<0){
			throw  new SystemException("偏移量="+offset+"和页面大小="+limit+"不合法");
		}
		int pageNum = Integer.parseInt(offset)/Integer.parseInt(limit)+1;
		return pageNum;
		
	}
	public String getSearch() {
		return search;
	}
	public void setSearch(String search) {
		this.search = search;
	}

}
