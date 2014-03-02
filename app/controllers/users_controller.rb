class UsersController < ApplicationController

  def create
    existingUser = User.where(uid: user_params["uid"].to_s)
    if existingUser == []
      @user = User.new(user_params)
      @user.provider = "facebook"
      @user.email = "#{user_params}@example.com"
      @user.password = "abcd1234"
      @user.save!
    else
      @user = existingUser
    end
    render json: @user
  end

  private
  def user_params
  params.require(:user).permit(:provider, :uid, :email, :password)
  end

end