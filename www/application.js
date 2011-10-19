(function() {
  var ConfirmGeoView, Entry, Geolocation, GoogleMapView, SecretInputView, SelectGeoView, app;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
    Geolocation.prototype.geocode = function() {
      var address, url;
      address = this.get('street') + ', ' + this.get('city') + ', ' + this.get('province') + ', CA';
      url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false';
      url = url.replace(/\s/g, "+");
      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: __bind(function(data) {
          return this.set({
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng
          });
        }, this),
        async: false
      });
      return alert("Latitude: " + this.get('latitude') + " Longitude: " + this.get('longitude'));
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
      app.currentView = new SelectGeoView();
      return app.currentView.render();
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
      location.geocode();
      app.currentEntry.set({
        location: location
      });
      app.currentView = new ConfirmGeoView();
      return app.currentView.render();
    };
    SelectGeoView.prototype.auto_geolocate = function() {};
    return SelectGeoView;
  })();
  ConfirmGeoView = (function() {
    __extends(ConfirmGeoView, Backbone.View);
    function ConfirmGeoView() {
      ConfirmGeoView.__super__.constructor.apply(this, arguments);
      this.el = $('div#confirm_geo');
      this.delegateEvents();
    }
    ConfirmGeoView.prototype.render = function() {
      $('input#latitude').val(app.currentEntry.get('location').get('latitude'));
      $('input#longitude').val(app.currentEntry.get('location').get('longitude'));
      app.currentView.mapView = new GoogleMapView({
        model: app.currentEntry.get('location')
      });
      return app.currentView.mapView.plot_on_map;
    };
    return ConfirmGeoView;
  })();
  GoogleMapView = (function() {
    __extends(GoogleMapView, Backbone.View);
    function GoogleMapView() {
      GoogleMapView.__super__.constructor.apply(this, arguments);
    }
    GoogleMapView.el = $('map_wrapper');
    GoogleMapView.prototype.plot_on_map = function() {
      var img_src, map_height, map_width, _ref, _ref2;
      $.mobile.pageLoading();
      map_height = Math.ceil(((_ref = screenHeight() > 640) != null ? _ref : {
        640: screenHeight()
      }) * 0.40);
      map_width = Math.ceil(((_ref2 = screenWidth() > 640) != null ? _ref2 : {
        640: screenWidth()
      }) * 0.90);
      img_src = "http://maps.google.com/maps/api/staticmap?center=" + this.model.get('latitude') + "," + this.model.get('longitude') + "&zoom=13&size=" + map_width + "x" + map_height + "&markers=color:blue%7C" + this.model.get('latitude') + "," + this.model.get('longitude') + "&markers=size:tiny&sensor=false";
      console.log(img_src);
      $('.ui-page-active #map_wrapper').empty();
      $('.ui-page-active #map_wrapper').prepend("<center><img id='map' src=" + img_src + "></center>");
      $('#map_wrapper').width(map_width + 5);
      $('#map_wrapper').height(map_height + 5);
      return $.mobile.pageLoading(true);
    };
    return GoogleMapView;
  })();
  $(document).ready(function() {
    app.currentEntry = new Entry;
    app.currentView = new SecretInputView();
    return app.currentView.render();
  });
  this.app = app;
}).call(this);
