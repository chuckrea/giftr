require 'spec_helper'

describe User do
  describe 'given a user' do
    before do
      @user1 = User.create!(id: 1, email: "michaelmuse@gmail.com", password: "abcd1234", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 10, current_sign_in_at: "2014-03-01 20:42:37", last_sign_in_at: "2014-02-28 19:52:25", current_sign_in_ip: "127.0.0.1", last_sign_in_ip: "127.0.0.1", created_at: "2014-02-27 19:21:59", updated_at: "2014-03-01 20:42:37", provider: "facebook", uid: "811519", name: "Michael Muse")
    end
    it 'the user should be able to create a poll which will know who created it' do
      @poll = Poll.create({description: 'Necklace for Sally', creator_id: @user1.id, recipient_name: "Sally", recipient_photo: "example.com", recipient_fb_id: 123})
      @poll.creator.should == @user1
      @poll.description.should == 'Necklace for Sally'
    end
  end