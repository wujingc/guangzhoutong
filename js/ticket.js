window.onload=function(){
  wid();
  bind();
  refresh();
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
    //改变deal的颜色        
   $(".deal").css("background-color","#80BE1E");      
}
//<<<<<<< .mine

//=======

// 点击隐藏
//>>>>>>> .r64840
var bind=function(){

 $(".deal").click(function(){	
 		
    $(".hid").css("display","block");
     $(".entry").css("display","block");
    
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

}

// 刷新
var refresh=function(){
  
  $("").load(function(){
    $("#ht").css("display","block");
  })
} 


var total=function(){
$(".subimg").click(function(){
     totalli();
 })  

   var totalli=function(){
   
   var $two=$(".coded");
  var num=new Array;
  var a=0,value;
  var b=$two.length;
  for (var i = 0; i <b; i++) {
     value=$(".coded").eq(i).text();
          num[i]= value.substring(1);  
   
    num[i]=Number(num[i]); 
    a=a+num[i]; 
    a=a+"";
    if (a.indexOf(".")!=-1) { 
        a=Number(a); 
        a=a+0.005;
        a=a+"";
        a=a.substring(0,a.indexOf(".") + 3);       
      };     
  
   $(".amount").text(a);
    a=Number(a);  
 }
   }

   totalli();
}



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
          if ($one.eq(i).attr("src")=="../images/yes.png") {          
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
