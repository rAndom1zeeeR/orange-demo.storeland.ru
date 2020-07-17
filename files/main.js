// Возвращает правильное окончание для слова
function genWordEnd(num, e, m, mm) {

  // Если забыли указать окончания
  if(typeof (e) == "undefined") { e = ''; }
  if(typeof (m) == "undefined") { e = 'а'; }
  if(typeof (mm) == "undefined"){ e = 'oв'; }
  // Если передали пустую строку, вместо цифры
  if(0 == num.length) { num = 0; }
  
  // Превращаем цифру в правильный INT
  num = GetSum(num).toString();

  // Получаем последний символ цифры
  ch1 = num.substring(num.length-1);
  // Получаем последний символ цифры
  ch2 = num.length == 1 ? 0 : num.substring(num.length-2, num.length-1);

  // Если последняя цифра - 1, вернем единственное число
  if(ch2!=1 && ch1==1)               {return e;}
  // Если последняя цифра - от 2 до 4х , вернем множественное чило из массива с индексом 2
  else if(ch2!=1 && ch1>1 && ch1<=4) {return m;}
  // Если последняя цифра - от 5 до 0 , вернем множественное чило из массива с индексом 3
  else if(ch2==1 || ch1>4 || ch1==0) {return mm;}
}

// Проверка вводимых значений в количестве товара
function keyPress(oToCheckField, oKeyEvent) {
  return oKeyEvent.charCode === 0 || /\d/.test(String.fromCharCode(oKeyEvent.charCode));
}

