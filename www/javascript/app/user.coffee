class window.User extends Backbone.Model

    #localStorage: new Store('UserLocalStore')

    this.currentUser = ->
        # Hack but it works
        return null if (localStorage.length == 0 || localStorage.length == 1)
        store_id = window.localStorage.getItem('UserLocalStore')
        full_id = 'UserLocalStore-' + store_id
        user = new User(JSON.parse(window.localStorage.getItem(full_id)))

    login: =>
        @save()
        
    logout: =>
        @destroy() 
