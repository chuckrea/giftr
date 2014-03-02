class AddImageColumnToItems < ActiveRecord::Migration
  def change
    add_column :items, :image, :string, default: 'default.jpg'
  end
end
