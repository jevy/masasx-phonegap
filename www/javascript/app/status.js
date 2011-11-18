(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Status = (function() {
    __extends(Status, Backbone.Model);
    function Status() {
      Status.__super__.constructor.apply(this, arguments);
    }
    return Status;
  })();
  window.Statuses = (function() {
    __extends(Statuses, Backbone.Collection);
    function Statuses() {
      Statuses.__super__.constructor.apply(this, arguments);
    }
    return Statuses;
  })();
  window.StatusView = (function() {
    __extends(StatusView, Backbone.View);
    function StatusView() {
      this.render = __bind(this.render, this);
      StatusView.__super__.constructor.apply(this, arguments);
    }
    StatusView.prototype.tagName = "option";
    StatusView.prototype.render = function() {
      return $(this.el).attr('value', this.model.get('id')).html(this.model.get('name'));
    };
    return StatusView;
  })();
  window.StatusesView = (function() {
    __extends(StatusesView, Backbone.View);
    function StatusesView() {
      this.addAll = __bind(this.addAll, this);
      this.addOne = __bind(this.addOne, this);
      StatusesView.__super__.constructor.apply(this, arguments);
    }
    StatusesView.prototype.addOne = function(status) {
      return $(this.el).append(new window.StatusView({
        model: status
      }).render());
    };
    StatusesView.prototype.addAll = function() {
      return this.collection.each(this.addOne);
    };
    return StatusesView;
  })();
}).call(this);
