
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

class Geolocation extends Backbone.Model

    initialize: ->
        alert('doing geolocation')
        address = @get('street') + ', ' + @get('city') + ', ' + @get('province') + ', CA'
        url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false'
        url = url.replace(/\s/g,"+");
        # TODO: Need to implement JSONP pattern to allow for cross site requesting.
        # Google should be a safe place with no XSS
        $.getJSON url, (data) ->
            alert(data)

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
    location = new Geolocation({street: $('input#street').val(), city: $('input#city').val(), province: $('input#province').val()})
    app.currentEntry.set({location_of_entry: location}) # Do geocode
    
  auto_geolocate: ->
    location = request_user_location();
    #app.currentEntry.set({location_of_entry: new Geolocation({latitude: location.latitude, longitude: location.longitude})}) # Do geocode

  request_user_location: ->
    return { location: { latitude: 45.8, longitude: -78.3 } }

#
# Making sure they entered the right location
#

class ConfirmGeoView extends Backbone.View
  constructor: ->
    super
    @el = $('div#confirm_geo')
    @delegateEvents()

  render: ->
    # Pass in Geolocation into a GoogleMapView
    # Draw it


class GoogleMapView extends Backbone.View

#
# Start the app
#  

$(document).ready ->
  app.currentEntry = new Entry
  app.currentView = new SecretInputView()
  app.currentView.render()
  
@app = app
