require 'spec_helper'

describe Item do
  describe 'given a poll' do
    before do
      @poll_options1 = {description: 'Necklace for Sally', creator_id: 1, recipient_name: "Sally", recipient_photo: "example.com", recipient_fb_id: 123}
      @first_poll = Poll.create(@poll_options1)
      @item_options1 = {name: "Shiny Necklace", url: "http://image1.oasap.com/o_img/2012/03/26/6564-34107-home/shiny-rhinestone-torque-necklace.jpg"}
      @item_options2 = {name: "Beady Necklace", url: "http://www.making-beaded-jewelry.com/images/simple-bead-necklace-21550009.jpg"}
    end
    it 'the poll should be able to create items which know which poll they belong to' do
      @first_poll.createItem(@item_options1)
      @first_poll.createItem(@item_options2)
      Item.all.count.should == 2
      firstItem = Item.all.first
      firstItem.poll.should == @first_poll
    end
  end
end
