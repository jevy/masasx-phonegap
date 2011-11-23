(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  window.Category = (function() {
    __extends(Category, Backbone.Model);
    function Category() {
      Category.__super__.constructor.apply(this, arguments);
    }
    return Category;
  })();
  window.Categories = (function() {
    __extends(Categories, Backbone.Collection);
    function Categories() {
      Categories.__super__.constructor.apply(this, arguments);
    }
    return Categories;
  })();
}).call(this);
