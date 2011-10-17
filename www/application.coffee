
#
# Some helper methods
#

app =
  activePage: ->
    $(".ui-page-active")

#
# Venue class
#

#class Venue extends Backbone.Model
#  getName: ->
#    @get('name')
#    
#  getAddress: ->
#    [@get('address'), @get('city'), @get('state')].join ", "
#    
#  getImageUrl: ->
#    @get('photo_url')
#    
#  getLatitude: ->
#    @get('geolat')
#
#  getLongitude: ->
#    @get('geolong')
#
#  getMapUrl: (width, height) ->
#    width ||= 300
#    height ||= 220
#    
#    "http://maps.google.com/maps/api/staticmap?center=#{@getLatitude()},#{@getLongitude()}&zoom=14&size=#{width}x#{height}&maptype=terrain&markers=color:red|#{@getLatitude()},#{@getLongitude()}&sensor=false"
#    
##
## Venue Collection
##
#
#class VenueCollection extends Backbone.Collection
#  model : Venue
#  
#  constructor: ->
#    super
#    @refresh($FOURSQUARE_JSON)
#  
#this.Venues = new VenueCollection
#
##
## Edit Venue View
##
#
#class EditVenueView extends Backbone.View
#  constructor: ->
#    super
#    
#    # Get the active page from jquery mobile. We need to keep track of what this
#    # dom element is so that we can refresh the page when the page is no longer active.
#    @el = app.activePage()
#    
#    @template = _.template('''
#    <form action="#venue-<%= venue.cid %>-update" method="post">
#
#      <div data-role="fieldcontain">
#        <label>Name</label>
#        <input type="text" value="<%= venue.getName() %>" name="name" />
#      </div>
#      
#      <div data-role="fieldcontain">
#        <label>Address</label>
#        <input type="text" value="<%= venue.get('address') %>" name="address" />
#      </div>
#      
#      <div data-role="fieldcontain">
#        <label>City</label>
#        <input type="text" value="<%= venue.get('city') %>" name="city" />
#      </div>
#      
#      <div data-role="fieldcontain">
#        <label>State</label>
#        <input type="text" value="<%= venue.get('state') %>" name="state" />
#      </div>
#      
#      <button type="submit" data-role="button">Save</button>
#    </form>
#    ''')
#    
#    # Watch for changes to the model and redraw the view
#    @model.bind 'change', @render
#    
#    # Draw the view
#    @render()
#    
#  events : {
#    "submit form" : "onSubmit"
#  }
#
#  onSubmit: (e) ->
#    @model.set {
#      name : @$("input[name='name']").val(),
#      address : @$("input[name='address']").val(),
#      city : @$("input[name='city']").val(),
#      state : @$("input[name='state']").val()
#    }
#    
#    @model.trigger('change')
#
#    app.goBack()
#    
#    e.preventDefault()
#    e.stopPropagation()
#
#  render: =>
#    # Set the name of the page
#    @el.find('h1').text("Editing #{@model.getName()}")
#    
#    # Render the content
#    @el.find('.ui-content').html(@template({venue : @model}))
#
#    # A hacky way of reapplying the jquery mobile styles
#    app.reapplyStyles(@el)
#
#    # Delegate from the events hash
#    @delegateEvents()
#
##
## Show Venue View
##
#
#class ShowVenueView extends Backbone.View
#  constructor: ->
#    super
#    
#    # Get the active page from jquery mobile. We need to keep track of what this
#    # dom element is so that we can refresh the page when the page is no longer active.
#    @el = app.activePage()
#    
#    @template = _.template('''
#      <div>
#        
#        <p>
#          <img style="width: 100%" src="<%= venue.getMapUrl() %>" />
#        </p>
#        
#        <address>
#          <%= venue.getAddress() %>
#        </address>
#      
#        <ul data-role="listview" data-inset="true">
#          <li data-role="list-divider">Actions</li>
#          <li><a rel="external" href="openmap:q=<%= encodeURIComponent(venue.getAddress) %>">Open Map</li>
#          <li><a href="#venues-<%= venue.cid %>-edit">Edit</a></li>
#        </ul>
#      </div>
#    ''')
#    
#    # Watch for changes to the model and redraw the view
#    @model.bind 'change', @render
#    
#    # Draw the view
#    @render()
#    
#  render: =>
#    # Set the name of the page
#    @el.find('h1').text(@model.getName())
#    
#    # Render the content
#    @el.find('.ui-content').html(@template({venue : @model}))
#
#    # A hacky way of reapplying the jquery mobile styles
#    app.reapplyStyles(@el)
#  
  
class Entry extends Backbone.Model

class SecretInputView extends Backbone.View

  events:
    "click a#next"  : "next"

  constructor: ->
    super
    
    @el = app.activePage()

  render: ->
    @delegateEvents()

  next: ->
    app.currentEntry.set({secret: $('#entry_secret').val()})

class SelectGeoView extends Backbone.View
  constructor: ->
    super
    
    @el = app.activePage()
    
#
# Start the app
#  

$(document).ready ->
  app.currentEntry = new Entry
  app.currentView = new SecretInputView()
  app.currentView.render()
  
@app = app
