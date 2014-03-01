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
    @id = @poll.id
    render json: @poll
  end

  private

  def poll_params
    params.require(:poll).permit(:description, :end_date, :id)
  end

end