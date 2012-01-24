class window.Image extends Backbone.Model

    defaults:
        "file_location" : null

    initialize: (entry_for_image) ->
        @set({entry: entry_for_image})

    capture: =>
        navigator.camera.getPicture @onPhotoURISuccess, @onFail, 
            quality: 40, destinationType: Camera.DestinationType.FILE_URI

    onFail: (message) =>
        alert('Failed because: ' + message)
    
    onPhotoURISuccess: (imageURI) =>
        @set({file_location: imageURI})
        @get('entry').set({image: this})
