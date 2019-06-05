class AccountsController < ApplicationController
  before_action :set_flat, only: [:index, :new, :create, :show, :edit, :update, :destroy]
  before_action :set_account, only: [:show, :edit, :update, :destroy]
  
  def show
    respond_to do |format|
      format.html
      format.pdf do
        pdf = Invoice.new(@flat, @account)
        send_data pdf.render, filename: "invoice_#{current_user.id}.pdf", type: "application/pdf", disposition: "inline", :force_download=>true, :page_size => "A4"
      end
    end
  end
  
  def index
    @accounts = @flat.accounts.size > 0 ? @flat.accounts.order(:id).reverse_order : []
    utilities = @flat.utilities.order(:id)
    @tariff_limits = {}
    @utility_params = []
    @total = 0
    i = 0
    utilities.each do |u| 
      @utility_params << {
        utility_id: u.id,
        category_id: u.category_id, 
        category_name: u.display_name,
        is_counter: u.category.is_counter,
        is_variable_tariff: u.category.is_variable_tariff,
        quantity: u.category.is_counter ? 0 : u.quantity,
        tariff: u.category.is_variable_tariff ? 0 : u.tariff.value.to_f,
        old_value_counter: u.last_value_counter,
        new_value_counter: u.last_value_counter,
        description: u.description
      }
      @total += @utility_params[i][:quantity] * @utility_params[i][:tariff] if !u.category.is_counter
      i += 1
      @tariff_limits[u.category_id] = u.category.is_variable_tariff ? Tariff.variables_tariffs(u.category_id) : nil
    end
  end
  
  def create
    months_number = params[:account_data][:monthsNumber].to_i
    @account = @flat.accounts.build(start_date: params[:account_data][:startDate],
      months_number: months_number, 
      total: params[:account_data][:total])

    if @account.save
      params[:account_data][:utilityParams].each {|key, v|
        # Rails.logger.debug("My object>>>>>>>>>>>>>>>: #{u_p.inspect}")
        v.delete(:category_id)
        v.delete(:category_name)
        v.delete(:is_variable_tariff)
        p = @account.payments.build(payment_params(v))
        p.quantity = p[:new_value_counter].to_f-p[:old_value_counter].to_f if p[:is_counter]
        p.amount = p[:tariff].to_f*p[:quantity].to_f*(p[:is_counter] ? 1 : months_number)
        if p.save
          # Rails.logger.debug("My object>>>>>>>>>>>>>>>: #{p.inspect}")
          if p[:is_counter]
            utility = Utility.find(p.utility_id)
            utility.update(last_value_counter: p[:new_value_counter])
          end
        else
          # Rails.logger.debug("My object>>>>>>>>>>>>>>>: #{p.errors}")
          # format.html { render :index }
          format.json { render json: @account.errors, status: :unprocessable_entity }
        end
      }
      # }
      # format.html { redirect_to flat_accounts_path, notice: 'Account was successfully created.' }
      # format.json { render :show, status: :created, location: @account }
      render json: {accounts: @flat.accounts.order(:id).reverse_order}
    else
      # format.html { render :index }
      format.json { render json: @account.errors, status: :unprocessable_entity }
    end
  end
  
  def destroy
    @account.destroy
    flash[:success] = "Счет удален"
    redirect_to flat_accounts_path #json: {accounts: @flat.accounts.order(:id).reverse_order}
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
    
    def payment_params(data)
      data.permit(:account_id, :utility_id, :months_number, :amount, :tariff, :quantity, :is_counter, :old_value_counter, :new_value_counter)
    end
end
