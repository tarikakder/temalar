function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function showCurrencies() {
  $.each($(".fa_cur_code"), function(index, item){
    $(item).attr("class", $(item).attr("class").replaceAll("fa", "la"));
  });
}

$(window).scroll(function() {
  if($(this).scrollTop() != 0) {
    $(".Footer-button").fadeIn(); 
  } else {
    $(".Footer-button").fadeOut();
  }
});

function mobileHeaderMenu() {
  $.each($(".Header-menu .container>ul>li"), function(index, item) {
    if ($(item).has("ul").length && $(document).width() < 768) {
      $(item).find(">a").click(function() {
        $(item).find("ul").toggle();
        return false;
      });
    }
  });
}

$(window).resize(function(){
  mobileHeaderMenu();
});

$(document).ready(function() {
  mobileHeaderMenu();

  //banner cookie
  $(".banner_cookie .close").click(function() {
    localStorage.setItem('hide_cookie', true);
    $('.banner_cookie').hide();
  });

  if (localStorage.getItem('hide_cookie') === null) {
    $(".banner_cookie").show();
  }

  $(".button_add_to_cart").click(function(){
    $(this).addToCart();
  });

  if (getCookie("cookiePerm") == "") {
    $(".banner_cookie").show();
  }

  $(".banner_cookie span.close").click(function() {
    setCookie("cookiePerm", true, 10);
  });
 
  splashBanner();
  
  $(".fancybox").fancybox();

  $('.Carousel-slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="la la-angle-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="la la-angle-right"></i></button>',
    slidesToShow: 6,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  });

  $('.Carousel-banner').slick({
    dots: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="la la-angle-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="la la-angle-right"></i></button>',
    slidesToShow: 1,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $("*").click(function(e) {
    if (!$(e.target).is(".Search") && !$(e.target).is(".Search *")) {
      $(".Search-autocomplete").removeClass("active");
    }
  });

  $("#qsearch").focus(function() {
    if ($(this).val().length > 3) {
      $(".Search-autocomplete").addClass("active");
    }
  });

  $("#ChangeFilters").click(function() {
    $(".side_column.left_column").toggleClass("active");
  });

  $(".side_column.left_column").click(function(e) {
    if ($(window).width() < 768) {
      if (!$(e.target).is(".side_column.left_column.active *")) {
        $(".side_column.left_column").removeClass("active");
      }
    }
  });

  $("#HeaderMenuOpen").click(function() {
    $(".Header-menu").addClass("active");
  });

  $("#HeaderMenuClose").click(function() {
    $(".Header-menu").removeClass("active");
  });

  $("#HeaderSearchOpen").click(function() {
    $(".Search").toggleClass("active");
  });

  $("#HeaderSearchClose").click(function() {
    $(".Search").removeClass("active");
  });

  $(".Header-top-lang select").on('change', function() {
    window.location = '/index.php?lang=' + this.value;
  });

  $('.Footer-button').click(function() {
    $('body,html').animate({scrollTop:0},800);
  });

  $(".tabs_view .nav a:first-of-type").addClass("active");
  $(".tab-content .tab-pane:first-of-type").addClass("show active");

  $(".nav-tabs a").click(function() {
    var tab_id = $(this).attr('id');
    var tabs_view = $(this).parents('.tabs_view');
    setTimeout(function() {
      tabs_view.find($(".tab-content .tab-pane[aria-labelledby="+tab_id+"] .Carousel")).slick('refresh');
    }, 300);
  });

  $(".container").inlineScripts();
  
  $('.Footer-button').click(function() {
    $('body,html').animate({scrollTop:0},800);
  });
  
  var delay = null;
  $(".form-group-search input").on('keyup', function() {
    if (delay != null) clearTimeout(delay);
    delay = setTimeout(searchAutoComplete, 200);
  });

  $(".prd_opts").updatePrdView();
  
  if($("#buynowurl").length && buynowurl){
    $("#buynowurl").click(function(){
      window.open(buynowurl);
      return false;
    });
  } 
  
  if($(".form-auto-post").length>0){ 
    $(".form-auto-post").find("input[type=checkbox]").prop("checked",true);
    $(".form-auto-post").submit();
  } 
  
  if($("#cur_convert").length>0){
    curConvert($("#cur_convert").val());
  }
  showCurrencies();
  
  if($('.afil_banner_options').length>0){
    afil_load();
  }
  
  $('.prevent-double-submission').preventDoubleSubmission();
  
  if($(".order-cc-processing").length>0){
    setTimeout(function(){
      getProcessingOrderStatus();
    },1000);  
  }

  if($(".temp_discount").length>0){
    $(".temp_discount").each(function(i,item){    
      $(this).countDown();
    });
  }
  
  if($(".csrf_token").length>0){
    $(".csrf_token").val($("#csrf_token").val());
  }
  
  getSpecialPrices();

  if ($(".column-hide").length > 0) {
    var arr = [];
    $.each($(".column-hide").siblings('.column'), function(_index, _item) {
      arr.push($(_item).height());
    });
    var childrens = $(".column-hide").children();
    $.each(childrens, function(index, item) {
      var min = Math.min(...arr);
      var _index = 0;
      var c = 0;
      arr.forEach(function(value, key) {
        if (value == min && c == 0) {
          _index = key;
          c++;
        }
      });
      var column = $(".column-hide").siblings('.column')[_index];
      column.append(item);
      arr[_index] = $(column).height();
    });
  }
});
function getProcessingOrderStatus(){
  $.ajax({
    type: "GET",
    data: "",
    dataType:"json",
    url: $(".order-cc-processing").data("get-status-url"),
    cache: false,
    success: function(msg){
     if(msg.status>0){
        if(msg.result==1){		
          var redirect_url = $(".order-cc-processing").data("success-url");
        }  
        else if(msg.result==0){			
          var redirect_url = $(".order-cc-processing").data("fail-url");          
        }
        setTimeout(function(){
          window.location=redirect_url;       
        },1000);
     }
    setTimeout(function(){
      getProcessingOrderStatus();
    },10000);
    }
  });
}

function getSpecialPrices(){
  if($(".login-user-info").length>0){
    if($("#prd_id_discount_url").length>0){
      var item_ids_str="";
      $(".Product").not(".prd_list_container .Product").each(function(i,item){
        if(item_ids_str!=""){
          item_ids_str+="&";
        }
        item_ids_str+="item_id[]="+$(item).data("prd-id");
      });

      $.ajax({
        type: "POST",
        data: item_ids_str,
        dataType:"json",
        url: $("#prd_id_discount_url").val(),
        cache: false,
        success: function(msg){
          for(i in msg){
            var prd_id=msg[i].prd_id;
            $(".Product_"+prd_id).find(".discount span").html(parseInt(msg[i].prd_discount));
            $(".Product_"+prd_id).find(".price_sale").html(msg[i].prd_final_price_display);
            showCurrencies();
          }
        }
      });
    }
  }
}

$.fn.countDown=function(){
  var elm=$(this);
  var date_str = $(elm).data("end-date");
  var date_show_day = $(elm).data("show-day");
  var countDownDate = new Date(date_str).getTime();

  var x = setInterval(function() {

    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    if (date_show_day === true) {
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    }else {
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days * 24;
    }
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (date_show_day == true) {
      $(elm).find(".temp_discount_d").html(days < 10 ? '0' + days : days);
    }
    $(elm).find(".temp_discount_h").html(hours < 10 ? '0' + hours : hours);
    $(elm).find(".temp_discount_m").html(minutes < 10 ? '0' + minutes : minutes);
    $(elm).find(".temp_discount_s").html(seconds < 10 ? '0' + seconds : seconds);
  
    if (distance < 0) {
      clearInterval(x);
      
      $(elm).addClass('temp_discount_ended');
      $(elm).find(".discount_ended").show();
      $(elm).find(".discount_continue").hide();
    }
  }, 1000); 
}

$.fn.addToCart=function(){
  console.log('addToCart');
  var btn=this;
  var params="";
  var container=".cart_box_container";
  var prd_id = $(btn).data("prd-id");
  var http_url=$("#http_url").val();  
  if (window.location.protocol == "https:") {
    http_url = http_url.replace(/^http:/,"https:");
  }   
  var url = http_url+"?p=Cart&popup=1&no_common=1&add="+prd_id;
  
  if(quantity>0){
    params+="&quantity="+quantity;
  }
  else if($(btn).data("quantity-selector")){
    var quantity=$($(btn).data("quantity-selector")).val();
    if(quantity<=0) quantity=1;
    params+="&quantity="+quantity;
  }
  else if($(btn).parent().find(".prd-quantity").length>0){  
    var quantity=$(btn).parent().find(".prd-quantity").val();
    if(quantity<=0) quantity=1;
    params+="&quantity="+quantity;
  } 
  
  if($(btn).parent().find(".prd-units").length>0){
    var prd_unit=$(btn).parent().find(".prd-units").val();    
    params+="&prd_unit="+prd_unit;
  } 
    
  if($(".prd_opts").length>0){
    
    var opt = getPrdOptObj();
    if($(opt).length>0){
      var opt_id = opt.val();
      var opt_title = opt.attr("title");
      if(opt_title){
        var opt_params=opt_title.split(":");
        var opt_stock=parseInt(opt_params[0]);  
        if(opt_stock<=0){       
          alert($("#prd_no_stock").val());
          return;
        }
      }
      
      if(!opt_id){      
        alert($("#option_unavailable").val());
        return;
      }
      url+="&opt_id="+opt_id;
    }
  }
  
  $(btn).addingToCart();
  
  $.ajax({
    type: "POST",
    data: params,
    url: url,
    cache: false,
    success: function(msg) {
      if($(container).length>0){
        $(container).html(msg);
      }else {
        $("#dummy_elm").html(msg);
      }
      $(btn).addedToCart();

      $(".dy_cart_prd_count").html($(".cart_variables .cart_prd_count").val());
      $(".dy_cart_prd_total").html($(".cart_variables .cart_prd_total").val());
      $(".dy_cart_prd_total_str").html($(".cart_variables .cart_prd_total_str").html());
      
      setTimeout(function(){
        $(btn).addToCartNormal();
      },2000);
    }
  });
  return $(this);
}

$.fn.addToCartNormal = function(){
  console.log('addToCartNormal');
  var btn=this;
  $(btn).removeClass("button_adding_to_cart");
  $(btn).removeClass("button_added_to_cart");
  if($("#label_add_to_cart").length>0){   
    if($(btn).find(".button-text")){
      $(btn).find(".button-text").html($("#label_add_to_cart").val());
    }
  }
  $(btn).attr("disabled",false);
  if($("#goto-cart-after-adding").length>0){  
    var http_url=$("#http_url").val();  
    if (window.location.protocol == "https:") {
      http_url = http_url.replace(/^http:/,"https:");
    }
    window.location=http_url + "cart";
  }
  return $(this);
}
$.fn.addingToCart = function() {
  console.log('addingToCart'); 
  var btn=this;
  $(btn).addClass("button_adding_to_cart");
  $(btn).removeClass("button_added_to_cart");
  if($("#label_adding").length>0){    
    if($(btn).find(".button-text")){
      $(btn).find(".button-text").html($("#label_adding").val());
    } 
  }
  return $(this);
}
$.fn.addedToCart = function() {
  console.log('addedToCart');
  var btn=this;
  $(btn).addClass("button_added_to_cart");
  $(btn).removeClass("button_adding_to_cart");
  if($("#label_added").length>0){
    if($(btn).find(".button-text")){
      $(btn).find(".button-text").html($("#label_added").val());
    } 
  }
  $(".cart_box").addClass("cart_box_full");
  if (typeof addedToCartAfter == 'function') { 
    addedToCartAfter($(btn));
  }
  //animateCartPrdImage(btn);
  if($(".cart_animate").length>0){
    $(".cart_animate").trigger("click");
  }
  
  $(btn).attr("disabled","disabled");
  
  //sepet sayfasindaysak sayfayi yeniliyoruz. 
  var str=String(document.location);  
  if(str.indexOf("/cart")!=-1){
    var https_url=$("#https_url").val();
    window.location=https_url+'cart';
  }

  return $(this);
}

$.fn.loadPageSubmit = function(){
  var form=$(this);
  var container=$(this).data("container");
  
  var post_data = $(form).serialize()+"&save=1";
  $(form).appendTo($("#dummy_elm")).hide();// neccesary for stupid ie7,ie8
    
  var purl = $(form).attr('action');
  if (window.location.protocol == "https:") {
    purl = purl.replace(/^http:/,"https:");
  }

  $(container).html('<div class="loading-wrapper"><div class="loading"><div></div><div></div><div></div><div></div></div></div>');

  $.ajax({
    type: "POST",
    data: post_data,
    url: purl,
    success: function(msg) {
      $(container).html(msg);
    }
  });
  return false;
}

$.fn.loadPage=function(url) {
  var container=$(this);
  if (window.location.protocol == "https:") {
    url = url.replace(/^http:/,"https:");
  } 
  $(container).html('<div class="loading-wrapper"><div class="loading"><div></div><div></div><div></div><div></div></div></div>');
  
  $.ajax({
    type: "POST",
    url: url,         
    cache: false,
    success: function(msg){ 
      $(container).html(msg);  
    }
  });
  return $(this);
}

$.fn.payOptions = function(url,elm, isLoad) {
  $(".payment_type_wrapper").find("label").removeClass("dy_selected"); 
  $(elm).parents("label").addClass("dy_selected");
  var container=$(this);
  
  if (isLoad === true) {
    $(container).load(url,function(){   
      $(container).updatePrice();
    });
  }

  $(container).updateCargoList(); 
  $(container).updatePrice();
}

$.fn.updatePrice = function(){
  var p = parseFloat($("#total_amount").val());
  var c = parseFloat($("#cart_total").val()); 
  var s = parseFloat($("input[name='ord_cargo_id']:checked").attr("data-price"));
  if(!s) s=0;
  var cs = c + s;
  var cso = $("#total_amount").val();
  
  if(cso!=cs){
    $("#total_amount").val(cs);   
    if($('.ord_installment_box').length>0){
      var https_url=$("#https_url").val();  
      $('#div_intsallments').load(https_url+'?p=Installments&https=1&bank_id='+$("input[name='ord_bank_id']:checked").val()+'&amount='+$('#total_amount').val());
    }
  }
}

$.fn.updateCargoList = function(){
  var country_id=0;
  var city_id=0;
  var town_id=0;
  if($("#different_address").prop("checked")){
    country_id=$("#ord_shipping_country_id").val();
    city_id=$("#ord_shipping_city_id").val();
    town_id=$("#ord_shipping_town_id").val();
  }
  if(!country_id){
    country_id=$("#ord_billing_country_id").val();
  } 
  if(!city_id){
    city_id=$("#ord_billing_city_id").val();
  } 
  if(!town_id){
    town_id=$("#ord_billing_town_id").val();
  }   
  var https_url=$("#https_url").val();
  $("#cargo_container").load(https_url+'?p=Cargo&country_id='+country_id+'&city_id='+city_id+'&town_id='+town_id+'&type='+$("input[name='ord_payment_type']:checked").val(),"",function(){
    $(this).updatePrice();
  });
}

$.fn.inlineScripts =function(){
  if($('.adr_form').length>0){
    $(".adr_type").change(function(t){
      $(this).adrChange();  
    });
    $(".adr_corp").click(function(t){
      $(this).adrChange();  
    });   
    $(this).adrChange();
  }
  
  if($('.actions_list_box').length>0){
    var elm=this;
    mod_number = $('.actions_list_box').closest(".mod_container").attr("id").split("_")[2];
    $(elm).getActionsList(mod_number);
    var a = setInterval(function(){
      $(elm).getActionsList(mod_number);
    },20000);
  }
  
  if($('.orders_form').length>0){    
    var data_posted=$("#orders_form_data_post").attr("data-post");
   
    if($("[name=bl_adr_id]").length>1 && data_posted=='0'){   
      $("[name=bl_adr_id]").eq(1).trigger("click");
    }   
  }
  
}
$.fn.ordAdrChange =function(){  
  if($(".ord_adr_corp").is(":visible")){  
    var v=$("#ord_adr_corp").prop("checked");   
    if(v){ $(".ord_firm").show();}else{$(".ord_firm").hide();}
  }
    
}
$.fn.adrChange =function(){
  var v=$("#adr_type").val();
  var g=v=="b" || v=="sb";
  var v=$("#adr_corp").prop("checked");
  if(g) {    
    $(".show_b").attr("disabled",false).show();
    if(v){ $(".show_corp,.show_corp2").show();}else{$(".show_corp,.show_corp2").hide();}
  }else {   
    $(".show_b").attr("disabled",true).hide();
    if(v){ $(".show_corp").show();}else{$(".show_corp,.show_corp2").hide();}
  } 
}
$.fn.adrCorpChange =function(){
  var v=$("#adr_corp").prop("checked"); 
  if(v) {
    $(".show_corp").show();
  }else {   
    $(".show_corp").hide();
  } 
  $(this).adrChange();
}
$.fn.getActionsList =function(mod_number) {
  http_url = $("#http_url").val();
  last_item_number = $(".cycle-slideshow-whats-happening").data("last-id");
  $.ajax({
    type: "GET",
    data: {mod_number: mod_number, last_item_number: last_item_number},
    url: http_url+'?p=WhatsHappening',
    cache: false,
    success: function(msg) {
      msg = msg.trim();
      if(msg!=""){
        var slide_index=1;
        var slide_index = $(".cycle-slideshow-whats-happening").data("cycle.opts").currSlide+1;
        
        $(".cycle-slideshow-whats-happening").prepend(msg).cycle("reinit").cycle("goto",slide_index);   
        var last_id = $('.actions_list_box ul li:first-child').data('id');      
        $(".cycle-slideshow-whats-happening").data("last-id",last_id);
      }
    }
  });
}

function getPrdOptObj() {
  var str="";
  var opt_id=0;
  var opg_id;
  $(".prd_opts").each(function(i,item) {
    opg_id = $(item).attr("id").replace("opg_id","");     
    str += opg_id+"_"+$(item).val()+"_";
  });
  str=str.replace(/_$/,"");   
  return $("#pro_id_"+str);
}

$.fn.updatePrdView=function(){
  function getPrdOptVal(){
    return getPrdOptObj().val();
  }
  
  if($(".prd_opts").length>0){
    var opt = getPrdOptObj(); 
    if(opt.data("id")){
      var opt_stock=parseInt(opt.data("stock"));
      var opt_data_obj=$(".data_pro_id_"+opt.data("id"));     
      $("#prd_final_price_display").html($(opt_data_obj).find(".data-prd-final-price").html());
      $("#prd_special_price_display").html($(opt_data_obj).find(".data-prd-special-price").html());
      $("#prd_price_display").html($(opt_data_obj).find(".data-prd-price").html());
      $("#min_inst_price_display").html($(opt_data_obj).find(".data-prd-min-inst-price").html());
      $("#prd_eft_price_display").html($(opt_data_obj).find(".data-prd-eft-price").html());
      $("#stock_status_display").html((opt_stock>0?$("#prd_in_stock").val():$("#prd_no_stock").val()));
    }
  } 
}

function loadComboBoxCnt(cid,purl,val,selected){ 
  
  if (window.location.protocol == "https:") {
    purl = purl.replace(/^http:/,"https:");
  }

  var c=document.getElementById(cid);
  if(val){
    $.ajax({
      url: purl,        
      cache: false,
      success: function(msg) {
        if (msg) {
          OPT(c,msg);
          if(selected!=undefined){
            $("#"+cid).val(selected);   
          }
        }else {
          rmAllOpt(c,1);   
        }
        $(this).payOptions();
      }
    });  
  }else {
    rmAllOpt(c,1);
  } 
}
function loadComboBox(cid,purl,val,selected){ 
  if (window.location.protocol == "https:") {
    purl = purl.replace(/^http:/,"https:");
  }
  var c=document.getElementById(cid);
  if(val){
    $.ajax({
       url: purl,        
       cache: false,
       success: function(msg){
           if(msg){
           OPT(c,msg);
           if(selected!=undefined){
            $("#"+cid).val(selected);   
           }
           else{
            c.options.selectedIndex=c.options.length-1;
           }
         }
         else{
        rmAllOpt(c,1);   
         }
       }
     });  
  }
  else{
    rmAllOpt(c,1);
  }
}
function OPT(c,t) {
  rmAllOpt(c,1);
  if(t!="") {
    myarray = t.split( '|' );
    for ( var i = 0; i < myarray.length; i++ ) {
      if ( myarray[i] != "" ) {
        cur = myarray[i].split( ';' );
        addOpt(c,cur[1], cur[0]);
      }
    }
  }
}
function addOpt(c,text,value) {
  if($(c).length>0) {
    c.options[c.options.length] = new Option(text,value);
  }
}
function rmOpt(c,i) {
  if($(c).length>0) {
    c.options[i] = null;
  }
}
function rmAllOpt(c,firstOpt) {
  if($(c).length>0) {
    k=c.length;
    for(i=0;i<k;i++) {
      rmOpt(c,firstOpt);
    }
  }
}
function moneyFormat2(nStr,template,sep) {
  var dc=2;
  nStr=sprintf("%."+dc+"f",nStr);
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ?  x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  
  x3 = template.replace(/0/g,x1).replace(/12/g,x2);
  
  return x3;
}
function moneyFormat(nStr,d) {
  var dc=d?d:2;
  nStr=sprintf("%."+dc+"f",nStr);
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function log(param) {
  setTimeout(function() {
    throw new Error("Debug: "+param)
  },0)
}
function setCookie(c_name,value,exdays){
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name){
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0;i<ARRcookies.length;i++) {
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if (x==c_name) {
      return unescape(y);
    }
  }
}
function curConvert(cur) {
  $(".convert_cur").each(function(i,item){    
    var content = $(item).html();   
    if(content!=""){      
      var orig_price = $(this).data("price");     
      var orig_cur = $(this).data("cur-code");
      if(orig_cur!=cur){
        var cur_val = $("#cur_"+cur).val();
        var orig_cur_val = $("#cur_"+orig_cur).val();
        var multiplier = cur_val==1 ? orig_cur_val : 1/cur_val;
      
        var new_price=orig_price*multiplier;    
        $(item).html(moneyFormat(new_price)+" " + cur);
      }     
    }
  });
}

function orderPageStatus(){  
  if ($("#order_confirm_form").length>0) {  
    $("#order_confirm_form").find("input[type=checkbox]").prop("checked",true);   
    return '{"output_type":"html","action":"submit", "form_id":"order_confirm_form"}';
  }else if($("#json_response").length>0) {  
    return '{"output_type":"json","action":"json_process","div_id":"json_response"}';   
  }else {
    return '{"output_type":"html","action":"show_html"}';
  }
}

function mypopup(url,w,h){
  w = w ? w : 600;
  h = h ? h : 600;  
  t = screen.availHeight/2 - h/2;
  l = screen.availWidth/2 - w/2;  
  window.open(url,'search','width='+w+',height='+h+',top='+t+',left='+l+',toolbars=no,resizable=yes,scrollbars=yes'); 
}

function selectElementContents(el) {
  if (window.getSelection && document.createRange) {
    var sel = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
  }else if (document.selection && document.body.createTextRange) {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.select();
  }
  document.execCommand('copy');
}

sprintfWrapper = {

  init : function () {
    if (typeof arguments == "undefined") { return null; }
    if (arguments.length < 1) { return null; }
    if (typeof arguments[0] != "string") { return null; }
    if (typeof RegExp == "undefined") { return null; }

    var string = arguments[0];
    var exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
    var matches = new Array();
    var strings = new Array();
    var convCount = 0;
    var stringPosStart = 0;
    var stringPosEnd = 0;
    var matchPosEnd = 0;
    var newString = '';
    var match = null;

    while (match = exp.exec(string)) {
      if (match[9]) { convCount += 1; }

      stringPosStart = matchPosEnd;
      stringPosEnd = exp.lastIndex - match[0].length;
      strings[strings.length] = string.substring(stringPosStart, stringPosEnd);

      matchPosEnd = exp.lastIndex;
      matches[matches.length] = {
        match: match[0],
        left: match[3] ? true : false,
        sign: match[4] || '',
        pad: match[5] || ' ',
        min: match[6] || 0,
        precision: match[8],
        code: match[9] || '%',
        negative: parseInt(arguments[convCount]) < 0 ? true : false,
        argument: String(arguments[convCount])
      };
    }
    strings[strings.length] = string.substring(matchPosEnd);

    if (matches.length == 0) { return string; }
    if ((arguments.length - 1) < convCount) { return null; }

    var code = null;
    var match = null;
    var i = null;

    for (i=0; i<matches.length; i++) {

      if (matches[i].code == '%') { substitution = '%' }
      else if (matches[i].code == 'b') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(2));
        substitution = sprintfWrapper.convert(matches[i], true);
      }
      else if (matches[i].code == 'c') {
        matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument)))));
        substitution = sprintfWrapper.convert(matches[i], true);
      }
      else if (matches[i].code == 'd') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)));
        substitution = sprintfWrapper.convert(matches[i]);
      }
      else if (matches[i].code == 'f') {
        matches[i].argument = String(Math.abs(parseFloat(matches[i].argument)).toFixed(matches[i].precision ? matches[i].precision : 6));
        substitution = sprintfWrapper.convert(matches[i]);
      }
      else if (matches[i].code == 'o') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(8));
        substitution = sprintfWrapper.convert(matches[i]);
      }
      else if (matches[i].code == 's') {
        matches[i].argument = matches[i].argument.substring(0, matches[i].precision ? matches[i].precision : matches[i].argument.length)
        substitution = sprintfWrapper.convert(matches[i], true);
      }
      else if (matches[i].code == 'x') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
        substitution = sprintfWrapper.convert(matches[i]);
      }
      else if (matches[i].code == 'X') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
        substitution = sprintfWrapper.convert(matches[i]).toUpperCase();
      }
      else {
        substitution = matches[i].match;
      }

      newString += strings[i];
      newString += substitution;

    }
    newString += strings[i];

    return newString;

  },

  convert : function(match, nosign){
    if (nosign) {
      match.sign = '';
    } else {
      match.sign = match.negative ? '-' : match.sign;
    }
    var l = match.min - match.argument.length + 1 - match.sign.length;
    var pad = new Array(l < 0 ? 0 : l).join(match.pad);
    if (!match.left) {
      if (match.pad == "0" || nosign) {
        return match.sign + pad + match.argument;
      } else {
        return pad + match.sign + match.argument;
      }
    } else {
      if (match.pad == "0" || nosign) {
        return match.sign + match.argument + pad.replace(/0/g, ' ');
      } else {
        return match.sign + match.argument + pad;
      }
    }
  }
}

