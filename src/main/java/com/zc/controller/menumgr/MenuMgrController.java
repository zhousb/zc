package com.zc.controller.menumgr;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.zc.common.web.model.RespCode;
import com.zc.common.web.model.ResponseData;
import com.zc.controller.menumgr.model.MenuVO;

import ch.lambdaj.Lambda;
import ch.lambdaj.group.Group;


/**
 * 菜单管理
 * @author zhoushanbin
 * @date 2018年5月27日
 */
@Controller
@RequestMapping(value = "/menuMgr")
public class MenuMgrController {
	
	private static final Logger LOG = LoggerFactory.getLogger(MenuMgrController.class);
	
	/**
	 * 暂时将菜单防止此处，日后持久化数据库
	 */
	private static List<MenuVO> menus = new ArrayList<MenuVO>(); 
	
	static {
		initMenu();
		
	}
	
	public static void initMenu(){
		/*************************************/
		MenuVO custMgr = new MenuVO();
		custMgr.setMenuId("1001");
		custMgr.setMenuName("客户管理");
		custMgr.setParentMenuId(null);
		custMgr.setOrderNum(Long.valueOf(1));
		custMgr.setEnable(true);
		custMgr.setDesc("");	
		menus.add(custMgr);		
		MenuVO custIn = new MenuVO();
		custIn.setMenuId("1001101");
		custIn.setMenuName("客户资料录入");
		custIn.setParentMenuId("1001");
		custIn.setOrderNum(Long.valueOf(1));
		custIn.setMenuUrl("/customers/addIndex.do");
		custIn.setIconClass("glyphicon glyphicon-check");
		custIn.setEnable(true);
		custIn.setDesc("");
		menus.add(custIn);	
		MenuVO custQ = new MenuVO();
		custQ.setMenuId("1001102");
		custQ.setMenuName("客户资料查询");
		custQ.setParentMenuId("1001");
		custQ.setOrderNum(Long.valueOf(1));
		custQ.setMenuUrl("/customers/queryIndex.do");
		custQ.setIconClass("glyphicon glyphicon-eye-open");
		custQ.setEnable(true);
		custQ.setDesc("");
		menus.add(custQ);	
		/*******************************************/
		
		MenuVO orderMgr = new MenuVO();
		orderMgr.setMenuId("1002");
		orderMgr.setMenuName("订单管理");
		orderMgr.setParentMenuId(null);
		orderMgr.setOrderNum(Long.valueOf(2));
		orderMgr.setEnable(true);
		orderMgr.setDesc("");
		menus.add(orderMgr);
		MenuVO orderIn = new MenuVO();
		orderIn.setMenuId("1002101");
		orderIn.setMenuName("订单录入");
		orderIn.setParentMenuId("1002");
		orderIn.setOrderNum(Long.valueOf(1));
		orderIn.setMenuUrl("/orders/add.do");
		orderIn.setIconClass("glyphicon glyphicon-check");
		orderIn.setEnable(true);
		orderIn.setDesc("");
		menus.add(orderIn);
		
		MenuVO orderQ = new MenuVO();
		orderQ.setMenuId("1002102");
		orderQ.setMenuName("订单查询");
		orderQ.setParentMenuId("1002");
		orderQ.setOrderNum(Long.valueOf(1));
		orderQ.setMenuUrl("/orders/query.do");
		orderQ.setIconClass("glyphicon glyphicon-eye-open");
		orderQ.setEnable(true);
		orderQ.setDesc("");
		menus.add(orderQ);
		/******************************************/
		
		MenuVO prdMgr = new MenuVO();
		prdMgr.setMenuId("1003");
		prdMgr.setMenuName("商品管理");
		prdMgr.setParentMenuId(null);
		prdMgr.setOrderNum(Long.valueOf(3));
		prdMgr.setEnable(true);
		prdMgr.setDesc("");
		
		menus.add(prdMgr);
		MenuVO prdQ = new MenuVO();
		prdQ.setMenuId("1003101");
		prdQ.setMenuName("商品查询");
		prdQ.setParentMenuId("1003");
		prdQ.setOrderNum(Long.valueOf(1));
		prdQ.setMenuUrl("/products/query.do");
		prdQ.setIconClass("glyphicon glyphicon-eye-open");
		prdQ.setEnable(true);
		prdQ.setDesc("");
		menus.add(prdQ);
		MenuVO prdS = new MenuVO();
		prdS.setMenuId("1003102");
		prdS.setMenuName("商品配置");
		prdS.setParentMenuId("1003");
		prdS.setOrderNum(Long.valueOf(1));
		prdS.setMenuUrl("/products/set.do");
		prdS.setIconClass("glyphicon glyphicon-eye-open");
		prdS.setEnable(true);
		prdS.setDesc("");
		menus.add(prdS);
		MenuVO prdC = new MenuVO();
		prdC.setMenuId("1003103");
		prdC.setMenuName("商品审核");
		prdC.setParentMenuId("1003");
		prdC.setOrderNum(Long.valueOf(1));
		prdC.setMenuUrl("/products/check.do");
		prdC.setIconClass("glyphicon glyphicon-eye-open");
		prdC.setEnable(true);
		prdC.setDesc("");
		
		menus.add(prdC);
		MenuVO prdSJ = new MenuVO();
		prdSJ.setMenuId("1003105");
		prdSJ.setMenuName("商品上架");
		prdSJ.setParentMenuId("1003");
		prdSJ.setOrderNum(Long.valueOf(1));
		prdSJ.setMenuUrl("/products/onsale.do");
		prdSJ.setIconClass("glyphicon glyphicon-eye-open");
		prdSJ.setEnable(true);
		prdSJ.setDesc("");
		menus.add(prdSJ);
		MenuVO prdXJ = new MenuVO();
		prdXJ.setMenuId("1003106");
		prdXJ.setMenuName("商品下架");
		prdXJ.setParentMenuId("1003");
		prdXJ.setOrderNum(Long.valueOf(1));
		prdXJ.setMenuUrl("/products/offsale.do");
		prdXJ.setIconClass("glyphicon glyphicon-eye-open");
		prdXJ.setEnable(true);
		prdXJ.setDesc("");
		menus.add(prdXJ);
		/******************************************/
		
		MenuVO settleMgr = new MenuVO();
		settleMgr.setMenuId("1004");
		settleMgr.setMenuName("结算中心");
		settleMgr.setParentMenuId(null);
		settleMgr.setOrderNum(Long.valueOf(4));
		settleMgr.setEnable(true);
		settleMgr.setDesc("");
		menus.add(settleMgr);
		
		MenuVO settleYG = new MenuVO();
		settleYG.setMenuId("1004101");
		settleYG.setMenuName("员工提成");
		settleYG.setParentMenuId("1004");
		settleYG.setOrderNum(Long.valueOf(1));
		settleYG.setMenuUrl("/settlement/queryStaffSettlement.do");
		settleYG.setIconClass("glyphicon glyphicon-eye-open");
		settleYG.setEnable(true);
		settleYG.setDesc("");
		menus.add(settleYG);
		
		/******************************************/
		MenuVO reportMgr = new MenuVO();
		reportMgr.setMenuId("1005");
		reportMgr.setMenuName("报表管理");
		reportMgr.setParentMenuId(null);
		reportMgr.setOrderNum(Long.valueOf(4));
		reportMgr.setEnable(true);
		reportMgr.setDesc("");
		
		menus.add(reportMgr);
		
		
		/******************************************/
		
		MenuVO sysMgr = new MenuVO();
		sysMgr.setMenuId("1006");
		sysMgr.setMenuName("系统管理");
		sysMgr.setParentMenuId(null);
		sysMgr.setOrderNum(Long.valueOf(4));
		sysMgr.setEnable(true);
		sysMgr.setDesc("");
		menus.add(sysMgr);
		/***
		
		
		MenuVO sysMgr = new MenuVO();
		sysMgr.setMenuId("1004");
		sysMgr.setMenuName("报表管理");
		sysMgr.setParentMenuId(null);
		sysMgr.setOrderNum(Long.valueOf(5));
		sysMgr.setEnable(true);
		sysMgr.setDesc("");
		
		
		MenuVO userAuth = new MenuVO();
		userAuth.setMenuId("1005");
		userAuth.setMenuName("认证审核");
		userAuth.setParentMenuId("1001");
		userAuth.setOrderNum(Long.valueOf(1));
		userAuth.setMenuUrl("/authMgr/index");
		userAuth.setIconClass("glyphicon glyphicon-check");
		userAuth.setEnable(true);
		userAuth.setDesc("");
		
		MenuVO userMgr = new MenuVO();
		userMgr.setMenuId("1006");
		userMgr.setMenuName("用户管理");
		userMgr.setParentMenuId("1004");
		userMgr.setOrderNum(Long.valueOf(1));
		userMgr.setIconClass("glyphicon glyphicon-user");
		userMgr.setEnable(true);
		userMgr.setDesc("");
		
		MenuVO roleMgr = new MenuVO();
		roleMgr.setMenuId("1007");
		roleMgr.setMenuName("角色管理");
		roleMgr.setParentMenuId("1004");
		roleMgr.setOrderNum(Long.valueOf(2));
		roleMgr.setIconClass("glyphicon glyphicon-th-list");
		roleMgr.setEnable(true);
		roleMgr.setDesc("");
		
		MenuVO logView = new MenuVO();
		logView.setMenuId("1008");
		logView.setMenuName("日志查看");
		logView.setParentMenuId("1004");
		logView.setOrderNum(Long.valueOf(3));
		logView.setIconClass("glyphicon glyphicon-eye-open");
		logView.setEnable(true);
		logView.setDesc("");
		
		MenuVO serviceCheck = new MenuVO();
		serviceCheck.setMenuId("1009");
		serviceCheck.setMenuName("服务目录");
		serviceCheck.setParentMenuId("1002");
		serviceCheck.setOrderNum(Long.valueOf(1));
		serviceCheck.setMenuUrl("/apiCatalog/index");
		serviceCheck.setIconClass("glyphicon glyphicon-check");
		serviceCheck.setEnable(true);
		serviceCheck.setDesc("");
		
		MenuVO paramMgr2 = new MenuVO();
		paramMgr2.setMenuId("1010");
		paramMgr2.setMenuName("资费计划管理");
		paramMgr2.setParentMenuId("1003");
		paramMgr2.setOrderNum(Long.valueOf(1));
		paramMgr2.setMenuUrl("/paramCfg/unindex");
		paramMgr2.setIconClass("glyphicon glyphicon-asterisk");
		paramMgr2.setEnable(true);
		paramMgr2.setDesc("");
		
		MenuVO paramMgr3 = new MenuVO();
		paramMgr3.setMenuId("1011");
		paramMgr3.setMenuName("阀值/档位管理");
		paramMgr3.setParentMenuId("1003");
		paramMgr3.setOrderNum(Long.valueOf(2));
		paramMgr3.setMenuUrl("/paramCfg/index");
		paramMgr3.setIconClass("glyphicon glyphicon-asterisk");
		paramMgr3.setEnable(true);
		paramMgr3.setDesc("");
		
		MenuVO casMgr1 = new MenuVO();
		casMgr1.setMenuId("1013");
		casMgr1.setMenuName("方案/案例设置");
		casMgr1.setParentMenuId("1012");
		casMgr1.setOrderNum(Long.valueOf(1));
		casMgr1.setMenuUrl("/cases/index");
		casMgr1.setIconClass("glyphicon glyphicon-asterisk");
		casMgr1.setEnable(true);
		casMgr1.setDesc("");
		
		MenuVO menuVO = new MenuVO();
		menuVO.setMenuId("1014");
		menuVO.setMenuName("服务查询");
		menuVO.setParentMenuId("1002");
		menuVO.setOrderNum(Long.valueOf(1));
		menuVO.setMenuUrl("/apis/index");
		menuVO.setIconClass("glyphicon glyphicon-check");
		menuVO.setEnable(true);
		menuVO.setDesc("");
		
		MenuVO menuVO1 = new MenuVO();
		menuVO1.setMenuId("1015");
		menuVO1.setMenuName("新增服务");
		menuVO1.setParentMenuId("1002");
		menuVO1.setOrderNum(Long.valueOf(1));
		menuVO1.setMenuUrl("/apis/add");
		menuVO1.setIconClass("glyphicon glyphicon-check");
		menuVO1.setEnable(true);
		**/
		
	}
	/**
	 * 加载头部菜单
	 * @return
	 */
	@RequestMapping(value = "loadHeaderMenus")
	@ResponseBody
	public ResponseData<List<MenuVO>> loadHeaderMenu(){
		ResponseData<List<MenuVO>> resp = new ResponseData<List<MenuVO>>(RespCode.CommonRespCode.SUCCESS.getCode(),"获取头部菜单成功");
		resp.setData(parseMenu(menus));
		Gson gson = new Gson();
		LOG.info("获取头部菜单返回：{}",gson.toJson(resp));
		return resp;
		
	}
	
