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


function resetSelector(){
  $('#fs-user-list').empty();
  

  $("#mutual-friends-link").fSelector({

    max: 5,
    excludeIds: exclusions,
    facebookInvite: false,
    lang: {
      title: "Pick your mutual friends who will vote on the gifts (Last step)",
      buttonSubmit: "Add Accomplices",
      selectedLimitResult: "Limit is {5} people."
    },
    closeOnSubmit: true,
    onSubmit: function(response){
      accomplices = response;
      // console.log(accomplices);
      _.each(accomplices, function(accomplice){
        // console.log(accomplice)
        user = new User({uid: accomplice})
        user.save(null,
          {success: function(response){
            console.log(response.attributes.uid)
            vote = new Vote()
            vote.save({user_id: response.attributes.id, poll_id: poll.id, image_url: "http://graph.facebook.com/" + response.attributes.uid + "/picture"},
              {success: function(response){
              window.location.replace("/polls/"+poll.id)}
            });
          }
        });
      });
      // return accomplices;
    }

  });
};



var mutual_friends_array = [];
var my_friends = [];
var exclusions;
var friend_attrs;
var accomplices;
var recipient_name;
var poll;
var user;
var vote;

$(document).ready(function() {    

  var user_id; 
  var friend_id;
  var mutual_url;

  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/all.js', function(){
    FB.init({
      appId: '294324634052609',
    });     
    $('#loginbutton,#feedbutton').removeAttr('disabled');

    FB.getLoginStatus(function(response){
      user_id = response.authResponse.userID
      FB.api('/me/friends', function(response){
        _.each(response.data, function(friend){
          my_friends.push(parseInt(friend.id))
        });
        
      });
      $(".bt-fs-dialog").click()
    });

  });
  
  $(".bt-fs-dialog").fSelector({
      max: 1,
      facebookInvite: false,
      lang: {
        title: "Pick the friend whom you are buying a gift for (Step 1/3)", 
        buttonSubmit: "Add Gift Recipient", 
        selectedLimitResult: "You can only select one gift recipient at a time."
      },
      closeOnSubmit: true,
      onSubmit: function(response){
        friend_id = response[0];

        mutual_url = '/' + user_id + '/mutualfriends/' + friend_id;
        FB.api( '/'+friend_id, function(response) {
          poll = new Poll({recipient_name: response.name, 
                          recipient_photo: "http://graph.facebook.com/" + friend_id + "/picture?type=large", 
                          recipient_fb_id: friend_id, 
                          description: "This Worked!", 
                          end_date: "not yet"
                        });
          poll.save(null, {success: itemSetup})
          poll.set({url: '/polls/' + this.id});
        });

        // This sets up an array containing ids of mutual friends with your
        // chosen gift recipient.
        // As of now does not work for more than 99 mutual friends
        FB.api(mutual_url, function (mutuals) {
              if (mutuals && !mutuals.error) {
                _.each(mutuals.data, function(friend){
                  mutual_friends_array.push(parseInt(friend.id))
                });
                exclusions = _.difference(my_friends, mutual_friends_array);
              }
            resetSelector();
        });
      }
    });

  // This doesn't totally work yet.  Need to compare mutual friends with your own friends
  // and only return mutuals
  // $("#mutual-friends-link").fSelector({

  //   // max: 5,
  //   excludeIds: exclusions,
  //   // getStoredFriends: mutual_friends_array,
  //   facebookInvite: false,
  //   lang: {
  //     title: "Pick your mutual friends who will vote on the gifts",
  //     buttonSubmit: "Add Accomplices",
  //     selectedLimitResult: "Limit is {5} people."
  //   },
  //   closeOnSubmit: true
  // })
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

