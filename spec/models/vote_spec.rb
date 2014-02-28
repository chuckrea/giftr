require 'spec_helper'

describe Vote do
  describe 'given a fully set up poll ready for voting' do
    before do
      @voter1 = User.create(email: "user1@example.com")
      @voter2 = User.create(email: "user2@example.com")
      @poll_options1 = {description: 'Necklace for Sally', creator_id: 1, recipient_name: "Sally", recipient_photo: "example.com", recipient_fb_id: 123}
      @first_poll = Poll.create(@poll_options1)
      item_options1 = {name: "Shiny Necklace", url: "http://michaelmuse.github.io/test_necklace/"}
      item_options2 = {name: "Beady Necklace", url: "http://michaelmuse.github.io/test_necklace/noimages.html"}
      @item1 = @first_poll.createItem(item_options1)
      @item2 = @first_poll.createItem(item_options2)
    end
    it 'a user should be able to vote and a poll should be able to recall them' do
      vote1 = @voter1.voteOnItem(@first_poll, @item1)
      vote2 = @voter2.voteOnItem(@first_poll, @item2)
      @first_poll.votes.length.should == 2
      vote1.user.should == @voter1
      vote2.user.should == @voter2
      vote1.poll.should == @first_poll
      vote2.poll.should == @first_poll
      vote1.item.should == @item1
      vote2.item.should == @item2
    end
  end
end


# in controller
# users.votes << Vote.create(vote_params)

@user_obj = {}
@user_obj["name"] = user.name
vote_arr = user.votes
@user_obj["votes"] = votes_arr
render :json => @user_obj