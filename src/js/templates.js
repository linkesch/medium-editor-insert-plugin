this["MediumInsert"] = this["MediumInsert"] || {};
this["MediumInsert"]["Templates"] = this["MediumInsert"]["Templates"] || {};

Handlebars.registerPartial("icons", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<svg viewBox=\"0 0 128 128\" style=\"display:none;\">\n    <defs>\n        <g id='justify-left'>\n            <path d=\"M76.17,20.579h37.438c2.861,0,5.177,2.34,5.177,5.228c0,2.887-2.316,5.227-5.177,5.227H76.17\n                c-2.86,0-5.176-2.339-5.176-5.227C70.994,22.918,73.31,20.579,76.17,20.579z\"/>\n            <path d=\"M76.17,57.979h25.015c2.86,0,5.176,2.338,5.176,5.226c0,2.888-2.316,5.228-5.176,5.228H76.17\n                c-2.86,0-5.176-2.339-5.176-5.228C70.994,60.317,73.31,57.979,76.17,57.979z\"/>\n            <path d=\"M76.17,39.278h46.562c2.861,0,5.177,2.339,5.177,5.228c0,2.888-2.316,5.227-5.177,5.227H76.17\n                c-2.86,0-5.176-2.339-5.176-5.227C70.994,41.618,73.31,39.278,76.17,39.278z\"/>\n            <path d=\"M76.17,76.692h46.562c2.861,0,5.177,2.338,5.177,5.227c0,2.888-2.316,5.228-5.177,5.228H76.17\n                c-2.86,0-5.176-2.34-5.176-5.228C70.994,79.03,73.31,76.692,76.17,76.692z\"/>\n            <path d=\"M76.17,95.392h46.562c2.861,0,5.177,2.339,5.177,5.227c0,2.888-2.316,5.227-5.177,5.227H76.17\n                c-2.86,0-5.176-2.338-5.176-5.227C70.994,97.731,73.31,95.392,76.17,95.392z\"/>\n            <path d=\"M7.97,20.003h45.863c4.284,0,7.765,3.516,7.765,7.841v71.389c0,4.326-3.481,7.841-7.765,7.841H7.97\n                c-4.283,0-7.764-3.515-7.764-7.841V27.844C0.206,23.506,3.674,20.003,7.97,20.003z\"/>\n        </g>\n        <g id='justify-full'>\n            <path d=\"M7.423,23.367h113.236c3.998,0,7.247,3.281,7.247,7.318v66.63c0,4.037-3.249,7.318-7.247,7.318H7.423\n                c-3.998,0-7.247-3.281-7.247-7.318v-66.63C0.176,26.636,3.412,23.367,7.423,23.367z\"/>\n        </g>\n        <g id='justify-right'>\n            <path d=\"M51.944,20.579H14.506c-2.861,0-5.177,2.34-5.177,5.228c0,2.887,2.316,5.227,5.177,5.227h37.438\n                c2.86,0,5.177-2.339,5.177-5.227C57.121,22.918,54.804,20.579,51.944,20.579z\"/>\n            <path d=\"M51.944,57.979H26.93c-2.861,0-5.177,2.338-5.177,5.226c0,2.888,2.316,5.228,5.177,5.228h25.015\n                c2.86,0,5.177-2.339,5.177-5.228C57.121,60.317,54.804,57.979,51.944,57.979z\"/>\n            <path d=\"M51.944,39.278H5.383c-2.861,0-5.177,2.339-5.177,5.228c0,2.888,2.316,5.227,5.177,5.227h46.562\n                c2.86,0,5.177-2.339,5.177-5.227C57.121,41.618,54.804,39.278,51.944,39.278z\"/>\n            <path d=\"M51.944,76.692H5.383c-2.861,0-5.177,2.338-5.177,5.227c0,2.888,2.316,5.228,5.177,5.228h46.562\n                c2.86,0,5.177-2.34,5.177-5.228C57.121,79.03,54.804,76.692,51.944,76.692z\"/>\n            <path d=\"M51.944,95.392H5.383c-2.861,0-5.177,2.339-5.177,5.227c0,2.888,2.316,5.227,5.177,5.227h46.562\n                c2.86,0,5.177-2.338,5.177-5.227C57.121,97.731,54.804,95.392,51.944,95.392z\"/>\n            <path d=\"M120.144,20.003H74.281c-4.284,0-7.765,3.516-7.765,7.841v71.389c0,4.326,3.481,7.841,7.765,7.841h45.863\n                c4.283,0,7.764-3.515,7.764-7.841V27.844C127.908,23.506,124.441,20.003,120.144,20.003z\"/>\n        </g>\n        <g id='full-width'>\n            <path d=\"M13.9,27.4H2c-1.1,0-2-0.9-2-2l0,0c0-1.1,0.9-2,2-2h11.9c1.1,0,2,0.9,2,2l0,0C15.9,26.5,15,27.4,13.9,27.4z\"/>\n            <path d=\"M0,38.2V26.3c0-1.1,0.9-2,2-2l0,0c1.1,0,2,0.9,2,2v11.9c0,1.1-0.9,2-2,2l0,0C0.9,40.2,0,39.3,0,38.2z\"/>\n            <path d=\"M4,89.8v11.9c0,1.1-0.9,2-2,2l0,0c-1.1,0-2-0.9-2-2V89.8c0-1.1,0.9-2,2-2l0,0C3.1,87.8,4,88.7,4,89.8z\"/>\n            <path d=\"M13.9,104.6H2c-1.1,0-2-0.9-2-2l0,0c0-1.1,0.9-2,2-2h11.9c1.1,0,2,0.9,2,2l0,0C15.9,103.7,15,104.6,13.9,104.6z\"/>\n            <path d=\"M114.1,27.4H126c1.1,0,2-0.9,2-2l0,0c0-1.1-0.9-2-2-2h-11.9c-1.1,0-2,0.9-2,2l0,0C112.1,26.5,113,27.4,114.1,27.4z\"/>\n            <path d=\"M128,38.2V26.3c0-1.1-0.9-2-2-2l0,0c-1.1,0-2,0.9-2,2v11.9c0,1.1,0.9,2,2,2l0,0C127.1,40.2,128,39.3,128,38.2z\"/>\n            <path d=\"M124,89.8v11.9c0,1.1,0.9,2,2,2l0,0c1.1,0,2-0.9,2-2V89.8c0-1.1-0.9-2-2-2l0,0C124.9,87.8,124,88.7,124,89.8z\"/>\n            <path d=\"M114.1,104.6H126c1.1,0,2-0.9,2-2l0,0c0-1.1-0.9-2-2-2h-11.9c-1.1,0-2,0.9-2,2l0,0C112.1,103.7,113,104.6,114.1,104.6z\"/>\n            <path d=\"M116.8,96H11.4c-1.1,0-2-0.9-2-2V34.3c0-1.1,0.9-2,2-2h105.4c1.1,0,2,0.9,2,2V94C118.8,95.1,117.9,96,116.8,96z\"/>\n        </g>\n        <g id='grid'>\n            <path id=\"XMLID_9_\" d=\"M34.8,3.9c0-2.2-1.8-4-4-4H4c-2.2,0-4,1.8-4,4v26.8c0,2.2,1.8,4,4,4h26.8c2.2,0,4-1.8,4-4L34.8,3.9L34.8,3.9\n                z\"/>\n            <path id=\"XMLID_8_\" d=\"M81.2,3.9c0-2.2-1.8-4-4-4H50.4c-2.2,0-4,1.8-4,4v26.8c0,2.2,1.8,4,4,4h26.8c2.2,0,4-1.8,4-4V3.9z\"/>\n            <path id=\"XMLID_7_\" d=\"M127.5,3.9c0-2.2-1.8-4-4-4H96.8c-2.2,0-4,1.8-4,4v26.8c0,2.2,1.8,4,4,4h26.8c2.2,0,4-1.8,4-4L127.5,3.9\n                L127.5,3.9z\"/>\n            <path id=\"XMLID_6_\" d=\"M34.8,50.6c0-2.2-1.8-4-4-4H4c-2.2,0-4,1.8-4,4v26.8c0,2.2,1.8,4,4,4h26.8c2.2,0,4-1.8,4-4L34.8,50.6\n                L34.8,50.6L34.8,50.6z\"/>\n            <path id=\"XMLID_5_\" d=\"M81.2,50.6c0-2.2-1.8-4-4-4H50.4c-2.2,0-4,1.8-4,4v26.8c0,2.2,1.8,4,4,4h26.8c2.2,0,4-1.8,4-4V50.6z\"/>\n            <path id=\"XMLID_4_\" d=\"M127.5,50.6c0-2.2-1.8-4-4-4H96.8c-2.2,0-4,1.8-4,4v26.8c0,2.2,1.8,4,4,4h26.8c2.2,0,4-1.8,4-4L127.5,50.6\n                L127.5,50.6L127.5,50.6z\"/>\n            <path id=\"XMLID_3_\" d=\"M30.8,93.2H4c-2.2,0-4,1.8-4,4V124c0,2.2,1.8,4,4,4h26.8c2.2,0,4-1.8,4-4V97.2C34.8,95,33,93.2,30.8,93.2z\"\n                />\n            <path id=\"XMLID_2_\" d=\"M77.2,93.2H50.4c-2.2,0-4,1.8-4,4V124c0,2.2,1.8,4,4,4h26.8c2.2,0,4-1.8,4-4V97.2\n                C81.2,95,79.4,93.2,77.2,93.2z\"/>\n            <path id=\"XMLID_1_\" d=\"M123.6,93.2H96.8c-2.2,0-4,1.8-4,4V124c0,2.2,1.8,4,4,4h26.8c2.2,0,4-1.8,4-4V97.2\n                C127.5,95,125.8,93.2,123.6,93.2z\"/>\n        </g>\n        <g id='remove'>\n            <path id=\"XMLID_1_\" d=\"M123.7,25.2L84.9,64l38.8,38.8c5.8,5.8,5.8,15.1,0,20.9c-2.9,2.9-6.7,4.3-10.4,4.3c-3.8,0-7.6-1.4-10.4-4.3\n                L64,84.9l-38.8,38.8c-2.9,2.9-6.7,4.3-10.4,4.3c-3.8,0-7.6-1.4-10.4-4.3c-5.8-5.8-5.8-15.1,0-20.9L43.1,64L4.3,25.2\n                c-5.8-5.8-5.8-15.1,0-20.9c5.8-5.8,15.1-5.8,20.9,0L64,43.1l38.8-38.8c5.8-5.8,15.1-5.8,20.9,0C129.4,10.1,129.4,19.4,123.7,25.2z\"\n                />\n        </g>\n    </defs>\n</svg>";
},"useData":true}));

