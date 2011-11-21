(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
  window.CategoryView = (function() {
    __extends(CategoryView, Backbone.View);
    function CategoryView() {
      this.render = __bind(this.render, this);
      CategoryView.__super__.constructor.apply(this, arguments);
    }
    CategoryView.prototype.tagName = "option";
    CategoryView.prototype.render = function() {
      return $(this.el).attr('value', this.model.get('id')).html(this.model.get('name'));
    };
    return CategoryView;
  })();
  window.CategoriesView = (function() {
    __extends(CategoriesView, Backbone.View);
    function CategoriesView() {
      this.addAll = __bind(this.addAll, this);
      this.addOne = __bind(this.addOne, this);
      CategoriesView.__super__.constructor.apply(this, arguments);
    }
    CategoriesView.prototype.addOne = function(status) {
      return $(this.el).append(new window.CategoryView({
        model: status
      }).render());
    };
    CategoriesView.prototype.addAll = function() {
      return this.collection.each(this.addOne);
    };
    return CategoriesView;
  })();
}).call(this);
