class window.SubCategory extends Backbone.Model

class window.SubCategories extends Backbone.Collection

class window.SubCategoryView extends Backbone.View
    tagName: "option"

    render: =>
        $(this.el).attr('value', this.model.get('id')).html(this.model.get('name'))

class window.SubCategoriesView extends Backbone.View
    addOne: (status) =>
        $(this.el).append(new window.SubCategoryView({ model: status }).render())

    addAll: =>
        this.collection.each(this.addOne)
