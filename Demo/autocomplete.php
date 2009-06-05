<?php

// TextboxList Autocomplete sample data for queryRemote: false (names are fetched all at once when TextboxList is initialized)

// get names (eg: database)
// the format is: 
// id, searchable plain text, html (for the textboxlist item, if empty the plain is used), html (for the autocomplete dropdown)

$response = array();
$names = array('Abraham Lincoln', 'Adolf Hitler', 'Agent Smith', 'Agnus', 'AIAI', 'Akira Shoji', 'Akuma', 'Alex', 'Antoinetta Marie', 'Baal', 'Baby Luigi', 'Backpack', 'Baralai', 'Bardock', 'Baron Mordo', 'Barthello', 'Blanka', 'Bloody Brad', 'Cagnazo', 'Calonord', 'Calypso', 'Cao Cao', 'Captain America', 'Chang', 'Cheato', 'Cheshire Cat', 'Daegon', 'Dampe', 'Daniel Carrington', 'Daniel Lang', 'Dan Severn', 'Darkman', 'Darth Vader', 'Dingodile', 'Dmitri Petrovic', 'Ebonroc', 'Ecco the Dolphin', 'Echidna', 'Edea Kramer', 'Edward van Helgen', 'Elena', 'Eulogy Jones', 'Excella Gionne', 'Ezekial Freeman', 'Fakeman', 'Fasha', 'Fawful', 'Fergie', 'Firebrand', 'Fresh Prince', 'Frylock', 'Fyrus', 'Lamarr', 'Lazarus', 'Lebron James', 'Lee Hong', 'Lemmy Koopa', 'Leon Belmont', 'Lewton', 'Lex Luthor', 'Lighter', 'Lulu');

// make sure they're sorted alphabetically, for binary search tests
sort($names);

foreach ($names as $i => $name)
{
	$filename = str_replace(' ', '', strtolower($name));
	$response[] = array($i, $name, null, '<img src="images/'. $filename . (file_exists('images/' . $filename . '.jpg') ? '.jpg' : '.png') .'" /> ' . $name);
}

header('Content-type: application/json');
echo json_encode($response);