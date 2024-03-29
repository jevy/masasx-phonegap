
#
# Some helper methods
#

app =
  activePage: ->
    $(".ui-page-active")

  screenWidth: ->
    $('body').innerWidth();

  screenHeight: ->
    $('body').innerHeight();

# 
# The model
#

class Entry extends Backbone.Model
    #localStorage: 
    #    new Store("currentModel")

    postToMasas: ->
        alert "Wazzap MASAS"
        false

class Geolocation extends Backbone.Model

    geocode: ->
        address = @get('street') + ', ' + @get('city') + ', ' + @get('province') + ', CA'
        url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false'
        url = url.replace(/\s/g,"+");
        $.ajax
            type: 'GET'
            url: url
            dataType: 'json'
            success: (data) => @set({latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng})
            async: false

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
    app.currentView.render()

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
    location.geocode()
    app.currentEntry.set({location: location}) # Do geocode
    app.currentView = new ConfirmGeoView()
    app.currentView.render()
    
  auto_geolocate: ->
    #location = request_user_location();
    #app.currentEntry.set({location_of_entry: new Geolocation({latitude: location.latitude, longitude: location.longitude})}) # Do geocode
    #app.currentView = new ConfirmGeoView()

#
# Making sure they entered the right location
#

class ConfirmGeoView extends Backbone.View

  events:
    "click a#next"  : "next"

  constructor: ->
    super
    @el = $('div#confirm_geo')
    @delegateEvents()

  render: ->
    $('input#latitude').val(app.currentEntry.get('location').get('latitude'));
    $('input#longitude').val(app.currentEntry.get('location').get('longitude'));
    app.currentView.mapView = new GoogleMapView({model: app.currentEntry.get('location')})
    app.currentView.mapView.render()

  next: ->
    app.currentView = new DetailInputView()
    app.currentView.render()

#
# Reusable map view
#

class GoogleMapView extends Backbone.View
    
    constructor: ->
      super
      @el = $('#map_wrapper')

    render: ->
      map_height = 200 
      map_width = 400
      #map_height = Math.ceil((app.screenHeight() > 640 ? 640 : app.screenHeight()) * 0.40);
      #map_width = Math.ceil((app.screenWidth() > 640 ? 640 : app.screenWidth()) * 0.90);

      img_src = "http://maps.googleapis.com/maps/api/staticmap?center=" + @model.get('latitude') + "," + @model.get('longitude') +
        "&zoom=13&size=" + map_width + "x" + map_height + "&markers=color:blue%7C" + @model.get('latitude') + "," + @model.get('longitude') + "&markers=size:tiny&sensor=false"

      @el.empty();
      @el.prepend("<img id='map' src=" + img_src + ">");
      @el.width(map_width + 5);
      @el.height(map_height + 5);

class DetailInputView extends Backbone.View

  events:
    "click a#submit" : "submit"

  constructor: ->
    super
    @el = $('div#detail_input')

  render: ->
    
  submit: ->
    app.currentEntry.postToMasas

#
# Start the app
#  

$(document).ready ->
  app.currentEntry = new Entry({ id: 1})
  app.currentView = new SecretInputView()
  app.currentView.render()

  #try
  #  netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead")
  
@app = app
