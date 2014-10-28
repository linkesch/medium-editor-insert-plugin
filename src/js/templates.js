this["MediumInsert"] = this["MediumInsert"] || {};
this["MediumInsert"]["Templates"] = this["MediumInsert"]["Templates"] || {};

Handlebars.registerPartial("placeholder", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <li><button data-addon=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-action=\"add\" class=\"medium-editor-action mediumInsert-action\">";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</button></li>\n            ";
  return buffer;
  }

  buffer += "<div class=\"mediumInsert\" contenteditable=\"false\">\n    <div class=\"mediumInsert-buttons\">\n        <a class=\"mediumInsert-buttonsShow\">+</a>\n        <ul class=\"mediumInsert-buttonsOptions medium-editor-toolbar medium-editor-toolbar-active\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.addons), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n    </div>\n    <div class=\"mediumInsert-placeholder\"></div>\n</div>\n";
  return buffer;
  }));

this["MediumInsert"]["Templates"]["src/js/templates/core-buttons.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            <li><a data-addon=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-action=\"add\" class=\"mediumInsert-action\">";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n        ";
  return buffer;
  }

  buffer += "<div class=\"mediumInsert-buttons\" contenteditable=\"false\" style=\"display: none\">\n    <a class=\"mediumInsert-buttonsShow\">+</a>\n    <ul class=\"mediumInsert-buttonsOptions\" style=\"display: none\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.addons), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n</div>\n";
  return buffer;
  });

this["MediumInsert"]["Templates"]["src/js/templates/core-empty-line.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<p><br></p>\n";
  });

this["MediumInsert"]["Templates"]["src/js/templates/images-fileupload.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<input type=\"file\" multiple>";
  });

this["MediumInsert"]["Templates"]["src/js/templates/images-image.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<figure><img src=\"";
  if (helper = helpers.img) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.img); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"\"></figure>";
  return buffer;
  });

this["MediumInsert"]["Templates"]["src/js/templates/images-progressbar.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<progress min=\"0\" max=\"100\" value=\"0\">0</progress>";
  });

this["MediumInsert"]["Templates"]["src/js/templates/images-toolbar.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li>\n                <button class=\"medium-editor-action\" data-action=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
  stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n            </li>\n        ";
  return buffer;
  }

  buffer += "<div class=\"mediumInsert-imageToolbar medium-editor-toolbar medium-toolbar-arrow-under medium-editor-toolbar-active\">\n    <ul class=\"medium-editor-toolbar-actions clearfix\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.styles), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n</div>";
  return buffer;
  });