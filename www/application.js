$(function(){
    UserSecretView = Backbone.View.extend({
        events: {
            "click #entry_submit":      "next"
        },

        el: $('.ui-page-active'),

        next: function() {
            entry.set({ secret: $('#entry_secret').val() });
        }

    });

    Entry = Backbone.Model.extend({ 
          validate: function(attrs) {
            if (attrs.secret.length < 5) {
                return "invalid secret added";
            }
        } 
    });

    var App = new UserSecretView;
    var entry = new Entry;
});
