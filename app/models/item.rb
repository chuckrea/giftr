class Item < ActiveRecord::Base

  belongs_to :poll
  has_many :votes
  has_many :images
end
