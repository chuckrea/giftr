class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.find_for_facebook_oauth(request.env["omniauth.auth"])
    # session[:token] = request.env["omniauth.auth"]["credentials"]["token"]
    # puts request.env
    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication
      set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"]
       redirect_to new_user_registration_url
    end
    
  end
# user_omniauth_authorize_path(:facebook, :display => 'page', :state=>'123') %


end