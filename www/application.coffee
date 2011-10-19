
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
            
        alert("Latitude: " + @get('latitude') + " Longitude: " + @get('longitude'))

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
  constructor: ->
    super
    @el = $('div#confirm_geo')
    @delegateEvents()

  render: ->
    $('input#latitude').val(app.currentEntry.get('location').get('latitude'));
    $('input#longitude').val(app.currentEntry.get('location').get('longitude'));
    app.currentView.mapView = new GoogleMapView({model: app.currentEntry.get('location')})
    app.currentView.mapView.plot_on_map

#
# Reusable map view
#

class GoogleMapView extends Backbone.View
    
    @el = $('map_wrapper')

    plot_on_map: ->
      $.mobile.pageLoading();
      map_height = Math.ceil((screenHeight() > 640 ? 640 : screenHeight()) * 0.40);
      map_width = Math.ceil((screenWidth() > 640 ? 640 : screenWidth()) * 0.90);

      img_src = "http://maps.google.com/maps/api/staticmap?center=" + @model.get('latitude') + "," + @model.get('longitude') +
        "&zoom=13&size=" + map_width + "x" + map_height + "&markers=color:blue%7C" + @model.get('latitude') + "," + @model.get('longitude') + "&markers=size:tiny&sensor=false"

      console.log(img_src)

      $('.ui-page-active #map_wrapper').empty();
      $('.ui-page-active #map_wrapper').prepend("<center><img id='map' src=" + img_src + "></center>");
      $('#map_wrapper').width(map_width + 5);
      $('#map_wrapper').height(map_height + 5);
      $.mobile.pageLoading(true);

#
# Start the app
#  

$(document).ready ->
  app.currentEntry = new Entry
  app.currentView = new SecretInputView()
  app.currentView.render()

  #try
  #  netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead")
  
@app = app
