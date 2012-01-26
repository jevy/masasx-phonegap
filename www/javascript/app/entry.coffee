class window.Entry extends Backbone.Model

    autoGeolocate: =>
        navigator.geolocation.getCurrentPosition(@autoLocateSuccess, @autoLocateError, {timeout:10000})

    autoLocateSuccess: (position) =>
        alert "Found location"
        @set({location: new Geolocation({latitude: position.coords.latitude, longitude: position.coords.longitude})})

    autoLocateError: (error) =>
        alert "Could not find location"
        @unset(location)

    capture_image: =>
        new_image = new Image(this)
        new_image.capture()

    postToMasas: =>
        if @get('image')
            @get('image').uploadImage()

        else
            $.ajax({
                type: 'POST',
                url: 'https://sandbox2.masas-sics.ca/hub/feed?secret=' + app.currentAccessCode,
                async: false,
                data: this.generate_entry_xml(),
                contentType: 'application/atom+xml'})

    generate_entry_xml: ->
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?><entry xmlns=\"http://www.w3.org/2005/Atom\">" +
            "<category label=\"Status\" scheme=\"masas:category:status\" term=\"#{this.get('status').get('name')}\" />" +
            "<category label=\"Severity\" scheme=\"masas:category:severity\" term=\"#{this.get('severity').get('name')}\" />" +
            "<category label=\"Certainty\" scheme=\"masas:category:certainty\" term=\"#{this.get('certainty').get('name')}\" />" +
            "<category label=\"Category\" scheme=\"masas:category:category\" term=\"#{this.get('category').get('event_code')}\" />" +
            "<category label=\"Icon\" scheme=\"masas:category:icon\" term=\"#{this.get('subcategory').get('event_code')}\" />" +
            "<title type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">#{this.get('title')}</div></div></title>" +
            "<content type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">#{this.get('description')}</div></div></content>" +
            "<point xmlns=\"http://www.georss.org/georss\">#{this.get('location').get('latitude')} #{this.get('location').get('longitude')}</point>" +
            "<expires xmlns=\"http://purl.org/atompub/age/1.0\">#{Date.today().add(7).days().toISOString()}</expires>" +
            "</entry>"
