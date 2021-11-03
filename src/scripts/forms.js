import * as $ from 'jquery'
//switch

$('.form-switch-button').on('click',function(){
    $(this).toggleClass('switch-on');
    if ($(this).hasClass('switch-on')) {
      $(this).trigger('on.switch');
    } else {
      $(this).trigger('off.switch');
    }
  });

  $('.form-switch-button').on('on.switch', function(){
    $('.form-switch-button').removeClass('form-swith-button-off')
  });
  $('.form-switch-button').on('off.switch', function(){
    $('.form-switch-button').addClass('form-swith-button-off')
    
  });