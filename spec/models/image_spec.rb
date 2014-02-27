require 'spec_helper'

describe Image do
  describe 'given two items, one with a url with images and one without images' do
    before do
      @item_options1 = {name: "Shiny Necklace", url: ""}
      @item_options2 = {name: "Beady Necklace", url: ""}
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
