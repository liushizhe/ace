/*
* @Author: linjs
* @Date:   2018-02-03 10:50:01
* @Last Modified by:   liushizhe
* @Last Modified time: 2018-02-05 14:20:18
*/
(function($){
	$.jGritter = {};
	$.jGritter.add = function(param) {
		try {
			jGritter.add(param);
		} catch(e) {
			var err = 'jGritter: error ' + e;
			(typeof(console) !== undefined && console.error) ? console.error(err) : alert(err);
		}
	}

	var jGritter = {
		tpl: '<div class="jGritter [[class]]" style="display:none;">'+
				'<div class="close">x</div>'+
				'<div class="title">'+
					'<p>'+
						'[[title]]'+
					'</p>'+
				'</div>'+
				'<div class="content">'+
					'<p>'+
						'[[content]]'+
					'</p>'+
				'</div>'+
			'</div>',
		timeOutId: 0,
		add: function(param) {
			if (typeof param === 'string') {
				param['text'] = param;
			}
			if(param.text === null) {
				throw 'You must supply "text" parameter!';
			}
			var opt = {
		        time: 1000,
		        title: '',
		        text:   '',
		        class_name: '',
		        fadeOut: true
		    };
			param = $.extend(opt, param);
			var class_name = param.class_name;
			var title = param.title || '';
			var text = param.text;
			var time = param.time;
			var fadeOut = param.fadeOut;
			var sticky = param.sticky;
			var tmp = this.tpl;
			tmp = tmp.replace(/\[\[class\]\]/, class_name);
			tmp = tmp.replace(/\[\[title\]\]/, title);
			tmp = tmp.replace(/\[\[content\]\]/, text);
			$('body').append(tmp);
			$('body .jGritter').fadeIn(500);
			if(!sticky) {
				var _this = this;
				var e = $('body .jGritter');
				this.setFadeOut(e, fadeOut, time);
				//when mouse enter, the gritter keep stick;mouse leave, disappear
				e.bind('mouseenter mouseleave', function(event){
					if(event.type == 'mouseenter'){
						_this.resetFadeOut();
					}
					else {
						_this.setFadeOut(e, fadeOut, 0);
					}
				});
				//gritter close button
				e.find('.close').click(function(event) {
					_this.setFadeOut(e, fadeOut, 0);
				});
			}
		},
		remove: function() {
			if($('body .jGritter')[0] !== undefined) {
				$('body .jGritter').remove();
			}
		},
		setFadeOut: function(e, fadeOut, time) {
			var _this = this;
			this.timeOutId = setTimeout(function() {
				if(fadeOut === true){
					fadeOut = 1000;
				}
				if(fadeOut !== 0) {
					e.animate({
						opacity: 0
					}, fadeOut, function(){
						e.animate({ height: 0 }, 300, function(){
							_this.remove();
						})
					})
				} else {
					_this.remove();
				}
			}, time);
		},
		resetFadeOut: function() {
			clearTimeout(this.timeOutId);
		}
	}
})(jQuery);