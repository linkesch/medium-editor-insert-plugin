$(document).ready(function(){
	var medEditor = new MediumEditor('.editable');
	$('.editable').mediumInsert({
		editor: medEditor,
		enabled: false,
		buttonLabels: 'fontawesome',
		addons: {
			images: {
				styles: {
					slideshow: {
						label: '<span class="fa fa-play"></span>',
								added: function ($el) {
									$el
										.data('cycle-center-vert', true)
										.cycle({
											slides: 'figure'
										});
								},
								removed: function ($el) {
									$el.cycle('destroy');
								}
							}
						},
						actions: false
					}
				}
	});
});

