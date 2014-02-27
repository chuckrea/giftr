class PollsController < ApplicationController

  def index
  @render = false
  if session[:token]
    @render = true
  end
  end

end