class UsersController < ApplicationController

########### ACCOMPLICE VOTING
  def index
    voters = []
    votes = Vote.where(poll_id: params[:poll_id])
    votes.each do |vote|
      voters << vote.user
    end
    render json: voters
  end


  def create
    existingUser = User.where(uid: user_params["uid"].to_s)
    if existingUser == []
      @user = User.new(user_params)
      @user.provider = "facebook"
      @user.email = "#{user_params}@example.com"
      @user.password = "abcd1234"
      @user.save!
    else
      @user = existingUser[0]
    end
    render json: @user
  end

  private
  def user_params
    params.require(:user).permit(:provider, :uid, :email, :password)
  end

end