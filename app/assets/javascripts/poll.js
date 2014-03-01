// we want to create a list of items similar to a todo list. each item should get saved to the DB. and then we want to create a poll which will bundle all the items together into one collection of items


var Poll = Backbone.Model.extend({
    defaults: {
      description: "not yet",
      end_date: "not yet"
    }
    // var self = this;
    // var params = {
    //   task: {
    //     "id": self.id,
    //   }
    // }
    // $.ajax({
    //   url: "/polls",
    //   type: "post",
    //   dataType: "json",
    //   data: params,
    //   success: function(data){
    //     // data is the newly created poll that Rails sends back
    //     self.id = data.id;
    //   }
    // })
})

var PollList = Backbone.Collection.extend({
  model: Poll, 
  url: "/polls"
})

// var PollList = Backbone.Collection.extend({
//   model: Poll,  
//   url: "/polls"
// })

// var PollView = Backbone.View.extend({
//   initialize: function(){
//     this.render();
//   }, 
//   events: {
//     //may want to add edit and delete later
//   }, 
//   template: function(attrs){
//     html_string = $('#polls_template').html();
//     var template_func = _.template(html_string)
//     return template_func(attrs)
//   },
//   render: function() {
//     this.$el.html(this.template(this.model.attributes));
//     return this
//   },

//   }

// })


var Item = Backbone.Model.extend({
  defaults: {
    name: "not yet", 
    url: "not yet", 
    poll_id: "not yet"
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
      poll_id: ""
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
  window.polllist = new PollList();
  window.poll = new Poll();
  window.itemsListView = new ItemListView(); 
  window.itemformView = new ItemFormView();
  window.item = new Item();
  window.itemView = new ItemView({model: item});
})
