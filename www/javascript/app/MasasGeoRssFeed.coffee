class window.MasasGeoRssFeed 

  constructor: (@feedUrl) ->

  extractEntries: (rawXML) =>
    entriesSelectors = $(rawXML).find( "entry" )
    entries = []
    entries.push this.extractEntryFromXML entrySelector for entrySelector in entriesSelectors 
    entry = new Entry()
    return entries
    
  georssLayer: ->
    user = new User()
    'https://sandbox2.masas-sics.ca/hub/feed?lat=45.442&lon=-75.605&radius=500000&secret=' + user.currentUser()

  extractEntryFromXML: (entrySelector) ->
    entry = new Entry()
    iconUrl = 'http://icon.masas.ca/' + $(entrySelector).find("category[label=Icon]").attr('term') + '/small.png'
    displayHtml = $($(entrySelector).find("content div[xml\\:lang]")).text()
    location = new GoogleGeolocation({
                latitude: parseFloat( $(entrySelector).find('georss\\:point').text().split(' ')[0] ),
                longitude: parseFloat( $(entrySelector).find('georss\\:point').text().split(' ')[1] )})
    entry.set({icon: iconUrl, displayHtml: displayHtml, location: location})
    return entry
