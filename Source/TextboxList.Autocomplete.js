/*
Script: TextboxList.Autocomplete.js
	TextboxList Autocomplete plugin

	Authors:
		Guillermo Rauch
	
	Note:
		TextboxList is not priceless for commercial use. See <http://devthought.com/projects/mootools/textboxlist/>
		Purchase to remove this message.
*/

(function(){

TextboxList.Autocomplete = new Class({
	
	Implements: Options,
	
	options: {
		minLength: 1,
		maxResults: 10,
		insensitive: true,
		highlight: true,
		highlightSelector: null,
		mouseInteraction: true,
		onlyFromValues: false,
		queryRemote: false,
		remote: {
			url: '',
			param: 'search',
			extraParams: {},
			loadPlaceholder: 'Please wait...'
		},
		method: 'standard',
		placeholder: 'Type to receive suggestions'
	},
	
	initialize: function(textboxlist, options){
		this.setOptions(options);
		this.textboxlist = textboxlist;
		this.textboxlist.addEvent('bitEditableAdd', this.setupBit.bind(this), true)
			.addEvent('bitEditableFocus', this.search.bind(this), true)
			.addEvent('bitEditableBlur', this.hide.bind(this), true)
			.setOptions({bitsOptions: {editable: {addKeys:[], stopEnter: false}}});
		if (Browser.Engine.trident) this.textboxlist.setOptions({bitsOptions: {editable: {addOnBlur: false}}});
		if (this.textboxlist.options.unique){
			this.index = [];
			this.textboxlist.addEvent('bitBoxRemove', function(bit){
				if (bit.autoValue) this.index.erase(bit.autoValue);
			}.bind(this), true);
		}
		this.prefix = this.textboxlist.options.prefix + '-autocomplete';
		this.method = TextboxList.Autocomplete.Methods[this.options.method];
		this.container = new Element('div', {'class': this.prefix}).setStyle('width', this.textboxlist.container.getStyle('width')).inject(this.textboxlist.container);
		if ($chk(this.options.placeholder) || this.options.queryServer) 
			this.placeholder = new Element('div', {'class': this.prefix+'-placeholder'}).inject(this.container);		
		this.list = new Element('ul', {'class': this.prefix + '-results'}).inject(this.container);
		this.list.addEvent('click', function(ev){ ev.stop(); });
		this.values = this.results = this.searchValues = [];
		this.navigate = this.navigate.bind(this);
	},
	
	setValues: function(values){
		this.values = values;
	},
	
	setupBit: function(bit){
		bit.element.addEvent('keydown', this.navigate, true).addEvent('keyup', function(){ this.search(); }.bind(this), true);
	},
		
	search: function(bit){
		if (bit) this.currentInput = bit;
		if (!this.options.queryRemote && !this.values.length) return;
		var search = this.currentInput.getValue()[1];
		if (search.length < this.options.minLength) this.showPlaceholder(this.options.placeholder);
		if (search == this.currentSearch) return;
		this.currentSearch = search;
		this.list.setStyle('display', 'none');
		if (search.length < this.options.minLength) return;
		if (this.options.queryRemote){
			if (this.searchValues[search]){
				this.values = this.searchValues[search];
			} else {
				var data = this.options.remote.extraParams, that = this;
				if ($type(data) == 'function') data = data.run([], this);
				data[this.options.remote.param] = search;
				if (this.currentRequest) this.currentRequest.cancel();
				this.currentRequest = new Request.JSON({url: this.options.remote.url, data: data, onRequest: function(){
					that.showPlaceholder(that.options.remote.loadPlaceholder);
				}, onSuccess: function(data){
					that.searchValues[search] = data;
					that.values = data;
					that.showResults(search);
				}}).send();
			}
		} 
		if (this.values.length) this.showResults(search);
	},
	
	showResults: function(search){		
		var results = this.method.filter(this.values, search, this.options.insensitive, this.options.maxResults);
		if (this.index) results = results.filter(function(v){ return !this.index.contains(v); }, this);
		this.hidePlaceholder();
		if (!results.length) return;
		this.blur();
		this.list.empty().setStyle('display', 'block');
		results.each(function(r){ this.addResult(r, search); }, this);
		if (this.options.onlyFromValues) this.focusFirst();
		this.results = results;
	},	
	
	addResult: function(r, search){
		var element = new Element('li', {'class': this.prefix + '-result', 'html': $pick(r[3], r[1])}).store('textboxlist:auto:value', r);
		this.list.adopt(element);
		if (this.options.highlight) $$(this.options.highlightSelector ? element.getElements(this.options.highlightSelector) : element).each(function(el){
			if (el.get('html')) this.method.highlight(el, search, this.options.insensitive, this.prefix + '-highlight');
		}, this);
		if (this.options.mouseInteraction){
			element.setStyle('cursor', 'pointer').addEvents({
				mouseenter: function(){ this.focus(element); }.bind(this),
				mousedown: function(ev){
					ev.stop(); 
					$clear(this.hidetimer);
					this.doAdd = true;
				}.bind(this),
				mouseup: function(){
					if (this.doAdd){
						this.addCurrent();
						this.currentInput.focus();
						this.search();
						this.doAdd = false;
					}
				}.bind(this)
			});
			if (!this.options.onlyFromValues) element.addEvent('mouseleave', function(){ if (this.current == element) this.blur(); }.bind(this));	
		}
	},
	
	hide: function(ev){
		this.hidetimer = (function(){
			this.hidePlaceholder();
			this.list.setStyle('display', 'none');
			this.currentSearch = null;
		}).delay(Browser.Engine.trident ? 150 : 0, this);
	},
	
	showPlaceholder: function(customHTML){
		if (this.placeholder){
			this.placeholder.setStyle('display', 'block');	
			if (customHTML) this.placeholder.set('html', customHTML);
		}		
	},
	
	hidePlaceholder: function(){
		if (this.placeholder) this.placeholder.setStyle('display', 'none');
	},
	
	focus: function(element){
		if (!element) return this;
		this.blur();
		this.current = element.addClass(this.prefix + '-result-focus');
	},
	
	blur: function(){
		if (this.current){
			this.current.removeClass(this.prefix + '-result-focus');
			this.current = null;
		}
	},
	
	focusFirst: function(){
		return this.focus(this.list.getFirst());
	},
	
	focusRelative: function(dir){
		if (!this.current) return this;
		return this.focus(this.current['get' + dir.capitalize()]());
	},
	
	addCurrent: function(){
		var value = this.current.retrieve('textboxlist:auto:value');
		var b = this.textboxlist.create('box', value.slice(0, 3));
		if (b){
			b.autoValue = value;
			if (this.index != null) this.index.push(value);
			this.currentInput.setValue([null, '', null]);
			b.inject($(this.currentInput), 'before');
		}
		this.blur();
		return this;
	},
	
	navigate: function(ev){
		switch (ev.code){
			case Event.Keys.up:			
				ev.stop();
				(!this.options.onlyFromValues && this.current && this.current == this.list.getFirst()) ? this.blur() : this.focusRelative('previous');
				break;
			case Event.Keys.down:			
				ev.stop();
				this.current ? this.focusRelative('next') : this.focusFirst();
				break;
			case Event.Keys.enter:
				ev.stop();
				if (this.current) this.addCurrent();
				else if (!this.options.onlyFromValues){
					var value = this.currentInput.getValue();				
					var b = this.textboxlist.create('box', value);
					if (b){
						b.inject($(this.currentInput), 'before');
						this.currentInput.setValue([null, '', null]);
					}
				}
		}
	}
	
});

TextboxList.Autocomplete.Methods = {
	
	standard: {
		filter: function(values, search, insensitive, max){
			var newvals = [], regexp = new RegExp('\\b' + search.escapeRegExp(), insensitive ? 'i' : '');
			for (var i = 0; i < values.length; i++){
				if (newvals.length === max) break;
				if (values[i][1].test(regexp)) newvals.push(values[i]);
			}
			return newvals;
		},
		
		highlight: function(element, search, insensitive, klass){
			var regex = new RegExp('(<[^>]*>)|(\\b'+ search.escapeRegExp() +')', insensitive ? 'ig' : 'g');
			return element.set('html', element.get('html').replace(regex, function(a, b, c){
				return (a.charAt(0) == '<') ? a : '<strong class="'+ klass +'">' + c + '</strong>'; 
			}));
		}
	}
	
};

})();