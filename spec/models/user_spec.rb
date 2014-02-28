require 'spec_helper'

describe User do
  describe 'given a user'
    before do
      @user1 = User.create(email: "user@example.com")
    end
    it 'the user should be able to create a poll which will know who created it' do
      @poll = @user1.createPoll({description: 'Necklace for Sally', creator_id: 1, recipient_name: "Sally", recipient_photo: "example.com", recipient_fb_id: 123})
      @poll.creator.should == @user1
      @poll.description.should == 'Necklace for Sally'
    end

end