// we want to create a list of items similar to a todo list. each item should get saved to the DB. and then we want to create a poll which will bundle all the items together into one collection of items

var Item = Backbone.Model.extend({
  defaults: {
    name: "not yet", 
    url: "not yet"
  }
})

var ItemFormView = Backbone.View.extend({
  initialize: function(){
    this.render()
  }, 
  render: function(){

  }, 
  events: {
    "click .add_item_button": "addItemToPoll"
  }, 

  addItemToPoll: function(e){
    e.preventDefault();

    itemsListView.collection.create({
      name: $('#new_item_name_input').val(),
      url: $('#new_item_url_input').val()
    });

    this.resetValues();       
  },

  resetValues: function() {
    _.each( this.$('input'), function(input){
      $(input).val('');
    })
  },

  el: function() {
    return $('#new_item_form')
  }

})

var ItemList = Backbone.Collection.extend({
  model: Item, 
  url: "/items"
})

var ItemView = Backbone.View.extend({
  initialize: function(){
    this.render();
  },
  events: {
    "click .delete": "deleteActivity",
    "click .edit": "enterEdit"
  },
  template: function(attrs){
    html_string = $('#items_template').html();
    var template_func = _.template(html_string)
    return template_func(attrs)
  },
  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

})

var ItemListView = Backbone.View.extend({
  initialize: function(){
    this.collection = new ItemList();
    this.itemViews = []

    this.collection.fetch();
    this.listenTo(this.collection, "all", this.render)
  },

  el: function(){
    return $('#item_list')
  }, 

  render: function() {
    var self = this;
    _.each(this.itemViews, function(view){
      view.remove();
    })
    this.itemViews = []
    _.each(this.collection.models, function(item){
      var new_view = new ItemView({
        model: item
      });
      self.itemViews.push(new_view)
      self.$el.prepend(new_view.render().$el)
    })
  }
})

$(function (){
  window.itemsListView = new ItemListView(); 
  window.itemformView = new ItemFormView();
  window.item = new Item();
  window.itemView = new ItemView({model: item});
  

})
