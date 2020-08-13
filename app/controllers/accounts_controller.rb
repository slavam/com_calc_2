class AccountsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_flat, only: [:index, :new, :create, :show, :edit, :update, :destroy]
  before_action :set_account, only: [:show, :edit, :update, :destroy]

  def show
    respond_to do |format|
      format.json do
        ps = @account.payments
        payments = []
        ps.map{|p| 
          payment = {}
          payment['id'] = p.id
          payment['utility_name'] = p.utility.display_name
          payment['months_number'] = p.months_number
          payment['amount'] = p.amount
          payment['quantity'] = p.quantity
          payment['is_counter'] = p.is_counter
          payment['old_value_counter'] = p.old_value_counter
          payment['new_value_counter'] = p.new_value_counter
          payments << payment
        }
        render json: {account: @account, payments: payments}
      end
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
    render json: {utility_params: @utility_params, accounts: @accounts, tariff_limits: @tariff_limits, total: @total, flat_id: @flat.id, user_id: current_user.id}
  end

  def create
    months_number = params[:account_data][:monthsNumber].to_i
    @account = @flat.accounts.build(start_date: params[:account_data][:startDate],
      months_number: months_number,
      total: params[:account_data][:total])
    utilities = params[:account_data][:utilityParams]
    if @account.save
      utilities.each {|u_p|
        u_p.delete(:category_id)
        u_p.delete(:category_name)
        u_p.delete(:is_variable_tariff)
        p = @account.payments.build(payment_params(u_p))
        p.quantity = p[:new_value_counter].to_f-p[:old_value_counter].to_f if p[:is_counter]
        p.amount = p[:tariff].to_f*p[:quantity].to_f*(p[:is_counter] ? 1 : months_number)
        if p.save
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
      # render json: {accounts: @flat.accounts.order(:id).reverse_order}
      render json: {account: @account}
    else
      # format.html { render :index }
      format.json { render json: @account.errors, status: :unprocessable_entity }
    end
  end

  def destroy
    @account&.destroy
    render json: {message: 'Счет удален'}
    # @account.destroy
    # flash[:success] = "Счет удален"
    # redirect_to flat_accounts_path #json: {accounts: @flat.accounts.order(:id).reverse_order}
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