// Наверх
$(document).ready(function(){
	$("#back-top").hide();
	$(function () {
		var wh = $(window).height();
		var whtml =  $(document).height();
		$(window).scroll(function () {
			if ($(this).scrollTop() > whtml/10) {
				$('#back-top').fadeIn();
			} else {
				$('#back-top').fadeOut();
			}
		});
		$('#back-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});
});

// Работа с cookie файлами. 
// Получение переменной из cookie
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
// Установка переменной в cookie
function setCookie(name, value, options) {
  options = options || {};
  var expires = options.expires;
  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires*1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) { 
    options.expires = expires.toUTCString();
  }
  value = encodeURIComponent(value);
  var updatedCookie = name + "=" + value;
  for(var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];    
    if (propValue !== true) { 
      updatedCookie += "=" + propValue;
     }
  }
  document.cookie = updatedCookie;
}
// Удаление переменной из cookie
function deleteCookie(name, options ) {
  options = options || {};
  options.expires = -1;
  setCookie(name, "", options)
}

// Отправляет ошибку на сервер, для того чтобы служба тех поддержки могла разобраться в проблеме как можно быстрее.
function sendError (desc, page, line) {
  var img=document.createElement('img');
  img.src = 'https://storeland.ru/error/js?desc='+encodeURIComponent(desc)+'&page='+encodeURIComponent(window.location)+'&line=0';
  img.style.position = 'absolute';
  img.style.top = '-9999px';

  try { document.getElementsByTagName('head').appendChild(img) } catch (e){}
  return false;
}

// Форматирует цену
function number_format(number,decimals,dec_point,thousands_sep){var n=number,prec=decimals;var toFixedFix=function(n,prec){var k=Math.pow(10,prec);return(Math.round(n*k)/k).toString();};n=!isFinite(+n)?0:+n;prec=!isFinite(+prec)?0:Math.abs(prec);var sep=(typeof thousands_sep==='undefined')?',':thousands_sep;var dec=(typeof dec_point==='undefined')?'.':dec_point;var s=(prec>0)?toFixedFix(n,prec):toFixedFix(Math.round(n),prec);var abs=toFixedFix(Math.abs(n),prec);var _,i;if(abs>=1000){_=abs.split(/\D/);i=_[0].length%3||3;_[0]=s.slice(0,i+(n<0))+
_[0].slice(i).replace(/(\d{3})/g,sep+'$1');s=_.join(dec);}else{s=s.replace('.',dec);}
var decPos=s.indexOf(dec);if(prec>=1&&decPos!==-1&&(s.length-decPos-1)<prec){s+=new Array(prec-(s.length-decPos-1)).join(0)+'0';}
else if(prec>=1&&decPos===-1){s+=dec+new Array(prec).join(0)+'0';}
return s;}

// Превращает поле пароля в текстовое поле и обратно
// @LinkObject - ссылка по которой кликнули
// @InputObject - объект у которого нужно изменить тип поля
function ChangePasswordFieldType (LinkObject, InputObject) {
  var 
    // Ссылка по которой кликнули
    LObject = $(LinkObject),
    // Объект у которого изменяем тип с password на text
    IObject = $(InputObject),
    // Старый текст ссылки
    txtOld = LObject.text(),
    // Новый текст ссылки
    txtNew = LObject.attr('rel');

  // Если объекты не получены, завершим работу функции
  if( LObject.length==0 || IObject.length==0 ) {
    return false;
  }

  // Изменяем у ссылки текст со старого на новый
  LObject.html(txtNew);
  // Старый текст ссылки сохраняем в атрибуте rel 
  LObject.attr('rel', txtOld);

  // Изменяем тип input поля
  if(IObject[0].type == 'text') {
    IObject[0].type = 'password';
  } else {
    IObject[0].type = 'text';
  }
}

// Крутит изображение при обновлении картинки защиты от роботов
function RefreshImageAction(img,num,cnt) {
  if(cnt>13) {
    return false;
  }

  $(img).attr('src', $(img).attr('rel') + 'icon/refresh/' + num + '.gif');
  num = (num==6)?0:num;
  setTimeout(function(){RefreshImageAction(img, num+1, cnt+1);}, 50);
}

function MainFunctions() {
$(document).ready(function(){
  
  // Кнопки на сайте если подгружен модуль Jquery.UI
  if(typeof($('button.submit, button:submit, input:submit, input.button').button) == "function" ) {
    $('button.submit, button:submit, input:submit, input.button').button();
  }
  
  // Валидация формы на странице оформления заказа, а так же формы на страницы связи с администрацией
  $("#myform, .feedbackForm, .clientForm, #quickform, .goodsDataOpinionAddForm").validate({
     rules: {
     reg_name: "required"
   }
  });

  // Отправка формы по Ctrl+Enter
  $('form').bind('keypress', function(e){
    if((e.ctrlKey) && ((e.which==10)||(e.which==13))) {$(this).submit();}
  // Отправка данных формы по нажатию на Enter в случае если курсор находится в input полях (В некоторых браузерах при нажатии по enter срабатывает клик по первому submit полю, которое является кнопкой назад. Для этого написан этот фикс)
  }).find('input').bind('keypress', function(e){
    if(((e.which==10)||(e.which==13))) { try{$(this.form).submit();} catch(e){} return false; }
  });
  
  // В форме оформления заказа при клике на кнопку назад просто переходим на предыдущую страницу
  $('.order form input:submit[name="toprev"]').click(function(){
    var act = this.form.action;
    this.form.action = act + ( act.indexOf( '\?' ) > -1 ? '&' : '?' ) + 'toprev=1';
    this.form.submit();
    return false;
  });
  
  // Добавление товара в корзину через ajax
  $('.goodsDataForm, .goodsToCartFromCompareForm, .goodsListForm, .goodsListItemCatalogueAddToCartButton').submit(function() {
    
    // Выносим функции из шаблонов
    if ($(this).attr('rel') === 'quick') {
      quickorder(this);
      return (false);
    }
    
    // Находим форму, которую отправляем на сервер, для добавления товара в корзину
    var formBlock = $($(this).get(0));
    var adresCart = '/cart';
      // Проверка на существование формы отправки запроса на добавление товара в корзину
      if (1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
        alert('Не удалось найти форму добавления товара в корзину');
        return false;
      }
      
      // Получаем данные формы, которые будем отправлять на сервер
      var formData = formBlock.serializeArray();
      // Сообщаем серверу, что мы пришли через ajax запрос
      formData.push({name: 'ajax_q', value: 1});
      // Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа
      //formData.push({name: 'fast_order', value: 1});
      // Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
        $.ajax({
            type: "POST",
            cache: false,
            url: formBlock.attr('action'),
            data: formData,
            success: function(data) {
                w = $(window).width();
                if (w > 480) {
                    $.fancybox({
                        content: data
                                // При изменении размера окна изменяем размер окна оформления заказа
                                , onUpdate: function() {
                            return false;
                        }
                    });
                } else {
                    if (confirm('Товар был добален в корзину! Перейти в корзину?')) {
                        window.location.href = adresCart;
                    }
                    ;
                }
                setTimeout(function() {
                    $.fancybox.update();
                }, 500);
            }
        });
        return false;
  });

 // Функция собирает свойства в строку, для определения модификации товара
  function getSlugFromGoodsDataFormModificationsProperties(obj) {
    var properties = new Array();
    $(obj).each(function(i){
      properties[i] = parseInt($(this).val());
    });
    return properties.sort(function(a,b){return a - b}).join('_');
  }
   
  var 
    // Запоминаем поля выбора свойств, для ускорения работы со значениями свойств
    goodsDataProperties = $('form.goodsDataForm select[name="form[properties][]"]'),
    
    // Запоминаем блоки с информацией по модификациям, для ускорения работы
    goodsDataModifications = $('div.goodsDataMainModificationsList');
  
  // Обновляет возможность выбора свойств модификации, для отключения возможности выбора по характеристикам модификации которой не существует.
  function updateVisibility (y) {
    // Проверяем в каждом соседнем поле выбора модификаций, возможно ли подобрать модификацию для указанных свойств
    goodsDataProperties.each(function(j){
      // Если мы сравниваем значения свойства не с самим собой, а с другим списком значений свойств
      if( j != y ) {
        // Проходим по всем значениям текущего свойства модификации товара
        $(this).find('option').each(function(){
          // Записываем временный массив свойств, которые будем использовать для проверки существования модификации
          var checkProperties = new Array();
          $(goodsDataProperties).each(function(i){
            checkProperties[i] = parseInt($(this).val());
          });
          // Пытаемся найти модификацию соответствующую выбранным значениям свойств
          checkProperties[j] = parseInt($(this).attr('value'));
          // Собираем хэш определяющий модификацию по свойствам
          slug = checkProperties.sort(function(a,b){return a - b}).join('_');
          // Ищем модификацию по всем выбранным значениям свойств товара. Если модификации нет в возможном выборе, отмечаем потенциальное значение выбора как не доступное для выбора, т.к. такой модификации нет.
          if(!goodsDataModifications.filter('[rel="'+slug+'"]').length) {
           $(this).attr('disabled', true);
          // Если выбрав данное значение свойства товара можно подобрать модификацию, то выделяем вариант выбора как доступный.
          } else {
            $(this).attr('disabled', false);
          }
        });
      }
    });
  }
  // Обновляем возможность выбора модификации товара по свойствам. Для тех свойств, выбор по которым не возможен, отключаем такую возможность.
  // Проверяем возможность выбора на всех полях кроме первого, чтобы отключить во всех остальных варианты, которые не возможно выбрать
  updateVisibility (0);
  // Проверяем возможность выбора на всех полях кроме второго, чтобы в первом поле так же отключилась возможность выбора не существующих модификаций
  updateVisibility (1);
  
  //var goodsDataProperties = $('.goodsDataForm [name="form[properties][]"]');
  
  // Изменение цены товара при изменении у товара свойства для модификации
  goodsDataProperties.each(function(){
    $(this).change(function(){
      var slug = getSlugFromGoodsDataFormModificationsProperties(goodsDataProperties),
          modificationBlock             = $('.goodsDataMainModificationsList[rel="'+slug+'"]'),
          modificationId                = parseInt(modificationBlock.find('[name="id"]').val()),
          modificationArtNumber         = modificationBlock.find('[name="art_number"]').val(),
          modificationPriceNow          = parseFloat(modificationBlock.find('[name="price_now"]').val()),
          modificationPriceNowFormated  = modificationBlock.find('.price_now_formated').html(),
          modificationPriceOld          = parseFloat(modificationBlock.find('[name="price_old"]').val()),
          modificationPriceOldFormated  = modificationBlock.find('.price_old_formated').html(),
          modificationRestValue         = parseFloat(modificationBlock.find('[name="rest_value"]').val()),
          modificationDescription       = modificationBlock.find('.description').html(),
          modificationMeasureId         = parseInt(modificationBlock.find('[name="measure_id"]').val()),
          modificationMeasureName       = modificationBlock.find('[name="measure_name"]').val(),
          modificationMeasureDesc       = modificationBlock.find('[name="measure_desc"]').val(),
          modificationMeasurePrecision  = modificationBlock.find('[name="measure_precision"]').val(),
          modificationIsHasInCompareList= modificationBlock.find('[name="is_has_in_compare_list"]').val(),
          modificationGoodsModImageId   = modificationBlock.find('[name="goods_mod_image_id"]').val(),
          goodsModificationId           = $('.goodsDataMainModificationId'),
          goodsPriceNow                 = $('.goodsDataMainModificationPriceNow'),
          goodsPriceOld                 = $('.goodsDataMainModificationPriceOld'),
          goodsAvailable                = $('.goodsDataMainModificationAvailable'),
          goodsAvailableTrue            = goodsAvailable.find('.available-true'),
          goodsAvailableFalse           = goodsAvailable.find('.available-false'),
          goodsAvailableAddCart         = $('.add-to-form'),
          goodsArtNumberBlock           = $('.goodsDataMainModificationArtNumber'),
          goodsArtNumber                = goodsArtNumberBlock.find('span');
          goodsCompareAddButton         = $('.goodsDataCompareButton.add');
          goodsCompareDeleteButton      = $('.goodsDataCompareButton.delete');
          goodsModDescriptionBlock      = $('.goodsDataMainModificationsDescriptionBlock');
       
       // Изменяем данные товара для выбранных параметров. Если нашлась выбранная модификация
       if(modificationBlock.length) {
         // Цена товара
         goodsPriceNow.html(modificationPriceNowFormated);
  
         // Старая цена товара
         if(modificationPriceOld>modificationPriceNow) {
          goodsPriceOld.html(modificationPriceOldFormated);
         } else {
           goodsPriceOld.html('');
         }
         
         // Есть ли товар есть в наличии
         if(modificationRestValue>0) {
           goodsAvailableTrue.show();
           goodsAvailableFalse.hide();
           goodsAvailableAddCart.show();
         // Если товара нет в наличии
         } else {
           goodsAvailableTrue.hide();
           goodsAvailableFalse.show();
           goodsAvailableAddCart.hide();
         }
         // Если товар есть в списке сравнения
         if(modificationIsHasInCompareList>0) {
           goodsCompareAddButton.hide();
           goodsCompareDeleteButton.show();
         // Если товара нет в списке сравнения
         } else {
           goodsCompareAddButton.show();
           goodsCompareDeleteButton.hide();
         }
         
         // Покажем артикул модификации товара, если он указан
         if(modificationArtNumber.length>0) {
           goodsArtNumberBlock.show();
           goodsArtNumber.html(modificationArtNumber);
         // Скроем артикул модификации товара, если он не указан
         } else {
           goodsArtNumberBlock.hide();
           goodsArtNumber.html('');
         }

         // Описание модификации товара. Покажем если оно есть, спрячем если его у модификации нет
         if(modificationDescription.length > 0) {
           goodsModDescriptionBlock.show().html('<div>' + modificationDescription + '</div>');
         } else {
           goodsModDescriptionBlock.hide().html();
         }
         // Идентификатор товарной модификации
         goodsModificationId.val(modificationId);
         // Меняет главное изображение товара на изображение с идентификатором goods_mod_image_id
        function changePrimaryGoodsImage(goods_mod_image_id) {
          // Если не указан идентификатор модификации товара, значит ничего менять не нужно.
          if(1 > goods_mod_image_id) {
            return true;
          }
          var 
            // Блок с изображением выбранной модификации товара
            goodsModImageBlock = $('.thumblist [data-id="' + parseInt(goods_mod_image_id) + '"'),
            // Блок, в котором находится главное изображение товара
            MainImageBlock = $('.general-img'),
            // Изображение модификации товара, на которое нужно будет изменить главное изображение товара.
            MediumImageUrl = goodsModImageBlock.find('a').attr('href'),
            // Главное изображение, в которое будем вставлять новое изображение
            MainImage = MainImageBlock.find('img'),
            // В этом объекте хранится идентификатор картинки главного изображения для коректной работы галереи изображений
            MainImageIdObject = MainImageBlock.attr('data-id')
          ;
          
          // Если изображение модификации товара найдено - изменяем главное изображение
          MainImage.attr('src', MediumImageUrl);
          MainImageBlock.find('a').attr('href', MediumImageUrl);
          // Изменяем идентификатор главного изображения
          MainImageBlock.attr("data-id", parseInt(goods_mod_image_id));
          return true;
        }
        // Обновляем изображние модификации товара, если оно указано
        changePrimaryGoodsImage(modificationGoodsModImageId);
       } else {
         // Отправим запись об ошибке на сервер
         sendError('no modification by slug '+slug);
         alert('К сожалению сейчас не получается подобрать модификацию соответствующую выбранным параметрам.');
       }
    });
  });
  
  var
    // Минимальное значение цены для фильтра
    priceFilterMinAvailable = parseInt($('.goodsFilterPriceRangePointers .min').text())
    // Максимальное значение цены для фильтра
    ,priceFilterMaxAvailable = parseInt($('.goodsFilterPriceRangePointers .max').text())
    // Максимальное значение цены для фильтра
    ,priceSliderBlock = $('#goods-filter-price-slider')
    // Поле ввода текущего значения цены "От"
    ,priceInputMin = $( "#goods-filter-min-price" )
    // Поле ввода текущего значения цены "До"
    ,priceInputMax = $( "#goods-filter-max-price" )
    // Блок с кнопкой, которую есть смысл нажимать только тогда, когда изменялся диапазон цен.
    ,priceSubmitButtonBlock = $( ".goodsFilterPriceSubmit" )
  ;
  
  // Изменяет размер ячеек с ценой, т.к. у них нет рамок, есть смысл менять размеры полей ввода, чтобы они выглядили как текст
  function priceInputsChangeWidthByChars() {
    // Если есть блок указания минимальной цены
    if(priceInputMin.length) {
      priceInputMin.css('width', (priceInputMin.val().length*7 + 30) + 'px');
      priceInputMax.css('width', (priceInputMax.val().length*7 + 30) + 'px');
    }
  }
  
  // Слайдер, который используется для удобства выбора цены
  priceSliderBlock.slider({
    range: true,
    min: priceFilterMinAvailable,
    max: priceFilterMaxAvailable,
    values: [
           parseInt($('#goods-filter-min-price').val())
           ,parseInt($('#goods-filter-max-price').val())
    ],
    slide: function( event, ui ) {
           priceInputMin.val( ui.values[ 0 ] );
           priceInputMax.val( ui.values[ 1 ] );
           priceSubmitButtonBlock.show();
           priceInputsChangeWidthByChars();
    }
  });
  
  // При изменении минимального значения цены
  priceInputMin.keyup(function(){
    var newVal = parseInt($(this).val());
    if(newVal < priceFilterMinAvailable) {
           newVal = priceFilterMinAvailable;
    }
    priceSliderBlock.slider("values", 0, newVal);
    priceSubmitButtonBlock.show();
    priceInputsChangeWidthByChars();
  });
  
  // При изменении максимального значения цены
  priceInputMax.keyup(function(){
    var newVal = parseInt($(this).val());
    if(newVal > priceFilterMaxAvailable) {
           newVal = priceFilterMaxAvailable;
    }
    priceSliderBlock.slider("values", 1, newVal);
    priceSubmitButtonBlock.show();
    priceInputsChangeWidthByChars();
  });
  // Обновить размеры полей ввода диапазона цен
  priceInputsChangeWidthByChars();
  
  // Добавление/удаление товара на сравнение/избранное через ajax
  $('.add-compare').click(function(){
    // Объект ссылки, по которой кликнули
    var 
      a = $(this)
      ,addUrl = a.attr('data-action-add-url')
      ,delUrl = a.attr('data-action-delete-url')
      ,addTitle = a.attr('data-action-add-title')
      ,delTitle = a.attr('data-action-delete-title')
      ,isAdd = a.attr('data-action-is-add')
      ,pName = a.attr('data-prodname')
      ,pUrl = a.attr('data-produrl')
      ,pDataid = a.attr('data-id')
      ,pDataprice = a.attr('data-mod-id')
      ,pDataGoodsid = a.attr('data-goodsid')
      ,aText = a.parent().find('.add-compare')
      requestUrl = a.attr('href')
    ;
    var flag = 0;
    $('.compare-items li').each(function(){       
      if($(this).find('a.dataid').text() == pDataid){      
      flag = 1;
      }
      if(flag == 1){
        $(this).remove();
        return false;
      }
      return flag;
    })   
 
    // Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
    if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
      requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsDataMainModificationId').val());
    }
    
    // Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
    if(addUrl && delUrl) {
      $.ajax({
        type : "POST",
        dataType: 'json',
        cache : false,
        url : requestUrl,
        data : {
          'ajax_q': 1
        },
        success: function(data) {
           if(flag == 0){   
            $('.compare-items').prepend('<li><a href="'+ pUrl +'" class="title">'+ pName +'</a><a data-href="'+ delUrl +'?id='+ pDataprice +'" data-goods-mod-id="'+ pDataprice +'" class="remove-compare" title="Убрать товар из списка сравнения">×</a><a href="#" class="dataid">'+ pDataid +'</a></li>');
          }
          if('ok' == data.status) {
            if(isAdd == 1) {
              var 
                from = addUrl
                ,to = delUrl
                ,newIsAddStatus = 0
                ,newTitle = delTitle ? delTitle : ''
              ;
              a.addClass('added');
            } else {
              var 
                from = delUrl
                ,to = addUrl
                ,newIsAddStatus = 1
                ,newTitle = addTitle ? addTitle : ''
              ;
              a.removeClass('added');
            }
            
            // Если указано, что изменилось число товаров на сравнении
            if(typeof(data.compare_goods_count) != 'undefined') {
              // Блок информации о том, что есть товары на сравнении
              var sidecount = $('.compare-count-side');
              // Если на сравнении больше нет товаров
              // Указываем информацию о новом количестве товаров на сравнении
              // Блок обновления списка сравнения в каталога
              sidecount.animate({opacity: 0,display: "none"},500,function(){
              sidecount.text(data.compare_goods_count);                 
                if(data.compare_goods_count > 0){
                  $('.block-sidebar.compare').show();
                }else{
                  $('.block-sidebar.compare').hide();
                }
              }).animate({display: "inline",opacity: 1} , 500 );
            
              
            }
            
            // Обновляем ссылку, на которую будет уходить запрос и информацию о ней
            a.attr('href', a.attr('href').replace(new RegExp(from), to))
             .attr('title', newTitle)
             .attr('data-action-is-add', newIsAddStatus);
            
            // Если рядом с ссылкой в виде круга есть текстовая надпись с описанием действия
            if(aText.length) {
              aText.text(aText.attr(isAdd == 1 ? 'data-action-text-delete' : 'data-action-text-add'));
            }

            // Если есть функция, которая отображает сообщения пользователю
            if(typeof(noty) == "function") {
              noty({
                text:data.message
                ,layout:"center"
                ,type:"success"
                ,textAlign:"center"
                ,easing:"swing"
                ,animateOpen:{"height":"toggle"}
                ,animateClose:{"opacity":"hide"}
                ,speed:"500"
                ,timeout:"3000"
                ,closable: false
                ,modal: false
                ,dismissQueue: true
                ,onClose: true
                ,killer: true
              });
            }
              
          } else if('error' == data.status) {
            // Если есть функция, которая отображает сообщения пользователю
            if(typeof(noty) == "function") {
              noty({
                text:data.message
                ,layout:"center"
                ,type:"error"
                ,textAlign:"center"
                ,easing:"swing"
                ,animateOpen:{"height":"toggle"}
                ,animateClose:{"opacity":"hide"}
                ,speed:"500"
                ,timeout:"3000"
                ,closable: false
                ,modal: false
                ,dismissQueue: true
                ,onClose: true
                ,killer: true
              });
            }
          }
        }
      });
      
      return false;
    }
  });
  
  // Добавление/удаление товара на сравнение/избранное через ajax
  $('.add-wishlist').click(function(){
    // Объект ссылки, по которой кликнули
    var 
      a = $(this)
      ,addUrl = a.attr('data-action-add-url')
      ,delUrl = a.attr('data-action-delete-url')
      ,addTitle = a.attr('data-action-add-title')
      ,delTitle = a.attr('data-action-delete-title')
      ,isAdd = a.attr('data-action-is-add')
      ,aText = a.parent().find('.add-wishlist')
      requestUrl = a.attr('href')
    ;
    
    // Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
    if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
      requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsDataMainModificationId').val());
    }
    
    // Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
    if(addUrl && delUrl) {
      $.ajax({
        type : "POST",
        dataType: 'json',
        cache : false,
        url : requestUrl,
        data : {
          'ajax_q': 1
        },
        success: function(data) {
          if('ok' == data.status) {
            if(isAdd == 1) {
              var 
                from = addUrl
                ,to = delUrl
                ,newIsAddStatus = 0
                ,newTitle = delTitle ? delTitle : ''
              ;
              a.addClass('added');
            } else {
              var 
                from = delUrl
                ,to = addUrl
                ,newIsAddStatus = 1
                ,newTitle = addTitle ? addTitle : ''
              ;
              a.removeClass('added');
            }
            
            // Если указано, что изменилось число товаров на сравнении
            if(typeof(data.compare_goods_count) != 'undefined') {
              // Блок информации о том, что есть товары на сравнении
              var compareBlock = $('#compareInfoBlock');
              // Если на сравнении больше нет товаров
              if(0 < data.compare_goods_count) {
                compareBlock.show();
              // Если на сравнении есть новые товары
              } else {
                compareBlock.hide();
              }
              // Указываем информацию о новом количестве товаров на сравнении
              compareBlock.find('.nb_goods').text( data.compare_goods_count + ( typeof(genWordEnd) == 'function' ? ' товар' + genWordEnd(data.compare_goods_count, "", "а", "ов") : '') );
            }
            
            // Обновляем ссылку, на которую будет уходить запрос и информацию о ней
            a.attr('href', a.attr('href').replace(new RegExp(from), to))
             .attr('title', newTitle)
             .attr('data-action-is-add', newIsAddStatus);
            
            // Если рядом с ссылкой в виде круга есть текстовая надпись с описанием действия
            if(aText.length) {
              aText.text(aText.attr(isAdd == 1 ? 'data-action-text-delete' : 'data-action-text-add'));
            }

            // Если есть функция, которая отображает сообщения пользователю
            if(typeof(noty) == "function") {
              noty({
                text:data.message
                ,layout:"center"
                ,type:"success"
                ,textAlign:"center"
                ,easing:"swing"
                ,animateOpen:{"height":"toggle"}
                ,animateClose:{"opacity":"hide"}
                ,speed:"500"
                ,timeout:"3000"
                ,closable: false
                ,modal: false
                ,dismissQueue: true
                ,onClose: true
                ,killer: true
              });
            }
              
          } else if('error' == data.status) {
            // Если есть функция, которая отображает сообщения пользователю
            if(typeof(noty) == "function") {
              noty({
                text:data.message
                ,layout:"center"
                ,type:"error"
                ,textAlign:"center"
                ,easing:"swing"
                ,animateOpen:{"height":"toggle"}
                ,animateClose:{"opacity":"hide"}
                ,speed:"500"
                ,timeout:"3000"
                ,closable: false
                ,modal: false
                ,dismissQueue: true
                ,onClose: true
                ,killer: true
              });
            }
          }
        }
      });
      
      return false;
    }
  });
  
  // Сравнение товаров. Инвертирование свойств для сравнения товара
  $('.CompareCheckbox.invert').click(function(){
    var checked = true,
        checkboxes = $('.CompareCheckbox:not(.invert)');

    checkboxes.each(function(){
      if($(this).attr('checked')) {
        checked = false;
        return false;
      }
    });
    
    checkboxes.each(function(){
      $(this).attr('checked', checked);
    });
    
    $(this).attr('checked', checked);
  });
  
  // Сравнение товаров. Скрытие характеристик товара, которые выделил пользователь
  $('.CompareGoodsHideSelected').click(function(){

    $('.CompareGoodsTableTbodyComparisonLine').each(function(){
      var CheckedCheckbox = $(this).find('.CompareCheckbox:checked:not(.invert)');
      if(CheckedCheckbox.length>0) {
        $(this).hide();
      }
    });

    // отменяем выделение характеристик товаров
    $('.CompareCheckbox').attr('checked',false);

    return false;
  });
  
  // Сравнение товаров. Скрытие характеристик товара, которые выделил пользователь
  $('.CompareGoodsHideSelected').click(function(){
  $('.CompareGoodsShowAll').show();
    $('.CompareGoodsTableTbodyComparisonLine').each(function(){
      var CheckedCheckbox = $(this).find('.CompareCheckbox:checked:not(.invert)');
      if(CheckedCheckbox.length>0) {
        $(this).hide();
      }
    });

    // отменяем выделение характеристик товаров
    $('.CompareCheckbox').attr('checked',false);

    return false;
  });
  
  // Сравнение товаров. Отображение скрытых характеристик товара
  $('.CompareGoodsShowAll').click(function(){
    $(this).hide();
    $('.CompareGoodsTableTbodyComparisonLine:hidden').show();
    return false;
  });
  
  // Сравнение товаров. Верхняя навигация изменение фильтра на отображение всех характеристик товаров
  $('.CompareGoodsTableFilterShowAll').click(function(){
    $('.CompareGoodsTableFilterSelected').removeClass('CompareGoodsTableFilterSelected');
    $('.CompareGoodsTableTbodyComparisonLine:hidden').show();
    
    $(this).addClass('CompareGoodsTableFilterSelected');
    return false;
  });

  // Сравнение товаров. Фильтр в верхней навигации. Отображение только различающихся характеристик товара
  $('.CompareGoodsTableFilterShowOnlyDifferent').click(function(){
    $('.CompareGoodsTableFilterSelected').removeClass('CompareGoodsTableFilterSelected');
    $('.CompareGoodsTableTbodyComparisonLine:not(.same)').show();
    $('.CompareGoodsTableTbodyComparisonLine.same').hide();

    $(this).addClass('CompareGoodsTableFilterSelected');
    return false;
  });

  // Сравнение товаров. При наведении на строку сравнения, она выделяется цветом
  $('.CompareGoodsTableTbodyComparisonLine').hover(
    function () { $(this).addClass('hover'); }, 
    function () { $(this).removeClass('hover'); }
  );
  
  // При клике по строке выделяем свойство
  $('.CompareGoodsTableTbodyComparisonLine td:not(.ceil1)').click(function(){
    var CompareCheckbox = $(this).parent().find('.CompareCheckbox');

    if(CompareCheckbox.attr('checked')) {
      CompareCheckbox.attr('checked', false);
    } else {
      CompareCheckbox.attr('checked', true);
    }
  });
  
  function compareGetVars () {
    return new Array(
      $('.CompareGoodsTableTbody tr:first td').length - 1,
      parseInt($('.CompareGoodsTableTbody tr:first td:visible:not(.ceil1)').attr('class').replace(new RegExp('noBorderBottom compare\-td compare\-td\-'), '')),
      parseInt($('.CompareGoodsTableTbody tr:first td:visible:last').attr('class').replace(new RegExp('noBorderBottom compare\-td compare\-td\-'), ''))
    );
  }
  
  // Прокрутка списка сравнения вправо
  $('.CompareGoodsTableNext').click(function(){
    
    // Определяем используемые поля
    var data = compareGetVars(); 
      
    // Изменяем их если это возможно.
    if(data[0] > data[2]) {
      $('.compare-td-' + data[1]).hide();
      $('.compare-td-' + (data[2] + 1)).show();
      if((data[2] + 1) >= data[0]) {
        $(this).find('a').addClass('disable');
      }
      if(data[1] + 1 != 1) {
        $('.CompareGoodsTablePrev a').removeClass('disable');
      }
    }
    
    return false;
  });
  
  // Прокрутка списка сравнения влево
  $('.CompareGoodsTablePrev').click(function(){
    
    // Определяем используемые поля
    var data = compareGetVars(); 
    
    // Изменяем их если это возможно.
    if(1 < data[1]) {
      $('.compare-td-' + (data[1] - 1)).show();
      $('.compare-td-' + data[2]).hide();
      if((data[1] - 1) <= 1) {
        $(this).find('a').addClass('disable');
      }
      if(data[2] - 1 != data[0]) {
        $('.CompareGoodsTableNext a').removeClass('disable');
      }
    }
    
    return false;
  });
  

  // Форма регистрации нового пользователя, действие ссылки "показать пароль"
  $('.clientForm .showPass').click(function(){
    ChangePasswordFieldType(this, $('#sites_client_pass'));
    return false;
  });
  
  // Форма регистрации нового пользователя, при оформлении заказа
  $('.OrderShowPass').click(function(){
    ChangePasswordFieldType(this, $('#contactPassWord'));
    return false;
  });

  // При оформлении заказа дадим возможность зарегистрироваться пользователю
  $('#contactWantRegister').click(function(){
    if($(this).attr("checked")) {
      $('.contactRegisterNeedElement').show();
      $('#contactEmail, #contactPassWord').addClass('required');
    } else {
      $('.contactRegisterNeedElement').hide();
      $('#contactEmail, #contactPassWord').removeClass('required');
    }
  });

  // Добавление отзыва о товаре. Рейтинг
  if(typeof($('.goodsDataOpinionTableRating').rating) == "function" ) {
    $('.goodsDataOpinionTableRating input').rating({
      split: 2,
      required: true
    });
  }
  
  // Список отзывов о товаре. Ссылка на отображение формы для добавление отзыва о товаре
  $('.goodsDataOpinionShowAddForm').click(function(){
    if(0 == $('#goodsDataOpinionAddBlock:visible').length) {
      $('#goodsDataOpinionAddBlock').show('blind');
      $('html, body').animate({scrollTop : jQuery('.goodsDataOpinionAddForm').offset().top - 120}, 400);
    } else {
      $('#goodsDataOpinionAddBlock').hide('blind');
      $('html, body').animate({scrollTop : jQuery('.goodsDataOpinion').offset().top - 120}, 400);
      return false;
    }
  });

  // Добавление отзыва о товаре. кнопка reset скрывающая форму добавления отзыва о товаре
  $('.goodsDataOpinionFormReset').click(function(){
    $('#goodsDataOpinionAddBlock').hide('blind');
    $('html, body').animate({scrollTop : jQuery('.goodsDataOpinion').offset().top - 120}, 400);
    return false;
  });

  // Иконка для обновления изображение капчи
  $('.goodsDataOpinionCaptchaRefresh').click(function(){
    RefreshImageAction(this,1,1);
    $('.goodsDataOpinionCaptchaImg').attr('src',$('.goodsDataOpinionCaptchaImg').attr('src')+'&rand'+Math.random(0,10000));
    return false;
  });
  
  // Фильтры по товарам. При нажании на какую либо характеристику или свойство товара происходит фильтрация товаров
  $('.contentTbodySearchFilterBlock input').click(function(){
    $(this)[0].form.submit();
  });
  
  // Действия при выборе варианта доставки на этапе оформления заказа
  $('.deliveryRadio').click(function(){
    
    // Если текущая выделенная зона доставки не относится к выбранному варианту доставки, снимаем выделение с зоны доставки
    if($('.deliveryZoneRadio:checked').attr('deliveryid') != $(this).val()) {
      $('.deliveryZoneRadio:checked').click().attr('checked', false);
    }
  });
  
  // Действия при выборе зоны внутри варианта доставки на этапе оформления заказа
  $('.deliveryZoneRadio').click(function(){
    
    var 
      deliveryId = $(this).attr('deliveryid')
      ,deliveryZonePrice = $(this).parent().find('.deliveryZonePrice')
      ,deliveryTbody = $('.orderStageDeliveryListTable tbody[rel="' + deliveryId + '"]')
      ,deliveryBlock = deliveryTbody.find('#deliveryId' + deliveryId)
      ,deliveryZonePriceBlock = deliveryTbody.find('.orderStageDeliveryZonePrice')
      ,deliveryDefaultPriceBlock = deliveryTbody.find('.orderStageDeliveryDefaultPrice')
    ;

    // Если этот пункт уже выбран, при повторном клике пользователь видимо хочет снять выделение зоны доставки
    if('true' == $(this).attr('rel')) {
      $(this).attr('checked', false);
      $(this).attr('rel', 'false');
      
      // Показываем цену по умолчанию
      deliveryDefaultPriceBlock.show();
      // Скрываем цену образованную от зоны
      deliveryZonePriceBlock.hide();
      
    // Отмечаем у всех радио баттонов зон доставки свойство говорящее что они не отмечены
    } else {
      $('.deliveryZoneRadio').attr('rel', 'false');
      $(this).attr('rel', 'true');
      
      // Показываем цену по умолчанию
      deliveryDefaultPriceBlock.hide();
      // Скрываем цену образованную от зоны
      deliveryZonePriceBlock.show().html(deliveryZonePrice.html());
      
      // Выделяем вариант доставки к которому относится зона доставки
      deliveryBlock.attr('checked', true);
    }
    
  });
  
  $("#deliveryConvenientDate").datepicker({
  	dayNames		    : ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
		dayNamesMin		  : ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ],
		closeText		    : 'Готово',
		currentText		  : 'Сегодня' ,
		duration		    : '',
		monthNames		  : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort : ['Янв','Фев','Март','Апр','Май','Июнь','Июль','Авг','Сен','Окт','Ноя','Дек'],
		yearRange		    : "-6:+6",
		dateFormat		  : 'dd.mm.yy',
		minDate         : new Date(),
		firstDay		    : 1
	});

});
}

