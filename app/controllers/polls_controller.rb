class PollsController < ApplicationController

  def index
  @poll = Poll.create  
  @render = false
    if session[:token]
      @render = true
    end
  end

  def create
    @item = Item.create(item_params)
    render json: @item
  end

  private

  def poll_params
    params.require(:poll).permit(:description, :end_date)
  end

end