class window.Status extends Backbone.Model

class window.Statuses extends Backbone.Collection

class window.StatusView extends Backbone.View
    tagName: "option"

    render: =>
        $(this.el).attr('value', this.model.get('id')).html(this.model.get('name'))

class window.StatusesView extends Backbone.View
    addOne: (status) =>
        $(this.el).append(new window.StatusView({ model: status }).render())

    addAll: =>
        this.collection.each(this.addOne)
