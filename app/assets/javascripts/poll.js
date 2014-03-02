
var Poll = Backbone.Model.extend({     
  url: "/polls",
  defaults: {
    description: "I just changed this", 
    end_date: "not yet", 
    // poll_id: poll.get("poll_id")
  }        
 
})

var User = Backbone.Model.extend({
  url: "/users",
  defaults: {
    // provider: "facebook", 
    // uid: "",
    // email: "default@gmail.com", 
    // password: "abcd1234"
  }
})


// var PollFormView = Backbone.View.extend({
//   initialize: function(){
//     this.render()
//   }, 
//   render: function(){

//   }, 
//   events: {
//     "click .add_item_button": "addPoll"
//   }, 
//   //trying to create poll when add gift clicked but only if poll does not already exist
//   addPoll: function(e){
//     e.preventDefault();
//     // trying to only create poll once with below conditional
//     // if (typeof poll !== 'undefined') {
//     //   console.log("poll already exists")
//     // } else {
//       console.log("creating poll")
//       console.log(pollListView.collection)
//       pollListView.collection.create({ 
//         description: "not yet", 
//         end_date: "not yet"
//     }); 
//     // }
//     },

//   el: function() {
//     return $('#new_item_form')
//   }
// })

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

// })

// var PollListView = Backbone.View.extend({
//   initialize: function(){
//     this.collection = new PollList();
//     // this.itemViews = []

//     this.collection.fetch();
//     this.listenTo(this.collection, "all", this.render)
//   },

//   el: function(){
//     return $('#item_list')
//   }, 

//   render: function() {

//     // var self = this;
//     // _.each(this.itemViews, function(view){
//     //   view.remove();
//     // })
//     // this.itemViews = []
//     _.each(this.collection.models, function(poll){
//       var new_view = new PollView({
//         model: poll
//       });
//       // self.itemViews.push(new_view)
//       // self.$el.prepend(new_view.render().$el)
//     })

//   }
// })

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
    "click .add_item_button": "addItemToPoll",
    // "click .add_item_button": "addFinishButton"
  }, 

  addItemToPoll: function(e){
    e.preventDefault();

    itemsListView.collection.create({
      name: $('#new_item_name_input').val(),
      url: $('#new_item_url_input').val(), 
      poll_id: poll.id
    })
    this.resetValues();
  },

  // addFinishButton: function(e){
  //     e.preventDefault;
  //     var html_string = $('#finish_adding_button_template').html();
  //     $('#finish_button_container').append(html_string);
  //   },    

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

    this.collection.fetch(data: {poll_id: poll.id});
    this.listenTo(this.collection, "all", this.render)
  },

  // GOING TO FIX THIS, DONT ERASE
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

var Vote = Backbone.Model.extend({
  url: '/votes'
})



$(function (){
  // window.pollListView = new PollListView(); 
  // window.pollformView = new PollFormView();
  // window.poll = new Poll();
  // window.pollView = new PollView({model: poll});
  window.itemsListView = new ItemListView(); 
  window.itemformView = new ItemFormView();
  window.item = new Item();
  window.itemView = new ItemView({model: item});
})
