class PollsController < ApplicationController

  def index
  @polls = Poll.all.order("id")
  @render = false
    if session[:token]
      @render = true
    end
    respond_to do |format|
      format.html
      format.json { render json: @polls}
    end
  end

  def create
    @poll = Poll.create(poll_params)
    render json: @poll
  end

  private

  def poll_params
    params.require(:poll).permit(:creator_id, :recipient_name, :recipient_photo, :recipient_fb_id, :description, :end_date, :created_at, :updated_at)
  end

end