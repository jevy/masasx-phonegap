(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Certainty = (function() {
    __extends(Certainty, Backbone.Model);
    function Certainty() {
      Certainty.__super__.constructor.apply(this, arguments);
    }
    return Certainty;
  })();
  window.Certainties = (function() {
    __extends(Certainties, Backbone.Collection);
    function Certainties() {
      Certainties.__super__.constructor.apply(this, arguments);
    }
    return Certainties;
  })();
  window.CertaintyView = (function() {
    __extends(CertaintyView, Backbone.View);
    function CertaintyView() {
      this.render = __bind(this.render, this);
      CertaintyView.__super__.constructor.apply(this, arguments);
    }
    CertaintyView.prototype.tagName = "option";
    CertaintyView.prototype.render = function() {
      return $(this.el).attr('value', this.model.get('id')).html(this.model.get('name'));
    };
    return CertaintyView;
  })();
  window.CertaintiesView = (function() {
    __extends(CertaintiesView, Backbone.View);
    function CertaintiesView() {
      this.addAll = __bind(this.addAll, this);
      this.addOne = __bind(this.addOne, this);
      CertaintiesView.__super__.constructor.apply(this, arguments);
    }
    CertaintiesView.prototype.addOne = function(status) {
      return $(this.el).append(new window.CertaintyView({
        model: status
      }).render());
    };
    CertaintiesView.prototype.addAll = function() {
      return this.collection.each(this.addOne);
    };
    return CertaintiesView;
  })();
}).call(this);
