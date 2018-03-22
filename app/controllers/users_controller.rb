class UsersController < ApplicationController
  # before_action :require_admin, :except => :show
  before_action :find_user, only: [:show, :edit, :update, :destroy]
  def index
    @users = User.all.order(:login)
  end
  
  def show
    @flats = @user.flats
  end

  def new
    @user = User.new
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      flash[:success] = "Новый пользователь успешно создан"
      redirect_to @user
    else
      render 'new'
    end
  end
  
  def edit
  end

  def update
    if not @user.update_attributes user_params
      render :action => :edit
    else
      redirect_to users_path
    end
  end
  
  def destroy
    @user.destroy
    flash[:success] = "Пользователь удален"
    redirect_to users_path
  end
  
  private

    def user_params
      params.require(:user).permit(:login, :first_name, :last_name, :middle_name, :email, :password, :password_confirmation) #, :role)
    end
    
    def find_user
      @user = User.find(params[:id])
    end
end
