package com.zc.system.shiro.credentials;


import net.sf.ehcache.Cache;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.ehcache.EhCacheManager;

import java.util.concurrent.atomic.AtomicInteger;


/**
 * 凭证验证
 * @author zhoushanbin
 * @date 2018年6月6日
 */
public class RetryLimitHashedCredentialsMatcher extends HashedCredentialsMatcher {
	/**
	 * 密码失败次数管理 ：5 次
	 */
    private Ehcache pwdRetryCache;
    private EhCacheManager cacheManager;

    public RetryLimitHashedCredentialsMatcher(EhCacheManager cacheManager) {
        this.cacheManager = cacheManager;
        pwdRetryCache = this.cacheManager.getCacheManager().getEhcache("pwdRetryCache");
        if(null == pwdRetryCache){
        	pwdRetryCache = new Cache("pwdRetryCache", 100, false, true, 0, 0);
        	this.cacheManager.getCacheManager().addCache(pwdRetryCache);
        }
    }

    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
        String username = (String)token.getPrincipal();
        
        //判断账号是否锁定；锁定判断锁定时间是否已经达到锁定时间， //todo
        if(true){
        	//先写死后续实现
        	pwdRetryCache.remove(username);
        }
        
        Element element = pwdRetryCache.get(username);
        if(element == null) {
            element = new Element(username , new AtomicInteger(0));
            pwdRetryCache.put(element);
        }
        AtomicInteger retryCount = (AtomicInteger)element.getObjectValue();
    	if(retryCount.incrementAndGet() > 5) {
        	//锁定账号，5分钟内不能再次登陆 //todo
            throw new ExcessiveAttemptsException();
        }
        boolean matches = super.doCredentialsMatch(token, info);
        if(matches) {
            pwdRetryCache.remove(username);
        }

        return matches;
    }
}