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
      this.el = $('div#secret_input');
      this.delegateEvents();
    }
    SecretInputView.prototype.next = function() {
      alert('next trigger');
      app.currentEntry.set({
        secret: $('#entry_secret').val()
      });
      return app.currentView = new SelectGeoView();
    };
    return SecretInputView;
  })();
  SelectGeoView = (function() {
    __extends(SelectGeoView, Backbone.View);
    SelectGeoView.prototype.events = {
      "click a#manual_geolocate": "manual_geolocate",
      "click a#use_current_location": "auto_geolocate"
    };
    function SelectGeoView() {
      SelectGeoView.__super__.constructor.apply(this, arguments);
      this.el = $('div#select_geo');
      this.delegateEvents();
    }
    SelectGeoView.prototype.manual_geolocate = function() {
      alert('clicked manual button');
      return app.currentEntry.set({
        use_browser_geolocation: false,
        street: $('input#street').val(),
        city: $('input#city').val(),
        province: $('input#province').val()
      });
    };
    SelectGeoView.prototype.auto_geolocate = function() {
      alert('auto locate clicked');
      return app.currentEntry.set({
        use_browser_geolocation: true
      });
    };
    return SelectGeoView;
  })();
  $(document).ready(function() {
    app.currentEntry = new Entry;
    app.currentView = new SecretInputView();
    return app.currentView.render();
  });
  this.app = app;
}).call(this);
