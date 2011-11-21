(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Severity = (function() {
    __extends(Severity, Backbone.Model);
    function Severity() {
      Severity.__super__.constructor.apply(this, arguments);
    }
    return Severity;
  })();
  window.Severities = (function() {
    __extends(Severities, Backbone.Collection);
    function Severities() {
      Severities.__super__.constructor.apply(this, arguments);
    }
    return Severities;
  })();
  window.SeverityView = (function() {
    __extends(SeverityView, Backbone.View);
    function SeverityView() {
      this.render = __bind(this.render, this);
      SeverityView.__super__.constructor.apply(this, arguments);
    }
    SeverityView.prototype.tagName = "option";
    SeverityView.prototype.render = function() {
      return $(this.el).attr('value', this.model.get('id')).html(this.model.get('name'));
    };
    return SeverityView;
  })();
  window.SeveritiesView = (function() {
    __extends(SeveritiesView, Backbone.View);
    function SeveritiesView() {
      this.addAll = __bind(this.addAll, this);
      this.addOne = __bind(this.addOne, this);
      SeveritiesView.__super__.constructor.apply(this, arguments);
    }
    SeveritiesView.prototype.addOne = function(status) {
      return $(this.el).append(new window.SeverityView({
        model: status
      }).render());
    };
    SeveritiesView.prototype.addAll = function() {
      return this.collection.each(this.addOne);
    };
    return SeveritiesView;
  })();
}).call(this);
