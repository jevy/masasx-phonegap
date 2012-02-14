class window.AttachmentImage extends Backbone.Model

    defaults:
        "file_location" : null

    # Be sure to initialize by assigning an entry that 
    # will be associated with the image
    
    capture: =>
        navigator.camera.getPicture @onPhotoURISuccess, @onFail, 
            quality: 40, destinationType: Camera.DestinationType.FILE_URI

    onFail: (message) =>
        alert('Failed because: ' + message)
    
    onPhotoURISuccess: (imageURI) =>
        @set({file_location: imageURI})
        @get('entry').set({image: this})

    uploadImage: =>
        user = new User()
        options = new FileUploadOptions()
        options.fileName = 'image.jpeg'
        options.mimeType = 'image/jpeg'
        params = new Object()
        params.access_code = user.currentUser()
        options.params = params

        file_uri = @get('file_location')

        user = new User()
        ft = new FileTransfer()
        ft.upload file_uri, 
                  'http://masasproxy.quickjack.ca/upload', 
                  @uploadSuccess, @uploadFail, options

    uploadSuccess: (r) =>
        @get('entry').set({edit_uri:r.response})
        @get('entry').updateOnMasas()

    uploadFail: (error) ->
        alert('upload failed because: ' + error.code)
