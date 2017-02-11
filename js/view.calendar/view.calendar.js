// JavaScript Document

(function(){
	$.fn.viewCalendar = function(options){
		var defaults = {
            url : null,
			onSelect : null,
			initEvents : null
        },_this=this,$calendar=$(this);
		this.opt = $.extend(defaults, options);
		$date = null;
		
		var _event = {
			lang : {
				yearMonth: '{0}月{1}年',
				yearMonthDay: '{0}-{1}-{2}'
			},
			Appendzero :function(obj) {
              if (obj < 10) return "0" + obj; else return obj;
            },
			initViwe : function(){
				var $child = '<thead>'
                +'<tr class="about-table-bth cm-f14">'
                +'         <th colspan="7">'
                +'            <span class="calendar-btn calendar-btn-prev js-calendar-prev pull-left"></span>'
                +'            <div class="calendar-select" >'
                +'                <span class="js-datepicker">三月2015</span>'
                +'            </div>'
                +'            <span class="calendar-btn calendar-btn-next js-calendar-next pull-right"></span>'
                +'         </th>'
                +'      </tr>'
                +'      <tr class="about-table-sth cm-f16">'
                +'         <th>一</th>'
                +'         <th>二</th>'
                +'         <th>三</th>'
                +'         <th>四</th>'
                +'         <th>五</th>'
                +'         <th>六</th>'
                +'         <th>日</th>'
                +'      </tr>'
                +'   </thead>'
                +'   <tbody>'
                +'   </tbody>';
				_this.append($child);
			}, 
			displayMonth : function(){
				var $view = $calendar.find('tbody'),$week_days = $view.find('.js-week-days');
				
				if(!$week_days.length){
					for (i = 0; i < 6; i++)
				  {
					  $tr = $('<tr class="js-week-days"></tr>');
					  for (var j = 0; j < 7; j++)
					  {
						  $tr.append('<td class="js-cell-day"><span class="calendar-day-number"></span><div class="circleWrap"><p class="calendar-circle"></p></div></td>');
					  }
					  $view.append($tr);
				  }
				  $view.find('td,.circleWrap').css('height',$view.find('td').width()+'px');
				}
				
				if($date == null){
					$date = new Date();
				}else if(typeof $date === 'string'){
					$date = new Date($date);
				}
				
				var $weeks = $view.find('.js-week-days'),
					firstDayOfMonth = _event.getFirstDayOfMonth($date),
					firstDay = _event.getNearbyLastWeekDay(firstDayOfMonth),
					today = new Date(),
					thisYear = $date.getFullYear(),
					thisMonth = $date.getMonth(),
					todayMonth = today.getMonth(),
					todayYear = today.getFullYear(),
					todayDate = today.getDate(),
					todayHours = today.getHours(),
					lastDay = firstDay.clone().addDays(6 * 7).addMilliseconds(-1),
					printDate = firstDay.clone().addDays(1).addMilliseconds(-1),
					$week,
					$day,
					$cell,
					year,
					day,
					month;			  
				 $weeks.each(function(weekIdx){
					 $week = $(this);
					 $week.find('.js-cell-day').each(function(dayIndex){
						 $day = $(this);
						 year = printDate.getFullYear();
						 day = printDate.getDate();
						 month = printDate.getMonth();
						 $day.attr('data-date', _event.lang.yearMonthDay.format(year,_event.Appendzero(month+1),_event.Appendzero(day)));
						 $day.find('.calendar-day-number').text(day);
						 $day.toggleClass('nocurrent', (month > thisMonth || month < thisMonth));
						 $day.toggleClass('today', (day === todayDate && month === todayMonth && year === todayYear));
						 $day.toggleClass('nextDay', ((day > todayDate && month === todayMonth && year === todayYear) || (month > todayMonth && year === todayYear) || year > todayYear));
						 printDate.addDays(1);
					 });
				 });
				 $calendar.find('.js-datepicker').html(_event.lang.yearMonth.format(thisMonth + 1,thisYear));
				 if($('#serviceDate').val() !== ''){
					 $('.js-cell-day[data-date='+$('#serviceDate').val()+']').addClass('actived');
				 }
				 if(todayHours > 11){
					 _this.find('.today').removeClass('today');
				 }
				 //加载数据
				 var $form=_event.lang.yearMonthDay.format(firstDay.getFullYear(),_event.Appendzero(firstDay.getMonth()+1),_event.Appendzero(firstDay.getDate())),
				     $to=_event.lang.yearMonthDay.format(lastDay.getFullYear(),_event.Appendzero(lastDay.getMonth()+1),_event.Appendzero(lastDay.getDate())),
					 addressId = $('#address').attr('data-id');
				 window.Util.ajax.post(_this.opt.url,{startdate:$form,enddate:$to,address:addressId},function(data){
					 var items = data.items;
					 try{
						 $.each(items,function(key,value){
							 $.each(value,function(date,val){
								 var $curobj = $('.js-cell-day[data-date='+date+']'),$txt = $curobj.find('.calendar-day-number').html();
								 $curobj.attr('data-stock',val.stock);
								 if($curobj.hasClass('nocurrent') || (!$curobj.hasClass('today')&&!$curobj.hasClass('nextDay')))
								    return;
								 if(val.status == 2){
									 $curobj.addClass('less');
								 }else if(val.status == 3){
									 $curobj.addClass('filled');
								 }
							 });
						 });
					 }catch(e){}
				 });
			},
			getNearbyLastWeekDay : function(date, lastWeek){
				lastWeek = lastWeek || 1;
				var d = date.clone();
				while (d.getDay() != lastWeek)
				{
					d.addDays(-1);
				}
				d.setHours(0);
				d.setMinutes(0);
				d.setSeconds(0);
				d.setMilliseconds(0);
				return d;
			},
			getFirstDayOfMonth : function(date){
				var d = date.clone();
				d.setDate(1);
				return d;
			},
			bindEvents : function(){
				$(document).on('touchend','.js-calendar-prev',function(){
					$date.addMonths(-1);
					_event.displayMonth();
					$('.js-calendar-next').show();
					$(this).hide();
				});
				$(document).on('touchend','.js-calendar-next',function(){
					$date.addMonths(1);
					_event.displayMonth();
					$('.js-calendar-prev').show();
					$(this).hide();
				});
				$(document).on('touchend','.js-cell-day',function(){
					typeof _this.opt.onSelect === 'function' ? _this.opt.onSelect($(this)) : null;
				});
			}
		};
		//刷新日期状态
		$.fn.changeStatus = function(){
			_event.displayMonth();
		}
		$(function(){
			_event.initViwe();
			_event.displayMonth();
	  		_event.bindEvents();
			typeof _this.opt.initEvents === 'function' ? _this.opt.initEvents() : null;
		});
	}
})(jQuery)