$(function() {
	new Apis().init();
});

function Apis() {

	// 查询
	this.queryBtn = $('#queryBtn');
	// 新增
	this.addBtn = $('#addBtn');
	// 批量删除
	this.delBtn = $('#delBtn');
}

Apis.prototype = {

	init : function() {
		this.bindEvents();
		this.query();
	},

	getParams : function(params) {
		// 状态
		params.status = $('#status option:selected').val();
		// 服务目录
		params.apiType = $('#apiType').val();
		return params;
	},

	bindEvents : function() {
		var _this = this;
		_this.queryBtn.click(function() {
			_this.query();
		});
		_this.addBtn.click(function() {
			_this.addApi();
		});
		_this.delBtn.click(function() {
			_this.delApis();
		});
	},

	// 查询
	query : function() {
		messageController.showWait('正在查询...');
		// 销毁
		$('#apisTable').bootstrapTable('destroy');
		_this = this;
		$('#apisTable')
				.bootstrapTable(
						{
							method : 'post',
							url : basePath + '/apis/query',
							queryParams : function(params) {
								return _this.getParams(params);
							},
							cache : false,
							striped : true,
							toolbar: '#toolbar',
							pagination : true,
							sidePagination : "server",
							pageSize : 20,
							pageNumber : 1,
							pageList : [ 20, 50, 100 ],
							showColumns : true,
							showRefresh : true,
							sortable: false,
							search : false,
							strictSearch : true,
							contentType : 'application/x-www-form-urlencoded',
							paginationPreText : '上一页',
							paginationNextText : '下一页',
							clickToSelect : true,
							columns : [
									{
										checkbox: true
									},
									{
										field : "apiCode",
										title : "服务编码",
										align : "center",
										valign : "middle",
										sortable : "false"
									},
									{
										field : "apiName",
										title : "服务名称",
										align : "center",
										valign : "middle",
										sortable : "false",
										// 数据返回处理
										formatter : function(value, row, index) {
											var html = '<a href="'+basePath+'/apis/edit?seqNo='+row.seqNo+'&menuIndex='+menuIndex+'">'+row.apiName+'</a>';
											return html;
										}
									},
									{
										field : "apiDesc",
										title : "服务描述",
										align : "center",
										valign : "middle",
										sortable : "false"
									},
									{
										field : "apiTypeName",
										title : "分类目录",
										align : "center",
										valign : "middle",
										sortable : "false"
									},
									{
										field : "status",
										title : "状态",
										align : "center",
										valign : "middle",
										sortable : "false",
										formatter : function(value, row, index) {
											if (row.status=="0") {
												return "已发布";
											} else {
												return "未发布";
											}
										}
									},
									{
										field : "registerTime",
										title : "日期",
										align : "center",
										valign : "middle",
										sortable : "false"
									}],
							formatNoMatches : function() {
								return '无符合条件的记录';
							},
							onLoadError : function(status) {
								messageController.hideWait();
								$('#apisTable').bootstrapTable('removeAll');
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

	},

	// 新增
	addApi : function() {
		window.location.href = basePath+'/apis/add?menuIndex='+menuIndex;
	},

	// 删除
	delApis : function() {
		var apiCodes = [];
		
		$('[name="btSelectItem"]:checked').each(function() {
			apiCodes.push($(this).parent('td').next().text());
		});
		if ($('[name="btSelectItem"]:checked').length == 0) {
			return bootbox.alert({
				title : "提示",
				message : "请勾选至少一个服务"
			});
		}
		bootbox.confirm({
			message : '确定要删除？',
			callback : function(result) {
				if (result) {
					var param = {};
					param.apiCodes = apiCodes;
					ajaxController.ajax({
						method : "POST",
						url : basePath + "/apis/delApis",
						dataType : "json",
						showWait : true,
						data : param,
						message : "正在提交中..",
						success : function(data) {
							bootbox.alert({
								title : "提示",
								message : "删除成功",
								callback : function() {
									history.go(0);
								}
							});
						},
						error : function(data) {
							bootbox.alert({
								title : "提示",
								message : "删除失败，请稍后重试"
							});
						}
					});
				}
			},
			title : "确认",
		});
	}
}