class Poll < ActiveRecord::Base

  has_many :items, through: :votes
  has_many :voters, through: :votes, source: :user
  has_many :votes
  belongs_to :creator, :class_name => 'User'


  def poll_params
    params.require(:poll).permit(:description, :creator_id, :recipient_name, :recipient_photo, :end_date, :recipient_fb_id)
  end
end
