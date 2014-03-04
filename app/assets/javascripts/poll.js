
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

var UserList = Backbone.Collection.extend({
  model: User, 
  url: "/users"
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
    image: "not yet",
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
    console.log("file button clicked")
    e.preventDefault();
    this.handleFileSelect($('#files')[0].files[0]);
    this.resetValues();
    $('#gift-one').remove()
    $('#gift-two').remove()
    $('#gift-three').remove()
  },

  handleFileSelect: function(file) {
    console.log("file select fired")
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        itemsListView.collection.create({
          name: $('#new_item_name_input').val(),
          poll_id: poll.id,
          image: reader.result
        })
      });
      reader.readAsDataURL(file);
  },

  // afterImageIsInDbCallMe: function(img_url){
  //     console.log("i have run")
  //     // lazy-show images after loading
  //     var img = document.createElement('img')
  //     img.src = img_url
  //     img.className = "hiddenImage"
  //     img.onload = function(event){
  //       img.className = ""
  //     }
  //     document.getElementById('item_list').appendChild(img)
  //     return img
  //   },

  resetValues: function() {
    _.each( this.$('input'), function(input){
      $(input).val('');
    })
  },

  el: function() {
    return $('#new_item_form')
  }
  // addFinishButton: function(e){
  //     e.preventDefault;
  //     var html_string = $('#finish_adding_button_template').html();
  //     $('#finish_button_container').append(html_string);
  //   },    

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
    "click .edit": "enterEdit",
    "click [data-action='vote']" : 'vote'
  },
  template: function(attrs){
    html_string = $('#items_template').html();
    // console.log(html_string)
    var template_func = _.template(html_string)
    return template_func(attrs)
  },
  render: function(){
    var self = this;
    this.$el.html(this.template(this.model.attributes));
    this.$el.attr('id', 'item-id-'+this.model.attributes.id)
    // this.$el.attr('class', "hiddenImage")
    var image = this.model.attributes.url
    self.$el.attr('class', 'item col-lg-4 col-md-4')
    // this.$el.html("<i class='fa fa-spinner fa-spin img-spinner'></i>")
    var img = document.createElement('img')
    img.src = image
    img.className = "hiddenImage"
    img.onload = function(event){
      console.log ("onload fired")
        // self.$el.removeClass('hiddenImage')
        // $('.img-spinner').remove();
        self.$el.attr('style', 'background-image:url("'+image+'")')

      }
    return this;

  // afterImageIsInDbCallMe: function(img_url){
  //     console.log("i have run")
  //     // lazy-show images after loading
  //     var img = document.createElement('img')
  //     img.src = img_url
  //     img.className = "hiddenImage"
  //     img.onload = function(event){
  //       img.className = ""
  //     }
  //     document.getElementById('item_list').appendChild(img)
  //     return img
  //   },


    },
  vote: function(){
    // console.log(votes.responseJSON);
    // this.$('button').remove();
    // this.$el.append('<p>You voted for me!</p>');
    var voteditem = voteList.findWhere({user_id: user.id});
    // console.log(this.model.id);
    console.log(voteditem);
    voteditem.attributes.item_id = this.model.id;
    voteditem.save({}, {
        url: "/votes/"+voteditem.id
    });
    console.log(voteList.models)
    appendVotesToItems(voteList.models);
    toggleVoteOption()
  }
})
// var ItemVoteView = Backbone.View.extend({
//   this.collection = new ItemList
//   this.collection.fetch({data: poll.id})
// })

var ItemListView = Backbone.View.extend({
  initialize: function(is_buttons){
    this.is_buttons = is_buttons || false;
    this.collection = new ItemList();
    this.itemViews = []
    this.collection.fetch({data: {poll_id: poll.id}});
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
      self.$el.append(new_view.render().$el)
    })


  }
})

var ItemVoteListView = Backbone.View.extend({
  initialize: function(){
    this.collection = new ItemList();
    this.itemViews = []
    this.collection.fetch({data: {poll_id: poll.id}});
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
      self.$el.append(new_view.render().$el.append("<button class=\"btn btn-lg btn-danger\" data-action='vote'>Vote!</button>"))
    })

  }
})

var Vote = Backbone.Model.extend({
  url: "/votes"
})

var VoteList = Backbone.Collection.extend({
  model: Vote, 
  url: "/votes"
})

// var VoteView = Backbone.View.extend({
//   initialize: function(){
//     this.render();
//   },

//   // template: _.template($('#accomplice-view-template').html()),

//   render: function(){
//     this.$el.html(this.template(this.model.attributes));
//     return this
//   }
// });

var VoteListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.renderVote)
  },

  renderVote: function(vote){
    vote.view = new VoteView({model: vote});
    this.$el.prepend(vote.view.render().el)
    return this
  }
});


var itemSetup = function (options){
  
  // window.pollListView = new PollListView(); 
  // window.pollformView = new PollFormView();
  // window.poll = new Poll();
  // window.pollView = new PollView({model: poll});
  window.itemsListView = new ItemListView(options); 
  window.itemformView = new ItemFormView();
  window.item = new Item();
  // window.itemView = new ItemView({model: item});
  
}


var itemVoteSetup = function (){
  // window.pollListView = new PollListView(); 
  // window.pollformView = new PollFormView();
  // window.poll = new Poll();
  // window.pollView = new PollView({model: poll});
  window.itemVoteListView = new ItemVoteListView(); 
  window.itemformView = new ItemFormView();
  window.item = new Item();
  window.itemView = new ItemView({model: item});
}

var appendVotesToItems = function(votes){
  _.each(votes, function(vote){
    if(vote.attributes.item_id){
      selector = '#' + vote.attributes.id
      $vote_img = $(selector);
      id = vote.attributes.item_id
      $vote_img.appendTo($('#item-id-'+vote.attributes.item_id))
    }
  })
}

var toggleVoteOption = function(){
  $('#item_list button').toggleClass('hidden');
  $('#accomplice-photos button').toggleClass('hidden');
}



