(function() {
  var app;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  app = {
    currentEntry: null,
    statusMessage: null,
    statuses: new window.Statuses([
      new Status({
        id: 1,
        name: 'Test'
      }), new Status({
        id: 2,
        name: 'Actual'
      })
    ]),
    categories: new window.Categories([
      new Category({
        id: 1,
        name: 'Flood',
        event_code: 'Met'
      }), new Category({
        id: 2,
        name: 'Roadway',
        event_code: 'Transport'
      }), new Category({
        id: 3,
        name: 'Fire',
        event_code: 'Fire'
      })
    ]),
    subCategories: new window.SubCategories([
      new SubCategory({
        id: 1,
        name: 'Bridge Closure',
        category_id: 2,
        event_code: 'ems/incident/roadway/bridgeClosure'
      }), new SubCategory({
        id: 2,
        name: 'Road Closure',
        category_id: 2,
        event_code: 'ems/incident/roadway/roadwayClosure'
      }), new SubCategory({
        id: 3,
        name: 'Road Delay',
        category_id: 2,
        event_code: 'ems/incident/roadway/roadwayDelay'
      }), new SubCategory({
        id: 4,
        name: 'High Water Level',
        category_id: 1,
        event_code: 'ems/incident/flood/highWater'
      }), new SubCategory({
        id: 5,
        name: 'Overland Flow Flood',
        category_id: 1,
        event_code: 'ems/incident/flood/overlandFlowFlood'
      }), new SubCategory({
        id: 6,
        name: 'Wildfire',
        category_id: 3,
        event_code: 'ems/incident/fire/wildFire'
      }), new SubCategory({
        id: 7,
        name: 'Urban Fire',
        category_id: 3,
        event_code: 'ems/incident/fire/urbanFire'
      }), new SubCategory({
        id: 8,
        name: 'Forest Fire',
        category_id: 3,
        event_code: 'ems/incident/fire/forestFire'
      })
    ]),
    severities: new window.Severities([
      new Severity({
        id: 1,
        name: 'Extreme'
      }), new Severity({
        id: 2,
        name: 'Moderate'
      }), new Severity({
        id: 3,
        name: 'Unknown'
      })
    ]),
    certainties: new window.Certainties([
      new Certainty({
        id: 1,
        name: 'Likely'
      }), new Certainty({
        id: 2,
        name: 'Observed'
      }), new Certainty({
        id: 3,
        name: 'Possible'
      })
    ]),
    router: new $.mobile.Router([
      {
        "#secret_input": "secret_input"
      }, {
        "#operation_selection": "operation_selection"
      }, {
        "#custom_error": "custom_error"
      }, {
        "#select_geo": "select_geo"
      }, {
        "#confirm_geo": "confirm_geo"
      }, {
        "#capture_image": "capture_image"
      }, {
        "#local_map": {
          events: 'c',
          handler: "init_map"
        }
      }, {
        "#local_map": {
          events: 's',
          handler: "refresh_map"
        }
      }, {
        "#detail_input": {
          events: 'bc',
          handler: "detail_input"
        }
      }
    ], {
      secret_input: function(eventType, matchObj, ui, page) {
        if (ui.prevPage && ui.prevPage.hasClass("custom_error")) {
          return;
        }
        app.currentView = new SecretInputView();
        return app.currentView.render();
      },
      operation_selection: function(eventType, matchObj, ui, page) {
        app.currentView = new OperationSelectionView();
        return app.currentView.render();
      },
      custom_error: function(eventType, matchObj, ui, page) {
        app.currentView = new ErrorView();
        return app.currentView.render();
      },
      select_geo: function(eventType, matchObj, ui, page) {
        if (ui.prevPage && ui.prevPage.hasClass("custom_error")) {
          return;
        }
        app.currentView = new SelectGeoView();
        return app.currentView.render();
      },
      confirm_geo: function(eventType, matchObj, ui, page) {
        if (ui.prevPage && ui.prevPage.hasClass("custom_error")) {
          return;
        }
        app.currentView = new ConfirmGeoView();
        return app.currentView.render();
      },
      capture_image: function(eventType, matchObj, ui, page) {
        app.currentView = new CaptureImageView();
        return app.currentView.render();
      },
      detail_input: function(eventType, matchObj, ui, page) {
        if (ui.prevPage && ui.prevPage.hasClass("custom_error")) {
          return;
        }
        app.currentView = new DetailInputView();
        return app.currentView.render();
      },
      init_map: function(eventType, matchObj, ui, page) {
        return app.currentView = new LocalMapView();
      },
      refresh_map: function(eventType, matchObj, ui, page) {
        return app.currentView.render();
      }
    })
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
    SecretInputView.prototype.next = function(event) {
      return $.ajax('https://sandbox2.masas-sics.ca/hub/feed?secret=' + $('#entry_secret').val(), {
        async: false,
        statusCode: {
          401: function() {
            event.preventDefault();
            event.stopPropagation();
            app.currentEntry.set({
              error: 'Invalid Access ID'
            });
            return $.mobile.changePage($('#custom_error'));
          },
          302: function() {
            event.preventDefault();
            event.stopPropagation();
            app.currentEntry.set({
              error: 'Invalid Access ID'
            });
            return $.mobile.changePage($('#custom_error'));
          },
          200: function() {
            var current_user;
            current_user = new User();
            return current_user.login($('#entry_secret').val());
          }
        }
      });
    };
    return SecretInputView;
  })();
  window.OperationSelectionView = (function() {
    __extends(OperationSelectionView, Backbone.View);
    function OperationSelectionView() {
      OperationSelectionView.__super__.constructor.apply(this, arguments);
      this.el = $('div#operation_selection');
      app.currentEntry.bind('change', __bind(function() {
        return this.render();
      }, this));
      this.delegateEvents();
    }
    OperationSelectionView.prototype.render = function() {
      $('#status_message').text(app.statusMessage);
      return app.statusMessage = null;
    };
    return OperationSelectionView;
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
      location = new GoogleGeolocation({
        street: $('input#street').val(),
        city: $('input#city').val(),
        province: $('input#province').val()
      });
      location.geocode();
      return app.currentEntry.set({
        location: location
      });
    };
    SelectGeoView.prototype.auto_geolocate = function() {
      return app.currentEntry.autoGeolocate();
    };
    return SelectGeoView;
  })();
  window.ConfirmGeoView = (function() {
    __extends(ConfirmGeoView, Backbone.View);
    function ConfirmGeoView() {
      ConfirmGeoView.__super__.constructor.apply(this, arguments);
      this.el = $('div#confirm_geo');
      app.currentEntry.bind('change', __bind(function() {
        return this.render();
      }, this));
      this.delegateEvents();
    }
    ConfirmGeoView.prototype.render = function() {
      if (app.currentEntry.get('location')) {
        $('input#latitude').val(app.currentEntry.get('location').get('latitude'));
        $('input#longitude').val(app.currentEntry.get('location').get('longitude'));
        app.currentView.mapView = new GoogleMapView({
          model: app.currentEntry.get('location')
        });
        return app.currentView.mapView.render();
      }
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
  window.ErrorView = (function() {
    __extends(ErrorView, Backbone.View);
    function ErrorView() {
      ErrorView.__super__.constructor.apply(this, arguments);
    }
    ErrorView.prototype.render = function() {
      $('#error_message').text(app.currentEntry.get('error'));
      return app.currentEntry.unset('error');
    };
    return ErrorView;
  })();
  window.CaptureImageView = (function() {
    __extends(CaptureImageView, Backbone.View);
    CaptureImageView.prototype.events = {
      "click a#launch_image_capture": "capture_image"
    };
    function CaptureImageView() {
      CaptureImageView.__super__.constructor.apply(this, arguments);
      this.el = $('div#capture_image');
      app.currentEntry.bind('change', __bind(function() {
        return this.render();
      }, this));
      this.delegateEvents();
    }
    CaptureImageView.prototype.render = function() {
      var image;
      if (app.currentEntry.get('image')) {
        image = document.getElementById('imagePreview');
        image.src = app.currentEntry.get('image').get('file_location');
        return image.style.display = 'block';
      }
    };
    CaptureImageView.prototype.capture_image = function() {
      return app.currentEntry.capture_image();
    };
    return CaptureImageView;
  })();
  window.DetailInputView = (function() {
    __extends(DetailInputView, Backbone.View);
    DetailInputView.prototype.events = {
      "click a#send_to_masas": "next",
      "change select#category": "populateSubCategories"
    };
    function DetailInputView() {
      DetailInputView.__super__.constructor.apply(this, arguments);
      this.el = $('div#detail_input');
      this.delegateEvents();
    }
    DetailInputView.prototype.render = function() {
      var categoriesView, certaintiesView, severitiesView, statusesView, subCategoriesForCategory;
      statusesView = new LocationsView({
        el: $("select#status"),
        collection: app.statuses
      });
      statusesView.addAll();
      categoriesView = new LocationsView({
        el: $("select#category"),
        collection: app.categories
      });
      categoriesView.addAll();
      subCategoriesForCategory = app.subCategories.for_category(app.categories.get(parseInt($("select#category option:selected").val())));
      this.subCategoriesView = new LocationsView({
        el: $("select#subcategory"),
        collection: new window.SubCategories(subCategoriesForCategory)
      });
      this.subCategoriesView.addAll();
      severitiesView = new LocationsView({
        el: $("select#severity"),
        collection: app.severities
      });
      severitiesView.addAll();
      certaintiesView = new LocationsView({
        el: $("select#certainty"),
        collection: app.certainties
      });
      return certaintiesView.addAll();
    };
    DetailInputView.prototype.populateSubCategories = function() {
      var subCategoriesForCategory;
      this.subCategoriesView.el.find('option').remove();
      subCategoriesForCategory = app.subCategories.for_category(app.categories.get(parseInt($("select#category option:selected").val())));
      this.subCategoriesView = new LocationsView({
        el: $("select#subcategory"),
        collection: new window.SubCategories(subCategoriesForCategory)
      });
      this.subCategoriesView.addAll();
      return this.subCategoriesView.el.selectmenu("refresh");
    };
    DetailInputView.prototype.next = function() {
      app.currentEntry.set({
        status: app.statuses.get(parseInt($("select#status option:selected").val())),
        category: app.categories.get(parseInt($("select#category option:selected").val())),
        subcategory: app.subCategories.get(parseInt($("select#subcategory option:selected").val())),
        severity: app.severities.get(parseInt($("select#severity option:selected").val())),
        certainty: app.certainties.get(parseInt($("select#certainty option:selected").val())),
        title: $('input#title').val(),
        description: $('textarea#entry_content').val()
      });
      app.currentEntry.postToMasas();
      return app.statusMessage = "Successfully posted to MASAS";
    };
    return DetailInputView;
  })();
  window.LocalMapView = (function() {
    __extends(LocalMapView, Backbone.View);
    function LocalMapView() {
      this.plotEntriesOnMap = __bind(this.plotEntriesOnMap, this);
      this.resetGeoRssLayer = __bind(this.resetGeoRssLayer, this);
      LocalMapView.__super__.constructor.apply(this, arguments);
    }
    LocalMapView.prototype.initialize = function() {
      var myOptions, user;
      this.el = $('div#local_map');
      user = new User();
      this.feed = new MasasGeoRssFeed('https://sandbox2.masas-sics.ca/hub/feed?lat=45.442&lon=-75.605&radius=500000&secret=' + user.currentUser());
      this.feed.bind('change', this.resetGeoRssLayer);
      this.feed.saveEntries();
      myOptions = {
        center: new google.maps.LatLng(45.4, -75.6),
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      return this.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    };
    LocalMapView.prototype.render = function() {
      $('#map_canvas').height($(window).height() - this.$('div[data-role=header]').height());
      $('#map_canvas').width($(window).width());
      return google.maps.event.trigger(this.map, 'resize');
    };
    LocalMapView.prototype.resetGeoRssLayer = function() {
      return this.plotEntriesOnMap(this.map, this.feed.entries);
    };
    LocalMapView.prototype.plotEntriesOnMap = function(map, entries) {
      var entry, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = entries.length; _i < _len; _i++) {
        entry = entries[_i];
        _results.push(this.plot(map, entry));
      }
      return _results;
    };
    LocalMapView.prototype.plot = function(map, entry) {
      var infowindow, marker;
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(entry.get('location').get('latitude'), entry.get('location').get('longitude')),
        map: map,
        icon: entry.get('icon')
      });
      infowindow = new google.maps.InfoWindow({
        content: entry.get('displayHtml')
      });
      return google.maps.event.addListener(marker, 'click', function() {
        return infowindow.open(map, marker);
      });
    };
    return LocalMapView;
  })();
  $(document).ready(function() {
    var user;
    app.currentEntry = new Entry({
      id: 1
    });
    user = new User();
    if (user.currentUser() !== null) {
      return $.mobile.changePage($('#operation_selection'));
    } else {
      return $.mobile.changePage($('#secret_input'));
    }
  });
  this.app = app;
}).call(this);
