class window.Certainty extends Backbone.Model

class window.Certainties extends Backbone.Collection

class window.CertaintyView extends Backbone.View
    tagName: "option"

    render: =>
        $(this.el).attr('value', this.model.get('id')).html(this.model.get('name'))

class window.CertaintiesView extends Backbone.View
    addOne: (status) =>
        $(this.el).append(new window.CertaintyView({ model: status }).render())

    addAll: =>
        this.collection.each(this.addOne)

