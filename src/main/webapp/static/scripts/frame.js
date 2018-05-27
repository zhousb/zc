
$(function(){
$(".xq-table ul li a").click(function () {
                $(".xq-table ul li a").each(function () {
                    $(this).removeClass("current");
                });
                $(this).addClass("current");
            });
$('.xq-table ul li a').click(function(){
  var index=$('.xq-table ul li a').index(this);
      if(index==0){
     $('#date1').show();
  	$('#date2').hide();
  	$('#date3').hide();
  	$('#date4').hide();
  	
   }
   if(index==1){
     $('#date2').show();
  	 $('#date1').hide();
  	 $('#date3').hide();
  	 $('#date4').hide(); 
   }
   if(index==2){
     $('#date3').show();
  	 $('#date2').hide();
  	 $('#date1').hide();	
  	 $('#date4').hide();
   }
    if(index==3){
     $('#date4').show();
  	 $('#date3').hide();
  	 $('#date2').hide();	
  	 $('#date1').hide();
   }
  }); 
});
//table切换结束


//商品编辑展开更多 点击展开
$(function () {
    $(".leftnav-title .right-icon").click(function () {
		$(this).children('i').toggleClass("icon-caret-up icon-caret-down");
		$(this).parent('ul').parent('div').next('.leftnav-show').slideToggle(100);
    });
});	