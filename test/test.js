$(document).ready(function(){
	var medEditor = new MediumEditor('.editable');
	$('.editable').mediumInsert({
		editor: medEditor,
		enabled: false,
		buttonLabels: 'fontawesome'
	});

	$('#button').click(function()
	{
		var allContents = medEditor.serialize();
		var elContent = allContents["element-0"].value;

		console.log(allContents);
		$('#elContents').text(elContent);
	});
});