	/**
	 * @param menus
	 * @return
	 */
	private List<MenuVO> parseMenu(List<MenuVO> menuList){
		
		List<MenuVO> elseMenus = new ArrayList<MenuVO>();
		for(MenuVO menuVO:menuList){
			if(!StringUtils.isEmpty(menuVO.getParentMenuId())){
				elseMenus.add(menuVO);
			}
		}
		Group<MenuVO> group = Lambda.group(elseMenus, Lambda.by(Lambda.on(MenuVO.class).getParentMenuId()));
		for(MenuVO menuVO:menuList){
			List<MenuVO> list = group.find(menuVO.getMenuId());
			if(!CollectionUtils.isEmpty(list)){
				Collections.sort(list,new  Comparator<MenuVO>(){
					@Override
					public int compare(MenuVO o1, MenuVO o2) {
						return o1.getOrderNum()>=o2.getOrderNum()?1:-1;
					}
				});
				menuVO.setSubMenu(list);
			}
		}
		List<MenuVO> newMenuList = new ArrayList<MenuVO>(); 
		for(MenuVO menuVO : menuList){
			if(StringUtils.isEmpty(menuVO.getParentMenuId())){
				newMenuList.add(menuVO);
			}
		}
		if(!CollectionUtils.isEmpty(newMenuList)){
			Collections.sort(newMenuList,new Comparator<MenuVO>(){
				@Override
				public int compare(MenuVO o1, MenuVO o2) {
					return o1.getOrderNum()>=o2.getOrderNum()?1:-1;
				}
				
			});
		}
		return newMenuList;
	}
	
