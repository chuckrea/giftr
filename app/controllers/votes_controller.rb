class VotesController < ApplicationController

  def create
    vote = Vote.create(vote_params)
    render json: vote
  end

  def index

    render json: Vote.where(poll_id: params[:poll_id])
  end

  def update
    @vote = Vote.find(params[:id])
    @vote.update_attributes(vote_params)
    render json: @vote     
  end


  def vote_params
    params.require(:vote).permit(:poll_id, :user_id, :item_id, :image_url)
  end
end