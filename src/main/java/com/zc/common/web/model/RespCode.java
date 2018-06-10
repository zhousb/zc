package com.zc.common.web.model;

/**
 * 响应码
 * @author zhoushanbin
 * @date 2018年6月3日
 */
public class RespCode {
	

	public static enum CommonRespCode{
		//通用处理成功
		SUCCESS("200","操作成功！"),
		//通用处理失败
		FAIL("-1","操作失败！");
		private String code;
		private String msg;
		private CommonRespCode(String code,String msg){
			setCode(code);
			setMsg(msg);
		}
		public String getCode() {
			return code;
		}
		public void setCode(String code) {
			this.code = code;
		}
		public String getMsg() {
			return msg;
		}
		public void setMsg(String msg) {
			this.msg = msg;
		}
		
		
	}

	/**
	 * 0-199 之间定义系统级别响应码
	 * @author zhoushanbin
	 * @date 2018年6月3日
	 */
	public static enum SystemRespCode{
		
	}
	/*******************************************/
	//201 后 定义业务级别响应码
	/**
	 * @author zhoushanbin
	 * @date 2018年6月3日
	 */
	public static enum CustomerRespCode{
		
	
		PHONE_EXISTS("201","该手机已绑定客户，请核对信息！");
		private String code;
		private String msg;
		private CustomerRespCode(String code,String msg){
			setCode(code);
			setMsg(msg);
		}
		public String getCode() {
			return code;
		}
		public void setCode(String code) {
			this.code = code;
		}
		public String getMsg() {
			return msg;
		}
		public void setMsg(String msg) {
			this.msg = msg;
		}
		
		
		
	}
	
	
}
