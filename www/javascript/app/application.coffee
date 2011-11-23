
#
# Some helper methods
#

app =
  currentEntry: null
#  activePage: ->
#    $(".ui-page-active")
#
#  screenWidth: ->
#    $('body').innerWidth();
#
#  screenHeight: ->
#    $('body').innerHeight();

# 
# The model
#

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

  next: ->
    app.currentEntry.set({secret: $('#entry_secret').val()})
    app.currentView = new SelectGeoView()
    app.currentView.render()

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
    location = new Geolocation({street: $('input#street').val(), city: $('input#city').val(), province: $('input#province').val()})
    location.geocode()
    app.currentEntry.set({location: location}) # Do geocode
    app.currentView = new ConfirmGeoView()
    app.currentView.render()
    
  auto_geolocate: ->
    app.currentEntry.autoGeolocate()
    app.currentView = new ConfirmGeoView()
    app.currentView.render()

#
# Making sure they entered the right location
#

class window.ConfirmGeoView extends Backbone.View

  events:
    "click a#next"  : "next"

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

  next: ->
    app.currentView = new DetailInputView()
    app.currentView.render()

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

class window.DetailInputView extends Backbone.View

  events:
    "click a#send_to_masas" : "next"
    "change select#category" : "populateSubCategories"

  constructor: ->
    super
    @el = $('div#detail_input')
    @delegateEvents()

  render: ->
    statuses = new window.Statuses([new Status({id: 1, name: 'Test'}), new Status({id: 2, name: 'Actual'})])
    statusesView = new StatusesView({el: $("select#status"), collection: statuses})
    statusesView.addAll()
    categories = new window.Categories([new Category({id: 1, name: 'Flood'}), new Category({id: 2, name: 'Roadway'}), new Category({id: 3, name: 'Fire'})])
    categoriesView = new CategoriesView({el: $("select#category"), collection: categories})
    categoriesView.addAll()
    @subCategories = new window.SubCategories([new SubCategory({id: 1, name: 'Bridge Closure', category_id: 2}), new SubCategory({id: 2, name: 'Road Closure', category_id: 2}), new SubCategory({id: 3, name: 'Road Delay', category_id: 2}), new SubCategory({id: 4, name: 'High Water Level', category_id: 1}), new SubCategory({id: 5, name: 'Overland Flow Flood', category_id: 1}), new SubCategory({id: 6, name: 'Wildfire', category_id: 3}), new SubCategory({id: 7, name: 'Urban Fire', category_id: 3}), new SubCategory({id: 8, name: 'Road Delay', category_id: 3})])
    @subCategoriesView = new SubCategoriesView({el: $("select#subcategory"), collection: @subCategories})
    @subCategoriesView.addAll()
    severities = new window.Severities([new Severity({id: 1, name: 'Extreme'}), new Severity({id: 2, name: 'Moderate'}), new Severity({id: 3, name: 'Unknown'})])
    severitiesView = new SeveritiesView({el: $("select#severity"), collection: severities})
    severitiesView.addAll()
    certainties = new window.Certainties([new Certainty({id: 1, name: 'Likely'}), new Certainty({id: 2, name: 'Observed'}), new Certainty({id: 3, name: 'Possible'})])
    certaintiesView = new CertaintiesView({el: $("select#certainty"), collection: certainties})
    certaintiesView.addAll()
    
  populateSubCategories: ->
    @subCategoriesView.el.find('option').remove()
    subCategoriesForCategory = @subCategories.filter( (category) ->  category.get('category_id') == parseInt($("select#category option:selected").val()) )
    @subCategoriesView = new SubCategoriesView({el: $("select#subcategory"), collection: new window.SubCategories(subCategoriesForCategory)})
    @subCategoriesView.addAll()
    @subCategoriesView.el.selectmenu("refresh")
    
  next: ->
    app.currentEntry.set({
                          status: $("select#status option:selected").text(), 
                          category: $("select#category option:selected").text(), 
                          severity: $("select#severity option:selected").text(),  
                          certainty: $("select#certainty option:selected").text(), 
                          icon: 'incident/roadway', 
                          title: $('input#title').val(), 
                          description: $('textarea#entry_content').val(),
                          expires: '2011-12-19T04:00:00Z'
                        })
    app.currentEntry.postToMasas()

#
# Start the app
#  

$(document).ready ->
  app.currentEntry = new Entry({id: 1})
  app.currentView = new SecretInputView()
  app.currentView.render()

  #try
  #  netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead")
  
@app = app
