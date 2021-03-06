<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="staticPath"
	value="${pageContext.request.contextPath}/static" />
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setAttribute("basePath", basePath);
	request.setAttribute("staticPath", basePath + "static");
%>
<html>
<head>
<meta name="menu" content="userAuth" />
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />

<link rel="stylesheet" href="/zc-crm/static/scripts/bootstrap-chinese-region-master/example/lib/bootstrap/bootstrap.css">
<link rel="stylesheet" href="/zc-crm/static/scripts/bootstrap-chinese-region-master/example/lib/bootstrap-chinese-region/bootstrap-chinese-region.css">

<title>客户资料录入</title>
<script src="${staticPath}/customers/addCustomer.js"></script>
<style type="text/css">
</style>
</head>
<body>
	<div class="container">
		<h1>Bootstrap Chinese Region</h1>
		<p>基于bootstrap的中国地区（行政区）选择器</p>
		<div class="row">
			<div class="col-md-6">
				<form action="">
					<div class="form-group">
						<label for="address">地区</label>
						<div class="bs-chinese-region flat dropdown" data-submit-type="id" data-min-level="1" data-max-level="3">
							<input type="text" class="form-control" name="address" id="address" placeholder="选择你的地区" data-toggle="dropdown" readonly="" value="440103">
							<div class="dropdown-menu" role="menu" aria-labelledby="dLabel">
								<div>
									<ul class="nav nav-tabs" role="tablist">
										<li role="presentation" class="active"><a href="#province" data-next="city" role="tab" data-toggle="tab">省份</a></li>
										<li role="presentation"><a href="#city" data-next="district" role="tab" data-toggle="tab">城市</a></li>
										<li role="presentation"><a href="#district" data-next="street" role="tab" data-toggle="tab">县区</a></li>
									</ul>
									<div class="tab-content">
										<div role="tabpanel" class="tab-pane active" id="province">--</div>
										<div role="tabpanel" class="tab-pane" id="city">--</div>
										<div role="tabpanel" class="tab-pane" id="district">--</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<p><button class="btn btn-default" type="submit">提交</button></p>
				</form>
			</div>
		</div>
	</div>


	<script type="text/javascript" src="/zc-crm/static/scripts/bootstrap-chinese-region-master/example/lib/bootstrap-chinese-region/bootstrap-chinese-region.js"></script>
	<script type="text/javascript">
		$.getJSON('/zc-crm/static/scripts/bootstrap-chinese-region-master/example/lib/bootstrap-chinese-region/sql_areas.json',function(data){
			
			for (var i = 0; i < data.length; i++) {
				var area = {id:data[i].id,name:data[i].cname,level:data[i].level,parentId:data[i].upid};
				data[i] = area;
			}

			$('.bs-chinese-region').chineseRegion('source',data);
		});
	</script>
</body>

</html>