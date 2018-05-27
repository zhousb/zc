$(function() {
	var cases = new Cases();
	cases.init();
});
function Cases() {
}

function editView(id) {
	if (id == null && id == "") {
		bootbox.alert("请求参数错误！");
		return;
	}
	window.location.href = basePath + '/cases/toedit?menuIndex='+menuIndex+'&id=' + id;
}

function addView(){
	window.location.href = basePath + '/cases/toadd?menuIndex='+menuIndex;
}

function deleteView(id) {
	if (id == null && id == "") {
		bootbox.alert("请求参数错误！");
		return;
	}
	bootbox.confirm({
		buttons : {
			confirm : {
				label : '确认',
				className : 'btn-myStyle'
			},
			cancel : {
				label : '取消',
				className : 'btn-default'
			}
		},
		message : '是否确定删除？',
		callback : function(result) {
			if (result) {
				ajaxController.ajax({
					method : "POST",
					url : basePath + "/cases/delete",
					dataType : "json",
					showWait : true,
					data : {
						"id" : id
					},
					message : "正在提交中..",
					success : function(data) {
						$('#queryBtn').trigger("click");
						bootbox.alert(data.statusInfo);
					},
					error : function(data) {
						bootbox.alert("删除失败，请稍后重试");
					}
				});
			}
		}
	});
}

// 业务参数
var casesParams = {};
Cases.prototype = {

	init : function() {
		this.bindEvents();
		$('#queryBtn').trigger("click");
	},
	bindEvents : function() {
		_this = this;
		$("#queryBtn").click(function() {
			casesParams.title = $("#title").val();
			casesParams.type = $("#type").val();
			casesParams.istop = $("#istop").val();
			casesParams.isshow = $("#isshow").val();
			casesParams.author = $("#author").val();
			_this.bindDataToTable();
		});
	},

	getQueryParams : function(params) {
		params.title = casesParams["title"];
		params.type = casesParams["type"];
		params.istop = casesParams["istop"];
		params.isshow = casesParams["isshow"];
		params.author = casesParams["author"];
		return params;
	},
	bindDataToTable : function() {
		messageController.showWait('正在查询...');
		// 销毁
		$('#reportTable').bootstrapTable('destroy');
		_this = this;
		$('#reportTable')
				.bootstrapTable(
						{
							method : 'post',
							url : basePath + '/cases/query',
							queryParams : _this.getQueryParams,
							cache : false,
							height : 450,
							striped : true,
							pagination : true,
							sidePagination : "server",
							pageSize : 20,
							pageNumber : 1,
							pageList : [ 20, 50, 100 ],
							showColumns : true,
							showRefresh : true,
							search : true,
							strictSearch : true,
							contentType : 'application/x-www-form-urlencoded',
							paginationPreText : '上一页',
							paginationNextText : '下一页',
							clickToSelect : true,
							columns : [
									{
										field : "seqNo",
										title : "编号",
										align : "center",
										valign : "middle",
										sortable : "true"
									},
									{
										field : "title",
										title : "标题",
										align : "center",
										valign : "middle",
										sortable : "true"
									},
									{
										field : "type",
										title : "类型",
										align : "center",
										valign : "middle",
										sortable : "false",
										formatter : function(value, row, index) {
											if(value=="0"){
												return "解决方案";
											}else if(value=="1"){
												return "案例";
											}else{
												return "未知";
											}
										}
									},
									{
										field : "isshow",
										title : "是否显示",
										align : "center",
										valign : "middle",
										sortable : "false",
										formatter : function(value, row, index) {
											if(value=="0"){
												return "否";
											}else if(value=="1"){
												return "是";
											}else{
												return "未知";
											}
										}
									},
									{
										field : "istop",
										title : "是否置顶",
										align : "center",
										valign : "middle",
										sortable : "false",
										formatter : function(value, row, index) {
											if(value=="0"){
												return "否";
											}else if(value=="1"){
												return "是";
											}else{
												return "未知";
											}
										}
									},
									{
										field : "headimg",
										title : "头图",
										align : "center",
										valign : "middle",
										sortable : "false",
										formatter : function(value, row, index) {
											return "<img src='"+basePath+"/images/showImg/"+value+"' style='width:60px;60px;' />";
										}
									},
									{
										field : "resume",
										title : "描述",
										align : "center",
										valign : "middle",
										sortable : "true"
									},
									{
										field : "author",
										title : "作者",
										align : "center",
										valign : "middle",
										sortable : "true"
									},
									{
										field : "status",
										title : "操作",
										align : "left",
										valign : "middle",
										sortable : "false",
										formatter : function(value, row, index) {
											var e = '<i class="glyphicon glyphicon-edit"/><a href="javascript:editView('
													+ row.seqNo
													+ ');" style="color:red">编辑</a>';
											e += '<i class="glyphicon glyphicon-trash"/><a href="javascript:deleteView('
													+ row.seqNo
													+ ');" style="color:red">删除</a>';
											return e;
										}
									} ],
							formatNoMatches : function() {
								return '无符合条件的记录';
							},
							onLoadError : function(status) {
								messageController.hideWait();
								$('#reportTable').bootstrapTable('removeAll');
								bootbox.alert({
									title : "提示",
									message : "网络故障，请稍后再试！"
								});
							},
							onLoadSuccess : function(data) {
								messageController.hideWait();

							},
							responseHandler : function(res) {
								// 数据处理
								if (res.statusCode != 1) {
									// 响应失败
									bootbox.alert({
										title : "提示",
										message : "网络故障，请稍后再试！"
									});
									return {};
								} else {
									return res.data
								}
							}
						});

	}

}