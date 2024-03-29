
#
# Some helper methods
#

app =
  currentEntry: null

  statusMessage: null

  statuses: new window.Statuses([new Status({id: 1, name: 'Test'}), new Status({id: 2, name: 'Actual'})])

  categories: new window.Categories([new Category({id: 1, name: 'Flood', event_code: 'Met'}), new Category({id: 2, name: 'Roadway', event_code: 'Transport'}), new Category({id: 3, name: 'Fire', event_code: 'Fire'})])

  subCategories: new window.SubCategories([new SubCategory({id: 1, name: 'Bridge Closure', category_id: 2, event_code: 'ems/incident/roadway/bridgeClosure'}), new SubCategory({id: 2, name: 'Road Closure', category_id: 2, event_code: 'ems/incident/roadway/roadwayClosure'}), new SubCategory({id: 3, name: 'Road Delay', category_id: 2, event_code: 'ems/incident/roadway/roadwayDelay'}), new SubCategory({id: 4, name: 'High Water Level', category_id: 1, event_code: 'ems/incident/flood/highWater'}), new SubCategory({id: 5, name: 'Overland Flow Flood', category_id: 1, event_code: 'ems/incident/flood/overlandFlowFlood'}), new SubCategory({id: 6, name: 'Wildfire', category_id: 3, event_code: 'ems/incident/fire/wildFire'}), new SubCategory({id: 7, name: 'Urban Fire', category_id: 3, event_code: 'ems/incident/fire/urbanFire'}), new SubCategory({id: 8, name: 'Forest Fire', category_id: 3, event_code: 'ems/incident/fire/forestFire'})])

  severities: new window.Severities([new Severity({id: 1, name: 'Extreme'}), new Severity({id: 2, name: 'Moderate'}), new Severity({id: 3, name: 'Unknown'})])

  certainties: new window.Certainties([new Certainty({id: 1, name: 'Likely'}), new Certainty({id: 2, name: 'Observed'}), new Certainty({id: 3, name: 'Possible'})])

  router: new $.mobile.Router([
                                { "#secret_input": "secret_input" },
                                { "#operation_selection": "operation_selection" },
                                { "#custom_error": "custom_error" },
                                { "#select_geo"  : "select_geo" },
                                { "#confirm_geo" : "confirm_geo" }, 
                                { "#capture_image" : "capture_image" }, 
                                { "#local_map" : {events: 'c', handler: "init_map"} }, 
                                { "#local_map" : {events: 's', handler: "refresh_map"} }, 
                                { "#detail_input": {events: 'bc', handler: "detail_input" } }
                              ],

                                secret_input: (eventType, matchObj, ui, page) -> 
                                                # Required so returning from error, doesn't trigger a route
                                                if (ui.prevPage && ui.prevPage.hasClass("custom_error"))
                                                    return
                                                app.currentView = new SecretInputView()
                                                app.currentView.render()
                                
                                operation_selection: (eventType, matchObj, ui, page) ->
                                                app.currentView = new OperationSelectionView() 
                                                app.currentView.render() 

                                custom_error: (eventType, matchObj, ui, page) -> 
                                                app.currentView = new ErrorView() 
                                                app.currentView.render() 

                                select_geo: (eventType, matchObj, ui, page) -> 
                                                if (ui.prevPage && ui.prevPage.hasClass("custom_error"))
                                                    return
                                                app.currentView = new SelectGeoView()
                                                app.currentView.render()

                                confirm_geo: (eventType, matchObj, ui, page) -> 
                                                if (ui.prevPage && ui.prevPage.hasClass("custom_error"))
                                                    return
                                                app.currentView = new ConfirmGeoView()
                                                app.currentView.render()

                                capture_image: (eventType, matchObj, ui, page) -> 
                                                app.currentView = new CaptureImageView() 
                                                app.currentView.render() 

                                detail_input: (eventType, matchObj, ui, page) -> 
                                                if (ui.prevPage && ui.prevPage.hasClass("custom_error"))
                                                    return
                                                app.currentView = new DetailInputView()
                                                app.currentView.render()
                        
                                init_map:      (eventType, matchObj, ui, page) ->  
                                                app.currentView = new LocalMapView()

                                refresh_map:    (eventType, matchObj, ui, page) ->  
                                                # Assuming currentView is still LocalMapView
                                                app.currentView.render()

                             )

