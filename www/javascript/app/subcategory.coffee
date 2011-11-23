class window.SubCategory extends Backbone.Model

class window.SubCategories extends Backbone.Collection
    for_category: (category) ->
        app.subCategories.filter( (subcategory) ->  subcategory.get('category_id') == category.get('id') )
