(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  window.Entry = (function() {
    __extends(Entry, Backbone.Model);
    function Entry() {
      this.autoLocateError = __bind(this.autoLocateError, this);
      this.autoLocateSuccess = __bind(this.autoLocateSuccess, this);
      this.autoGeolocate = __bind(this.autoGeolocate, this);
      Entry.__super__.constructor.apply(this, arguments);
    }
    Entry.prototype.autoGeolocate = function() {
      return navigator.geolocation.getCurrentPosition(this.autoLocateSuccess, this.autoLocateError, {
        timeout: 10000
      });
    };
    Entry.prototype.autoLocateSuccess = function(position) {
      alert("Found location");
      return this.set({
        location: new Geolocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      });
    };
    Entry.prototype.autoLocateError = function(error) {
      alert("Could not find location");
      return this.unset(location);
    };
    Entry.prototype.postToMasas = function() {
      return $.ajax({
        type: 'POST',
        url: 'https://sandbox2.masas-sics.ca/hub/feed?secret=' + app.currentEntry.get('secret'),
        async: false,
        data: this.generate_entry_xml(),
        contentType: 'application/atom+xml'
      });
    };
    Entry.prototype.generate_entry_xml = function() {
      return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><entry xmlns=\"http://www.w3.org/2005/Atom\">" + ("<category label=\"Status\" scheme=\"masas:category:status\" term=\"" + (this.get('status').get('name')) + "\" />") + ("<category label=\"Severity\" scheme=\"masas:category:severity\" term=\"" + (this.get('severity').get('name')) + "\" />") + ("<category label=\"Certainty\" scheme=\"masas:category:certainty\" term=\"" + (this.get('certainty').get('name')) + "\" />") + ("<category label=\"Category\" scheme=\"masas:category:category\" term=\"" + (this.get('category').get('event_code')) + "\" />") + ("<category label=\"Icon\" scheme=\"masas:category:icon\" term=\"" + (this.get('subcategory').get('event_code')) + "\" />") + ("<title type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">" + (this.get('title')) + "</div></div></title>") + ("<content type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">" + (this.get('description')) + "</div></div></content>") + ("<point xmlns=\"http://www.georss.org/georss\">" + (this.get('location').get('latitude')) + " " + (this.get('location').get('longitude')) + "</point>") + ("<expires xmlns=\"http://purl.org/atompub/age/1.0\">" + (Date.today().add(7).days().toISOString()) + "</expires>") + "</entry>";
    };
    return Entry;
  })();
}).call(this);
