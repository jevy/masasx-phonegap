class window.User extends Backbone.Model

    localStorage: new Store('UserLocalStore')

    this.currentUser = ->
        # Hack but it works
        return null if (localStorage.length == 0 || localStorage.length == 1)
        full_id = 'UserLocalStore-' + localStorage.getItem('UserLocalStore')
        new_user = new User(JSON.parse(localStorage.getItem(full_id)))
        return new_user

    login: =>
        @save()
        
    logout: =>
        @destroy() 
