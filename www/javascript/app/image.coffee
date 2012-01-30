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

    uploadImage: =>
        alert('About to upload') 
        options = new FileUploadOptions()
        options.fileName = 'image.jpeg'
        options.mimeType = 'image/jpeg'
        file_uri = @get('file_location')

        alert('Passed options') 
        user = new User()
        ft = new FileTransfer()
        ft.upload file_uri, 
                  'https://sandbox2.masas-sics.ca/hub/feed?secret=' + user.currentUser(), 
                  @uploadSuccess, @uploadFail, options
        alert('Done upload') 

    uploadSuccess: (r) ->
        alert(r.response)

    uploadFail: (error) ->
        alert('upload failed because: ' + error.code)
