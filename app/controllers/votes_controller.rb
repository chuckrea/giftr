class VotesController < ApplicationController

  def create
    vote = Vote.create(vote_params)
    render json: vote
  end


  def vote_params
    params.require(:vote).permit(:poll_id, :user_id, :item_id)
  end
end