class TariffsController < ApplicationController
  before_action :set_tariff, only: [:show, :edit, :update, :destroy]

  # before_action :check_format, only: :index
  #
  # def check_format
  #   render :nothing => true, :status => 406 unless params[:format] == 'json' || request.headers["Accept"] =~ /json/
  # end
  # GET /tariffs
  # GET /tariffs.json
  def index
    @tariffs = Tariff.all.order(:category_id, :name)
    @categories = Category.active_categories #all.order(:name)
    render json: {tariffs: @tariffs, categories: @categories}
    # respond_to do |format|
    #   format.html
    #   format.json do
    #       # render json: {tariffs: @tariffs}
    #     render json: {tariffs: @tariffs, categories: @categories}
    #   end
    # end
  end

  def new
    @tariff = Tariff.new
  end

  def create
    @tariff = Tariff.new(tariff_params)

    respond_to do |format|
      if @tariff.save
        format.html { redirect_to :tariffs, notice: 'tariff was successfully created.' }
        format.json { render :show, status: :created, location: @tariff }
      else
        format.html { render :new }
        format.json { render json: @tariff.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
  end

  def update
    respond_to do |format|
      if @tariff.update(tariff_params)
        format.html { redirect_to :tariffs, notice: 'tariff was successfully updated.' }
        format.json { render :show, status: :ok, location: @tariff }
      else
        format.html { render :edit }
        format.json { render json: @tariff.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    def set_tariff
      @tariff = Tariff.find(params[:id])
    end

    def tariff_params
      params.require(:tariff).permit(:name, :value, :start_date, :category_id, :low_edge, :top_edge)
    end
end
