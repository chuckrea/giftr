require 'spec_helper'

describe Vote do
  describe 'given a fully set up poll ready for voting' do
    before do
      @voter1 = User.create!(email: "user1@example.com", password: "abcd1234")
      @voter2 = User.create!(email: "user2@example.com", password: "abcd1234")
      @poll_options1 = {description: 'Necklace for Sally', creator_id: 1, recipient_name: "Sally", recipient_photo: "example.com", recipient_fb_id: 123}
      @first_poll = Poll.create(@poll_options1)
      item_options1 = {name: "Shiny Necklace", url: "http://michaelmuse.github.io/test_necklace/", poll_id: @first_poll.id}
      item_options2 = {name: "Beady Necklace", url: "http://michaelmuse.github.io/test_necklace/noimages.html", poll_id: @first_poll.id}
      @item1 = Item.create(item_options1)
      @item2 = Item.create(item_options2)
    end
    it 'a user should be able to vote and a poll should be able to recall them' do
      vote1 = Vote.create(poll_id: @first_poll.id, item_id: @item1.id, user_id: @voter1.id)
      vote2 = Vote.create(poll_id: @first_poll.id, item_id: @item2.id, user_id: @voter2.id)
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