#
# Inputing the MASAS secret
#

class window.SecretInputView extends Backbone.View

  events:
    "click a#next"  : "next"

  constructor: ->
    super
    @el = $('div#secret_input')
    @delegateEvents()

  next: (event) ->
    $.ajax 'https://sandbox2.masas-sics.ca/hub/feed?secret=' + $('#entry_secret').val(),
        async: false,
        statusCode: 
            401: ->
                event.preventDefault()
                event.stopPropagation()
                app.currentEntry.set({error: 'Invalid Access ID'})
                $.mobile.changePage($('#custom_error'))
            302: ->
                event.preventDefault()
                event.stopPropagation()
                app.currentEntry.set({error: 'Invalid Access ID'})
                $.mobile.changePage($('#custom_error'))
            200: ->
                current_user = new User()
                current_user.login($('#entry_secret').val())

#
# Select menu
#

class window.OperationSelectionView extends Backbone.View
  constructor: ->
    super
    @el = $('div#operation_selection')
    app.currentEntry.bind('change', => this.render())
    @delegateEvents()

  render: ->
    $('#status_message').text(app.statusMessage)
    app.statusMessage = null

#
# Selecting how to input the location
#

class window.SelectGeoView extends Backbone.View

  events:
    "click a#manual_geolocate"      : "manual_geolocate"
    "click a#use_current_location"  : "auto_geolocate"

  constructor: ->
    super
    @el = $('div#select_geo')
    @delegateEvents()

  manual_geolocate: ->
    location = new GoogleGeolocation({street: $('input#street').val(), city: $('input#city').val(), province: $('input#province').val()})
    location.geocode()
    app.currentEntry.set({location: location}) # Do geocode
    
  auto_geolocate: ->
    app.currentEntry.autoGeolocate()

#
# Making sure they entered the right location
#

class window.ConfirmGeoView extends Backbone.View

  constructor: ->
    super
    @el = $('div#confirm_geo')
    app.currentEntry.bind('change', => this.render())
    @delegateEvents()

  render: ->
    if app.currentEntry.get('location') 
        $('input#latitude').val(app.currentEntry.get('location').get('latitude'));
        $('input#longitude').val(app.currentEntry.get('location').get('longitude'));
        app.currentView.mapView = new GoogleMapView({model: app.currentEntry.get('location')})
        app.currentView.mapView.render()

#
# Reusable map view
#

class window.GoogleMapView extends Backbone.View
    
    constructor: ->
      super
      @el = $('#map_wrapper')

    render: ->
      map_height = 200 
      map_width = 400

      img_src = "http://maps.googleapis.com/maps/api/staticmap?center=" + @model.get('latitude') + "," + @model.get('longitude') +
        "&zoom=13&size=" + map_width + "x" + map_height + "&markers=color:blue%7C" + @model.get('latitude') + "," + @model.get('longitude') + "&markers=size:tiny&sensor=false"

      @el.empty();
      @el.prepend("<img id='map' src=" + img_src + ">");
      @el.width(map_width + 5);
      @el.height(map_height + 5);

# 
# Used if secret is wrong
#

class window.ErrorView extends Backbone.View
    constructor:  ->
        super

    render: ->
        $('#error_message').text(app.currentEntry.get('error'))
        app.currentEntry.unset('error')

# 
# To capture an image
#

class window.CaptureImageView extends Backbone.View

  events:
    "click a#launch_image_capture" : "capture_image"

  constructor: ->
    super
    @el = $('div#capture_image')
    app.currentEntry.bind('change', => this.render())
    @delegateEvents()

  render: ->
    if app.currentEntry.get('image')
        image = document.getElementById('imagePreview')
        image.src = app.currentEntry.get('image').get('file_location')
        image.style.display = 'block'
    
  capture_image: ->
    app.currentEntry.capture_image()

