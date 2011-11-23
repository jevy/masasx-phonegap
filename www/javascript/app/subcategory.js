(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.SubCategory = (function() {
    __extends(SubCategory, Backbone.Model);
    function SubCategory() {
      SubCategory.__super__.constructor.apply(this, arguments);
    }
    return SubCategory;
  })();
  window.SubCategories = (function() {
    __extends(SubCategories, Backbone.Collection);
    function SubCategories() {
      SubCategories.__super__.constructor.apply(this, arguments);
    }
    return SubCategories;
  })();
  window.SubCategoryView = (function() {
    __extends(SubCategoryView, Backbone.View);
    function SubCategoryView() {
      this.render = __bind(this.render, this);
      SubCategoryView.__super__.constructor.apply(this, arguments);
    }
    SubCategoryView.prototype.tagName = "option";
    SubCategoryView.prototype.render = function() {
      return $(this.el).attr('value', this.model.get('id')).html(this.model.get('name'));
    };
    return SubCategoryView;
  })();
  window.SubCategoriesView = (function() {
    __extends(SubCategoriesView, Backbone.View);
    function SubCategoriesView() {
      this.addAll = __bind(this.addAll, this);
      this.addOne = __bind(this.addOne, this);
      SubCategoriesView.__super__.constructor.apply(this, arguments);
    }
    SubCategoriesView.prototype.addOne = function(status) {
      return $(this.el).append(new window.SubCategoryView({
        model: status
      }).render());
    };
    SubCategoriesView.prototype.addAll = function() {
      return this.collection.each(this.addOne);
    };
    return SubCategoriesView;
  })();
}).call(this);
