
#
# Some helper methods
#

app =
  activePage: ->
    $(".ui-page-active")

# 
# The model
#

class Entry extends Backbone.Model

#
# Inputing the MASAS secret
#

class SecretInputView extends Backbone.View

  events:
    "click a#next"  : "next"

  constructor: ->
    super
    @el = $('div#secret_input')
    @delegateEvents()

  next: ->
    alert('next trigger')
    app.currentEntry.set({secret: $('#entry_secret').val()})
    app.currentView = new SelectGeoView()

#
# Selecting how to input the location
#

class SelectGeoView extends Backbone.View

  events:
    "click a#manual_geolocate"      : "manual_geolocate"
    "click a#use_current_location"  : "auto_geolocate"

  constructor: ->
    super
    @el = $('div#select_geo')
    @delegateEvents()

  manual_geolocate: ->
    alert('clicked manual button')
    app.currentEntry.set({use_browser_geolocation: false, street: $('input#street').val(), city: $('input#city').val(), province: $('input#province').val() })
    
  auto_geolocate: ->
    alert('auto locate clicked')
    app.currentEntry.set({use_browser_geolocation: true})

#
# Start the app
#  

$(document).ready ->
  app.currentEntry = new Entry
  app.currentView = new SecretInputView()
  app.currentView.render()
  
@app = app
