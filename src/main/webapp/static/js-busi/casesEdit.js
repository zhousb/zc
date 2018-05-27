var um;
$(function(){
	um = UM.getEditor('myEditor');
	var casesEdit = new CasesEdit();
	casesEdit.init();
	if(initParam =="1"){
		casesEdit.initData(pid);
		$("#moder").show();
	}
});
function CasesEdit() {
}

//业务参数
var tag = true;
var casesParams = {};
CasesEdit.prototype = {

	init : function() {
		this.bindEvents();
	},
	bindEvents : function() {
		_this = this;
		$("#addBtn").click(function(){
			casesParams.id = $("#id").val();
			casesParams.title = $("#title").val();
			casesParams.type = $("#type").val();
			casesParams.istop = $("#istop").val();
			casesParams.isshow = $("#isshow").val();
			casesParams.headImg = $("#head").val();
			casesParams.author = $("#author").val();
			casesParams.sort = $("#sort").val();
			casesParams.desc = $("#desc").val();
			casesParams.content = um.getContent();
			_this.queryAddSubmit();
		});
		$("#type").change(function(){
			var type = $(this).val();
			if(type=="1"){
				if(tag){
					_this.initData(pid);
					tag = false;
				}
				$('#moder').show();
			}else{
				$('#moder').hide();
			}
		});
		$("#headImg").fileinput({
			allowedFileExtensions : [ 'jpg', 'png', 'gif','jpeg' ],
			initialCaption: "请上传头图",
	        uploadUrl: basePath+'/images/upImg',
	        showPreview : true,
	        initialPreview: [
	                         "<img src='../images/showImg/"+imgId+"' class='file-preview-image' />",
			],
	        maxFilePreviewSize: 10240
	    });
		$('#headImg').on('fileuploaded', function(event, data, previewId, index) {
            var response = data.response;
            if(response.state="SUCCESS"){
            	 $("#head").val(response.imgId);
            }else{
            	bootbox.alert("图片上传失败，原因："+state);
            }
        });
	},
	valid : function(){
		if(casesParams.title ==null || $.trim(casesParams.title) ==""){
			bootbox.alert("请输入标题");
			return false;
		}
		if(casesParams.type ==null || $.trim(casesParams.type) ==""){
			bootbox.alert("请选择类型");
			return false;
		}
		if(casesParams.istop ==null || $.trim(casesParams.istop) ==""){
			bootbox.alert("请选择是否置顶");
			return false;
		}
		if(casesParams.isshow ==null || $.trim(casesParams.isshow) ==""){
			bootbox.alert("请选择是否显示");
			return false;
		}
		if(casesParams.headImg ==null || $.trim(casesParams.headImg) ==""){
			bootbox.alert("请选择头图片并上传");
			return false;
		}
		if(casesParams.author ==null || $.trim(casesParams.author) ==""){
			bootbox.alert("请选择输入作者");
			return false;
		}
		if(casesParams.desc ==null || $.trim(casesParams.desc) ==""){
			bootbox.alert("请选择输入简介");
			return false;
		}
		if(casesParams.content ==null || $.trim(casesParams.content) ==""){
			bootbox.alert("请选择输入内容");
			return false;
		}
		return true;
	},
	queryAddSubmit : function() {
		var _this = this;
		if(_this.valid()){
			ajaxController.ajax({
				method : "POST",
				url : basePath + "/cases/edit",
				dataType : "json",
				showWait : true,
				data :casesParams,
				message : "正在提交中..",
				success : function(data) {
					bootbox.alert(data.statusInfo);
				},
				error : function(data) {
					bootbox.alert("修改失败，请稍后重试");
				}
			});
		}
	},
	initData:function(pid){
		ajaxController.ajax({
			method : "POST",
			url : basePath + "/cases/queryPlan",
			dataType : "json",
			showWait : false,
			data :{"pid":pid},
			message : "正在提交中..",
			success : function(data) {
				$("#pid").html(data.data);
			},
			error : function(data) {
				bootbox.alert("获取关联查询失败，请稍后重试");
			}
		});
	}
}