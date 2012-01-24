class window.Image extends Backbone.Model

    defaults:
        "file_location" : null

    capture: ->
        navigator.camera.getPicture @onPhotoURISuccess, @onFail, 
            quality: 40, destinationType: Camera.DestinationType.FILE_URI

    onFail: (message) ->
        alert('Failed because: ' + message)
    
    onPhotoURISuccess: (imageURI) ->
        @file_location = imageURI