// Скрипты для Быстрого заказа
function quickOrderScripts(){
$(document).ready(function(){
      
    var ID = $('input[name="form[delivery][id]"]:checked').val();  

    $('.quick_order_payment').hide();
    $('.quick_order_payment[rel="' + ID + '"]').show();
    $('.quick_order_payment[rel="' + ID + '"]').find('input:first').attr('checked', true);
      
    $('.deliveryRadio').click(function(){  
      var ID = $('input[name="form[delivery][id]"]:checked').val();  
      $('.quick_order_payment').hide();
      $('.quick_order_payment[rel="' + ID + '"]').show();
      $('.quick_order_payment[rel="' + ID + '"]').find('input:first').attr('checked', true);
    });
    
    // Форма регистрации нового пользователя, при оформлении заказа
    $('.OrderShowPass').click(function(){
      ChangePasswordFieldType(this, $('#contactPassWord'));
      return false;
    });
    
    // При оформлении заказа дадим возможность зарегистрироваться пользователю
    $('#contactWantRegister').click(function(){
      if($(this).prop("checked")) {
        $('.contactRegisterNeedElement').show();
        $('#contactEmail, #contactPassWord').addClass('required');
      } else {
        $('.contactRegisterNeedElement').hide();
        $('#contactEmail, #contactPassWord').removeClass('required');
      }
    });
    
    // Действия при выборе варианта доставки на этапе оформления заказа
    $(function(){
     sd = $($('.deliveryRadio')[0]);
     id = sd.val()
     ,fz = $($('.deliveryZoneRadio[deliveryid='+id+']')[0]);
     sd.prop('checked',true);
     fz.prop('checked',true);
     if($('.zones').length){  
       price = fz.next().find('.num').text();
       oldPrice = $('tbody[rel='+ id +']').find('.pricefield').find('.num');
       oldPrice.text(price);
     }
    });
    $(function(){
      $('.deliveryRadio').each(function(){
       var 
        id = $(this).val()
        ,fz = $($('.deliveryZoneRadio[deliveryid='+id+']')[0]);  
        if($('.zones').length){  
          price = fz.next().find('.num').text();
          oldPrice = $('tbody[rel='+ id +']').find('.pricefield').find('.num');
          if(price != ''){
           oldPrice.text(price);
          }
        }
      })
    });
    $(function(){   
      $('.orderStageDeliveryListTable').on('change','.deliveryRadio',function(){
        $('.deliveryRadio,.deliveryZoneRadio').each(function(){
          $(this).removeAttr('checked');
        })
        var id = $(this).val()
           ,fz = $($('.deliveryZoneRadio[deliveryid='+id+']')[0]);          
        $(this).prop('checked',true);
        fz.prop('checked',true);   
        if($('.zones').length){  
          price = fz.next().find('.num').text();
          oldPrice = $('tbody[rel='+ id +']').find('.pricefield').find('.num');
          if(price != ''){
            oldPrice.text(price);
          }
        }
      }) 
    });
    // Действия при выборе зоны внутри варианта доставки на этапе оформления заказа
    $('.deliveryZoneRadio').click(function(){
      var id = $(this).attr('deliveryid'),
      price = $(this).next().find('.num').text()
      ,oldPrice = $('tbody[rel='+ id +']').find('.pricefield').find('.num');
      if(price != ''){
        oldPrice.text(price);
      }
      $('.deliveryRadio').each(function(){ 
        $(this).removeAttr('checked');   
        if($(this).val() == id){
         $(this).prop('checked',true);
        }else{
          $(this).removeAttr('checked');
        }
      })
    });
    
    // Валидация формы на странице оформления заказа
    $("#quickform").submit(function(){
      
      // Если форма невалидна не отправляем её на сервер
      if(!$(this).valid()) {
        return false;
      }
      
      // Получаем данные формы, которые будем отправлять на сервер
      var formData = $(this).serializeArray();
      // Сообщаем серверу, что мы пришли через ajax запрос
      formData.push({name: 'ajax_q', value: 1});
  
      // Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
      $.ajax({
        type    : "POST",
        dataType: 'json',
        cache    : false,
    		url		  : $(this).attr('action'),
    		data		: formData,
    		success: function(data) {
          // Если заказ был успешно создан
          if( data.status == 'ok' ) {
            window.location = data.location;
          } else if( data.status == 'error' ) {
            alert(data.message);
          } else {
            alert('Во время оформления заказа возникла неизвестная ошибка. Пожалуйста, обратитесь в службу технической поддержки.');
          }
    		}
    	});
      
      return false;      
    }).validate();
    
    $("#quickDeliveryConvenientDate").datepicker({
      dayNames		    : ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  		dayNamesMin		  : ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ],
  		closeText		    : 'Готово',
  		currentText		  : 'Сегодня' ,
  		duration		    : '',
  		monthNames		  : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Окрябрь','Ноябрь','Декабрь'],
  		monthNamesShort : ['Янв','Фев','Март','Апр','Май','Июнь','Июль','Авг','Сен','Окт','Ноя','Дек'],
  		yearRange		    : "-6:+6",
  		dateFormat		  : 'dd.mm.yy',
  		minDate         : new Date(),
  		firstDay		    : 1
  	});

  });
}

