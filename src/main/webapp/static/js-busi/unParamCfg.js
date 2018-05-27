$(function() {
	var unParamCfg = new UnParamCfg();
	unParamCfg.init();
});
function UnParamCfg() {
}

function editView(id) {
	if (id == null && id == "") {
		bootbox.alert("请求参数错误！");
		return;
	}
	window.location.href = basePath + '/paramCfg/tounedit?menuIndex='+menuIndex+'&id=' + id ;
}

function addView(){
	window.location.href = basePath + '/paramCfg/tounadd?menuIndex='+menuIndex;
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
					url : basePath + "/paramCfg/undelete",
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
var unParamCfgParams = {};
UnParamCfg.prototype = {

	init : function() {
		this.bindEvents();
		$('#queryBtn').trigger("click");
	},
	bindEvents : function() {
		_this = this;
		$("#queryBtn").click(function() {
			unParamCfgParams.tenid = $("#tenid").val();
			unParamCfgParams.plan = $("#plan").val();
			unParamCfgParams.apn = $("#apn").val();
			_this.bindDataToTable();
		});
	},

	getQueryParams : function(params) {
		params.tenid = unParamCfgParams["tenid"];
		params.plan = unParamCfgParams["plan"];
		params.apnType = unParamCfgParams["apn"];
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
							url : basePath + '/paramCfg/unQueryCfg',
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
										field : "tenantId",
										title : "租户",
										align : "center",
										valign : "middle",
										sortable : "true"
									},
									{
										field : "apnType",
										title : "APN类型",
										align : "center",
										valign : "middle",
										sortable : "true"
									},
									{
										field : "planId",
										title : "资费计划",
										align : "center",
										valign : "middle",
										sortable : "true"
									},
									{
										field : "effTime",
										title : "生效时间",
										align : "center",
										valign : "middle",
										sortable : "true"
									},
									{
										field : "expTime",
										title : "失效时间",
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
										// 数据返回处理
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