export default class Embeds {

	constructor(plugin, options) {
		this._plugin = plugin;
        this._editor = this._plugin.base;

		this.options = {
			label: '<span class="fa fa-youtube-play"></span>'
		};

		Object.assign(this.options, options);

		this.label = this.options.label;
	}

	handleClick() {
		window.console.log('embeds clicked');
	}

}
