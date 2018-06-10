package com.zc.dao.mapper.factory;

import javax.annotation.PostConstruct;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.zc.dao.mapper.interfaces.TCustomerMapper;




@Component
public class MapperFactory {

	@Autowired
	private transient SqlSessionTemplate st;

	private static SqlSessionTemplate sqlSessionTemplate;

	@PostConstruct
	void init() {
		setSqlSessionTemplate(st);
	}

	public static void setSqlSessionTemplate(SqlSessionTemplate st) {
		MapperFactory.sqlSessionTemplate = st;
	}

	public static TCustomerMapper getTCustomerMapper() {
		return sqlSessionTemplate.getMapper(TCustomerMapper.class);
	}
	

}
