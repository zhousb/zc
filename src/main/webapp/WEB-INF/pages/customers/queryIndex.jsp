<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="staticPath"
	value="${pageContext.request.contextPath}/static" />
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";  
	request.setAttribute("basePath", basePath);
    request.setAttribute("staticPath", basePath+"static");
%>	
<html>
<head>
<meta name="menu" content="userAuth" />
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<title>客户资料查询</title>
<script src="${staticPath}/js-busi/customers/queryCustomer.js"></script>
<style type="text/css">

</style>
</head>
<body>
<div id="curLocation">
 	<p>当前位置：客户管理  > 客户资料查询</p>
<hr />
</div>
<div id="pageContent">
			<div>
					    <form class="bs-example bs-example-form" role="form">
					        				<div class="input-group col-md-9">
													<span class="input-group-addon" style="width:100px;">姓名：</span> <input type="text"
														style="width:250px;" class="form-control" placeholder="姓名" name="userName" id="userName"/>   
													<span class="input-group-addon"style="width:100px;">身份证号：</span> <input type="text"
														style="width:250px;" class="form-control" placeholder="身份证号" id="identityCard"/>		
												</div>
												<br>
												<div class="input-group col-md-9">
													<span class="input-group-addon"style="width:100px;">手机号码：</span> <input type="text"
														style="width:250px;" class="form-control" placeholder="手机号码" id="phone"/>
												</div>
												<br>
					        <div class="input-group">	
					            <button type="button" id="queryBtn" class="btn btn-primary" style="width:80px;">查询</button>
					        </div>
					    </form>
			</div>
 
			<div id="reportTableDiv" style="margin-bottom:40px;">
				
				
				<table id="reportTable">
				</table>
			</div>
		
				<!--  -->

</div>

<!-- 模态框 -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true">
    <div class="modal-dialog" style="width:60%">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <label class="modal-title" id="myModalLabel">客户详情</label>
            </div>
            <div class="modal-body">
			<form class="bs-example bs-example-form" role="form" id = "customerViewForm">
				<div class="input-group col-md-12">
					<span class="input-group-addon" style="width:100px;">姓名：</span> <input type="text"
						style="width:250px;" class="form-control" placeholder="姓名（必填）" name="muserName" id="muserName"/>
				    
					<span class="input-group-addon"style="width:100px;">身份证号：</span> <input type="text"
						style="width:250px;" class="form-control" placeholder="身份证号（必填）" id="midentityCard"/>		
				</div>
				<br>
				<div class="input-group col-md-12">
					<span class="input-group-addon"style="width:100px;">性别：</span> 
								<select id="msex" class="form-control" style="width:250px;">
									<option value="1">男</option>
									<option value="2">女</option>
								</select>
					
					<span class="input-group-addon"style="width:100px;">婚姻状况：</span> 
								<select id="mmarriage" class="form-control" style="width:250px;">
									<option value="1">已婚</option>
									<option value="2">未婚</option>
								</select>
							
				</div>
				<br>
				<div class="input-group col-md-12">
					<span class="input-group-addon"style="width:100px;">手机号码：</span> <input type="text"
						style="width:250px;" class="form-control" placeholder="手机号码（必填）" id="mphone"/>
					<span class="input-group-addon"style="width:100px;">家庭住址：</span> <input type="text"
						style="width:250px;" class="form-control" placeholder="家庭住址" id="maddress"/>		
				</div>
				<br>
				<div class="input-group col-md-12">
					<span class="input-group-addon"style="width:100px;">微信号码：</span> <input type="text"
						style="width:250px;" class="form-control" placeholder="微信号码" id="mwechat"/>
					<span class="input-group-addon"style="width:100px;">电子邮箱：</span> <input type="text"
						style="width:250px;" class="form-control" placeholder="电子邮箱" id="memail"/>		
				</div>
				<br>
				<div class="input-group col-md-12">
					<span class="input-group-addon"style="width:100px;">职业：</span> 
								<select id="mprofession" class="form-control" style="width:250px;">
									<option value="1">国家机关、党群组织、企业、事业单位负责人</option>
									<option value="2">专业技术人员</option>
									<option value="3">办事人员和有关人员</option>
									<option value="4">商业、服务业人员</option>
									<option value="5">农、林、牧、渔、水利业生产人员</option>
									<option value="6">生产、运输设备操作人员及有关人员</option>
									<option value="7">军人</option>
									<option value="8">无业</option>
									<option value="9">其他</option>
								</select>
					<span class="input-group-addon"style="width:100px;">年收入：</span> 
								<select id="mannualIncome" class="form-control" style="width:250px;">
									<option value="1">10万以下</option>
									<option value="2">10万-20万</option>
									<option value="3">20万-40万</option>
									<option value="4">40万-60万</option>
									<option value="5">60万-100万</option>
									<option value="6">100万以上</option>
								</select>	
				</div>
				<br>
				<div class="input-group col-md-12">
					<span class="input-group-addon"style="width:100px;" >单位：</span> <input type="text"
						style="width:250px;" class="form-control" placeholder="单位" id="mcompany"/>
					<span class="input-group-addon"style="width:100px;">客户来源：</span> 
								<select id="mcustomerSource" class="form-control" style="width:250px;">
									<option value="1">官网</option>
									<option value="2">推荐</option>
									<option value="3">其他</option>
								</select>
					
				</div>
				<br>
				<div class="input-group col-md-12">
					<span class="input-group-addon"style="width:100px;" >备注：</span>
					<textarea class="form-control" maxlength="200" rows="4"style="width:630px;" name=mdesc id="mdesc">
					</textarea>
				</div>
				<br>
				<div class="input-group">
					<input type="hidden" id="mcid"/>
				</div>
				<br>
				<div class="input-group">
					<button type="button" id="mmodifyBtn" class="btn btn-primary"style="width: 80px;display:block;">修改</button>
					<button type="button" id="maddBtn" class="btn btn-primary"style="width: 80px;display:none;">保存</button>
				</div>
				
			</form>
            </div>
            <!--div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary">提交更改</button>
            </div-->
        </div>
    </div>
</div>
<!--  -->
</body>

</html>