	/**
	 * 获取左侧菜单
	 * @param menuId
	 * @return
	 */
	@RequestMapping(value = "/loadLeftMenu")
	@ResponseBody
	public ResponseData<MenuVO> loadLeftMenu(String menuIndex){
		
		ResponseData<MenuVO> resp = new ResponseData<MenuVO>(RespCode.CommonRespCode.SUCCESS.getCode(),"获取头部菜单成功");
		menuIndex = StringUtils.isEmpty(menuIndex) ? "none" : menuIndex;
		
		List<MenuVO> menusTree = parseMenu(menus);
		MenuVO leftMenu = null;
		//获取menuIndex 所归属的分支树 : 目前此处菜单层级支持两层。
		for(MenuVO menuVO : menusTree){
			if(menuIndex.equals(menuVO.getMenuId())){
				leftMenu = menuVO;
				break;
			}
			if(CollectionUtils.isEmpty(menuVO.getSubMenu())){
				continue;
			}
			MenuVO tmp = getMenu(menuIndex,menuVO.getSubMenu());
			if(null != tmp){
				leftMenu = menuVO;
				break;
			}
		}
		if(null == leftMenu){
			leftMenu = parseMenu(menus).get(0);
		}
		
		resp.setData(leftMenu);
		Gson gson = new Gson();
		LOG.info("获取左侧菜单返回：{}",gson.toJson(resp));
		return resp;
		
	}
	
	private MenuVO getMenu(String menuIndex,List<MenuVO> menuList){
		
		for(MenuVO menuVO:menuList){
			if(menuIndex.equals(menuVO.getMenuId())){
				return menuVO;
			}
		}
		return null;
	}
	
}
