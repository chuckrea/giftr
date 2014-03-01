require 'spec_helper'

describe Item do
  describe 'given a poll' do
    before do
      @poll_options1 = {description: 'Necklace for Sally', creator_id: 1, recipient_name: "Sally", recipient_photo: "example.com", recipient_fb_id: 123}
      @first_poll = Poll.create(@poll_options1)
      @item_options1 = {name: "Shiny Necklace", url: "http://michaelmuse.github.io/test_necklace/", poll_id: @first_poll.id}
      @item1_images_array = ["http://img0.etsystatic.com/043/0/8686010/il_570xN.514784588_v3hl.jpg", "http://img0.etsystatic.com/044/0/8686010/il_570xN.514784590_63s1.jpg", "http://img0.etsystatic.com/034/0/8686010/il_570xN.514784626_pbuv.jpg"]
      @item_options2 = {name: "Beady Necklace", url: "http://michaelmuse.github.io/test_necklace/noimages.html", poll_id: @first_poll.id}
      @item1 = Item.create(@item_options1)
      @item2 = Item.create(@item_options2)
    end
    # it 'the poll should be able to create items which know which poll they belong to' do
    #   @first_poll.createItem(@item_options1)
    #   @first_poll.createItem(@item_options2)
    #   Item.all.count.should == 2
    #   firstItem = Item.all.first
    #   firstItem.poll.should == @first_poll
    # end
    it 'on init the items create images from their urls and know which images are theirs' do
      # item1 = @first_poll.createItem(@item_options1)
      @item1.images.each do |image|
        @item1_images_array.should.include(image.url)
      end
    end
    it 'if there are no images, a default is set' do
      # item2 = @first_poll.createItem(@item_options2)
      @item2.images.first.url.should be_exactly == "public/images/no-image.gif"
    end
  end
end
