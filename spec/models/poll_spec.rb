require 'spec_helper'

describe Poll do
  describe 'given two Polls saved to our DB...' do
    before do
      @user1 = User.create(email: "user@example.com")
      @poll_options1 = {description: 'Necklace for Sally', creator_id: 1, recipient_name: "Sally", recipient_photo: "example.com", recipient_fb_id: 123}
      @poll_options2 = {description: 'Hockey jersey for Bill', creator_id: 2, recipient_name: "Bill", recipient_photo: "example.com", recipient_fb_id: 456}
      @first_poll = Poll.create(@poll_options1)
      @second_poll = Poll.create(@poll_options2)
    end
    it 'should have the item saved and return the right values' do
      @polls = Poll.all
      @polls.count.should == 2
      @poll_description_array = [@poll_options1[:description], @poll_options2[:description]]
      @poll_recipients_array = [@poll_options1[:recipient_name], @poll_options2[:recipient_name]]
      @polls.each do |poll|
        expect(@poll_description_array).to include poll.description
        expect(@poll_recipients_array).to include poll.recipient_name
      end
    end
    describe 'given voters for a poll' do
      before do
        @voter1 = User.create(email: "user1@example.com")
        @voter2 = User.create(email: "user2@example.com")
      end
      it 'the creator should be able to assign those users as voters' do
        @user1.assignVoter(@voter1, @first_poll)        
      end
      it 'the poll should know who its voters are' do
        expect(@first_poll.voters).to include @voter1
        expect(@first_poll.voters).to include @voter2
      end
    end
  end
end