#
# For category and extra posting information
#

class window.DetailInputView extends Backbone.View

  events:
    "click a#send_to_masas" : "next"
    "change select#category" : "populateSubCategories"

  constructor: ->
    super
    @el = $('div#detail_input')
    @delegateEvents()

  render: ->
    statusesView = new LocationsView({el: $("select#status"), collection: app.statuses})
    statusesView.addAll()
    categoriesView = new LocationsView({el: $("select#category"), collection: app.categories})
    categoriesView.addAll()
    subCategoriesForCategory = app.subCategories.for_category( app.categories.get(parseInt($("select#category option:selected").val())) )
    @subCategoriesView = new LocationsView({el: $("select#subcategory"), collection: new window.SubCategories(subCategoriesForCategory)})
    @subCategoriesView.addAll()
    severitiesView = new LocationsView({el: $("select#severity"), collection: app.severities})
    severitiesView.addAll()
    certaintiesView = new LocationsView({el: $("select#certainty"), collection: app.certainties})
    certaintiesView.addAll()
    
  populateSubCategories: ->
    @subCategoriesView.el.find('option').remove()
    subCategoriesForCategory = app.subCategories.for_category( app.categories.get(parseInt($("select#category option:selected").val())) )
    @subCategoriesView = new LocationsView({el: $("select#subcategory"), collection: new window.SubCategories(subCategoriesForCategory)})
    @subCategoriesView.addAll()
    @subCategoriesView.el.selectmenu("refresh")
    
  next: ->
    app.currentEntry.set({
                          status: app.statuses.get(parseInt($("select#status option:selected").val())), 
                          category: app.categories.get(parseInt($("select#category option:selected").val())), 
                          subcategory: app.subCategories.get(parseInt($("select#subcategory option:selected").val())),
                          severity: app.severities.get(parseInt($("select#severity option:selected").val())),  
                          certainty: app.certainties.get(parseInt($("select#certainty option:selected").val())), 
                          title: $('input#title').val(), 
                          description: $('textarea#entry_content').val()
                        })
    app.currentEntry.postToMasas()
    app.statusMessage = "Successfully posted to MASAS"

class window.LocalMapView extends Backbone.View

  initialize: ->
    @el = $('div#local_map')
    user = new User()
    @feed = new MasasGeoRssFeed('https://sandbox2.masas-sics.ca/hub/feed?lat=45.442&lon=-75.605&radius=500000&secret=' + user.currentUser())
    @feed.bind('change', this.resetGeoRssLayer)
    @feed.saveEntries()
    myOptions = {
          center: new google.maps.LatLng(45.4, -75.6),
          zoom: 9,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    @map = new google.maps.Map(document.getElementById("map_canvas"), myOptions)
				
  render: ->
    $('#map_canvas').height($(window).height()-this.$('div[data-role=header]').height())
    $('#map_canvas').width($(window).width())
    google.maps.event.trigger(@map, 'resize')

  resetGeoRssLayer: =>
    this.plotEntriesOnMap(@map, @feed.entries)

  plotEntriesOnMap: (map, entries) =>
    this.plot(map,entry) for entry in entries 

  plot: (map, entry) ->
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(entry.get('location').get('latitude'),entry.get('location').get('longitude')),
      map: map,
      #title: entry.get('displayHtml'),
      icon: entry.get('icon')
    })

    infowindow = new google.maps.InfoWindow
        content: entry.get('displayHtml')

    google.maps.event.addListener marker, 'click', ->
        infowindow.open(map,marker)
    

#
# Start the app
#  

$(document).ready ->
  app.currentEntry = new Entry({id: 1})

  user = new User()

  # Decide where to start depending if we're logged in
  if user.currentUser() != null
    $.mobile.changePage($('#operation_selection'))
  else
    $.mobile.changePage($('#secret_input'))
  
@app = app
