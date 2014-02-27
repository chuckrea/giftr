class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :url
      t.string :name
      t.integer :poll_id

      t.timestamps
    end
  end
end
