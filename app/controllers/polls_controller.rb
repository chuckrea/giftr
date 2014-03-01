class PollsController < ApplicationController

  def index
  @polls = Poll.all
  @render = false
    if session[:token]
      @render = true
    end
  end

  def create
    @poll = Poll.create(poll_params)
    render json: @poll
  end

  private

  def poll_params
    params.require(:poll).permit(:description, :end_date)
  end

end