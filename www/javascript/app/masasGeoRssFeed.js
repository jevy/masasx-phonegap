(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.MasasGeoRssFeed = (function() {
    function MasasGeoRssFeed(feedUrl) {
      this.feedUrl = feedUrl;
      this.extractEntries = __bind(this.extractEntries, this);
    }
    MasasGeoRssFeed.prototype.extractEntries = function(rawXML) {
      var entries, entriesSelectors, entry, entrySelector, _i, _len;
      entriesSelectors = $(rawXML).find("entry");
      entries = [];
      for (_i = 0, _len = entriesSelectors.length; _i < _len; _i++) {
        entrySelector = entriesSelectors[_i];
        entries.push(this.extractEntryFromXML(entrySelector));
      }
      entry = new Entry();
      return entries;
    };
    MasasGeoRssFeed.prototype.georssLayer = function() {
      var user;
      user = new User();
      return 'https://sandbox2.masas-sics.ca/hub/feed?lat=45.442&lon=-75.605&radius=500000&secret=' + user.currentUser();
    };
    MasasGeoRssFeed.prototype.extractEntryFromXML = function(entrySelector) {
      var displayHtml, entry, iconUrl, location;
      entry = new Entry();
      iconUrl = 'http://icon.masas.ca/' + $(entrySelector).find("category[label=Icon]").attr('term') + '/small.png';
      displayHtml = $($(entrySelector).find("content div[xml\\:lang]")).text();
      location = new GoogleGeolocation({
        latitude: parseFloat($(entrySelector).find('georss\\:point').text().split(' ')[0]),
        longitude: parseFloat($(entrySelector).find('georss\\:point').text().split(' ')[1])
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
