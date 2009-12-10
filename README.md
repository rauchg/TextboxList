TextboxList
===========

TextboxList is great!

![Screenshot](http://devthought.com/wp-content/uploads/2009/04/picture-1.png)

How to Use
----------

TextboxList is essentially very easy to use, but is extremely configurable and extensible. Let’s review some sample usage scenarios:

	#JS
	new TextboxList('form_tags_input');

This turns the `<input id="form_tags_input">` into a TextboxList widget. By default, as shown in the demo, the user can add new boxes by pressing enter, write between boxes, delete them with backspace and delete keys. Additionally, a delete button is shown in each of the added items. All these behaviors can be configured, as shown in the sections below.

	#JS
	var t = new TextboxList('form_tags_input');
	t.add('Tag 1').add('Tag 2').add('Tag 3');

In this example we call the public `add()` method of the TextboxList instance to add items from JavaScript.

The anatomy of TextboxList
--------------------------

This section will be useful for those interested in customizing the default behavior of TextboxList, extending the main classes or writing their own plugins.

The parts that constitute a TextboxList widget are called bits. These parts have common characteristics: they can be focused, blurred, deleted, hidden, they are a fragment of the overall value, etc. TextboxList has two essential bits: the editable and the box bit.

Some options involved in the behavior and appearance of the widget are specific to the editable bits, and some are specific to the box bits, which are separate classes from TextboxList. To easily pass them from the main class, you use the `bitsOptions` property. For example, to disable the delete button in boxes bits, and use the shift key for adding items instead of the enter key:

	#JS
	new TextboxList('form_tags_input', {bitsOptions: {
	    box: {deleteButton: false}, 
	    editable: {addKeys: Event.Keys.shift}
	}});
	
Knowing this gives you more customization power. If you want to target the blur event of any bit, attach a onBitBlur listener. If you want to target boxes, you can use `onBitBoxBlur`. You can see a complete list of options and events at the bottom of this page.

Screenshots
-----------

![Screenshot](http://www.quicksnapper.com/files/4413/9492781094A285A249645E_m.png)
![Screenshot](http://www.quicksnapper.com/files/4413/11103271584A285A321A884_m.png)
![Screenshot](http://www.quicksnapper.com/files/4413/2498436964A285A6A438CD_m.png)