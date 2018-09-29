(function($) {
  console.log($('.public-input-box-type01'))
  //输入框显示删除按钮
  $(document).on('input', '.public-input-box-type01 input,.public-input-box-type02 input,.public-input-box-type-vercode .lside input', function() {
    console.log('1')
    if ($(this).val() != '') {
      $(this).siblings('.clear-input').css('display', 'block');
    }
  });
  $(document).on('click', '.public-input-box-type01 .clear-input,.public-input-box-type02 .clear-input,.public-input-box-type-vercode .lside .clear-input', function() {
    $(this).css('display', 'none').siblings('input').val('');
  });

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
