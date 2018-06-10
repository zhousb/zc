package com.zc.service.customer.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zc.common.exception.ZCException;
import com.zc.dao.customer.ICustomerDao;
import com.zc.dao.mapper.bo.TCustomer;
import com.zc.service.customer.ICustomerSV;

@Service
public class CustomerSVImpl implements ICustomerSV{
	
	@Autowired
	private ICustomerDao customerDao;
	
	@Override
	public int addCustomer(TCustomer record) throws ZCException{
		try{
			//查看对应手机号的客户是否存在
			if(null != customerDao.queryTCustomerByPhone(record.getPhone())){
				return 1;
			}
			customerDao.addCustomer(record);
			return 0;
		}
		catch(Exception e){
			throw new ZCException(e);
		}
	}

	@Override
	public List<TCustomer> queryCustomers(String userName, String idCard,
			String phone,Integer offset,int pageSize) throws ZCException {
		try{
			return customerDao.queryCustomers(userName, idCard, phone,offset,pageSize);
		}
		catch(Exception e){
			throw new ZCException(e);
		}
	}

	@Override
	public long countCustomers() throws ZCException {
		try{
			return customerDao.count();
		}
		catch(Exception e){
			throw new ZCException(e);
		}
	}

}
