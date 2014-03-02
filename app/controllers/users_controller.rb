class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    # binding.pry
    @user.provider = "facebook"
    @user.email = "default@gmail.com"
    @user.password = "abcd1234"
    # binding.pry
    @user.save
    render json: @user
  end

  private
  def user_params
  params.require(:user).permit(:provider, :uid, :email, :password)
  end

end