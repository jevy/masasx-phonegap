(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
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
}).call(this);
