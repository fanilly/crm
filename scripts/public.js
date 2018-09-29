(function($) {
  //输入框显示删除按钮
  $('.public-input-box-type01 input').on('input', function() {
    if ($(this).val() != '') {
      $(this).siblings('.clear-input').css('display', 'block');
    }
  });
  $('.public-input-box-type01 .clear-input').on('click', function() {
    $(this).css('display', 'none').siblings('input').val('');
  });

})(jQuery);
