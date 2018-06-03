package com.zc.controller.model;

import java.io.Serializable;
import java.util.List;


/**
 * @author zhoushanbin
 * @date 2018年6月2日
 */
public class WebPage implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7394186158680185556L;

	//返回的列数据
	private List<?> rows;
	//符合条件的数据总量
	private long total;
	
	
	public List<?> getRows() {
		return rows;
	}


	public void setRows(List<?> rows) {
		this.rows = rows;
	}


	public long getTotal() {
		return total;
	}


	public void setTotal(long total) {
		this.total = total;
	}
	
}
