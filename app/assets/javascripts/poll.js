
var Poll = Backbone.Model.extend({             
  defaults: {
    id: "not yet"
  }
})


var PollList = Backbone.Collection.extend({
  model: Poll, 
  url: "/polls"
})

var PollView = Backbone.View.extend({
  initialize: function(){
    this.render();
  }, 
  events: {
    //may want to add edit and delete later
  }, 
  template: function(attrs){
    html_string = $('#polls_template').html();
    var template_func = _.template(html_string)
    return template_func(attrs)
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this
  },

})

var Item = Backbone.Model.extend({

  defaults: {
    name: "not yet", 
    url: "not yet", 
    // poll_id: poll.get("poll_id")
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
      url: $('#new_item_url_input').val(), 
      poll_id: poll.get("id")
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

  //GOING TO FIX THIS, DONT ERASE
  // create_finish_button: function () {
  //   //if two gifts exist then append button
  //   if (itemsListView.collection.length > 1) {
  //     var finished_adding_gifts_button = $('<button>Finished Adding Gifts</button>')
  //     $('#item_list').append(finished_adding_gifts_button)
  //   }
  // }, 

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
  window.poll = new Poll();
  window.itemsListView = new ItemListView(); 
  window.itemformView = new ItemFormView();
  window.item = new Item();
  window.itemView = new ItemView({model: item});
})
