class window.Category extends Backbone.Model

class window.Categories extends Backbone.Collection

class window.CategoryView extends Backbone.View
    tagName: "option"

    render: =>
        $(this.el).attr('value', this.model.get('id')).html(this.model.get('name'))

class window.CategoriesView extends Backbone.View
    addOne: (status) =>
        $(this.el).append(new window.CategoryView({ model: status }).render())

    addAll: =>
        this.collection.each(this.addOne)

