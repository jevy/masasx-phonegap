class window.MasasGeoRssFeed extends Backbone.Model

  constructor: (@feedUrl) ->

  saveEntries: =>
    $.get(@feedUrl, '', this.extractEntries)

  extractEntries: (rawXML) =>
    #entriesSelectors = $(rawXML).find("entry:has('georss\\:point')")
    entriesSelectors = $(rawXML).find("entry:has('point')")
    entries = []
    entries.push this.extractEntryFromXML entrySelector for entrySelector in entriesSelectors 
    @entries = entries
    @change()
    return entries
    
  extractEntryFromXML: (entrySelector) ->
    entry = new Entry()
    iconUrl = 'http://icon.masas.ca/' + $(entrySelector).find("category[label=Icon]").attr('term') + '/small.png'
    displayHtml = $($(entrySelector).find("content div[xml\\:lang]")).text()
    location = new GoogleGeolocation({
                latitude: parseFloat( $(entrySelector).find('point').text().split(' ')[0] ),
                longitude: parseFloat( $(entrySelector).find('point').text().split(' ')[1] )})
                #latitude: parseFloat( $(entrySelector).find('georss\\:point').text().split(' ')[0] ),
                #longitude: parseFloat( $(entrySelector).find('georss\\:point').text().split(' ')[1] )})
    entry.set({icon: iconUrl, displayHtml: displayHtml, location: location})
    return entry
