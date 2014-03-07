
var Poll = Backbone.Model.extend({     
  url: "/polls",
  defaults: {
    description: "I just changed this", 
    end_date: "not yet"
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

var Item = Backbone.Model.extend({
  url: '/items',

  defaults: {
    name: "not yet",
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
    "click .edit": "enterEdit",
    "click [data-action='vote']" : 'vote'
  },

  template: function(attrs){
    html_string = $('#items_template').html();
    var template_func = _.template(html_string)
    return template_func(attrs)
  },

  resetValues: function() {
    _.each( $('input'), function(input){
      $(input).val('');
    })
  },

  render: function(){
    var self = this;
    this.$el.html(this.template(this.model.attributes));
    this.$el.attr('id', 'item-id-'+this.model.attributes.id)
    // this.$el.attr('class', "hiddenImage")
    var image = this.model.attributes.url
    self.$el.attr('class', 'item col-lg-3 col-md-3')
    var spinner = $("<i class='fa fa-cog fa-spin img-spinner'></i>")
    this.$el.html(spinner)
    var img = $('<img>');
    img.attr('src', image)
    img.className = "hiddenImage"
    img.load(function(event){
      console.log ("onload fired")
        // self.$el.removeClass('hiddenImage')
        spinner.remove();
        self.$el.attr('style', 'background-image:url("'+image+'")')

      })
    this.resetValues();
    return this;
    },

  vote: function(){
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

var ItemListView = Backbone.View.extend({
  initialize: function(is_buttons){
    this.is_buttons = is_buttons || false;
    this.collection = new ItemList();
    this.itemViews = []
    this.collection.fetch({data: {poll_id: poll.id}});
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
  
  window.itemsListView = new ItemListView(options); 
  window.itemformView = new ItemFormView();
  window.item = new Item();
  
}


var itemVoteSetup = function (){

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



