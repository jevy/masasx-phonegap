class window.User

    currentUser: ->
        localStorage.getItem('currentAccessCode')

    login: (access_code) ->
        localStorage.setItem('currentAccessCode', access_code)
        
    logout: ->
        localStorage.removeItem('currentAccessCode')
