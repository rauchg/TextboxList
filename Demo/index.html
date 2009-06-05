<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html; charset=utf-8">
		<title>MooTools TextboxList Demo</title>
		
		<!-- TextboxList is not priceless for commercial use. See <http://devthought.com/projects/mootools/textboxlist/> -->
		
		<!-- required stylesheet for TextboxList -->
		<link rel="stylesheet" href="../Source/TextboxList.css" type="text/css" media="screen" charset="utf-8" />
		<!-- required stylesheet for TextboxList.Autocomplete -->
		<link rel="stylesheet" href="../Source/TextboxList.Autocomplete.css" type="text/css" media="screen" charset="utf-8" />
		
		<script src="mootools-1.2.1-core-yc.js" type="text/javascript" charset="utf-8"></script>		

		<!-- required for TextboxList -->
		<script src="GrowingInput.js" type="text/javascript" charset="utf-8"></script>
				
		<script src="../Source/TextboxList.js" type="text/javascript" charset="utf-8"></script>		
		<script src="../Source/TextboxList.Autocomplete.js" type="text/javascript" charset="utf-8"></script>
		<!-- required for TextboxList.Autocomplete if method set to 'binary' -->
		<script src="../Source/TextboxList.Autocomplete.Binary.js" type="text/javascript" charset="utf-8"></script>		
		
		<!-- sample initialization -->
		<script type="text/javascript" charset="utf-8">		
			window.addEvent('load', function(){
				// Standard initialization
				var t = new TextboxList('form_tags_input', {  });
				t.add('Tag 1').add('Tag 2').add('Tag 3');
				
				// With custom adding keys 
				var t2 = new TextboxList('form_tags_input_2', {bitsOptions:{editable:{addKeys: 188}}});
				t2.add('Tag 1').add('Tag 2');
				
				// Autocomplete initialization
				var t4 = new TextboxList('form_tags_input_3', {unique: true, plugins: {autocomplete: {}}});
				t4.add('John Doe').add('Jane Roe');
				
				// sample data loading with json, but can be jsonp, local, etc. 
				// the only requirement is that you call setValues with an array of this format:
				// [
				//	[id, bit_plaintext (on which search is performed), bit_html (optional, otherwise plain_text is used), autocomplete_html (html for the item displayed in the autocomplete suggestions dropdown)]
				// ]
				// read autocomplete.php for a JSON response exmaple
				t4.container.addClass('textboxlist-loading');				
				new Request.JSON({url: 'autocomplete.php', onSuccess: function(r){
					t4.plugins['autocomplete'].setValues(r);
					t4.container.removeClass('textboxlist-loading');
				}}).send();				
				
				// Autocomplete with poll the server as you type
				var t5 = new TextboxList('form_tags_input_4', {unique: true, plugins: {autocomplete: {
					minLength: 3,
					queryRemote: true,
					remote: {url: 'autocomplete2.php'}
				}}});
				t5.add('John Doe').add('Jane Roe');
				
			});
		</script>
		
		<!-- sample style -->
		<style type="text/css" media="screen">
			.form_tags { margin-bottom: 10px; }
			
			/* Setting widget width example */
			.textboxlist { width: 400px; }
			
			/* Preloader for autocomplete */
			.textboxlist-loading { background: url('images/spinner.gif') no-repeat 380px center; }
			
			/* Autocomplete results styling */
			.form_friends .textboxlist-autocomplete-result { overflow: hidden; zoom: 1; }
			.form_friends .textboxlist-autocomplete-result img { float: left; padding-right: 10px; }
			
			.note { color: #666; font-size: 90%; }
			#footer { margin: 50px; text-align: center; }
		</style>
	</head>
	<body>
		<h1>TextboxList demo</h1>
		<p><a href="http://devthought.com/projects/mootools/textboxlist/">Devthought project page (downloads, documentation)</a></p>
		
		<form action="submit.php" method="post" accept-charset="utf-8">
		<h2>TextboxList (standard)</h2>
		<p>Enter tags</p>
		<div class="form_tags"><input type="text" name="test" value="" id="form_tags_input" /></div>
		<p class="note">Type the tag (one or more words) and press enter. Use left/right arrows, backspace, delete to navigate</p>
		
		<p>Enter tags (with commas)</p>
		<div class="form_tags"><input type="text" name="test2" value="" id="form_tags_input_2" /></div>
		<p class="note">Type the tag (one or more words) and press comma (,). Use left/right arrows, backspace, delete to navigate</p>
		
		<h2>TextboxList.Autocomplete (values seeded all at once)</h2>
		<p>Select friends to email</p>
		<div class="form_friends">
			<input type="text" name="test3" value="" id="form_tags_input_3" />
		</div>
		<p class="note">Type the tag (one or more words) and press enter. Use left/right arrows, backspace, delete to navigate/remove boxes, and up/down/enter to navigate/add suggestions.</p>
		
		<h2>TextboxList.Autocomplete (values seeded on demand)</h2>
		<p>Select friends to email</p>
		<div class="form_friends">
			<input type="text" name="test4" value="" id="form_tags_input_4" />
		</div>
		<p class="note">Type the tag (one or more words) and press enter. Use left/right arrows, backspace, delete to navigate/remove boxes, and up/down/enter to navigate/add suggestions.</p>
				
		<h1>Test submit</h1>
		<p><input type="submit" name="submitform" value="Submit" id="submitform" /></p>
				
		<h1>Samples code</h1>
		<p>To view the implementation for these examples just use the <code>View Source</code> option in your browser</p>
		<p>They're already documented, and resemble the most common implementations that you might need for your websites.</p>
				
		<h1>Read more</h1>
		<p>Please head to the <a href="http://devthought.com/projects/mootools/textboxlist/">article page</a> for a complete explanation.</p>
	</form>
		
	<p id="footer"><a href="http://devthought.com">Guillermo Rauch</a> &copy; <script type="text/javascript">document.write(new Date().getFullYear());</script></p>
	</body>
</html>