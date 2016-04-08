(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MediumEditorInsert"] = factory();
	else
		root["MediumEditorInsert"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Core = __webpack_require__(2);

	var _Core2 = _interopRequireDefault(_Core);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MediumEditorInsert = MediumEditor.Extension.extend({
	    name: 'insert',

	    addons: {
	        images: true,
	        embeds: true
	    },

	    init: function init() {
	        MediumEditor.Extension.prototype.init.apply(this, arguments);

	        this.core = new _Core2.default(this);
	    },

	    destroy: function destroy() {
	        this.core.removeButtons();
	    }
	});

	exports.default = MediumEditorInsert;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		/**
	  * Capitalize first character
	  *
	  * @param {string} str
	  * @return {string}
	  */

		ucfirst: function ucfirst(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		},

		generateRandomString: function generateRandomString() {
			var length = arguments.length <= 0 || arguments[0] === undefined ? 15 : arguments[0];

			return Math.random().toString(36).substr(2, length + 2);
		}
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _Images = __webpack_require__(4);

	var _Images2 = _interopRequireDefault(_Images);

	var _Embeds = __webpack_require__(3);

	var _Embeds2 = _interopRequireDefault(_Embeds);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Core = function () {
	    function Core(plugin) {
	        _classCallCheck(this, Core);

	        this._plugin = plugin;
	        this._editor = this._plugin.base;

	        this.initAddons();
	        this.addButtons();
	        this.events();
	    }

	    _createClass(Core, [{
	        key: 'events',
	        value: function events() {
	            var _this = this;

	            var addonActions = void 0;

	            // This could be chained when medium-editor 5.15.2 is released
	            // https://github.com/yabwe/medium-editor/pull/1046
	            this._plugin.on(document, 'click', this.toggleButtons.bind(this));
	            this._plugin.on(document, 'keyup', this.toggleButtons.bind(this));
	            this._plugin.on(this.buttons.getElementsByClassName('medium-editor-insert-buttons-show')[0], 'click', this.toggleAddons.bind(this));

	            // This could be written in one statement when medium-editor 5.15.2 is released
	            // https://github.com/yabwe/medium-editor/pull/1046
	            addonActions = this.buttons.getElementsByClassName('medium-editor-insert-action');
	            Array.prototype.forEach.call(addonActions, function (action) {
	                _this._plugin.on(action, 'click', _this.handleAddonClick.bind(_this));
	            });

	            this._plugin.on(window, 'resize', this.positionButtons.bind(this));
	        }
	    }, {
	        key: 'initAddons',
	        value: function initAddons() {
	            var _this2 = this;

	            this._plugin.initializedAddons = {
	                images: new _Images2.default(this._plugin, this._plugin.addons.images),
	                embeds: new _Embeds2.default(this._plugin, this._plugin.addons.embeds)
	            };

	            Object.keys(this._plugin.addons).forEach(function (name) {
	                var addonOptions = _this2._plugin.addons[name];

	                if (!_this2._plugin.initializedAddons[name] && addonOptions) {
	                    var className = 'MediumEditorInsert' + _utils2.default.ucfirst(name);

	                    if (window[className]) {
	                        _this2._plugin.initializedAddons[name] = new window[className](_this2._plugin, addonOptions);
	                    } else {
	                        window.console.error('Addon "' + name + '" couldn\'t be found!');
	                    }
	                }

	                if (!addonOptions) {
	                    delete _this2._plugin.initializedAddons[name];
	                }
	            });
	        }
	    }, {
	        key: 'addButtons',
	        value: function addButtons() {
	            var _this3 = this;

	            var html = void 0;

	            this.buttons = document.createElement('div');
	            this.buttons.id = 'medium-editor-insert-' + this._plugin.getEditorId();
	            this.buttons.classList.add('medium-editor-insert-buttons');
	            this.buttons.setAttribute('contentediable', false);

	            html = '<a class="medium-editor-insert-buttons-show">+</a>\n            <ul class="medium-editor-insert-buttons-addons">';

	            Object.keys(this._plugin.initializedAddons).forEach(function (name) {
	                var addon = _this3._plugin.initializedAddons[name];

	                html += '<li><a class="medium-editor-insert-action" data-addon="' + name + '">' + addon.label + '</a></li>';
	            });

	            html += '</ul>';

	            this.buttons.innerHTML = html;

	            document.body.appendChild(this.buttons);
	        }
	    }, {
	        key: 'removeButtons',
	        value: function removeButtons() {
	            this.buttons.remove();
	        }
	    }, {
	        key: 'positionButtons',
	        value: function positionButtons() {
	            var el = void 0,
	                elPosition = void 0,
	                addons = void 0,
	                addonButton = void 0,
	                addonsStyle = void 0,
	                addonButtonStyle = void 0,
	                position = void 0;

	            if (this.buttons.classList.contains('medium-editor-insert-buttons-active') === false) {
	                return;
	            }

	            el = this._editor.getSelectedParentElement();
	            elPosition = el.getBoundingClientRect();
	            addons = this.buttons.getElementsByClassName('medium-editor-insert-buttons-addons')[0];
	            addonButton = this.buttons.getElementsByClassName('medium-editor-insert-action')[0];
	            addonsStyle = window.getComputedStyle(addons);
	            addonButtonStyle = window.getComputedStyle(addonButton);
	            position = {
	                top: window.scrollY + elPosition.top,
	                left: window.scrollX + elPosition.left - parseInt(addonsStyle.left, 10) - parseInt(addonButtonStyle.marginLeft, 10)
	            };

	            position.left = position.left < 0 ? elPosition.left : position.left;

	            this.buttons.style.left = position.left + 'px';
	            this.buttons.style.top = position.top + 'px';
	        }
	    }, {
	        key: 'toggleButtons',
	        value: function toggleButtons() {
	            var el = this._editor.getSelectedParentElement();

	            if (el.innerText.trim() === '') {
	                this.activeParagraph = el;
	                this.showButtons();
	            } else {
	                this.activeParagraph = null;
	                this.hideButtons();
	            }
	        }
	    }, {
	        key: 'showButtons',
	        value: function showButtons() {
	            this.buttons.classList.add('medium-editor-insert-buttons-active');
	            this.positionButtons();
	        }
	    }, {
	        key: 'hideButtons',
	        value: function hideButtons() {
	            this.buttons.classList.remove('medium-editor-insert-buttons-active');
	            this.buttons.classList.remove('medium-editor-insert-addons-active');
	        }
	    }, {
	        key: 'toggleAddons',
	        value: function toggleAddons() {
	            this.buttons.classList.toggle('medium-editor-insert-addons-active');
	        }
	    }, {
	        key: 'handleAddonClick',
	        value: function handleAddonClick(e) {
	            var name = e.currentTarget.getAttribute('data-addon');

	            e.preventDefault();

	            this._plugin.initializedAddons[name].handleClick(e);
	        }
	    }]);

	    return Core;
	}();

	exports.default = Core;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Embeds = function () {
		function Embeds(plugin, options) {
			_classCallCheck(this, Embeds);

			this._plugin = plugin;
			this._editor = this._plugin.base;

			this.options = {
				label: '<span class="fa fa-youtube-play"></span>'
			};

			Object.assign(this.options, options);

			this.label = this.options.label;
		}

		_createClass(Embeds, [{
			key: 'handleClick',
			value: function handleClick() {
				window.console.log('embeds clicked');
			}
		}]);

		return Embeds;
	}();

	exports.default = Embeds;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Images = function () {
		function Images(plugin, options) {
			_classCallCheck(this, Images);

			this._plugin = plugin;
			this._editor = this._plugin.base;

			this.options = {
				label: '<span class="fa fa-camera"></span>',
				preview: true,
				uploadUrl: 'upload.php'
			};

			Object.assign(this.options, options);

			this.label = this.options.label;
		}

		_createClass(Images, [{
			key: 'handleClick',
			value: function handleClick() {
				this._input = document.createElement('input');
				this._input.type = 'file';
				this._input.multiple = true;

				this._plugin.on(this._input, 'change', this.uploadFiles.bind(this));

				this._input.click();
			}
		}, {
			key: 'uploadFiles',
			value: function uploadFiles() {
				var _this = this;

				var paragraph = this._plugin.core.activeParagraph;

				if (paragraph.nodeName.toLowerCase() === 'p') {
					var div = document.createElement('div');

					paragraph.parentNode.insertBefore(div, paragraph);
					this._plugin.core.activeParagraph = div;
					paragraph.remove();
				}

				Array.prototype.forEach.call(this._input.files, function (file) {
					var uid = _utils2.default.generateRandomString();

					if (_this.options.preview) {
						_this.preview(file, uid);
					}

					_this.upload(file, uid);
				});

				this._plugin.core.hideButtons();
			}
		}, {
			key: 'preview',
			value: function preview(file, uid) {
				var _this2 = this;

				var reader = new FileReader();

				reader.onload = function (e) {
					_this2.insertImage(e.target.result, uid);
				};

				reader.readAsDataURL(file);
			}
		}, {
			key: 'upload',
			value: function upload(file, uid) {
				var _this3 = this;

				var xhr = new XMLHttpRequest(),
				    data = new FormData();

				xhr.open("POST", this.options.uploadUrl, true);
				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4 && xhr.status === 200) {
						var image = _this3._plugin.core.activeParagraph.querySelector('[data-uid="' + uid + '"]');

						if (image) {
							_this3.replaceImage(image, xhr.responseText);
						} else {
							_this3.insertImage(xhr.responseText);
						}
					}
				};

				data.append("file", file);
				xhr.send(data);
			}
		}, {
			key: 'insertImage',
			value: function insertImage(url, uid) {
				var el = this._plugin.core.activeParagraph,
				    figure = document.createElement('figure'),
				    img = document.createElement('img');

				img.src = url;
				img.alt = '';
				if (uid) {
					img.setAttribute('data-uid', uid);
				}
				figure.appendChild(img);

				el.classList.add('medium-editor-insert-images');
				el.appendChild(figure);
			}
		}, {
			key: 'replaceImage',
			value: function replaceImage(image, url) {
				image.src = url;
				image.removeAttribute('data-uid');
			}
		}]);

		return Images;
	}();

	exports.default = Images;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;