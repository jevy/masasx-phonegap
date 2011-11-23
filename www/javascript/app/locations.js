(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  window.LocationView = (function() {
    __extends(LocationView, Backbone.View);
    function LocationView() {
      this.render = __bind(this.render, this);
      LocationView.__super__.constructor.apply(this, arguments);
    }
    LocationView.prototype.tagName = "option";
    LocationView.prototype.render = function() {
      return $(this.el).attr('value', this.model.get('id')).html(this.model.get('name'));
    };
    return LocationView;
  })();
  window.LocationsView = (function() {
    __extends(LocationsView, Backbone.View);
    function LocationsView() {
      this.addAll = __bind(this.addAll, this);
      this.addOne = __bind(this.addOne, this);
      LocationsView.__super__.constructor.apply(this, arguments);
    }
    LocationsView.prototype.addOne = function(location) {
      return $(this.el).append(new window.LocationView({
        model: location
      }).render());
    };
    LocationsView.prototype.addAll = function() {
      return this.collection.each(this.addOne);
    };
    return LocationsView;
  })();
}).call(this);
