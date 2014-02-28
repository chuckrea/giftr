// var PotentialRecipientView = Backbone.View.extend({
//   render: function(){
//     FB.ui(
//       {method: 'apprequests',
//         message: 'My Great Request',
//         to: []
//       },
//       function(){
//         console.log(arguments)
//       }
//     );
//   }
// })


// function showChoice(){
//   new PotentialRecipientView({el: $('#recipient')}).render();
// }
var muse;
var user_id; 
var friend_id;
var mutual_url;

$(document).ready(function() {  

  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/all.js', function(){
    FB.init({
      appId: '294324634052609',
    });     
    $('#loginbutton,#feedbutton').removeAttr('disabled');
    FB.getLoginStatus($.noop);
  });

  
  $(".bt-fs-dialog").fSelector({
      onSubmit: function(response){
        friend_id = response[0];
        FB.api('/me', function(stuff){
          user_id = stuff.id
          console.log(stuff.id)
          mutual_url = '/' + user_id + '/mutualfriends/' + friend_id
        });

        // mutual_url = '/' + user_id + '/mutualfriends/' + friend_id;

        FB.api('/606833302/mutualfriends/811519',
              function (mutuals) {
                if (mutuals && !mutuals.error) {
                  console.log(mutuals)
                }
        });
      }
    });
});




// function renderMFS() {
//  // First get the list of friends for this user with the Graph API
//  FB.api('/me/friends', function(response) {
//    var container = document.getElementById('mfs');
//    var mfsForm = document.createElement('form');
//    mfsForm.id = 'mfsForm';

//    // Iterate through the array of friends object and create a checkbox for each one.
//    for(var i = 0; i < Math.min(response.data.length, 10); i++) {
//      var friendItem = document.createElement('div');
//      friendItem.id = 'friend_' + response.data[i].id;
//      friendItem.innerHTML = '<input type="checkbox" name="friends" value="'
//        + response.data[i].id
//        + '" />' + response.data[i].name;
//        mfsForm.appendChild(friendItem);
//      }
//      container.appendChild(mfsForm);

//      // Create a button to send the Request(s)
//      var sendButton = document.createElement('input');
//      sendButton.type = 'button';
//      sendButton.value = 'Send Request';
//      sendButton.onclick = sendRequest;
//      mfsForm.appendChild(sendButton);
//    });
//  }







// var PotentialRecipient = Backbone.Model.extend({

// })

// //view for form where user inputs name of gift recipient
// var FormView = Backbone.View.extend({
//   initialize: function(){

//   },

//   render: function() {

//   },

//   events: {
//     "click .search_button" : "createView"
//   },

//   createView: function(e){
//     e.preventDefault();


//   }

// })

// var PotentialRecipientList = Backbone.Collection.extend({
//   model: PotentialRecipient, 
//   url: "/potential_recipients"
// })

// var PotentialRecipientView = Backbone.View.extend({
//   initialize: function(){
//     this.render();
//   }, 

//   events: {
//     "click .show_potential_recipients_button": "showPotentialRecipients"
//   }
//   //html with images
//   template: function(attrs){
//     html_string = $('#potential_recipient_template').html();
//     var template_function = _.template(html_string)
//     return template_function(attrs)
//   }, 

//   render: function(){
//     this.$el.html(this.template(this.model.attributes));
//     return this
//   }, 

//   showPotentialRecipients: function(){
//     recipientListView.collection.add(this.model.attributes)
//     var html_string
//   }

// })