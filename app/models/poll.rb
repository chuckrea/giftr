class Poll < ActiveRecord::Base

  has_many :items, through: :votes
  has_many :voters, through: :votes, source: :user
  belongs_to :creator, class name :user #need to check this syntax



  def poll_params
    params.require(:poll).permit(:description, :creator_id, :recipient_name, :recipient_photo, :end_date, :recipient_fb_id)
  end
end
