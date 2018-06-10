$(function(){
	
	var queryCustomer = new QueryCustomer();
	queryCustomer.init();
	
});

function QueryCustomer() {


}
function userAuthDetailView(id){
	//查看记录
	var reqUrl = basePath + "/authMgr/userAuthDetail?menuIndex="+menuIndex+"&id="+id;
	//alert(reqUrl);
	window.location.href = reqUrl;
	
}

//业务参数
var qParams = {};

QueryCustomer.prototype = {

	init : function() {
		this.bindEvents();
		$('#queryBtn').trigger("click");
	},
	bindEvents : function() {
		_this = this;
		$("#queryBtn").click(function(){
			qParams.userName = $("#userName").val();
			qParams.identityCard = $("#identityCard").val();;
			qParams.phone = $("#phone").val();;
			_this.bindDataToTable();
		});
	},
	
	getQueryParams : function(params){
		params.userName = qParams["userName"];
		params.identityCard =qParams["identityCard"];
		params.phone = qParams["phone"];
		return params;
	},
	bindDataToTable : function(){
		messageController.showWait('正在查询...');
		//销毁
		$('#reportTable').bootstrapTable('destroy');  
		_this = this;
		$('#reportTable').bootstrapTable({
			method: 'post',
			url: basePath+'/customers/queryCustomer.do', 
			queryParams: _this.getQueryParams,
			cache: false,
			height: 450,
			striped: true,
			pagination: true,
			sidePagination: "server", //表示服务端请求 
			pageSize: 20,
			pageNumber:1,
			pageList: [20, 50, 100],
			showColumns: true,
			showRefresh: true,
			//search: true,
			strictSearch:true,
			contentType:'application/x-www-form-urlencoded',
			paginationPreText:'上一页',
			paginationNextText:'下一页',
			clickToSelect: true,
			columns: [
			          {field:"id",title:"编号",align:"center",valign:"middle",sortable:"true"},
			          {field:"username",title:"姓名",align:"center",valign:"middle",sortable:"true"},
			          {field:"identitycard",title:"身份证号",align:"center",valign:"middle",sortable:"true"},
			          {field:"sex",title:"性别",align:"center",valign:"middle",sortable:"true"},
			          {field:"marriage",title:"婚姻状况",align:"center",valign:"middle",sortable:"true"},
			          {field:"phone",title:"手机号码",align:"center",valign:"middle",sortable:"true"},
			          {field:"profession",title:"职业",align:"center",valign:"middle",sortable:"true"},
			          {field:"annualincome",title:"年收入(万)",align:"center",valign:"middle",sortable:"true"},
			          {field:"id",title:"操作",align:"center",valign:"middle",sortable:"true",
			        	  //数据返回处理
			        	  formatter:function(value,row,index){
			        			 var e = '<a href="javascript:userAuthDetailView('+row.id+');" style="color:green">查看</a>|<a href="javascript:userAuthDetailView('+row.id+');" style="color:green">编辑</a>';  
			                     return e;   
			               } 
			          
			          }
			          ],
            formatNoMatches: function(){
            	return '无符合条件的记录';
            },
            onLoadError:function(status){
            	messageController.hideWait();
            	$('#reportTable').bootstrapTable('removeAll');
            	//bootbox.alert({title:"提示", message:"网络故障，稍后再试！"});
            },
            onLoadSuccess : function(data){
            	messageController.hideWait();
            	
            },
            responseHandler:function(res){
            	//数据处理
            	if(res.statusCode != 200){
            		//响应失败
            		bootbox.alert({title:"提示", message:"网络故障，请稍后再试！"});
            		return {};
            	}
            	else{
            		return res.data;
            	}
            }
		});
        
	}

};