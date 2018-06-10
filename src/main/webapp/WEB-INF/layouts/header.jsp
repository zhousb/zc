<%@ page import="org.apache.shiro.SecurityUtils" %>
<%@ page import="org.apache.shiro.subject.Subject" %>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<!-- 
<c:set var="headerStyle"  scope="request">
	<sitemesh:getProperty property ="meta.headerStyle"/>
</c:set>
 -->
<c:set var="selectedMenu"  scope="request">
	<sitemesh:getProperty property ="meta.menu"/>
</c:set>
<%

	String menuIndex = String.valueOf(request.getParameter("menuIndex"));
%>
<script type="text/javascript">
var menuIndex = <%=menuIndex%>;
if(menuIndex == null) {
	menuIndex ='none';
}

</script>


<style>
header .navbar-default {
	background-color: #2989e2;
	color:#fff;
}
header .navbar{
	border-radius:0px;
	border:0px;
	
}
header .navbar-header a {
	color:#fff !important;
	font-size:20px;
}
header .navbar-left a{
	color:#fff !important;
	font-size:15px;
}
header .navbar-right a{
	color:#fff !important;
	font-size:15px;
}
header .dropdown-menu a{
	color:#000 !important;
	font-size:14px;
}

header .navbar-default .navbar-nav .open ul li a{
	background-color: #fff !important;
	color:#fff !important;
}
header .navbar-default .navbar-nav .open  a{
	background-color: #2e6da4 !important;
	color:#fff !important;
}
header .navbar-left .dropdown-menu li a {
	color:#000 !important;
	border-bottom:solid 1px #eee;
	padding-right:8px;
	padding-top:5px;
	padding-bottom: 0px;
}

header .navbar-left .dropdown-menu li a p{
	color:#337ab7 !important;
	font-size:14px;
}
</style>
<header>
<nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid" >
    <div class="navbar-header col-md-2">
        <a class="navbar-brand" href="#">ZC-CRM</a>
    </div>
    <div>
        <!-- 一级菜单-->
        
         <ul class="nav navbar-nav navbar-left" id="headerMenus">
          	
        </ul>
        
        <!--用户-->
        
         <ul class="nav navbar-nav navbar-right">
      		<li><a href="#"><span class="glyphicon glyphicon-user"></span>&nbsp;
      			admin
      			</a>
      		</li>
      		<li><a href="${basePath}/user/logout.do"><span class="glyphicon glyphicon-log-in"></span>&nbsp;
      			退出
      			</a>
      		</li>
    	</ul>
    </div>
    </div>
</nav>
</header>
<textarea id="hdtmpl" style="display:none">
{#foreach $T as record}
<li class="dropdown">
	<a href="#" class="dropdown-toggle" data-toggle="dropdown">
		{$T.record.menuName}
		<b class="caret"></b>
		<!-- 二级菜单 -->
		<ul class="dropdown-menu">
			{#foreach $T.record.subMenu as srecord}
				<li><a href="javascript:loadPage('{$T.srecord.menuId}','{$T.srecord.menuUrl}')"><p><i class="{$T.srecord.iconClass}"></i>&nbsp;{$T.srecord.menuName}</p></a></li>
			{#/for}
		</ul>
	</a>
</li>
{#/for}
</textarea>

<script type="text/javascript">
//加载头部菜单
ajaxController.ajax({
	method : "GET",
	url : basePath + "/menuMgr/loadHeaderMenus",
	dataType : "json",
	showWait : false,
	message : "请稍后...",
	success : function(data) {
		if(data.statusCode == '200'){
			 $("#headerMenus").setTemplateElement("hdtmpl");
   			 // 给模板加载数据
  			 $("#headerMenus").processTemplate(data.data);
			$('li.dropdown').mouseover(function() {   
			     $(this).addClass('open');    
			}).mouseout(function() { 
			    $(this).removeClass('open');    
			});
  			 
		}
		else{					
			bootbox.alert({title:"提示", message:"网络故障，请稍后再试！"});
		}
	},
	error : function(data) {
					
	}
});
function loadPage(menuId,menuUrl){
	var pageUrl = "#";
	if("none" != menuUrl){
		if (menuUrl) {
			if (menuUrl.indexOf("?")>0) {
				pageUrl = "${basePath}"+menuUrl+"&menuIndex="+menuId;
			} else {
				pageUrl = "${basePath}"+menuUrl+"?menuIndex="+menuId;
			}
		}
	}
	
	window.location.href = pageUrl;
	
}
</script>

 	