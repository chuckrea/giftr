class WelcomeController < ApplicationController

	def index
    if current_user
      redirect_to polls_path
    end

	end

end