// Быстрый заказ
function quickorder(formSelector) {
  // Находим форму, которую отправляем на сервер, для добавления товара в корзину
  var formBlock = $($(formSelector).get(0));
  // Проверка на существование формы отправки запроса на добавление товара в корзину
  if(1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
    alert('Не удалось найти форму добавления товара в корзину');
    return false;
  }
  // Получаем данные формы, которые будем отправлять на сервер
  var formData = formBlock.serializeArray();
  // Сообщаем серверу, что мы пришли через ajax запрос
  formData.push({name: 'ajax_q', value: 1});
  // Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа 
  formData.push({name: 'fast_order', value: 1});
  // Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
  $.ajax({
    type    : "POST",
		cache	  : false,
		url		  : formBlock.attr('action'),
		data		: formData,
		success: function(data) {
			$.fancybox({
			  content : data,
        // При изменении размера окна изменяем размер окна оформления заказа
        onUpdate  : function(){
          ppModal();
          var w = $(window).width()*0.8;
          if(w < 800) {
            // Автоматический ресайз внутреннего блока fancybox-а
            $('.fancybox-inner').css('width', 'auto');
            // Изменяем размер fancybox окна
            $('.fancybox-wrap').css({'width': w + 'px'});
          }  
          return false;
        }
			}); 
      setTimeout(function(){$.fancybox.update();}, 500);
		}
	});
  return false;
}

