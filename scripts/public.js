(function() {


  $(function() {
    $('.public-js-more-btn').on('click',function(){
      if(!this.flag){
        this.flag = true;
        $(this).addClass('active');
        $(this).find('img').attr('src','http://crm.zzebz.com/static/client/assets/g11.png');
      }else{
        this.flag = false;
        $(this).removeClass('active');
        $(this).find('img').attr('src','http://crm.zzebz.com/static/client/assets/more.png');
      }
    })
    $(document).on('click','.weui-picker-container',function(e){
      console.log($($(e.target)))
      if($(e.target).hasClass('weui-picker-container')){
        console.log('close');
        $("input.js-weui-class").select("close")
      }
    })
    $('.public-js-choose-blur').on('click',function(){
      $('input').blur();
    });
    $('.weui-popup__overlay,.close-popup').on('click',function(){
      $.closePopup();
    })
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
    $('.public-mask').on('click', function(e) {
      console.log(123)
      if ($(e.target).data('origin') == 'mask') {
        $(this).fadeOut();
      }
    });

    //激活弹窗
    $('.js-show-mask').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var targetID = $(this).data('target') + '';
      $(targetID).fadeIn();
    });

    //点击按钮关闭弹窗
    $('.js-hide-mask').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var targetID = $(this).data('target') + '';
      $(targetID).fadeOut();
    });

    //选择弹窗
    $('.public-choose-box-type01').on('click', function(e) {
      if (e.target.nodeName == 'INPUT' && $(this).data('action') === 'all') {
        if ($(this).find('input:checked').length != 0)
          $(this).parent().find('input:not(:checked)').click();
        else
          $(this).parent().find('input:checked').click();
        return;
      }
      if (e.target.nodeName == 'INPUT') return;
      $(this).find('input').click();
      if ($(this).data('action') === 'all' && $(this).find('input:checked').length != 0) {
        $(this).parent().find('input:not(:checked)').click();
      }
    });
    $('.public-screen-content .navs-box a').on('click', function(e) {
      e.preventDefault();
      $(this).addClass('active').siblings().removeClass('active');
      $('.public-screen-content .list-box .list-box-item').fadeOut(0).eq($(this).index()).fadeIn(0);
    });
    $('.public-screen-content .list2-nav a').on('click', function(e) {
      e.preventDefault();
      $(this).addClass('active').siblings().removeClass('active');
      $('.public-screen-content .list2-tab-item-wapper .list2-tab-item').fadeOut(0).eq($(this).index()).fadeIn(0);
    });
    $('.public-screen-content .reset').on('click', function() {
      $('.public-screen-content input:checked').click();
    })
    $('.public-sort-content .reset').on('click', function() {
      $('.public-sort-content input').eq(0).click();
    })

  })

  /*================================================
  =                  悬浮菜单动画                  =
  =================================================*/
  $(function() {
    console.log('--------')
    // if ($('.public-suspension-menu').length == 0) return;
    console.log($('.public-suspension-menu .control'))
    $('.public-suspension-menu .control').on('click', function(e) {
      console.log('---------------------------', e, this)
      if ($('.public-suspension-menu .list').length == 0) return;
      $('.public-suspension-menu').toggleClass('js-is-show');
      setTimeout(function() {
        $('.public-suspension-menu').toggleClass('js-is-show-start');
      }, 0);
      if (!$('.public-suspension-menu').hasClass('js-is-show')) {
        $('.public-suspension-mask').fadeOut();
      } else {
        $('.public-suspension-mask').fadeIn();
      }
    });

    $(document).on('click', '.public-suspension-mask', function() {
      $('.public-suspension-menu').removeClass('js-is-show');
      $('.public-suspension-menu').removeClass('js-is-show-start');
      $('.public-suspension-mask').fadeOut();
    });

    // 页面上滑隐藏悬浮按钮 下滑显示悬浮按钮
    var initTop = 0,
      timer = null,
      suspensionMenu = $('.public-suspension-menu');
    $(window).on('scroll', function() {
      clearTimeout(timer);
      timer = setTimeout(function() {
        suspensionMenu = $('.public-suspension-menu');
        var currentTop = $(window).scrollTop();
        if (currentTop > initTop) {
          if (!suspensionMenu.hasClass('fadeOutRight')) suspensionMenu.removeClass('fadeInRight').addClass('fadeOutRight');
        } else {
          if (!suspensionMenu.hasClass('fadeInRight')) suspensionMenu.removeClass('fadeOutRight').addClass('fadeInRight');
        }
        initTop = currentTop;
      }, 70);

    });
  })

  /*================================================
  =                    vue拓展                    =
  =================================================*/

  Vue.filter('timeConversion', function(timeStamp, fmt) {
    timeStamp *= 1000;
    var tempFmt = fmt;
    var fmt = !fmt || fmt === '666' ? 'yyyy-MM-dd hh:mm:ss' : fmt,
      txt = '',
      getDate = new Date(timeStamp),
      o = {
        'M+': getDate.getMonth() + 1,
        'd+': getDate.getDate(),
        'h+': getDate.getHours(),
        'm+': getDate.getMinutes(),
        's+': getDate.getSeconds(),
        'q+': Math.floor((getDate.getMonth() + 3) / 3),
        'S': getDate.getMilliseconds()
      },
      diffTime = (+new Date - timeStamp) / 1000;

    if (tempFmt === '666') {
      if (diffTime < 60 * 5) {
        txt = "刚刚";
      } else if (diffTime >= 60 * 5 && diffTime < 60 * 60) {
        txt = parseInt(diffTime / 60) + "分钟前";
      } else if (diffTime >= 3600 && diffTime < 3600 * 24) {
        txt = parseInt(diffTime / 3600) + "小时前";
      } else if (diffTime >= 3600 * 24 && diffTime < 3600 * 24 * 30) {
        // txt = parseInt(diffTime / 3600 / 24) + "天前";
        fmt = 'yyyy-MM-dd';
      } else if (diffTime >= 3600 * 24 * 30 && diffTime < 3600 * 24 * 30 * 12) {
        // txt = parseInt(diffTime / 3600 / 24 / 30) + "个月前";
        fmt = 'yyyy-MM-dd';
      } else if (diffTime >= 3600 * 24 * 30 * 12) {
        // txt = parseInt(diffTime / 3600 / 24 / 30 / 12) + "年前";
        fmt = 'yyyy-MM-dd';
      }
    }

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }

    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }

    return txt == '' ? fmt : txt;
  });

  Vue.filter('stringIntercept', function(str, len) {
    var len = len ? len : 2;
    return str.substr(str.length - len);
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

})();

// textarea 自动高度
$.fn.autoHeight = function() {
  function autoHeight(elem) {
    elem.style.height = 'auto';
    elem.scrollTop = 0; //防抖动
    elem.style.height = elem.scrollHeight + 'px';
  }
  this.each(function() {
    autoHeight(this);
    $(this).on('keyup', function() {
      autoHeight(this);
    });
  });
}
$('textarea[autoHeight]').autoHeight();

//计算2个时间的时间差，单位秒
function substractDate(date1, date2) {
  var type1 = typeof date1;
  var type2 = typeof date2;
  if (type1 == 'string') {
    date1 = new Date(date1);
  }
  if (type2 == 'string') {
    date2 = new Date(date2);
  }
  return (date1 - date2) / 1000;
}

/*================================================
=                    工具函数                    =
=================================================*/

// 解析地址栏参数
function searchString2Obj(searchString) {
  var queryArr = searchString.split('&'),
    queryObj = {};
  Array.prototype.forEach.call(queryArr, function(item, index) {
    var item = item.split('=');
    queryObj[item[0]] = decodeURI(item[1]);
  });
  return queryObj;
};
