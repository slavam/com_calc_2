class FlatsController < ApplicationController
  before_action :logged_in_user #, only: [:new, :create, :destroy]
  before_action :set_flat, only: [:show, :edit, :update, :destroy]
  
  def show
  end
  
  def new
    @flat = Flat.new
  end

  def create
    @flat = current_user.flats.build(flat_params)
    if @flat.save
      flash[:success] = "Жилье создано"
      redirect_to current_user
    else
      render 'new'
    end
  end

  def edit
  end
  
  def update
    respond_to do |format|
      if @flat.update(flat_params)
        format.html { redirect_to flat_url, notice: 'flat was successfully updated.' }
        format.json { render :show, status: :ok, location: @flat }
      else
        format.html { render :edit }
        format.json { render json: @flat.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def destroy
    @flat.destroy
    respond_to do |format|
      format.html { redirect_to flats_url, notice: 'Flat was successfully destroyed.' }
      format.json { head :no_content }
    end
  end
  
  private
    def set_flat
      @flat = Flat.find(params[:id])
    end
  
    def flat_params
      params.require(:flat).permit(:address, :payer_firstname, :payer_middlename, :payer_lastname, :user_id, 
        :residents_number, :total_area, :heated_area)
    end
end
