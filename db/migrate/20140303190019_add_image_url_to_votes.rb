class AddImageUrlToVotes < ActiveRecord::Migration
  def change
    add_column :votes, :image_url, :string
  end
end
