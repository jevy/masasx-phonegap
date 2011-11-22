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
      Entry.__super__.constructor.apply(this, arguments);
    }
    Entry.prototype.autoGeolocate = function() {
      alert("Doing geolocation");
      return navigator.geolocation.getCurrentPosition(this.autoLocateSuccess, this.autoLocateError, {
        timeout: 10000
      });
    };
    Entry.prototype.autoLocateSuccess = function(position) {
      alert("Lat: " + position.coords.latitude + "\n Long: " + position.coords.longitude + "\n");
      return this.set({
        location: new Geolocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      });
    };
    Entry.prototype.autoLocateError = function(error) {
      alert("Code: " + error.code + "\n Message: " + error.message + "\n");
      return this.unset(location);
    };
    Entry.prototype.postToMasas = function() {
      return $.ajax({
        type: 'POST',
        url: 'https://sandbox.masas.ca/hub/feed?secret=w99hpn',
        data: this.generate_entry_xml(),
        contentType: 'application/atom+xml'
      });
    };
    Entry.prototype.generate_entry_xml = function() {
      return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><entry xmlns=\"http://www.w3.org/2005/Atom\">" + ("<category label=\"Status\" scheme=\"http://masas.ca/categories/status\" term=\"" + (this.get('status')) + "\" />") + ("<category label=\"Severity\" scheme=\"http://masas.ca/categories/severity\" term=\"" + (this.get('severity')) + "\" />") + ("<category label=\"Certainty\" scheme=\"http://masas.ca/categories/certainty\" term=\"" + (this.get('certainty')) + "\" />") + ("<category label=\"Category\" scheme=\"http://masas.ca/categories/category\" term=\"" + (this.get('category')) + "\" />") + ("<category label=\"Icon\" scheme=\"http://masas.ca/categories/icon\" term=\"" + (this.get('icon')) + "\" />") + ("<title type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">" + (this.get('title')) + "</div></div></title>") + ("<content type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">" + (this.get('description')) + "</div></div></content>") + ("<point xmlns=\"http://www.georss.org/georss\">" + (this.get('location').get('latitude')) + " " + (this.get('location').get('longitude')) + "</point>") + ("<expires xmlns=\"http://purl.org/atompub/age/1.0\">" + (this.get('expires')) + "</expires>") + "</entry>";
    };
    return Entry;
  })();
}).call(this);
