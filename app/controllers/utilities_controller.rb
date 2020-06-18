class UtilitiesController < ApplicationController
  before_action :set_flat, only: [:index, :new, :create, :show, :edit, :update, :destroy]
  before_action :set_utility, only: [:show, :edit, :update, :destroy]

  def index
    @utilities = @flat.utilities.order(:id)
    @categories = Category.active_categories
    @tariffs = Tariff.all
    # puts ">>>>>>>#{@flat.id}<<<<<<<<<"
    render json: {utilities: @utilities, tariffs: @tariffs, categories: @categories, flat_id: @flat.id, user_id: current_user.id}
    # respond_to do |format|
    #   format.html
    #   format.json do
    #     render json: {utilities: @utilities, tariffs: @tariffs, categories: @categories}
    #     # render json: {tariffs: @tariffs, categories: @categories}
    #   end
    # end
  end

  def create
    @utility = @flat.utilities.build(utility_params)
    @utility.is_active = true
    @utility.last_value_counter = @utility.start_value_counter

    if @utility.save
      render json: {utility: @utility}
      # render json: {utilities: @flat.utilities.order(:id)}
    else
      render json: @utility.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @utility&.destroy
    render json: {message: 'Услуга удалена'}
    # flash[:success] = "Услуга удалена"
    # render json: {utilities: @flat.utilities.order(:id)}
    # utilities = @flat.utilities.order(:id)
    # @categories = Category.active_categories
    # @tariffs = Tariff.all
    # puts ">>>>>>>#{@flat.id}<<<<<<<<<"
    # render json: {utilities: @utilities, tariffs: @tariffs, categories: @categories, flat_id: @flat.id, user_id: current_user.id}
  end

  private
    def set_flat
      @flat = Flat.find(params[:flat_id])
    end

    def set_utility
      @utility = Utility.find(params[:id])
    end

    def utility_params
      params.require(:utility).permit(:flat_id, :category_id, :tariff_id, :description,
        :start_value_counter, :last_value_counter, :is_active)
    end
end
