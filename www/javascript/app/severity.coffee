class window.Severity extends Backbone.Model

class window.Severities extends Backbone.Collection

class window.SeverityView extends Backbone.View
    tagName: "option"

    render: =>
        $(this.el).attr('value', this.model.get('id')).html(this.model.get('name'))

class window.SeveritiesView extends Backbone.View
    addOne: (status) =>
        $(this.el).append(new window.SeverityView({ model: status }).render())

    addAll: =>
        this.collection.each(this.addOne)

