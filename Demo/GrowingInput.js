/*
Script: GrowingInput.js
	Alters the size of an input depending on its content

	License:
		MIT-style license.

	Authors:
		Guillermo Rauch
*/

(function(){

GrowingInput = new Class({
	
	Implements: [Options, Events],
	
	options: {
		min: 0,
		max: null,
		startWidth: 2,
		correction: 15
	},
	
	initialize: function(element, options){
		this.setOptions(options);
		this.element = $(element).store('growing', this).set('autocomplete', 'off');		                                                            		                                                           		
		this.calc = new Element('span', {
			'styles': {
				'float': 'left',
				'display': 'inline-block',
				'position': 'absolute',
				'left': -1000
			}
		}).inject(this.element, 'after');					
		['font-size', 'font-family', 'padding-left', 'padding-top', 'padding-bottom', 
		 'padding-right', 'border-left', 'border-right', 'border-top', 'border-bottom', 
		 'word-spacing', 'letter-spacing', 'text-indent', 'text-transform'].each(function(p){
				this.calc.setStyle(p, this.element.getStyle(p));
		}, this);				
		this.resize();
		var resize = this.resize.bind(this);
		this.element.addEvents({blur: resize, keyup: resize, keydown: resize, keypress: resize});
	},
	
	calculate: function(chars){
		this.calc.set('html', chars);
		var width = this.calc.getStyle('width').toInt();
		return (width ? width : this.options.startWidth) + this.options.correction;
	},
	
	resize: function(){
		this.lastvalue = this.value;
		this.value = this.element.value;
		var value = this.value;		
		if($chk(this.options.min) && this.value.length < this.options.min){
			if($chk(this.lastvalue) && (this.lastvalue.length <= this.options.min)) return;
			value = str_pad(this.value, this.options.min, '-');
		} else if($chk(this.options.max) && this.value.length > this.options.max){
			if($chk(this.lastvalue) && (this.lastvalue.length >= this.options.max)) return;
			value = this.value.substr(0, this.options.max);
		}
		this.element.setStyle('width', this.calculate(value));
		return this;
	}
	
});

var str_repeat = function(str, times){ return new Array(times + 1).join(str); };
var str_pad = function(self, length, str, dir){
	if (self.length >= length) return this;
	str = str || ' ';
	var pad = str_repeat(str, length - self.length).substr(0, length - self.length);
	if (!dir || dir == 'right') return self + pad;
	if (dir == 'left') return pad + self;
	return pad.substr(0, (pad.length / 2).floor()) + self + pad.substr(0, (pad.length / 2).ceil());
};

})();