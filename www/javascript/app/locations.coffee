class window.LocationView extends Backbone.View
    tagName: "option"

    render: =>
        $(this.el).attr('value', this.model.get('id')).html(this.model.get('name'))

class window.LocationsView extends Backbone.View
    addOne: (location) =>
        $(this.el).append(new window.LocationView({ model: location }).render())

    addAll: =>
        this.collection.each(this.addOne)