// Функция быстрого оформления заказа в корзине
function startOrder(){  
  var globalOrder = $('#globalOrder');
  var closeOrder = $('#closeOrder'); // объект кнопки отмены заказа
  var textCloseOrder = '#closeOrder';
  // Если форма уже открыта то ничего не делаем.
  if (globalOrder.css('display') != 'none') {
    // Если блок с формой заказа не скрыт то выходим из функции
    return false;
  }
  //объект блока куда будет выводиться форма быстрого заказа
  var OrderAjaxBlock = $('#OrderAjaxBlock');
  // объект кнопки "Заказать"
  var buttonStartOrder = $('#startOrder');
  //объект блока с ajax анимацией
  var ajaxLoaderQuickOrder = $('.ajaxLoaderQuickOrder');
  var urlQuickForm = '/cart/add'; // адрес страницы с формой
  // данные которые отарвятся на сервер чтобы получить только форму быстрого заказа без нижней части и верхней части сайта
  var quickFormData = [
      {name: 'ajax_q', value: 1},
      {name: 'fast_order', value: 1}
  ];
  // Скрываем кнопку "Заказать"
  buttonStartOrder.hide();
  // Отключаем возможность редактирования формы
  var cartTable = $('.cartTable');
  // открываем общий, глобальный блок
  globalOrder.show();
  $('html, body').delay(400).animate({scrollTop : jQuery('#globalOrder').offset().top - 100}, 800);
  // включаем gif анимацию загрузки
  ajaxLoaderQuickOrder.show('slow');
    $.ajax({
      type: "POST",
      cache: false,
      url: urlQuickForm,
      data: quickFormData,
      success: function(data) {     
        OrderAjaxBlock.html($(data).find('.quickformfast').wrap('div').html());
        // скрываем блок с анимацией
        ajaxLoaderQuickOrder.hide();
        // раскрываем блок с формаой
        OrderAjaxBlock.show('slow');
        // удалим обработчик события на кнопке отмена
        closeOrder.css('display','block');
        cartTable.toggleClass('disable');
        q = cartTable.find('.cartqty');
        if(q.prop('disabled') == true){q.prop('disabled',false)}else{q.prop('disabled',true)}
        quickOrderScripts();
        ppModal();
        $('.container').on('click', textCloseOrder, function() {
          //Скрываем блок оформления заказа
          ajaxLoaderQuickOrder.hide('fast');
          OrderAjaxBlock.hide('fast');
          globalOrder.hide('fast');
          closeOrder.css('display','none'); // Скрываем кнопку "Отменить"
          buttonStartOrder.css('display','block'); // Возврощаем кнопку "Заказать"
          // Включаем возможность редактирования формы
          cartTable.toggleClass('disable');                
          if(q.prop('disabled') == true){q.prop('disabled',false)}else{q.prop('disabled',true)}
          return false;
        });
      }
    });
  return false;
}

