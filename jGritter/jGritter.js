/*
* @Author: linjs
* @Date:   2018-02-03 10:50:01
* @Last Modified by:   linjs
* @Last Modified time: 2018-02-03 15:22:08
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
		tpl: '<div class="jGritter [[class]]">'+
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
		add: function(param) {
			if (typeof param === 'string') {
				param['text'] = param;
			}
			if(param.text === null) {
				throw 'You must supply "text" parameter!';
			}
			var opt = {
				time: 1000
			};
			param = $.extend(param, opt);
			var class_name = param.class_name;
			var title = param.title || '';
			var text = param.text;
			var time = param.time;
			var tmp = this.tpl;
			tmp = tmp.replace(/\[\[class\]\]/, class_name);
			tmp = tmp.replace(/\[\[title\]\]/, title);
			tmp = tmp.replace(/\[\[content\]\]/, text);
			$('body').append(tmp);
			var _this = this;
			setTimeout(function() {
				_this.remove();
			}, time);
		},
		remove: function() {
			if($('body .jGritter')[0] !== undefined) {
				// $('body .jGritter').remove();
			}
		}
	}
})(jQuery);