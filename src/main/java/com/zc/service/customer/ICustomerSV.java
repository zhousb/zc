package com.zc.service.customer;

import java.util.List;

import com.zc.common.exception.ZCException;
import com.zc.dao.mapper.bo.TCustomer;

public interface ICustomerSV {
	
	int addCustomer(TCustomer record) throws ZCException ;
	
	List<TCustomer> queryCustomers(String userName,String idCard,String phone,Integer offset,int pageSize) throws ZCException;
	
	long countCustomers()throws ZCException ;
	
	TCustomer queryTCustomerById(long id) throws ZCException;
	
	void deleteTCustomerById(long id) throws ZCException;
	
	void updateCustomerById(TCustomer customer) throws ZCException;
}