sprintf = sprintfWrapper.init;

Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator) {
  var n = this,
      decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
      decSeparator = decSeparator == undefined ? "." : decSeparator,
      thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
      sign = n < 0 ? "-" : "",
      i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
      j = (j = i.length) > 3 ? j % 3 : 0;
  return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

Number.prototype.formatMoney2 = function(str_template,sep) {
  var n1 = this;
  return moneyFormat2(n1,str_template,sep);
};

jQuery.fn.preventDoubleSubmission = function() {
  $(this).on('submit',function(e){
    var $form = $(this);

    if ($form.data('submitted') === true) {
      e.preventDefault();
    } else {
      $form.data('submitted', true);
    }
  });

  return this;
};	

function splashBanner(){
  if($(".splash_banner").length>0){
  	if($(".splash_banner").html()!='') {		
  		$(".splash_banner").fancybox({
  			'titlePosition' : 'inside',
  			'centerOnScroll' : true,
  			'onClosed' : function(){  }
  		});
  		setTimeout(function() {
  			$(".splash_banner").trigger('click');
  		},100);
  	}
  }
}

function searchAutoComplete() {
  $(".Search #qsearch").each(function(i,obj_item){
    if ($.trim($(obj_item).val()).length > 2) {
      var container_obj_selector = $(obj_item).data("container");
      $(".Search-autocomplete").find(".Search-autocomplete-content").html("");
      if (!container_obj_selector) {
        container_obj_selector = "Search";
      }

      var ac_url = $("#http_url").val();
      if (window.location.protocol == "https:") {
        ac_url = ac_url.replace(/^http:/,"https:");
      }

      $.ajax({
        type: "GET",
        data: { term: $.trim($(obj_item).val()), json: 1 },
        url: ac_url+"index.php?p=AutoComplete",
        dataType: 'json',
        success: function(res) {
          if (res.length > 0) {
            $(".Search-autocomplete-none").hide();
            res.forEach(function(item) {
              $(".Search-autocomplete-content").append('<li data-id="'+ item.id +'">\
                <a' + (item.link ? ' href="'+item.link+'"' : ' class="Search-autocomplete-label"') + '>'+item.value+'</a>\
                </li>');
            });
          }else {
            $(".Search-autocomplete-none").show();
          }
          $(".Search-autocomplete").addClass("active");
        }
      });
    }else {
      $(".Search-autocomplete").removeClass("active");
      $(".Search-autocomplete-content").html("");
      $(".Search-autocomplete-none").hide();
    }
  });
}