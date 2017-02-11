
window.onload=function(){
  wid();
  bind();
  refresh();
  color();
  total();
  point();
  
}


// 表格宽度自适应
var wid=function(){
	var $one=$(".mid").find("span");    
	    for (var i = 0; i < $one.length; i++) {
	    var a=parseInt($one.eq(i).css("width"));
        a=a+"px";
        $(".mid").eq(i).css("width",a);
	       }; 

	var b=$(".tab").css("height");     
        $(".sub").css("height",b);

    var c=$("body").css("height");     
        $(".hid").css("height",c);
            
         
}
//<<<<<<< .mine

//=======

// 点击隐藏
//>>>>>>> .r64840
var bind=function(){

 $(".deal").click(function(){
 	
 	if (colornumber==1) {
 		
    $(".hid").css("display","block");
     $(".entry").css("display","block");
     };
  });

 $(".mit").click(function(){
    $(".hid").css("display","none");
     $(".entry").css("display","none");
  });

$(".entryin").click(function(){
  $(".entry").css("display","none");
  $(".entrytwo").css("display","block");
 });
 
$(".confirm").click(function(){
  
  $(".entrytwo").css("display","none");
   $(".entrythree").css("display","block");
 });

$(".confirmtwo").click(function(){
  
  $(".entrythree").css("display","none");
   $(".hid").css("display","none");
 });
//改变subimg的图标
 var $One=$(".subimg").find("img");

  for (var i = 0; i < $One.length; i++) {
    $One.eq(i).click(function(){
    	
    	//改变样式
      if ($(this).attr("src")=="images/yes.png") {
     
    $(this).attr("src","images/yes2.png");
     }
     else{
     	 $(this).attr("src","images/yes.png");
     }    
  })
}  
}
// 刷新
var refresh=function(){
  $(function(){
    $("#xxx").click(function(){
      $("#xxx>a").toggle();
      // $("#ting").stop(true,true).toggle();
      // $("#ting").load.stop();
    })
    $("#ting").click(function(){
      $(window).load.stop();
    })
  })
  $(function(){
    // alert(history.length);
    if(window.history.length > 1 ){
      $("#ht").attr("src","images/bot-left02.png");
    }else{
      $('#ht').attr('src','images/bot-left.png');
    }
  })
} 

//改变deal的颜色
var colornumber; 
var color=function(){
	var $one=$(".subimg").find("img");
  $(".subimg").click(function(){
     colorli();
 })  

  var colorli=function(){
     colornumber=0;
     var k=0;
    for (var i = 0; i < $one.length; i++) {
      if ($one.eq(i).attr("src")=="images/yes.png") {          
                k++;
             } 
      if(k!=0){
        $(".deal").css("background-color","#80BE1E");
        colornumber=1;
      }
        if(k==0){
        $(".deal").css("background-color","rgb(128,128,128)");
      }     
    }
  }

  
}
//合计的钱
var total=function(){
$(".subimg").click(function(){
	   totalli();
 })  

   var totalli=function(){
    var $one=$(".subimg").find("img");
   var $two=$(".coded");
  var num=new Array;
  var a=0,value;
  var b=$one.length+$two.length;
  for (var i = 0; i <b; i++) {
    if ($one.eq(i).attr("src")=="images/yes.png") {          
         value=$(".code").eq(2*i+1).text();
          num[i]= value.substring(1);
                
       } 
      if (i<$two.length) {
     value=$(".coded").eq(i).text();
          num[b-i-1]= value.substring(1);        
      };
   if (num[i]!=undefined) {
    num[i]=Number(num[i]); 
    a=a+num[i]; 
    a=a+"";
    if (a.indexOf(".")!=-1) { 
        a=Number(a); 
        a=a+0.005;
        a=a+"";
        a=a.substring(0,a.indexOf(".") + 3);       
      };     
   };
   $(".amount").text(a);
    a=Number(a);  
 }
   }

   totalli();
}

//改变违章分数
var point=function(){
$(".subimg").click(function(){
     pointli();
 })  

   var pointli=function(){
    var $one=$(".subimg").find("img");
    var num=new Array;
    var a=0,value,c;
    var b=$one.length;
    for (var i = 0; i <b; i++) {
          if ($one.eq(i).attr("src")=="images/yes.png") {          
               value=$(".righted").eq(i).text();
               c=value.length;
                num[i]= value.substring(0,c-1);
                      console.log(num[i]); 
             } 
     
   if (num[i]!=undefined) {
              num[i]=Number(num[i]);

              a=a+num[i]; 
              a=a+"分";
              $(".li-mond").text(a);
              a=a.substring(0,c-1); 
              a=Number(a); 
       }
    if(a==0){
              a=a+"分";
              $(".li-mond").text(a);
              a=a.substring(0,c-1); 
              a=Number(a); 
    }
   
  } 
}
 
}