this["MediumInsert"]["Templates"]["src/js/templates/core-buttons.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "            <li><a data-addon=\""
    + this.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" data-action=\"add\" class=\"medium-insert-action\">"
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</a></li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"medium-insert-buttons\" contenteditable=\"false\" style=\"display: none\">\n    <a class=\"medium-insert-buttons-show\">+</a>\n    <ul class=\"medium-insert-buttons-addons\" style=\"display: none\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.addons : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n</div>\n";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/core-caption.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<figcaption contenteditable=\"true\" class=\"medium-insert-caption-placeholder\" data-placeholder=\""
    + this.escapeExpression(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"placeholder","hash":{},"data":data}) : helper)))
    + "\"></figcaption>";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/core-empty-line.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<p><br/></p>\n";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/embeds-toolbar.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"medium-insert-embeds-toolbar medium-editor-toolbar medium-toolbar-arrow-under medium-editor-toolbar-active\">\n        <ul class=\"medium-editor-toolbar-actions clearfix\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.styles : depth0),{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </div>\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"3":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "                    <li>\n                        <button class=\"medium-editor-action\" data-action=\""
    + this.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</button>\n                    </li>\n";
},"5":function(depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"medium-insert-embeds-toolbar2 medium-editor-toolbar medium-editor-toolbar-active\">\n        <ul class=\"medium-editor-toolbar-actions clearfix\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.actions : depth0),{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.icons,depth0,{"name":"icons","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.styles : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.actions : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/embeds-wrapper.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"medium-insert-embeds\" contenteditable=\"false\">\n	<figure>\n		<div class=\"medium-insert-embed\">\n			"
    + ((stack1 = ((helper = (helper = helpers.html || (depth0 != null ? depth0.html : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"html","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n		</div>\n	</figure>\n	<div class=\"medium-insert-embeds-overlay\"></div>\n</div>";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/images-fileupload.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<input type=\"file\" accept=\"image/*\" />";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/images-image.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<figure contenteditable=\"false\">\n    <img src=\""
    + alias3(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"img","hash":{},"data":data}) : helper)))
    + "\" img-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" />\n</figure>";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/images-progressbar.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<progress min=\"0\" max=\"100\" value=\"0\">0</progress>";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/images-toolbar.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "                <li>\n                    <button class=\"medium-editor-action\" data-action=\""
    + this.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</button>\n                </li>\n";
},"4":function(depth0,helpers,partials,data) {
    var stack1;

  return "	<div class=\"medium-insert-images-toolbar2 medium-editor-toolbar medium-editor-toolbar-active\">\n		<ul class=\"medium-editor-toolbar-actions clearfix\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.actions : depth0),{"name":"each","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    	</ul>\n    </div>\n";
},"5":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"6":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "        	        <li>\n        	            <button class=\"medium-editor-action\" data-action=\""
    + this.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</button>\n        	        </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.icons,depth0,{"name":"icons","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n<div class=\"medium-insert-images-toolbar medium-editor-toolbar medium-toolbar-arrow-under medium-editor-toolbar-active\">\n    <ul class=\"medium-editor-toolbar-actions clearfix\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.styles : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n</div>\n\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.actions : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/products-placeholder.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"medium-insert-products-placeholder\" contenteditable=\"false\">"
    + this.escapeExpression(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"placeholder","hash":{},"data":data}) : helper)))
    + "</div>";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/products-product.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div contenteditable=\"false\">\n    <div class=\"hubrick-product-block\">\n    	Hi! I'm a Hubrick product. The data here needs to be pretty JSON from an API.\n    </div>\n</div>";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/products-toolbar.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "                <li>\n                    <button class=\"medium-editor-action\" data-action=\""
    + this.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</button>\n                </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.icons,depth0,{"name":"icons","data":data,"indent":" ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n <div class=\"medium-insert-products-toolbar medium-editor-toolbar medium-toolbar-arrow-under medium-editor-toolbar-active\">\n    <ul class=\"medium-editor-toolbar-actions clearfix\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.styles : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n</div>";
},"usePartial":true,"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/products-wrapper.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"medium-insert-products\">\n	<div contenteditable=\"false\">\n	    <div class=\"hubrick-product-block centered\">\n	    	<h3>Nike Foobar</h3>\n	    	Hi! I'm a Hubrick product. This data right here needs to be pretty JSON from an API.\n	    </div>\n	</div>\n</div>";
},"useData":true});