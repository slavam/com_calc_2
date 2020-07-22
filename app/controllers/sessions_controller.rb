class SessionsController < ApplicationController
  def new
  end
  
  def create
    user = User.find_by(login: params[:session][:login])
    if user && user.authenticate(params[:session][:password])
      # Log the user in and redirect to the user's show page.
      log_in user
      # remember user
      # redirect_to user
      redirect_to root_url 
    else
      flash.now[:danger] = 'Ошибочная login/password комбинация'
      render 'new'
    end
  end
  
  def destroy
    log_out
    redirect_to root_url #login_path #root_url
  end
end
