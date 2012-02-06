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
        options = new FileUploadOptions()
        options.fileName = 'image.jpeg'
        options.mimeType = 'image/jpeg'
        params = new Object()
        params.access_code = "iab6m5"
        options.params = params

        file_uri = @get('file_location')

        user = new User()
        ft = new FileTransfer()
        ft.upload file_uri, 
                  #'http://192.168.1.100:9292/upload', 
                  'http://masasproxy.quickjack.ca/upload', 
                  @uploadSuccess, @uploadFail, options

    uploadSuccess: (r) ->
        alert(r.response)

    uploadFail: (error) ->
        alert('upload failed because: ' + error.code)
