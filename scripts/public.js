(function($) {
  /*================================================
  =                   输入框模块                   =
  =================================================*/

  //输入框显示删除按钮
  $(document).on('input', '.public-input-box-type01 input,.public-input-box-type02 input,.public-input-box-type-vercode .lside input', function() {
    if ($(this).val() != '') {
      $(this).siblings('.clear-input').css('display', 'block');
    }
  });

  //点击输入框删除按钮
  $(document).on('click', '.public-input-box-type01 .clear-input,.public-input-box-type02 .clear-input,.public-input-box-type-vercode .lside .clear-input', function() {
    $(this).css('display', 'none').siblings('input').val('');
  });

  /*================================================
  =                   弹出层模块                   =
  =================================================*/

  //点击弹出层蒙版 关闭弹出层
  $(document).on('click', '.public-mask', function(e) {
    console.log(123)
    if ($(e.target).data('origin') == 'mask') {
      $(this).fadeOut();
    }
  });

  //激活弹窗
  $(document).on('click', '.js-show-mask', function(e){
    e.preventDefault();
    e.stopPropagation();
    var targetID = $(this).data('target') + '';
    $(targetID).fadeIn();
  });

  //点击按钮关闭弹窗
  $(document).on('click', '.js-hide-mask', function(e){
    e.preventDefault();
    e.stopPropagation();
    var targetID = $(this).data('target') + '';
    $(targetID).fadeOut();
  });

  /*================================================
  =                  悬浮菜单动画                  =
  =================================================*/

  $('.public-suspension-menu .control').on('click',function(){
    $('.public-suspension-menu').toggleClass('js-is-show');
    setTimeout(function(){
      $('.public-suspension-menu').toggleClass('js-is-show-start');
    },0);
    if(!$('.public-suspension-menu').hasClass('js-is-show')){
      $('.public-suspension-mask').fadeOut();
    }else{
      $('.public-suspension-mask').fadeIn();
    }
  });

  $('.public-suspension-mask').on('click',function(){
    $('.public-suspension-menu').removeClass('js-is-show');
    $('.public-suspension-menu').removeClass('js-is-show-start');
    $('.public-suspension-mask').fadeOut();
  })

  $('#form').on('valid.form', function(e) {
    var $data = $(this).serialize();
    $.showLoading('请稍等...');
    $.post($(this).attr('action'), $data, function(res) {
      $.hideLoading();
      if (res.code) {
        $.toptip(res.msg, "success");
        setTimeout(function() {
          location.href = res.url;
        }, 1000);
      } else {
        $.toptip(res.msg);
      }
    }).fail(function() {
      $.hideLoading();
      $.toptip('服务器错误~');
    });
    return false;
  });
})(jQuery);
