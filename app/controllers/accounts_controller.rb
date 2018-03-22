class AccountsController < ApplicationController
  before_action :set_flat, only: [:index, :new, :create, :show, :edit, :update, :destroy]
  before_action :set_utility, only: [:show, :edit, :update, :destroy]
  
  def index
    @accounts = @flat.accounts.order(:id)
    @utilities = @flat.utilities.order(:id)
    @categories = Category.active_categories
    @tariffs = Tariff.all
  end
  
  def create
    @account = @flat.accounts.build(account_params)

    if @account.save
      render json: {accounts: @flat.accounts.order(:id)}
    else
      render json: @account.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @account.destroy
    # flash[:success] = "Услуга удалена"
    render json: {accounts: @flat.accounts.order(:start_date).reverse_order}
  end
  
  private
    def set_flat
      @flat = Flat.find(params[:flat_id])
    end
  
    def set_account
      @account = Account.find(params[:id])
    end
    
    def account_params
      params.require(:account).permit(:flat_id, :start_date, :months_number, :total)
    end
end
