package com.zc.dao.customer.impl;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import com.zc.common.exception.ZCException;
import com.zc.dao.customer.ICustomerDao;
import com.zc.dao.mapper.bo.TCustomer;
import com.zc.dao.mapper.bo.TCustomerCriteria;
import com.zc.dao.mapper.factory.MapperFactory;

@Repository
public class CustomerDaoImpl implements ICustomerDao{

	@Override
	public void addCustomer(TCustomer record) throws ZCException {
		try{
			MapperFactory.getTCustomerMapper().insertSelective(record);
		}
		catch(Exception e){
			throw new ZCException(e);
		}
	}

	@Override
	public TCustomer queryTCustomerByPhone(String phone) throws ZCException {
		try{
			TCustomerCriteria example = new TCustomerCriteria();
			example.createCriteria().andPhoneEqualTo(phone);
			List<TCustomer> list = MapperFactory.getTCustomerMapper().selectByExample(example);
			TCustomer cust = CollectionUtils.isEmpty(list) ? null : list.get(0);
			return cust;
		}
		catch(Exception e){
			throw new ZCException(e);
		}
	}

	@Override
	public List<TCustomer> queryCustomers(String userName, String idCard,
			String phone,Integer offset,int pageSize) throws ZCException {
		try{
			TCustomerCriteria example = new TCustomerCriteria();
			TCustomerCriteria.Criteria criteria = example.createCriteria();
			if(!StringUtils.isEmpty(userName)){
				criteria.andUsernameEqualTo(userName);
			}
			if(!StringUtils.isEmpty(idCard)){
				criteria.andIdentitycardEqualTo(idCard);
			}
			if(!StringUtils.isEmpty(phone)){
				criteria.andPhoneEqualTo(phone);
			}
			if(pageSize != 0){
				example.setLimitStart(offset);
				example.setLimitEnd(pageSize);
			}
			example.setOrderByClause(" createdDate desc");
			List<TCustomer> list = MapperFactory.getTCustomerMapper().selectByExample(example);
			return list;
		}
		catch(Exception e){
			throw new ZCException(e);
		}
		
	}

	@Override
	public long count() throws ZCException{
		try{
			TCustomerCriteria example = new TCustomerCriteria();
			return MapperFactory.getTCustomerMapper().countByExample(example);
		}
		catch (Exception e) {
			throw new ZCException(e);
		}
	}

}
