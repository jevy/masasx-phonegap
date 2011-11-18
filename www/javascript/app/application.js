(function() {
  var app;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  app = {
    currentEntry: null
  };
  window.SecretInputView = (function() {
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
  window.SelectGeoView = (function() {
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
  window.ConfirmGeoView = (function() {
    __extends(ConfirmGeoView, Backbone.View);
    ConfirmGeoView.prototype.events = {
      "click a#next": "next"
    };
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
      return app.currentView.mapView.render();
    };
    ConfirmGeoView.prototype.next = function() {
      app.currentView = new DetailInputView();
      return app.currentView.render();
    };
    return ConfirmGeoView;
  })();
  window.GoogleMapView = (function() {
    __extends(GoogleMapView, Backbone.View);
    function GoogleMapView() {
      GoogleMapView.__super__.constructor.apply(this, arguments);
      this.el = $('#map_wrapper');
    }
    GoogleMapView.prototype.render = function() {
      var img_src, map_height, map_width;
      map_height = 200;
      map_width = 400;
      img_src = "http://maps.googleapis.com/maps/api/staticmap?center=" + this.model.get('latitude') + "," + this.model.get('longitude') + "&zoom=13&size=" + map_width + "x" + map_height + "&markers=color:blue%7C" + this.model.get('latitude') + "," + this.model.get('longitude') + "&markers=size:tiny&sensor=false";
      this.el.empty();
      this.el.prepend("<img id='map' src=" + img_src + ">");
      this.el.width(map_width + 5);
      return this.el.height(map_height + 5);
    };
    return GoogleMapView;
  })();
  window.DetailInputView = (function() {
    __extends(DetailInputView, Backbone.View);
    DetailInputView.prototype.events = {
      "click a#submit": "submit"
    };
    function DetailInputView() {
      DetailInputView.__super__.constructor.apply(this, arguments);
      this.el = $('div#detail_input');
    }
    DetailInputView.prototype.render = function() {
      var statuses, statusesView;
      statuses = new window.Statuses([
        new Status({
          id: 4,
          name: 'Test'
        }), new Status({
          id: 1,
          name: 'Actual'
        })
      ]);
      statusesView = new StatusesView({
        el: $("select#status"),
        collection: statuses
      });
      return statusesView.addAll();
    };
    DetailInputView.prototype.submit = function() {
      return app.currentEntry.postToMasas;
    };
    return DetailInputView;
  })();
  $(document).ready(function() {
    app.currentEntry = new Entry({
      id: 1
    });
    app.currentView = new SecretInputView();
    return app.currentView.render();
  });
  this.app = app;
}).call(this);
