$(function(){
	
	var userAuth = new UserAuth();
	userAuth.init();
	
});

function UserAuth() {


}
function userAuthDetailView(id){
	//查看记录
	var reqUrl = basePath + "/authMgr/userAuthDetail?menuIndex="+menuIndex+"&id="+id;
	//alert(reqUrl);
	window.location.href = reqUrl;
	
}

//业务参数
var userAuthParams = {};

UserAuth.prototype = {

	init : function() {
		this.bindEvents();
		$('#queryBtn').trigger("click");
	},
	bindEvents : function() {
		_this = this;
		$("#queryBtn").click(function(){
			userAuthParams.companyName = $("#companyName").val();
			userAuthParams.startTime = $("#datetimeStart").val();;
			userAuthParams.endTime = $("#datetimeEnd").val();;
			_this.bindDataToTable();
		});
	},
	
	getQueryParams : function(params){
		params.companyName = userAuthParams["companyName"];
		params.startTime =userAuthParams["startTime"];
		params.endTime = userAuthParams["endTime"];
		return params;
	},
	bindDataToTable : function(){
		messageController.showWait('正在查询...');
		//销毁
		$('#reportTable').bootstrapTable('destroy');  
		_this = this;
		$('#reportTable').bootstrapTable({
			method: 'post',
			url: basePath+'/authMgr/getUserData', 
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
			search: true,
			strictSearch:true,
			contentType:'application/x-www-form-urlencoded',
			paginationPreText:'上一页',
			paginationNextText:'下一页',
			clickToSelect: true,
			columns: [
			          {field:"id",title:"编号",align:"center",valign:"middle",sortable:"true"},
			          {field:"userName",title:"用户名",align:"center",valign:"middle",sortable:"true"},
			          {field:"companyName",title:"公司名称",align:"center",valign:"middle",sortable:"true"},
			          {field:"businessNo",title:"营业执照编号",align:"center",valign:"middle",sortable:"true"},
			          {field:"taxNo",title:"税务登记证号",align:"center",valign:"middle",sortable:"true"},
			          {field:"phoneName",title:"联系人",align:"center",valign:"middle",sortable:"true"},
			          {field:"phoneNo",title:"联系电话",align:"center",valign:"middle",sortable:"true"},
			          {field:"recordCreateTime",title:"创建时间",align:"center",valign:"middle",sortable:"true"},
			          {field:"status",title:"状态/操作",align:"left",valign:"middle",sortable:"true",
			        	  //数据返回处理
			        	  formatter:function(value,row,index){
			        		  if(value == '1'){
			        			  //审核通过
			        			  var e = '<i class="glyphicon glyphicon-eye-open"/><a href="javascript:userAuthDetailView('+row.id+');" style="color:green">审核通过</a>';  
			                      return e;
			        		  }
			        		  else if(value == '2'){
			        			  //审核未通过
			        			  var e = '<i class="glyphicon glyphicon-eye-open"/><a href="javascript:userAuthDetailView('+row.id+');" style="color:red">审核未通过</a>';  
			                      return e;
			        		  }
			        		  else if(value == '3'){
			        			  //待审核
			        			  var e = '<i class="glyphicon glyphicon-eye-open"/><a href="javascript:userAuthDetailView('+row.id+');" style="color:red">待审核</a>';  
			                      return e;
			        		  }
			        		  else{
			        			  
			        			  var e = '<i class="glyphicon glyphicon-eye-open"/><a href="javascript:userAuthDetailView('+row.id+');" style="color:red">待审核</a>';  
			                      return e;
			        		  }
			                     
			               } 
			          
			          }
			          ],
            formatNoMatches: function(){
            	return '无符合条件的记录';
            },
            onLoadError:function(status){
            	messageController.hideWait();
            	$('#reportTable').bootstrapTable('removeAll');
            	bootbox.alert({title:"提示", message:"网络故障，请稍后再试！"});
            },
            onLoadSuccess : function(data){
            	messageController.hideWait();
            	
            },
            responseHandler:function(res){
            	//数据处理
            	if(res.statusCode != 1){
            		//响应失败
            		bootbox.alert({title:"提示", message:"网络故障，请稍后再试！"});
            		return {};
            	}
            	else{
            		return res.data
            	}
            }
		});
        
	}

}