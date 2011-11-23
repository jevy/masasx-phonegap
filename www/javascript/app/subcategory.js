(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
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
    SubCategories.prototype.for_category = function(category) {
      return app.subCategories.filter(function(subcategory) {
        return subcategory.get('category_id') === category.get('id');
      });
    };
    return SubCategories;
  })();
}).call(this);
