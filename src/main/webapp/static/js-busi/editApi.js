$(function() {
	new EditApi().init();
});

function EditApi() {

	this.params = {};

	// 查询
	this.querytBtn = $('#queryBtn');

	// 第二步
	this.nextStepTwoBtn = $('#nextStepTwoBtn');
	// 第三步
	this.nextStepThreeBtn = $('#nextStepThreeBtn');

	// 返回第二步
	this.prevStepTwoBtn = $('#prevStepTwoBtn');
	// 返回第一步
	this.prevStepOneBtn = $('#prevStepOneBtn');
	// 新增
	this.addBtn = $('#addBtn');
	// 新增入参信息
	this.addInParamBtn = $('#addInParamBtn');
	// 新增出参信息
	this.addOutParamBtn = $('#addOutParamBtn');
}

EditApi.prototype = {

	init : function() {
		this.bindEvents();
		this.querySystemErrors();
		this.queryBusiErrors();
		
		if ($("#inParamArea").html().trim() === "") {
			var inParamHtml = $.templates("#inParamTempl").render();
			$("#inParamArea").html(inParamHtml);
		}
		if ($("#outParamArea").html().trim() === "") {
			var outParamHtml = $.templates("#outParamTempl").render();
			$("#outParamArea").html(outParamHtml);
		}
	},

	bindEvents : function() {
		var _this = this;
		_this.nextStepTwoBtn.click(function() {
			if (!_this.checkApiBaseInfo()) {
				var $a2 = $('#collapseTwo').prev().find('a');
				$a2.attr('href', '#collapseTwo');
				$a2.trigger('click');

				var $a1 = $('#collapseOne').prev().find('a');
				$a1.trigger('click');
				$a1.attr('href', '');
			}
		});

		_this.nextStepThreeBtn.click(function() {
			var callbackFunction = function() {
				var $a3 = $('#collapseThree').prev().find('a');
				$a3.attr('href', '#collapseThree');
				$a3.trigger('click');

				var $a2 = $('#collapseTwo').prev().find('a');
				$a2.trigger('click');
				$a2.attr('href', '');
			}
			_this.checkApiParamInfo(callbackFunction);
		});

		_this.prevStepTwoBtn.click(function() {
			var $a3 = $('#collapseThree').prev().find('a');
			$a3.trigger('click');
			$a3.attr('href', '');

			var $a2 = $('#collapseTwo').prev().find('a');
			$a2.attr('href', '#collapseTwo');
			$a2.trigger('click');
		});

		_this.prevStepOneBtn.click(function() {
			var $a2 = $('#collapseTwo').prev().find('a');
			$a2.trigger('click');
			$a2.attr('href', '');

			var $a1 = $('#collapseOne').prev().find('a');
			$a1.attr('href', '#collapseOne');
			$a1.trigger('click');
		});

		_this.addBtn.click(function() {
			_this.checkApiErrorCodeInfo();
		});

		_this.addInParamBtn
				.click(function() {
					var trHtml = $('#inParamArea').find("tr:last").html();

					var $tdLast = $('#inParamArea').find("tr:last").find(
							"td:last");
					var lastTdHtml = $tdLast.html();
					if ($tdLast.find('button').length == 0) {
						lastTdHtml += '<button id="rmInParamBtn" type="button" class="btn btn-default pl-5">'
								+ '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除'
								+ '</button>';
					}
					$('#inParamArea').append("<tr>" + trHtml + "</tr>");
					$('#inParamArea').find("tr:last").find("td:last").html(
							lastTdHtml);
				});

		_this.addOutParamBtn
				.click(function() {
					var trHtml = $('#outParamArea').find("tr:last").html();

					var $tdLast = $('#outParamArea').find("tr:last").find(
							"td:last");
					var lastTdHtml = $tdLast.html();
					if ($tdLast.find('button').length == 0) {
						lastTdHtml += '<button id="rmOutParamBtn" type="button" class="btn btn-default pl-5">'
								+ '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除'
								+ '</button>';
					}
					$('#outParamArea').append("<tr>" + trHtml + "</tr>");
					$('#outParamArea').find("tr:last").find("td:last").html(
							lastTdHtml);
				});

		$(document).on('click', '#rmInParamBtn', function() {
			$(this).parent('td').parent('tr').remove();
		});

		$(document).on('click', '#rmOutParamBtn', function() {
			$(this).parent('td').parent('tr').remove();
		});
	},

	querySystemErrors : function() {
		// messageController.showWait('正在查询...');
		// 销毁
		$('#systemErrorsTable').bootstrapTable('destroy');
		_this = this;
		$('#systemErrorsTable')
				.bootstrapTable(
						{
							method : 'post',
							url : basePath + '/apis/queryErrorCodes',
							queryParams : function(params) {
								params.errorType = 'SYS';
								return params;
							},
							cache : false,
							striped : true,
							pagination : true,
							sidePagination : "server",
							pageSize : 20,
							pageNumber : 1,
							pageList : [ 20, 50, 100 ],
							showRefresh : true,
							sortable : false,
							search : false,
							strictSearch : true,
							contentType : 'application/x-www-form-urlencoded',
							paginationPreText : '上一页',
							paginationNextText : '下一页',
							clickToSelect : true,
							columns : [ {
								checkbox : true
							}, {
								field : "errorCode",
								title : "错误码",
								align : "center",
								width : '10%',
								valign : "middle",
								sortable : "false"
							}, {
								field : "errorDesc",
								title : "错误说明",
								align : "center",
								valign : "middle",
								sortable : "false"
							} ],
							formatNoMatches : function() {
								return '无符合条件的记录';
							},
							onLoadError : function(status) {
								// messageController.hideWait();
								$('#systemErrorsTable').bootstrapTable(
										'removeAll');
								bootbox.alert({
									title : "提示",
									message : "网络故障，请稍后再试！"
								});
							},
							onLoadSuccess : function(data) {
								// messageController.hideWait();

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
							},
							onCheck : function(obj) {
								var html = $.templates("#selectErrorsTempl")
										.render(obj);
								$('#selectSystemErrors').append(html);
							},

							onUncheck : function(obj) {
								$('#selectSystemErrors')
										.find('a')
										.each(
												function() {
													if ($(this).find('span')
															.find('font')
															.text() == obj.errorCode) {
														$(this).remove();
													}
												});
							},

							onCheckAll : function(obj) {
								var selectedErrors = [];
								$('#selectSystemErrors').find('a').each(
										function() {
											selectedErrors
													.push($(this).find('span')
															.find('font')
															.text());
										});
								var tempData = [];
								for (var i = 0; i < obj.length; i++) {
									if ($.inArray(obj[i].errorCode,
											selectedErrors) == -1) {
										tempData.push(obj[i]);
									}
								}
								var html = $.templates("#selectErrorsTempl")
										.render(tempData);
								$('#selectSystemErrors').append(html);
							},

							onUncheckAll : function(obj) {
								$('#selectSystemErrors')
										.find('a')
										.each(
												function() {
													var errorCode = $(this)
															.find('span').find(
																	'font')
															.text();
													for (var i = 0; i < obj.length; i++) {
														if (errorCode == obj[i].errorCode) {
															$(this).remove();
														}
													}
												});
							},
						});
	},

	queryBusiErrors : function() {
		// messageController.showWait('正在查询...');
		// 销毁
		$('#busiErrorsTable').bootstrapTable('destroy');
		_this = this;
		$('#busiErrorsTable')
				.bootstrapTable(
						{
							method : 'post',
							url : basePath + '/apis/queryErrorCodes',
							queryParams : function(params) {
								params.errorType = 'BUSI';
								return params;
							},
							cache : false,
							striped : true,
							pagination : true,
							sidePagination : "server",
							pageSize : 20,
							pageNumber : 1,
							pageList : [ 20, 50, 100 ],
							showRefresh : true,
							sortable : false,
							search : false,
							strictSearch : true,
							contentType : 'application/x-www-form-urlencoded',
							paginationPreText : '上一页',
							paginationNextText : '下一页',
							clickToSelect : true,
							columns : [ {
								checkbox : true
							}, {
								field : "errorCode",
								title : "错误码",
								align : "center",
								width : '10%',
								valign : "middle",
								sortable : "false"
							}, {
								field : "errorDesc",
								title : "错误说明",
								align : "center",
								valign : "middle",
								sortable : "false"
							} ],
							formatNoMatches : function() {
								return '无符合条件的记录';
							},
							onLoadError : function(status) {
								// messageController.hideWait();
								$('#busiErrorsTable').bootstrapTable(
										'removeAll');
								bootbox.alert({
									title : "提示",
									message : "网络故障，请稍后再试！"
								});
							},
							onLoadSuccess : function(data) {
								// messageController.hideWait();

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
							},
							onCheck : function(obj) {
								var html = $.templates("#selectErrorsTempl")
										.render(obj);
								$('#selectBusiErrors').append(html);
							},

							onUncheck : function(obj) {
								$('#selectBusiErrors')
										.find('a')
										.each(
												function() {
													if ($(this).find('span')
															.find('font')
															.text() == obj.errorCode) {
														$(this).remove();
													}
												});
							},
							onCheckAll : function(obj) {
								var selectedErrors = [];
								$('#selectBusiErrors').find('a').each(
										function() {
											selectedErrors
													.push($(this).find('span')
															.find('font')
															.text());
										});
								var tempData = [];
								for (var i = 0; i < obj.length; i++) {
									if ($.inArray(obj[i].errorCode,
											selectedErrors) == -1) {
										tempData.push(obj[i]);
									}
								}
								var html = $.templates("#selectErrorsTempl")
										.render(tempData);
								$('#selectBusiErrors').append(html);
							},

							onUncheckAll : function(obj) {
								$('#selectBusiErrors')
										.find('a')
										.each(
												function() {
													var errorCode = $(this)
															.find('span').find(
																	'font')
															.text();
													for (var i = 0; i < obj.length; i++) {
														if (errorCode == obj[i].errorCode) {
															$(this).remove();
														}
													}
												});
							},
						});

	},

	checkApiBaseInfo : function() {
		// api目录
		this.params.apiType = $('#apiType').val();
		// api编码
		this.params.apiCode = $('#apiCode').val();
		// api名称
		this.params.apiName = $('#apiName').val();
		// api描述
		this.params.apiDesc = $('#apiDesc').val();
		// api地址
		this.params.apiAddress = $('#apiAddress').val();
		// api方法
		this.params.apiMethod = $('#apiMethod').val();
		// O2P地址
		this.params.o2pUrl = $('#o2pUrl').val();
		// 备注
		this.params.remark = $('#remark').val();
		// 请求示例
		this.params.sampleRequest = $('#sampleRequest').val();
		// 返回示例
		this.params.sampleResult = $('#sampleResult').val();
		// 状态
		this.params.status = $('#status option:selected').val();
		// 更新标识
		this.params.seqNo = 1;
		if (!this.params.apiType) {
			return bootbox.alert({
				title : "提示",
				message : "请选择服务目录"
			});
		}
		if (!this.params.apiCode) {
			return bootbox.alert({
				title : "提示",
				message : "请输入服务编码"
			});
		}
		if (!this.params.apiName) {
			return bootbox.alert({
				title : "提示",
				message : "请输入服务名称"
			});
		}
		if (!this.params.apiDesc) {
			return bootbox.alert({
				title : "提示",
				message : "请输入服务描述"
			});
		}
		if (!this.params.apiAddress) {
			return bootbox.alert({
				title : "提示",
				message : "请输入服务地址"
			});
		}
		if (!this.params.apiMethod) {
			return bootbox.alert({
				title : "提示",
				message : "请输入服务方法"
			});
		}
		if (!this.params.sampleRequest) {
			return bootbox.alert({
				title : "提示",
				message : "请输入请求示例"
			});
		}
		if (!this.params.sampleResult) {
			return bootbox.alert({
				title : "提示",
				message : "请输入返回示例"
			});
		}
	},

	checkApiParamInfo : function(obj) {
		var inParams = [];
		var outParams = [];

		$('#inParamArea').find('tr').each(function() {
			var item = {};
			var $tds = $(this).find('td');
			item.paramField = $tds.eq(0).find('input').val();
			item.paramName = $tds.eq(1).find('input').val();
			item.paramDesc = $tds.eq(2).find('input').val();
			item.dataType = $tds.eq(3).find('select option:selected').val();
			item.isNull = $tds.eq(4).find('select option:selected').val();
			if ($.trim(item.paramField) != '') {
				inParams.push(item);
			}
		});
		$('#outParamArea').find('tr').each(function() {
			var item = {};
			var $tds = $(this).find('td');
			item.paramField = $tds.eq(0).find('input').val();
			item.paramName = $tds.eq(1).find('input').val();
			item.paramDesc = $tds.eq(2).find('input').val();
			item.dataType = $tds.eq(3).find('select option:selected').val();
			if ($.trim(item.paramField) != '') {
				outParams.push(item);
			}
		});
		
		this.params.inParamDefVOs = inParams;
		this.params.outParamDefVOs = outParams;
		if (inParams.length == 0) {
			return bootbox.confirm({
				message : '没有填写入参信息？',
				callback : function(result) {
					if (result) {
						obj();
					}
				},
				title : "确认",
			});
		}

		if (outParams.length == 0) {
			return bootbox.confirm({
				message : '没有填写出参信息？',
				callback : function(result) {
					if (result) {
						obj();
					}
				},
				title : "确认",
			});
		}
		obj();
	},

	checkApiErrorCodeInfo : function() {
		var _this = this;
		var errorCodes = [];
		$('#selectSystemErrors').find('a')
			.each(function() {
					var errorCode = $(this).find('span').find('font').text();
					errorCodes.push(errorCode);
		});
		$('#selectBusiErrors').find('a')
			.each(function() {
				var errorCode = $(this).find('span').find('font').text();
				errorCodes.push(errorCode);
		});
		this.params.errors = errorCodes;
		if (errorCodes.length == 0) {
			return bootbox.confirm({
				message : '没有选择错误码？',
				callback : function(result) {
					if (result) {
						_this.submit();
					}
				},
				title : "确认",
			});
		}
		_this.submit();
	},
	
	submit : function() {
		messageController.showWait('正在提交...');
		var _this = this;
		var paramStr = JSON.stringify(_this.params);  
		$.ajax({
			type : "POST",
			url : basePath + "/apis/saveOrUpdate",
			contentType: "application/json; charset=utf-8", 
			dataType : "json",
			data : paramStr,
			success : function(data) {
				messageController.hideWait();
				bootbox.alert({title:"提示", message:"更新成功", callback:function(){
						history.go(0);
					}
				});
			},
			error : function(data) {
				messageController.hideWait();
				bootbox.alert({title:"提示", message:"更新失败，请稍后重试"});
			}
		});
	}
}