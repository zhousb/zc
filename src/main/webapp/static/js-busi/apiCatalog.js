$(function(){
	new ApiCatalog().init();
});

function ApiCatalog() {

	this.params = {};

	// 查询
	this.querytBtn = $('#queryBtn');
	// 新增
	this.addBtn = $('#addBtn');
	// 批量操作
	this.applyBtn = $('[name="applyBtn"]');
}

function editApiType(apiType) {
	layer.open({
        type: 2,
        title : '服务目录详情',
        area: ['1000px' , '85%'],
        fix: true, //不固定,
        scrollbar: false,
        shift:2,
        maxmin: true,
        content: [basePath + "/apiCatalog/edit?apiType="+apiType]
    });
}

ApiCatalog.prototype = {

	init : function() {
		this.bindEvents();
		this.query();
	},

	getParams : function() {
		// 卡号
		this.params.iccid = $('#iccid').val();
		// 设备类型
		this.params.terminalType = $('#terminalType option:selected').val();
		// 设备号
		this.params.terminalId = $('#terminalId').val();
		return this.params;
	},

	bindEvents : function() {
		var _this = this;
		_this.addBtn.click(function(){
			_this.addApiType();
		});
		_this.applyBtn.click(function(){
			var $applySelect = $(this).parent("div").prev().find('[name="applyList"]');
			if ($applySelect.find('option:selected').val() !="") {
				_this.delApiTypes();
			} else {
				return bootbox.alert({title:"提示", message:"请选择一项操作"});
			}
		});
	},

	// 查询
	query : function() {
		$("#appendArea").html("");
		ajaxController.ajax({
			method : "POST",
			url : basePath + "/apiCatalog/query",
			dataType : "json",
			showWait : true,
			data : {},
			message : "正在查询中..",
			success : function(data) {
				var result = data.data;
				var tree = toTreeData(result);
				var appendHtml = getQueryTableHtml(tree);
            	$("#appendArea").html(appendHtml);
			},
			error : function(data) {
				bootbox.alert({title:"提示", message:"查询失败，请稍后重试"});
			}
		});
		
		// 将查询结果转成树状结构
		function toTreeData(data){  
		    var pos={}; 
		    var tree=[];  
		    var i=0;
		    while(data.length!=0){  
		        if (data[i].pApiType=="" || data[i].pApiType==null) {
		        	var treeItem = data[i];
		        	treeItem.subApiTypes = [];
		            tree.push(treeItem);
		            pos[data[i].apiType]=[tree.length-1];
		            data.splice(i,1); 
		            i--;
		        } else {
		            var posArr=pos[data[i].pApiType];
		            if(posArr!=undefined){
		                var obj=tree[posArr[0]];  
		                for(var j=1;j<posArr.length;j++){  
		                    obj=obj.subApiTypes[posArr[j]];
		                }  
		                var treeItem = data[i];
		                treeItem.subApiTypes = [];
		                obj.subApiTypes.push(treeItem);
		                pos[data[i].apiType]=posArr.concat([obj.subApiTypes.length-1]);
		                data.splice(i,1);
		                i--;
		            }
		        }
		        i++;
		        if(i>data.length-1){
		            i=0;
		        }  
		    }
		    return tree;  
		}
		
		function getQueryTableHtml(tree) {
			var apiTypesHtml = "";
			for (var i=0;i<tree.length;i++) {
				var node = tree[i];
				apiTypesHtml += doAppendSubsNodes(node);
			}
			return apiTypesHtml;
		}
		
		function doAppendSubsNodes(node) {
			var isHasSubNodes = false;
			if (node.subApiTypes && node.subApiTypes.length >0) {
				isHasSubNodes = true;
			}
			
			var apiTypesHtml = '<tr>';
			if (isHasSubNodes) {
				apiTypesHtml = '<tr class="apiTypes"><a href="javascript:void(0)">';
			}
			apiTypesHtml += '<td>';
			if (isHasSubNodes) {
				apiTypesHtml +='<i class="fa fa-plus" style="padding-right:5px;"></i></span>';
			}
			
			var currentNode  = {};
			currentNode = $.extend(true,currentNode,node); 
			currentNode.subApiTypes = "";
			apiTypesHtml += '<input type="checkbox" style="margin-right:5px;" value='+node.apiType;
			if (isHasSubNodes) {
				apiTypesHtml += ' disabled='+isHasSubNodes;
			}
			apiTypesHtml += '>'
				+'<a href="javascript:void(0)" onclick="editApiType(\''+node.apiType+'\')">'+node.apiTypeName+'</a></td>';
			apiTypesHtml += '<td>'+node.apiTypeDesc+'</td>';
			apiTypesHtml += '<td>'+getIsDisplayDesc(node.isDisplay)+'</td>';
			if (isHasSubNodes) {
				apiTypesHtml += '</a></tr>';
			} else {
				apiTypesHtml += '</tr>';
			}
			if (isHasSubNodes) {
				apiTypesHtml += '<tr style="display:none">';
				apiTypesHtml += '<td colspan="3">';
				apiTypesHtml += '<table class="table table-striped table-bordered">';
				for (var i=0;i<node.subApiTypes.length;i++) {
					var moreSubNode = node.subApiTypes[i];
					apiTypesHtml += doAppendSubsNodes(moreSubNode);
				}
				apiTypesHtml += '</table></td></tr>';
			}
			return apiTypesHtml;
		}
		
		function getIsDisplayDesc(isDisPlay) {
			if ("0"==isDisPlay) {
				return "不展示";
			} else {
				return "展示";
			}
		}
	},
	
	// 新增
	addApiType : function() {
		var _this = this;
		var param = {};
		param.apiTypeName = $('#apiTypeName').val();
		param.apiTypeDesc = $('#apiTypeDesc').val();
		param.pApiType = $('#pApiType').val();
		param.isDisplay = $('#isDisplay option:selected').val();
		if (!param.apiTypeName) {
			return bootbox.alert({title:"提示", message:"请输入服务目录名称"});
		}
		ajaxController.ajax({
			method : "POST",
			url : basePath + "/apiCatalog/saveOrUpdate",
			dataType : "json",
			showWait : true,
			data : param,
			message : "正在提交中..",
			success : function(data) {
				bootbox.alert({title:"提示", message:"添加成功", callback:function(){
						history.go(0);
					}
				});
			},
			error : function(data) {
				bootbox.alert({title:"提示", message:"添加失败，请稍后重试"});
			}
		});
	},
	
	// 删除
	delApiTypes : function() {
		var apiTypes = [];
		$("#appendArea :checkbox:checked").each(function(){
			apiTypes.push($(this).val());
		});
		if($("#appendArea :checkbox:checked").length ==0) {
			return bootbox.alert({title:"提示", message:"请选择服务目录类型"});
		}
		var param = {};
		param.apiTypes = apiTypes;
		ajaxController.ajax({
			method : "POST",
			url : basePath + "/apiCatalog/delApiTypes",
			dataType : "json",
			showWait : true,
			data : param,
			message : "正在提交中..",
			success : function(data) {
				bootbox.alert({title:"提示", message:"删除成功", callback:function(){
						history.go(0);
					}
				});
			},
			error : function(data) {
				bootbox.alert({title:"提示", message:"删除失败，请稍后重试"});
			}
		});
	}
}