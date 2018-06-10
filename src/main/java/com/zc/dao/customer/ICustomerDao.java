package com.zc.dao.customer;

import java.util.List;

import com.zc.common.exception.ZCException;
import com.zc.dao.mapper.bo.TCustomer;

public interface ICustomerDao {
	void addCustomer(TCustomer record) throws ZCException;
	TCustomer queryTCustomerByPhone(String phone) throws ZCException;
	List<TCustomer> queryCustomers(String userName,String idCard,String phone,Integer offset,int pageSize) throws ZCException;
	long count() throws ZCException;;
}
