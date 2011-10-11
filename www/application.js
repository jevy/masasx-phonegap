$(function(){
    var UserSecretView = Backbone.View.extend({
        events: {
            "click #entry_submit":      "next"
        },

        el: $('.ui-page-active'),

        next: function() {
            entry.set({ secret: $('#entry_secret').val() });
        }

    });

    var Entry = Backbone.Model.extend({ });

    var App = new UserSecretView;
    var entry = new Entry;
});
