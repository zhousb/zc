<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<div class="leftnav">
<style>
header .nav-header.collapsed > span.glyphicon-chevron-toggle:before {
   content: "\e114";
}

header .nav-header > span.glyphicon-chevron-toggle:before {
    content: "\e113";
}
header .nav ul li a {
	padding-right:5px !important;
}
</style>
<div class="panel panel-default" id="leftMenus">

</div>
</div>

<textarea id="lefttmpl" style="display:none">
<div class="panel-heading">
		<a href="#" class="nav-header">
			<i class="glyphicon glyphicon-th-list"></i>&nbsp;
				{$T.menuName}
		</a>
</div>
<div class="panel-body" style="padding:0px;height:550px;">
<ul  class="nav nav-list  secondmenu" style="height: 0px;">
{#foreach $T.subMenu as record}
	<li style="border-bottom:solid 1px #eee;"><a href="javascript:loadPage('{$T.record.menuId}','{$T.record.menuUrl}')">&nbsp;&nbsp;<i class="{$T.record.iconClass}"></i>&nbsp;{$T.record.menuName}</a></li>
{#/for}
</ul>
</div>
</textarea>


<script type="text/javascript">
//加载左侧菜单
ajaxController.ajax({
	method : "GET",
	url : basePath + "/menuMgr/loadLeftMenu?menuIndex="+menuIndex,
	dataType : "json",
	showWait : false,
	message : "请稍后...",
	success : function(data) {
		if(data.statusCode == '1'){
			 $("#leftMenus").setTemplateElement("lefttmpl");
   			 // 给模板加载数据
  			 $("#leftMenus").processTemplate(data.data);
		}
		else{					
			bootbox.alert({title:"提示", message:"网络故障，请稍后再试！"});
		}
	},
	error : function(data) {
					
	}
});
</script>
