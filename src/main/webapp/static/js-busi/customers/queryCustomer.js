$(function(){
	
	var queryCustomer = new QueryCustomer();
	queryCustomer.init();
	
});

function QueryCustomer() {


}
function customerDetailView(id){
	//查看记录
	var params = {};
	params.id=id;
	ajaxController.ajax({
		method : "POST",
		url: basePath+'/customers/queryCustomerById.do',
		dataType : "json",
		showWait : true,
		data : params,
		message : "请稍后...",
		success : function(data) {
			if(data.statusCode == '200'){
				$("#mcid").val(id);
				$("#muserName").val(data.data.username);
				$("#midentityCard").val(data.data.identitycard);
				$("#msex").val(data.data.sex);
				$("#mmarriage").val(data.data.marriage);
				$("#mphone").val(data.data.phone);
				if(data.data.address == ''){
					$("#maddress").attr("placeholder",'未填写');
				}
				else{
					$("#maddress").val(data.data.address);
				}
				if(data.data.wechat == ''){
					$("#mwechat").attr("placeholder",'未填写');
				}
				else{
					$("#mwechat").val(data.data.wechat);
				}
				if(data.data.email == ''){
					$("#memail").attr("placeholder",'未填写');
				}
				else{
					$("#memail").val(data.data.email);
				}
				$("#mprofession").val(data.data.profession);
				$("#mannualIncome").val(data.data.annualincome);
				if(data.data.company == ''){
					$("#mcompany").attr("placeholder",'未填写');
				}
				else{
					$("#mcompany").val(data.data.company);
				}
				$("#mcustomerSource").val(data.data.customersource);
				if(data.data.notes == ''){
					$("#mdesc").attr("placeholder",'无');
				}
				else{
					$("#mdesc").val(data.data.notes);
				}
				$("#customerViewForm input").attr("readOnly",true);
				$("#mdesc").attr("readOnly","readOnly");
				$("#customerViewForm select").attr("disabled",true);
				$("#myModal").modal('toggle');	
				$("#mmodifyBtn").css("display","block");
				$("#maddBtn").css("display","none");
			}
			else if(data.statusCode == '201'){
				bootbox.alert({title:"提示", message:data.statusInfo});
			}
			else{					
				bootbox.alert({title:"提示", message:"网络故障，请稍后重试！"});
			}
		},
		error : function(data) {
			bootbox.alert({title:"提示", message:"网络故障，请稍后重试！"});	
		}
	});
}


function customerDelete(id){
    bootbox.confirm({
        title : "客户详情",
        message: "<p>确定删除该客户信息？</p>", 
        buttons: {
            confirm: {
              label: "确定"
            },
            cancel:{
                label:"取消"
            }
          },        
        callback: function(result) {
        	var params = {};
            if(result) {
            	params.id = id;
    			ajaxController.ajax({
    				method : "POST",
    				url : basePath + "/customers/deleteCustomerById.do",
    				dataType : "json",
    				showWait : true,
    				data : params,
    				message : "请稍后...",
    				success : function(data) {
    					if(data.statusCode == '200'){
    						bootbox.alert({title:"提示", message:data.statusInfo});
    						
    						$('#queryBtn').trigger("click");
    						
    					}
    					else if(data.statusCode == '201'){
    						bootbox.alert({title:"提示", message:data.statusInfo});
    					}
    					else{					
    						bootbox.alert({title:"提示", message:"网络故障，请稍后重试！"});
    					}
    				},
    				error : function(data) {
    					bootbox.alert({title:"提示", message:"网络故障，请稍后重试！"});	
    				}
    			});
               
            }else{
                return;
            }
            
        }
    });
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
		$("#mmodifyBtn").click(function(){
			$("#customerViewForm input").attr("readOnly",false);
			$("#mdesc").attr("readOnly",false);
			$("#customerViewForm select").attr("disabled",false);
			
			$("#mmodifyBtn").css("display","none");
			$("#maddBtn").css("display","block");
		});
		$("#maddBtn").click(function(){
            bootbox.confirm({
                title : "客户详情",
                message: "<p>确定修改该客户信息？</p>", 
                buttons: {
                    confirm: {
                      label: "确定"
                    },
                    cancel:{
                        label:"取消"
                    }
                  },        
                callback: function(result) {
                	var params = {};
                    if(result) {
                    	params.id=$("#mcid").val();
            			if(typeof $("#muserName").val() == "undefined" || $("#muserName").val() == null || $("#muserName").val() == "")
            			{
            				bootbox.alert({title:"提示", message:"用户名不能为空！"});
            				$("#muserName").focus(function(){
            					
            				});
            				$("#muserName").attr('placeholder','用户名不能为空！');
            			    return;
            			}
            			else{
            				params.userName=$("#muserName").val();
            			}
            			
            			if(typeof $("#midentityCard").val() == "undefined" || $("#midentityCard").val() == null || $("#midentityCard").val() == "")
            			{
            				bootbox.alert({title:"提示", message:"身份证不能为空！"});
            				$("#midentityCard").focus(function(){
            					
            				});
            				$("#midentityCard").attr('placeholder','身份证不能为空！');
            			    return;
            			}
            			else{
            				params.identityCard=$("#midentityCard").val();
            			}
            			params.sex=$("#msex").val();
            			params.marriage=$("#mmarriage").val();
            			if(typeof $("#mphone").val() == "undefined" || $("#mphone").val() == null || $("#mphone").val() == "")
            			{
            				bootbox.alert({title:"提示", message:"手机号不能为空！"});
            				$("#mphone").focus(function(){
            					
            				});
            				$("#mphone").attr('placeholder','手机号不能为空！');
            			    return;
            			}
            			else{
            				re = /^1\d{10}$/;
            				if(!re.test($("#mphone").val())){
            					bootbox.alert({title:"提示", message:"请输入以1开头的11位手机号！"});
            					return;
            				}
            				params.phone=$("#mphone").val();
            			}
            			params.address=$("#maddress").val();
            			params.wechat=$("#mwechat").val();
            			params.email=$("#memail").val();
            			params.profession=$("#mprofession").val();
            			params.annualIncome=$("#mannualIncome").val();
            			params.company=$("#mcompany").val();
            			params.customerSource=$("#mcustomerSource").val();
            			params.desc=$("#mdesc").val();
            			ajaxController.ajax({
            				method : "POST",
            				url : basePath + "/customers/updateCustomer.do",
            				dataType : "json",
            				showWait : true,
            				data : params,
            				message : "请稍后...",
            				success : function(data) {
            					if(data.statusCode == '200'){
            						bootbox.alert({title:"提示", message:data.statusInfo});
            						$('#queryBtn').trigger("click");
            					}
            					else if(data.statusCode == '201'){
            						bootbox.alert({title:"提示", message:data.statusInfo});
            					}
            					else{					
            						bootbox.alert({title:"提示", message:"网络故障，请稍后重试！"});
            					}
            				},
            				error : function(data) {
            					bootbox.alert({title:"提示", message:"网络故障，请稍后重试！"});	
            				}
            			});
                       
                    }else{
                        return;
                    }
                    
                }
            });
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
			        		  
			        		  var e = '<a href="javascript:customerDetailView('+row.id+');" style="color:green"><label>查看</label></a>'
			        			  +'|<a href="javascript:customerDelete('+row.id+');" style="color:red"><label>删除</label></a>';
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