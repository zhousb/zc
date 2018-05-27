<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>  
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;  
	request.setAttribute("basePath", basePath);
    request.setAttribute("staticPath", basePath+"/static");
%>
<!DOCTYPE html>
<html>
<head>
<title><sitemesh:title/></title>
	<meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

	<title>ZC-CRM</title>

	<!-- 
	<link rel="stylesheet" href="${staticPath}/css/font-awesome.css"/>
	<link rel="stylesheet" href="${staticPath}/css/global.css"/>
	<link rel="stylesheet" href="${staticPath}/css/frame.css"/>
	<link rel="stylesheet" href="${staticPath}/css/modular.css"/>
	<link rel="stylesheet" href="${staticPath}/css/index.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="${staticPath}/css/iconfont.css" rel="stylesheet" type="text/css"> 
	 -->
	<link rel="stylesheet" href="${staticPath}/css/boostrap/style.css" type="text/css" />
	<link rel="stylesheet" href="${staticPath}/css/boostrap/bootstrap.css" type="text/css" />
	<link rel="stylesheet" href="${staticPath}/css/font-awesome/css/font-awesome.css" type="text/css" />
	<link rel="stylesheet" href="${staticPath}/scripts/frame/ajaxhelper/css/jquery.pagcontroller.css"/>
	<link rel="stylesheet" href="${staticPath}/scripts/frame/bootstrap/dist/css/fileinput.min.css"/>
	<link rel="stylesheet" href="${staticPath}/scripts/frame/bootstrap-table/dist/bootstrap-table.css"/>
	<link rel="stylesheet" href="${staticPath}/scripts/frame/bootstrapvalidator-0.4.5/dist/css/bootstrapValidator.min.css" type="text/css" />
	<link rel="stylesheet" href="${staticPath}/scripts/frame/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css"/>
	<link rel="stylesheet" href="${staticPath}/scripts/ztree.3.5.26/css/zTreeStyle/zTreeStyle.css" type="text/css" />
	<link rel="stylesheet" href="${staticPath}/css/boostrap/bootstrap-responsive.min.css" type="text/css" />
	<link rel="stylesheet" href="${staticPath}/css/mno/admin.css" type="text/css" />
	
	<script src="${staticPath}/scripts/jquery-1.9.1.js"></script>
	<script src="${staticPath}/scripts/frame/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="${staticPath}/scripts/frame/jsrender/jsrender.min.js"></script>
	<script src="${staticPath}/scripts/frame/jsviews/jsviews.min.js"></script>
	<script src="${staticPath}/scripts/frame/bootbox/bootbox.js"></script>
	<script src="${staticPath}/scripts/frame/json2/json2.js"></script>
	<script src="${staticPath}/scripts/frame/form/jquery.form.min.js"></script>
	<script src="${staticPath}/scripts/frame/ajaxhelper/jquery.pagcontroller.js"></script>
	<script src="${staticPath}/scripts/frame/twbs-pagination/jquery.twbsPagination.min.js"></script>
	<script src="${staticPath}/scripts/frame/runnerpagination/runner.pagination.js"></script>
	<script src="${staticPath}/scripts/frame.js"></script>
	<script src="${staticPath}/scripts/jquery.SuperSlide.2.1.1.js"></script>
	
	<%-- <script src="${staticPath}/scripts/frame/bootstrap/dist/js/fileinput.min.js"></script> --%>
	<%-- <script src="${staticPath}/scripts/frame/bootstrap/dist/js/fileinput_locale_zh.js"></script> --%>
	<script src="${staticPath}/scripts/frame/bootstrapvalidator-0.4.5/dist/js/bootstrapValidator.min.js"></script>
	<script src="${staticPath}/scripts/jquery.bootstrap-pureClearButton.min.js"></script>
	
	<!-- 
	
	<script src="${staticPath}/scripts/frame/bootstrap-table/dist/bootstrap-table-export.js"></script>
	<script src="${staticPath}/scripts/frame/bootstrap-table/dist/extends/tableExport/jquery.base64.js"></script>
	<script src="${staticPath}/scripts/frame/bootstrap-table/dist/extends/tableExport/tableExport.js"></script>
	
	
	<script src="${staticPath}/scripts/frame/bootstrap-table/dist/bootstrap-table-locale-all.js"></script>-->
	<script src="${staticPath}/scripts/frame/bootstrap-table/dist/bootstrap-table.js"></script>
	<script src="${staticPath}/scripts/frame/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
	<script src="${staticPath}/scripts/frame/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>

	<script src="${staticPath}/scripts/layer.3.0.1/layer.js"></script>
	<script src="${staticPath}/scripts/jquery-jtemplates.js"></script>
	<script src="${staticPath}/scripts/ztree.3.5.26/jquery.ztree.core.js"></script>

	<script type="text/javascript">
			
			jQuery(".picScroll-left").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,vis:1,trigger:"click"});
	</script>
	
<sitemesh:head/>
<script>
	
	var basePath = "<%=basePath%>";
</script>
<style>
body {
	padding-right:0!important;
}
body .modal-open {
	overflow-y:auto !important;

	padding-right:0 !important;
}
#curLocation{
	height:40px;
	width:100%;
	padding-top:10px;
}
#curLocation p{
	font-size:14px;
	padding-left:15px;
}
#curLocation  hr {
	margin-top:7px;
	*margin: 0;
	margin-bottom:7px; 
	height:1px;
	border:none;
	border-top:2px dotted #eee;
}
#pageContent{
	padding-left:60px;
	padding-top:20px;
}
input::-ms-input-placeholder{text-align: center;}
input::-webkit-input-placeholder{text-align: center;}
</style>
</head>
<body>
		<%@ include file="/WEB-INF/layouts/header.jsp"%>
		<div class="col-md-2 col-xs-2" style="padding-left:30px; padding-right:0px;">
		<%@ include file="/WEB-INF/layouts/left.jsp"%>
		</div>
		<div class="col-md-10 col-xs-10" style="padding-right:50px; padding-left:0px;">
		<sitemesh:body />	
		</div>
		<%@ include file="/WEB-INF/layouts/footer.jsp"%>
</body>
</html>