// Инициализация табов на странице товара
function initTabs() {
  // Блок в котором находятся табы
  var tabBlock = $('#contents');
  if(!tabBlock.length) {
    return false;
  }
  // По умолчанию делаем отметку о том что активного таба не найдено
  var isFind = 0;
  tabBlock.find('#tabs a').each(function(i){
    // Если нашёлся активный там
    if($(this).hasClass('active')) {
      // Инициализируем найденный таб
      $(this).click();
      // Ставим отметку, о том что не нужно инициализировать первый таб на странице
      isFind = 1;
    }
  });
  // Если не найдено ни одного таба с отметкой о том что он активен
  if(!isFind) {
    // Ставим активным первый таб на странице.
    var tab = $('ul#tabs > li > a').attr('id').slice(-1);
    tabSwitch(tab);
  }
  // Проверяет хэш и если по нему была открыта вкладка, то эта функция автоматически откроет её.
  checkTabHash();
  
  // Если текущий адрес страницы предполагает добавление отзыва
  if('#goodsDataOpinionAdd' == document.location.hash) {
    $('#goodsDataOpinionAddBlock').show();
  }

  // Биндим изменение хэша - проверка какой таб нужно открыть.
  $(window).bind('hashchange', function() { checkTabHash(); });
}

// Проверяет хэш, переданый пользователем и открывает соответствующий раздел
function checkTabHash() {

  // Определяем текущий хэш страницы
  var hash = window.location.hash.substr(1);


  if(hash == 'goodsDataOpinionAdd') {
    hash = 'show_tab_4';
  }

  if(!hash.length || hash.indexOf('show_tab_') == -1) {
    return false;
  }

  // Открываем тот таб, который был указан в hash-е
  tabSwitch(hash.replace("show_tab_", ''))
}

// Выбор вкладки на странице товара
function tabSwitch(nb) {
  var tabBlock = $('#contents');
  tabBlock.find('#tabs a').removeClass('active');
  tabBlock.find('div.tab-content').hide();
  $('#tab_' + nb).addClass('active');
  $('#content_' + nb).show();
  if('#goodsDataOpinionAdd' != document.location.hash) {
    // Записываем в хэш информацию о том какой таб сейчас открыт, для возможности скопировать и передать ссылку с открытым нужным табом
    document.location.hash = "#show_tab_" + nb;  
  }
}
// Инициализируем табы на странице
$(function() { initTabs(); });

// Валидаторы для Имени и телефона
function validName(){ 
    name = $('#callback_person').val();
    if(name != ''){
      $('.error').remove();
      q2 = true;
    }else{
    $('.error').remove();
   $('#callback_person').parent().after('<div class="name-error"> ! Вы не указали ваше Имя ! </div>');
    } 
  }
function validPhone(){ 
  tel = $('#callback_phone').val();
  check = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(tel);
  if(check == true && check != ''){
  $('.error').remove();
  q1 = true;
  }
  else{
  $('.error').remove();
  $('#callback_phone').parent().after('<div class="phone-error"> ! Вы ввели неверный номер телефона ! </div>');
  }
  }
//Проверка телефона в обратном звонке.
function validCallBack(){q1 = false;q2 = false;validName();validPhone();return q1 && q2;}


// Удаление товара из сравнения без обновлении страницы
function removeFromCompare(e){

  if(confirm('Вы точно хотите удалить товар из сравнения?')){
  var del = e;
  var num = $('.compare-count-side').text();
  e.parent().fadeOut().remove();
  url = del.data('href');
  goodsModId = $(del).attr('data-goods-mod-id');
  $.ajax({ 
    cache    : false,
		url		  : url,
    success: function(d){
  	  var oldCount = $('.compare-count-side').text();
      var oldHeadCount = $('.compare-count').text();
      var newCount = oldCount - 1;
      var newHeadCount = oldHeadCount - 1;
      $('.compare-count-side').text(newCount);
      var flag = 0;
      if(newCount != 0){
        $('.compare-items li').each(function(){
          if(flag == 0){
          if($(this).css('display') == 'none'){
        $(this).show();
          flag++;
          }
        }})}else{
          $('.block-sidebar.compare').hide();
        }
      
      var obj = $('.add-compare[data-mod-id="' + goodsModId + '"]');
      if(obj.length) {
        obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
      }
		}
  })
  }
}

// Удаление товара из корзины без обновлении страницы
function removeFromCart(e){
  if(confirm('Вы точно хотите удалить товар из корзины?')){
  var del = e;  
  e.parent().fadeOut().remove();
  url = del.data('href');
  quantity = del.data('count');
  $.ajax({ 
    cache   : false,
		url		  : url,
    success: function(d){
      var oldCount = $('.cart-count').text();
      var oldQuantity = quantity;
      var newCount = oldCount - oldQuantity;
      $('.cart-count').text(newCount);
      $('.total-sum').html($(d).find('.total-sum').html());
        var flag = 0; 
        if(newCount != 0){
        $('#cart-sidebar li').each(function(){
          if(flag == 0){
            if($(this).css('display') == 'none'){
              $(this).show();
            flag++;
            }
          }
        })}else{
          $('.dropdown-cart').hide();
          $('.not-empty').hide();
          $('.empty').show();
        }
      }
    })
  }
}

// Удаление ВСЕХ товаров из корзины без обновлении страницы
function removeFromCartAll(e){
  if(confirm('Вы точно хотите очистить корзину?')){
  var del = e;  
  e.parent().fadeOut().remove();
  url = del.data('href');
  $.ajax({ 
    cache   : false,
  	url		  : url,
    success: function(d){
      $('.dropdown-cart').hide();
      $('.not-empty').hide();
      $('.empty').show();
		}
  })
  }
}

// Галерея изображения и Фильтры в карточке Товара
function goodspage() {
// Открытие изображения товара при клике
$(document).ready(function() {
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
  	tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
			}
		}
	});
});

// Фильтр отзывов
$(document).ready(function(){
  $('.goodsDataOpinionAverageInfo > a').click(function(){
    $('.goodsDataOpinionAverageInfo > a').each(function(){
    })
a = $(this).html();
console.log(a);
if($(this).hasClass('goodOpinions')){
$('.good').show();
$('.bad').hide();
}
else if($(this).hasClass('badOpinions')){
$('.good').hide();
$('.bad').show();
}else{
$('.bad').show();
$('.good').show();
}
})
})
}

// Другие изображение товара
function thumblist() {
  var $ = jQuery;
  
  if ($('#thumblist').length) {
  $('#thumblist').carouFredSel({
	  prev  : '.thumblist-box .prev',
	  next  : '.thumblist-box .next',
	  width : '100%',
	  auto  : false,
	  swipe : {
		onMouse : false,
		onTouch : true
	  }
	}).parents('.thumblist-box').removeClass('load');
  }
}

// Другие изображение товара активация функции
jQuery(document).ready(function(){
//Carousel load
  $(window).on({
    load : function() {
      thumblist();
    }
  });
});

//Regulator Up/Down копки + - в карточке товара при добавлении в корзину
jQuery(document).ready(function(){
  //Regulator Up копки + в карточке товара при добавлении в корзину
  $('.quantity-plus').click(function(){
    var 
      quantity = $(this).parent().find('.qty'),
      currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal)){
      quantity.val(currentVal + 1);
      quantity.trigger('keyup');
    }
    return false;
  });
  //Regulator Down копки - в карточке товара при добавлении в корзину
  $('.quantity-minus').click(function(){
    var 
      quantity = $(this).parent().find('.qty'),
      currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal) && !(currentVal <= 1) ){
      quantity.val(currentVal - 1);
      quantity.trigger('keyup');
    }
    return false;
  });
});
// Если вводят 0 то заменяем на 1
jQuery(document).ready(function(){
  $('.qty-wrap .qty').change(function(){
    if($(this).val() < 1){
      $(this).val(1); 
    }
  });
});
// Адаптивный каталог в левой часте
jQuery(document).ready(function($){
  $('body#bd').append('<div class="yt_ressidebar_screennav"><div id="yt_screennav"><ul class="siderbar-menu"></ul></div></div>');
  $('#yt_screennav ul.siderbar-menu').html($('#resmenu_sidebar ul.nav-menu').html());

  $('#yt-responsivemenu .btn.btn-navbar').click(function(){
    if($('body#bd').hasClass('onpen-sidebar')){
      $('body#bd').removeClass('onpen-sidebar');
    }else{
      $('body#bd').addClass('onpen-sidebar');
    }
  });
});

//Menu > Sidebar Боковое меню > сохранение открытой вложенности
jQuery(document).ready(function($){
  $('.block-sidebar.menu .parent:not(".active") a').next('.sub').css('display', 'none');
  $('.block-sidebar.menu .parent a .open-sub').click(function(event){
  event.preventDefault();
	
    if ($(this).closest('.parent').hasClass('active')) {
      $(this).parent().next('.sub').slideUp(600);
      $(this).closest('.parent').removeClass('active');
    } else {
      $(this).parent().next('.sub').slideDown(600);
      $(this).closest('.parent').addClass('active');
    }
  });
});

