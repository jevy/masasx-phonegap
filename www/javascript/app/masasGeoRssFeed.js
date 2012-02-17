(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  window.MasasGeoRssFeed = (function() {
    __extends(MasasGeoRssFeed, Backbone.Model);
    function MasasGeoRssFeed(feedUrl) {
      this.feedUrl = feedUrl;
      this.extractEntries = __bind(this.extractEntries, this);
      this.saveEntries = __bind(this.saveEntries, this);
    }
    MasasGeoRssFeed.prototype.saveEntries = function() {
      return $.get(this.feedUrl, '', this.extractEntries);
    };
    MasasGeoRssFeed.prototype.extractEntries = function(rawXML) {
      var entries, entriesSelectors, entrySelector, _i, _len;
      entriesSelectors = $(rawXML).find("entry:has('point')");
      entries = [];
      for (_i = 0, _len = entriesSelectors.length; _i < _len; _i++) {
        entrySelector = entriesSelectors[_i];
        entries.push(this.extractEntryFromXML(entrySelector));
      }
      this.entries = entries;
      this.change();
      return entries;
    };
    MasasGeoRssFeed.prototype.extractEntryFromXML = function(entrySelector) {
      var displayHtml, entry, iconUrl, location;
      entry = new Entry();
      iconUrl = 'http://icon.masas.ca/' + $(entrySelector).find("category[label=Icon]").attr('term') + '/small.png';
      displayHtml = $($(entrySelector).find("content div[xml\\:lang]")).text();
      location = new GoogleGeolocation({
        latitude: parseFloat($(entrySelector).find('point').text().split(' ')[0]),
        longitude: parseFloat($(entrySelector).find('point').text().split(' ')[1])
      });
      entry.set({
        icon: iconUrl,
        displayHtml: displayHtml,
        location: location
      });
      return entry;
    };
    return MasasGeoRssFeed;
  })();
}).call(this);
