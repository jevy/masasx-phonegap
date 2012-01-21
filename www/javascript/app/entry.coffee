class window.Entry extends Backbone.Model

    #defaults:
    #    "status" : app.statuses.first()
    #    "category" : app.categories.first()
    #    "subcategory" : app.subcategory.for_category(app.categories.first())
    #    "severity" : app.severities.first()
    #    "certainty" : app.certainties.first()

    autoGeolocate: =>
        navigator.geolocation.getCurrentPosition(@autoLocateSuccess, @autoLocateError, {timeout:10000})

    autoLocateSuccess: (position) =>
        alert "Found location"
        @set({location: new Geolocation({latitude: position.coords.latitude, longitude: position.coords.longitude})})

    autoLocateError: (error) =>
        alert "Could not find location"
        @unset(location)

    postToMasas: ->
        $.ajax({
            type: 'POST',
            url: 'https://sandbox.masas.ca/hub/feed?secret=w99hpn',
            data: this.generate_entry_xml(),
            contentType: 'application/atom+xml'})

    generate_entry_xml: ->
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?><entry xmlns=\"http://www.w3.org/2005/Atom\">" +
            "<category label=\"Status\" scheme=\"http://masas.ca/categories/status\" term=\"#{this.get('status').get('name')}\" />" +
            "<category label=\"Severity\" scheme=\"http://masas.ca/categories/severity\" term=\"#{this.get('severity').get('name')}\" />" +
            "<category label=\"Certainty\" scheme=\"http://masas.ca/categories/certainty\" term=\"#{this.get('certainty').get('name')}\" />" +
            "<category label=\"Category\" scheme=\"http://masas.ca/categories/category\" term=\"#{this.get('category').get('event_code')}\" />" +
            "<category label=\"Icon\" scheme=\"http://masas.ca/categories/icon\" term=\"#{this.get('subcategory').get('event_code')}\" />" +
            "<title type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">#{this.get('title')}</div></div></title>" +
            "<content type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">#{this.get('description')}</div></div></content>" +
            "<point xmlns=\"http://www.georss.org/georss\">#{this.get('location').get('latitude')} #{this.get('location').get('longitude')}</point>" +
            "<expires xmlns=\"http://purl.org/atompub/age/1.0\">#{Date.today().add(7).days().toISOString()}</expires>" +
            "</entry>"
