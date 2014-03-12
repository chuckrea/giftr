#Giftr
###http://giftadvisor.herokuapp.com
###Friend Source the perfect gift
Giftr helps you Gift Smartr by allowing mutual friends vote on what they think you should gift to that special someone.

## Technologies used:
- Rails 4
- Backbone.js
- jQuery
- Facebook API
- Facebook SDK
- Customized Facebook Mutual Friend Selector

##Screenshots
<img src="/app/assets/images/giftr_home.png" width="700px">
---
<img src="/app/assets/images/giftr_friend_selector.png" width="700px">
---
##Code Snippets
###Friend Selection:
```
$(".giftee").fSelector({
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
      },
      onClose: function(){
        $('#recipient').attr('src', "http://graph.facebook.com/" + friend_id + "/picture?type=large").attr('width', "180px")
        setTimeout(function(){
          window.location = '/polls#secondPage'
        }, 1200);
        
      }
    });
});
```
