class window.GoogleGeolocation extends Backbone.Model

    geocode: ->
        address = @get('street') + ', ' + @get('city') + ', ' + @get('province') + ', CA'
        url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false'
        url = url.replace(/\s/g,"+");
        $.ajax
            type: 'GET'
            url: url
            dataType: 'json'
            success: (data) => @set({latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng})
            async: false
