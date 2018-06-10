package com.zc.dao.mapper.interfaces;

import com.zc.dao.mapper.bo.TCustomer;
import com.zc.dao.mapper.bo.TCustomerCriteria;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TCustomerMapper {
    int countByExample(TCustomerCriteria example);

    int deleteByExample(TCustomerCriteria example);

    int deleteByPrimaryKey(Long id);

    int insert(TCustomer record);

    int insertSelective(TCustomer record);

    List<TCustomer> selectByExample(TCustomerCriteria example);

    TCustomer selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") TCustomer record, @Param("example") TCustomerCriteria example);

    int updateByExample(@Param("record") TCustomer record, @Param("example") TCustomerCriteria example);

    int updateByPrimaryKeySelective(TCustomer record);

    int updateByPrimaryKey(TCustomer record);
}