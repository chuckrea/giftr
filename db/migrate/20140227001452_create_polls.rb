class CreatePolls < ActiveRecord::Migration
  def change
    create_table :polls do |t|
      t.integer :creator_id
      t.string :recipient_name
      t.string :recipient_photo
      t.integer :recipient_fb_id
      t.string :description
      t.datetime :end_date

      t.timestamps
    end
  end
end
