(function() {
  var ConfirmGeoView, Entry, Geolocation, GoogleMapView, SecretInputView, SelectGeoView, app;
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
  Geolocation = (function() {
    __extends(Geolocation, Backbone.Model);
    function Geolocation() {
      Geolocation.__super__.constructor.apply(this, arguments);
    }
    Geolocation.prototype.initialize = function() {
      var address, url;
      alert('doing geolocation');
      address = this.get('street') + ', ' + this.get('city') + ', ' + this.get('province') + ', CA';
      url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false';
      url = url.replace(/\s/g, "+");
      return $.getJSON(url, function(data) {
        return alert(data);
      });
    };
    return Geolocation;
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
      var location;
      location = new Geolocation({
        street: $('input#street').val(),
        city: $('input#city').val(),
        province: $('input#province').val()
      });
      return app.currentEntry.set({
        location_of_entry: location
      });
    };
    SelectGeoView.prototype.auto_geolocate = function() {
      var location;
      return location = request_user_location();
    };
    SelectGeoView.prototype.request_user_location = function() {
      return {
        location: {
          latitude: 45.8,
          longitude: -78.3
        }
      };
    };
    return SelectGeoView;
  })();
  ConfirmGeoView = (function() {
    __extends(ConfirmGeoView, Backbone.View);
    function ConfirmGeoView() {
      ConfirmGeoView.__super__.constructor.apply(this, arguments);
      this.el = $('div#confirm_geo');
      this.delegateEvents();
    }
    ConfirmGeoView.prototype.render = function() {};
    return ConfirmGeoView;
  })();
  GoogleMapView = (function() {
    __extends(GoogleMapView, Backbone.View);
    function GoogleMapView() {
      GoogleMapView.__super__.constructor.apply(this, arguments);
    }
    return GoogleMapView;
  })();
  $(document).ready(function() {
    app.currentEntry = new Entry;
    app.currentView = new SecretInputView();
    return app.currentView.render();
  });
  this.app = app;
}).call(this);
