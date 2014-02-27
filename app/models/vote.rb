class Vote < ActiveRecord::Base

  belongs_to :poll
  belongs_to :user
  belongs_to :item

  def vote_params
    params.require(:vote).permit(:description, :creator_id, :recipient_name, :recipient_photo, :end_date, :recipient_fb_id)
  end
end
