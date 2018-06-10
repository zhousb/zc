package com.zc.system.shiro.realm;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;

import com.zc.dto.WebUserVO;



public class UserRealm extends AuthorizingRealm {
	/**
	 * 盐值
	 */
	public static final String salt = "adfaQWREQ!@$!@Asdf";
	
	/*****此部分数据暂时写死 start*****/
    private static Map<String,Set<String>> roles = new HashMap<String,Set<String>>();
    private static Map<String,Set<String>> permissions = new HashMap<String,Set<String>>();
    private static Map<String,WebUserVO> users = new HashMap<String,WebUserVO>();
    /******此部分数据暂时写死 end****************/
    
    
    static {
    	WebUserVO user = new WebUserVO();
    	user.setUserId("1");
    	user.setUserName("admin");
    	user.setLock(false);
    	user.setEnable(true);
    	//user.setPassword("d2df982e5de9d1e9a83ec155cb8a2e2b");
    	//System.out.println(new SimpleHash("md5", "123456", ByteSource.Util.bytes("admin"+"adfaQWREQ!@$!@Asdf"), 2).toHex());
    	//123456
    	user.setPassword("430118b47d74cecc22d4717fca8804fc");
    	users.put("admin", user);
    	
    }
    
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
    	
        String username = (String)principals.getPrimaryPrincipal();

        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        authorizationInfo.setRoles(roles.get(username));
        authorizationInfo.setStringPermissions(permissions.get(username));
        return authorizationInfo;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

        String username = (String)token.getPrincipal();
        WebUserVO user = users.get(username);
        if(user == null) {
        	//没找到帐号
            throw new UnknownAccountException();
        }
        if(user.isLock()) {
        	//帐号锁定
            throw new LockedAccountException(); 
        }
        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
                user.getUserName(),
                user.getPassword(),
                ByteSource.Util.bytes(user.getUserName()+salt),
                getName()
        );
        assembleUser(user);
        return authenticationInfo;
    }

    @Override
    public void clearCachedAuthorizationInfo(PrincipalCollection principals) {
        super.clearCachedAuthorizationInfo(principals);
    }

    @Override
    public void clearCachedAuthenticationInfo(PrincipalCollection principals) {
        super.clearCachedAuthenticationInfo(principals);
    }

    @Override
    public void clearCache(PrincipalCollection principals) {
        super.clearCache(principals);
    }

    public void clearAllCachedAuthorizationInfo() {
        getAuthorizationCache().clear();
    }

    public void clearAllCachedAuthenticationInfo() {
        getAuthenticationCache().clear();
    }

    public void clearAllCache() {
        clearAllCachedAuthenticationInfo();
        clearAllCachedAuthorizationInfo();
    }
    
   /**
    * 封装用户信息
    * @param userId
    */
	private void assembleUser(WebUserVO user) {
		SecurityUtils.getSubject().getSession().setAttribute("user.session.key",user);
	}

}
