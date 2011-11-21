class window.Entry extends Backbone.Model
    autoGeolocate: ->
        navigator.geolocation.getCurrentPosition(this.autoLocateSuccess, this.autoLocateError, {timeout:10000})

    autoLocateSuccess: (position) =>
        this.set({location: new Geolocation({latitude: position.coords.latitude, longitude: position.coords.longitude})})

    autoLocateError: (error) ->
        alert "#{error.message}"

    postToMasas: ->
        $.ajax({
            type: 'POST',
            url: 'https://sandbox.masas.ca/hub/feed?secret=w99hpn',
            data: this.generate_entry_xml(),
            contentType: 'application/atom+xml'})

    generate_entry_xml: ->
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?><entry xmlns=\"http://www.w3.org/2005/Atom\">" +
            "<category label=\"Status\" scheme=\"http://masas.ca/categories/status\" term=\"#{this.get('status')}\" />" +
            "<category label=\"Severity\" scheme=\"http://masas.ca/categories/severity\" term=\"#{this.get('severity')}\" />" +
            "<category label=\"Certainty\" scheme=\"http://masas.ca/categories/certainty\" term=\"#{this.get('certainty')}\" />" +
            "<category label=\"Category\" scheme=\"http://masas.ca/categories/category\" term=\"#{this.get('category')}\" />" +
            "<category label=\"Icon\" scheme=\"http://masas.ca/categories/icon\" term=\"#{this.get('icon')}\" />" +
            "<title type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">#{this.get('title')}</div></div></title>" +
            "<content type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">#{this.get('description')}</div></div></content>" +
            "<point xmlns=\"http://www.georss.org/georss\">#{this.get('location').get('latitude')} #{this.get('location').get('longitude')}</point>" +
            "<expires xmlns=\"http://purl.org/atompub/age/1.0\">#{this.get('expires')}</expires>" +
            "</entry>"
