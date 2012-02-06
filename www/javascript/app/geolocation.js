(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.GoogleGeolocation = (function() {
    __extends(GoogleGeolocation, Backbone.Model);
    function GoogleGeolocation() {
      GoogleGeolocation.__super__.constructor.apply(this, arguments);
    }
    GoogleGeolocation.prototype.geocode = function() {
      var address, url;
      address = this.get('street') + ', ' + this.get('city') + ', ' + this.get('province') + ', CA';
      url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false';
      url = url.replace(/\s/g, "+");
      return $.ajax({
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
    };
    return GoogleGeolocation;
  })();
}).call(this);
