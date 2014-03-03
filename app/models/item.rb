class Item < ActiveRecord::Base

  belongs_to :poll
  has_many :votes
  has_many :images

  mount_uploader :image, ImageUploader
  
end
