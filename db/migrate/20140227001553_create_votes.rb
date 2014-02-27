class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :poll_id
      t.integer :user_id
      t.integer :item_id

      t.timestamps
    end
  end
end
