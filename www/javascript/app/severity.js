(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
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
}).call(this);