//Menu > Sidebar Боковое меню > сохранение открытой вложенности
jQuery(document).ready(function($){
  $('.yt_ressidebar_screennav .parent:not(".active") a').next('.sub').css('display', 'none');
  $('.yt_ressidebar_screennav .parent a .open-sub').click(function(event){
  event.preventDefault();
  
    if ($(this).closest('.parent').hasClass('active')) {
      $(this).parent().next('.sub').slideUp(600);
      $(this).closest('.parent').removeClass('active');
    } else {
      $(this).parent().next('.sub').slideDown(600);
      $(this).closest('.parent').addClass('active');
    }
  });
});

// Выносим функции из шаблонов
function outFunctions() {
$(document).ready(function(){
  
  // Вызов функции быстрого заказа в корзине
  $('#startOrder').on('click', function() {
    startOrder();
    return false;
  });
  
  // Вызов функции редиректа при обратном звонке
  $('.callbackForm').submit(validCallBack);
  
  // Возврашаем пользователя на страницу с которой был сделан обратный звонок
  $('.callbackredirect').val(document.location.href);
  
  // Поиск
  $('#search_mini_form').submit(function() {
    return ($(this).find('.search-string').val() ? true : false);
  });
  
  // Добавление отзыва
  $('.goodsDataOpinionAddTable').on('click', '.button[type="button"]', function() {
    $(this).closest('form').trigger('submit');
  });
  
  // Добавление товара в корзину
  $('#main').on('click', '.add-cart', function() {
    var form = $(this).closest('form');
    if ($(this).hasClass('quick')) {
      form.attr('rel', 'quick');
    } else {
      var rel = form.attr('rel');
      if (rel) {
        form.attr('rel', rel.replace('quick', ''));
      }
    }
    form.trigger('submit');
    return (false);
  })
  // Подпись формы по классу .form-submit
  .on('click', '.form-submit', function() {
    var form = $(this).closest('form');
    if ($(this).hasClass('denybot')) {
      form.append('<input type="hidden" name="next_step" value="1" />');
    }
    form.submit();
    return (false);
  })
  .on('click', '.redirect[rel]', function() {
    window.location = $(this).attr('rel');
    return (false);
  });
  
  // Удаление товара из корзины
  $('.dropdown-cart').on('click', '.product-remove', function() {
    removeFromCart($(this));
  })
  // Удаление всех товаров из корзины
  .on('click', '.remove-products', function() {
    removeFromCartAll($(this));
  });
  
  // Удаление товара из сравнения
  $('.compare').on('click', '.remove-compare', function() {
    removeFromCompare($(this));
  });
  
  // Сортировка каталога
  $('.change-submit').on('change', 'select', function() {
    $(this).closest('form').submit();
    return (false);
  });
  
  // Фильтры по характеристикам товаров и свойствам товарных модификаций
  $('.filter').on('change', '.form-control', function() {
    $(this).attr('name', $(this).find('option:selected').attr('value') == -1 ? 
      '' : $(this).find('option:selected').attr('rel'));
    $(this).closest('form').submit();
    return (false);
  });
  
  // Счетчик оставшихся секунд до перенаправления
  if($('#time').length) {
    setInterval(function() {
      var timer = $('#time');
      var counter = parseInt(timer.attr('rel'));
      if (!counter) {
        window.location = timer.closest('.location[rel]').attr('rel');
        return (false);
      }
      counter--;
      timer.text(counter).attr('rel', counter);
    }, 1000);
  }
})
}

//Слайдер С этим товаром смотрят
jQuery(document).ready(function($){
  $('.slider-rvg .slider').responsiver({
      interval: 0,
      speed: 500,
      start: 0,
      step: 1,
      circular: false,
      preload: true,
      fx: 'slide',
      pause: 'hover',
      control:{
        prev: '.slider-rvg .control-button li[class="preview"]',
        next: '.slider-rvg .control-button li[class="next"]'
      },
      getColumns: function(element){
        var match = $(element).attr('class').match(/cols-(\d+)/);
          if (match[1]){
            var column = parseInt(match[1]);
          } else {
            var column = 1;
          }
          if (!column) column = 1;
            return column;
      }          
  });
});

//Слайдер Сопутствующие товары
jQuery(document).ready(function($){
  $('.slider-rg .slider').responsiver({
      interval: 0,
      speed: 500,
      start: 0,
      step: 1,
      circular: false,
      preload: true,
      fx: 'slide',
      pause: 'hover',
      control:{
        prev: '.slider-rg .control-button li[class="preview"]',
        next: '.slider-rg .control-button li[class="next"]'
      },
      getColumns: function(element){
        var match = $(element).attr('class').match(/cols-(\d+)/);
          if (match[1]){
            var column = parseInt(match[1]);
          } else {
            var column = 1;
          }
          if (!column) column = 1;
            return column;
      }          
  });
});

// Слайдер Новостей магазина на главной
jQuery(document).ready(function($){
  $('.block-latestblog ul.list-blog').owlCarousel({
      itemsCustom: [
          [0, 1],[480, 1],[640, 2],[768, 3],[992, 4],[1170, 4] 
      ],
      pagination: false,
      itemsScaleUp : true,
      slideSpeed : 500,
      autoPlay: true,
      afterAction: function (e) {
          if(this.$owlItems.length > this.options.items){
              $('.block-latestblog .navslider').css('display', 'block');
          }else{
              $('.block-latestblog .navslider').css('display', 'none');
          }
      }
  });
  $('.block-latestblog .navslider .prev').on('click', function(e){
      e.preventDefault();
      $('.block-latestblog ul.list-blog').trigger('owl.prev');
  });
  $('.block-latestblog .navslider .next').on('click', function(e){
      e.preventDefault();
      $('.block-latestblog ul.list-blog').trigger('owl.next');
  });
});

//Tabs Переключение на главной странице
function tabs() {
  var $   = jQuery,
    tab = $('.respl-tabs');
  
  tab.find('a').click(function (e) {
	e.preventDefault();
	
	$(this).tab('show');
  });

	tab.find('.tab-pane').removeAttr('style', 'display');
	tab.each(function(){
	  var $this = $(this);
	  
	  if ($this.next('.respl-items-container').hasClass('hidden')) {
		$this.removeClass('accordion-tab');
	  
		$this.find('a').each(function(){
		  var $this = $(this),
			  id = $this.attr('href');
		  
		  $($this.closest('li').find('.tab-pane'))
			.appendTo($this.closest('.respl-tabs').next('.respl-items-container'));
		});
		
		$this.next('.respl-items-container').removeClass('hidden');
	  }
    });
  }

$(function() { tabs(); });

// Корзина
function ajaxnewqty(){
  $('.cartqty').change(function(){
    $(this).attr('readonly','readonly');
    if($(this).val() < 1){
     $(this).val(1); 
    }
    s = $(this);
    id = $(this).closest('tr').data('id');
    qty = $(this).val();
    data = $('.cartForm').serializeArray();
    data.push({name: 'only_body', value: 1});
    $('tr[data-id="' + id + '"] .ajaxtotal').css('opacity','0');
    $('.TotalSum').css('opacity','0');
    $.ajax({
      data: data,
      cache:false,
      success:function(d){        
        s.val($(d).find('tr[data-id="' + id + '"] .cartqty').val())
        $('tr[data-id="' + id + '"] .ajaxtotal').css('opacity','1');
        $('.TotalSum').css('opacity','1');
        tr = $('tr[data-id="' + id + '"]');
        tr.find('.ajaxtotal').html($(d).find('tr[data-id="' + id + '"] .ajaxtotal').html()); 
        $('.TotalSum').html($(d).find('.TotalSum').html());   
        $('.cart-count-block').html($(d).find('#cart-header-count').html());
          $('.discounttr').each(function(){
            $(this).remove();
          })
          $(d).find('.discounttr').each(function(){
            $('.cartTable tbody tr:last-child').after($(this));
          })
        c = $(d).find('tr[data-id="' + id + '"] .qty');
        qw = c.val();
        $('.cartqty').removeAttr('readonly');
        if(qty > qw){
          $('.cartErr').remove();
          $('fieldset.scroll').after('<div class="cartErr warning">Вы пытаетесь положить в корзину товара больше, чем есть в наличии</div>');
          $('.cartErr').fadeIn(500).delay(2500).fadeOut(500, function(){$('.cartErr').remove();});
          $('.cartqty').removeAttr('readonly');
        }
      }
    })
  })
}

function ajaxdelete(s){
  var yep = confirm('Вы точно хотите удалить товар из корзины?');
  if(yep == true){
    var closeimg = s;
    s.closest('tr').fadeOut();
    url = closeimg.data('href');
    $.ajax({
      url:url,
      cache:false,
      success:function(d){
        $('.cart-info').html($(d).find('.cart-info').html());
        $('.cart-count-block').html($(d).find('#cart-header-count').html());
        ajaxnewqty();
        $('#startOrder').on('click', function() {
          startOrder();
          return false;
        });
       }      
    })}else{
        return false;
  }      
}


$(function() { ajaxnewqty(); }); 

// Функция сворачивания блоков
var deg = 180;
$(function(){$('.toggleBlock').click(function(){
  var flag;
  $(this).parent().parent().find('.block-content').toggle('normal',function(){
    flag = $(this).parent().parent().find('.block-content').css('display');
     if(flag = 'none'){
     $(this).parent().find('.toggleBlock').css('transform','rotateZ('+ deg +'deg)');
    deg +=180;
    }
    else{
     $(this).parent().find('.toggleBlock').css('transform','rotateZ('+ deg +'deg)');
    deg +=180;
    }
  });
})})

