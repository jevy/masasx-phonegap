class window.User extends Backbone.Model

    login: =>
        app.userCollection.add(this)
        @save()
        
    logout: =>
        @destroy() 

class window.UserCollection extends Backbone.Collection

    initialize: ->
        @reset()
        
    localStorage: new Store('UserLocalStore')

    currentUser: =>
        @first() || null
