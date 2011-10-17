(function() {
  var Entry, SecretInputView, SelectGeoView, app;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  app = {
    activePage: function() {
      return $(".ui-page-active");
    }
  };
  Entry = (function() {
    __extends(Entry, Backbone.Model);
    function Entry() {
      Entry.__super__.constructor.apply(this, arguments);
    }
    return Entry;
  })();
  SecretInputView = (function() {
    __extends(SecretInputView, Backbone.View);
    SecretInputView.prototype.events = {
      "click a#next": "next"
    };
    function SecretInputView() {
      SecretInputView.__super__.constructor.apply(this, arguments);
      this.el = app.activePage();
    }
    SecretInputView.prototype.render = function() {
      return this.delegateEvents();
    };
    SecretInputView.prototype.next = function() {
      return app.currentEntry.set({
        secret: $('#entry_secret').val()
      });
    };
    return SecretInputView;
  })();
  SelectGeoView = (function() {
    __extends(SelectGeoView, Backbone.View);
    function SelectGeoView() {
      SelectGeoView.__super__.constructor.apply(this, arguments);
      this.el = app.activePage();
    }
    return SelectGeoView;
  })();
  $(document).ready(function() {
    app.currentEntry = new Entry;
    app.currentView = new SecretInputView();
    return app.currentView.render();
  });
  this.app = app;
}).call(this);