// Функция сворачивания блоков Меню
$(function(){$('.toggleBlockMenu').click(function(){
  var flag;
  $(this).parent().parent().find('.block-menu-content').toggle('normal',function(){
    flag = $(this).parent().parent().find('.block-menu-content').css('display');
     if(flag = 'none'){
     $(this).parent().find('.toggleBlockMenu').css('transform','rotateZ('+ deg +'deg)');
    deg +=180;
    }
    else{
     $(this).parent().find('.toggleBlockMenu').css('transform','rotateZ('+ deg +'deg)');
    deg +=180;
    }
  });
})})

function getClientWidth(){
return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;}

// Функция перехода на основную часть сайта для мобильных устройств
function gotocontent(){
$(function(){
  if(getClientWidth() <= 1024){
   $('body').delay(150).scrollTo($('#breadcrumbs'))
  }
});
}

//Функция определения браузера
$(document).ready(function() {
  var user = detect.parse(navigator.userAgent);
  if (user.browser.family === 'Safari') {
    $('body').addClass('Safari');
  }
  if (user.browser.family === 'IE') {
    $('body').addClass('IE');
  }
  if (user.browser.family === 'Firefox') {
    $('body').addClass('Firefox');
  }
});

//Функция показать больше для недавно просмотренных товаров
$(function(){
  var i = 0;
  $('.recently-item').each(function(){
    i++;
  })
  if(i<=3){$('.showAllRecent').hide()}
    $('.showAllRecent').on('click',function(){
  if($(this).hasClass('active')){
    $(this).removeClass('active');
    $('.recently-item').removeClass('showThis');   
    $(this).text('Показать больше');
  }else{ 
    $('.recently-item').addClass('showThis'); 
    $(this).text('Скрыть');
    $(this).addClass('active');
  }
})
});
//Функция показать больше для Товаров на главной
$(function(){
  var i = 0;
  $('.tab-goods .respl-item.item').each(function(){
    i++;
  })
  if(i<=8){$('.tab-goods .showAllGoods').hide()}
    $('.tab-goods .showAllGoods').on('click',function(){
  if($(this).hasClass('active')){
    $(this).removeClass('active');
    $('.tab-goods .respl-item.item').removeClass('showThis');   
    $(this).text('Показать все');
  }else{ 
    $('.tab-goods .respl-item.item').addClass('showThis'); 
    $(this).text('Скрыть');
    $(this).addClass('active');
  }
})
});
//Функция показать больше для Новинок
$(function(){
  var i = 0;
  $('.tab-new .respl-item.item').each(function(){
    i++;
  })
  if(i<=8){$('.tab-new .showAllGoods').hide()}
    $('.tab-new .showAllGoods').on('click',function(){
  if($(this).hasClass('active')){
    $(this).removeClass('active');
    $('.tab-new .respl-item.item').removeClass('showThis');   
    $(this).text('Показать все');
  }else{ 
    $('.tab-new .respl-item.item').addClass('showThis'); 
    $(this).text('Скрыть');
    $(this).addClass('active');
  }
})
});
//Функция показать больше для Хитов продаж
$(function(){
  var i = 0;
  $('.tab-favorites .respl-item.item').each(function(){
    i++;
  })
  if(i<=8){$('.tab-favorites .showAllGoods').hide()}
    $('.tab-favorites .showAllGoods').on('click',function(){
  if($(this).hasClass('active')){
    $(this).removeClass('active');
    $('.tab-favorites .respl-item.item').removeClass('showThis');   
    $(this).text('Показать все');
  }else{ 
    $('.tab-favorites .respl-item.item').addClass('showThis'); 
    $(this).text('Скрыть');
    $(this).addClass('active');
  }
})
});

// Загрузка основных функций шаблона
jQuery(document).ready(function($){
  MainFunctions();
  outFunctions();
  ppModal()
});

// Слайдер на главной
function slideShow() {
  var _CaptionTransitions = [];
  _CaptionTransitions["L"] = { $Duration: 900, x: 0.6, $Easing: { $Left: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
  _CaptionTransitions["R"] = { $Duration: 900, x: -0.6, $Easing: { $Left: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
  _CaptionTransitions["T"] = { $Duration: 900, y: 0.6, $Easing: { $Top: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
  _CaptionTransitions["B"] = { $Duration: 900, y: -0.6, $Easing: { $Top: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
  _CaptionTransitions["ZMF|10"] = { $Duration: 900, $Zoom: 11, $Easing: { $Zoom: $JssorEasing$.$EaseOutQuad, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 };
  _CaptionTransitions["RTT|10"] = { $Duration: 900, $Zoom: 11, $Rotate: 1, $Easing: { $Zoom: $JssorEasing$.$EaseOutQuad, $Opacity: $JssorEasing$.$EaseLinear, $Rotate: $JssorEasing$.$EaseInExpo }, $Opacity: 2, $Round: { $Rotate: 0.8} };
  _CaptionTransitions["RTT|2"] = { $Duration: 900, $Zoom: 3, $Rotate: 1, $Easing: { $Zoom: $JssorEasing$.$EaseInQuad, $Opacity: $JssorEasing$.$EaseLinear, $Rotate: $JssorEasing$.$EaseInQuad }, $Opacity: 2, $Round: { $Rotate: 0.5} };
  _CaptionTransitions["RTTL|BR"] = { $Duration: 900, x: -0.6, y: -0.6, $Zoom: 11, $Rotate: 1, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Top: $JssorEasing$.$EaseInCubic, $Zoom: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear, $Rotate: $JssorEasing$.$EaseInCubic }, $Opacity: 2, $Round: { $Rotate: 0.8} };
  _CaptionTransitions["CLIP|LR"] = { $Duration: 900, $Clip: 15, $Easing: { $Clip: $JssorEasing$.$EaseInOutCubic }, $Opacity: 2 };
  _CaptionTransitions["MCLIP|L"] = { $Duration: 900, $Clip: 1, $Move: true, $Easing: { $Clip: $JssorEasing$.$EaseInOutCubic} };
  _CaptionTransitions["MCLIP|R"] = { $Duration: 900, $Clip: 2, $Move: true, $Easing: { $Clip: $JssorEasing$.$EaseInOutCubic} };
  
  var options = {
      $FillMode: 2,                                       //[Optional] The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
      $AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
      $AutoPlayInterval: 4000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
      $PauseOnHover: 1,                                   //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1
      $ArrowKeyNavigation: true,                          //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
      //$SlideEasing: $JssorEasing$.$EaseOutQuint,        //[Optional] Specifies easing for right to left animation, default value is $JssorEasing$.$EaseOutQuad
      $SlideDuration: 800,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
      $MinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide , default value is 20
      //$SlideWidth: 600,                                 //[Optional] Width of every slide in pixels, default value is width of 'slides' container
      //$SlideHeight: 300,                                //[Optional] Height of every slide in pixels, default value is height of 'slides' container
      $SlideSpacing: 0,   				                        //[Optional] Space between each slide in pixels, default value is 0
      $DisplayPieces: 1,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
      $ParkingPosition: 0,                                //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
      $UISearchMode: 1,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
      $PlayOrientation: 1,                                //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
      $DragOrientation: 1,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)
      $CaptionSliderOptions: {                            //[Optional] Options which specifies how to animate caption
          $Class: $JssorCaptionSlider$,                   //[Required] Class to create instance to animate caption
          $CaptionTransitions: _CaptionTransitions,       //[Required] An array of caption transitions to play caption, see caption transition section at jssor slideshow transition builder
          $PlayInMode: 1,                                 //[Optional] 0 None (no play), 1 Chain (goes after main slide), 3 Chain Flatten (goes after main slide and flatten all caption animations), default value is 1
          $PlayOutMode: 3                                 //[Optional] 0 None (no play), 1 Chain (goes before main slide), 3 Chain Flatten (goes before main slide and flatten all caption animations), default value is 1
      },
      $BulletNavigatorOptions: {                          //[Optional] Options to specify and enable navigator or not
          $Class: $JssorBulletNavigator$,                 //[Required] Class to create navigator instance
          $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
          $AutoCenter: 1,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
          $Steps: 1,                                      //[Optional] Steps to go for each navigation request, default value is 1
          $Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
          $SpacingX: 8,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
          $SpacingY: 8,                                   //[Optional] Vertical space between each item in pixel, default value is 0
          $Orientation: 1                                 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
      },
      $ArrowNavigatorOptions: {                           //[Optional] Options to specify and enable arrow navigator or not
          $Class: $JssorArrowNavigator$,                  //[Requried] Class to create arrow navigator instance
          $ChanceToShow: 1,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
          $AutoCenter: 2,                                 //[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
          $Steps: 1                                       //[Optional] Steps to go for each navigation request, default value is 1
      }
  };

  var jssor_slider1 = new $JssorSlider$("slider", options);

  //responsive code begin
  //you can remove responsive code if you don't want the slider scales while window resizes
  function ScaleSlider() {
      var bodyWidth = document.body.clientWidth;
      if (bodyWidth)
          jssor_slider1.$SetScaleWidth(Math.min(bodyWidth, 1920));
      else
          window.setTimeout(ScaleSlider, 30);
  }

  ScaleSlider();

  if (!navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|IEMobile)/)) {
      $(window).bind('resize', ScaleSlider);
  }


  //if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
  //    $(window).bind("orientationchange", ScaleSlider);
  //}
  //responsive code end
}

// Политика конфиденциальности в модальном окне
function ppModal() {
  $(".pp a").click(function(event){
    event.preventDefault();
    var data = $("#fancybox-pp").html();
    $.fancybox({
      autoSize: true,
      maxWidth: 700,
      padding: 30,
      content: data
    });
  });
}
