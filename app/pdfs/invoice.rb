class Invoice
  include Prawn::View
  include ActionView::Helpers::NumberHelper
  def initialize(flat, account)
    # super(top_margin: 40)		
		@account = account
		@flat = flat
    font_families.update("OpenSans" => {
      :normal => Rails.root.join("./app/assets/fonts/OpenSans/OpenSans-Regular.ttf"),
      :italic => Rails.root.join("app/assets/fonts/OpenSans/OpenSans-Italic.ttf"),
      :bold => Rails.root.join("./app/assets/fonts/OpenSans/OpenSans-Bold.ttf"),
      :bold_italic => Rails.root.join("app/assets/fonts/OpenSans/OpenSans-BoldItalic.ttf")
    })
    content
    content
  end
  
  def content
    y_pos = cursor
    font "OpenSans", style: :normal, size: 9
    bounding_box([0, y_pos], :width => bounds.width, align: :left) do
      text "Банк: ЦРБ ДНР отд. №__________/_________ в г.________  Кассир:___________________"
      text "Код Плательщика в ЕРЦ:_____________________________ Плательщик: #{@flat.payer_lastname}"
      text "Адрес: #{@flat.address}"
      font "OpenSans", style: :bold
      text "Квитанция № ______________  Дата с #{@account.start_date.to_s} за #{@account.months_number} мес."
    end
    move_down 5
    font "OpenSans", style: :normal
    table draw_table, cell_style: { border_width: 0.3, :overflow => :shrink_to_fit, :font => 'OpenSans', :inline_format => true, size: 9 } do |t|
      # t.cells.border_width = 0
    end
    move_down 5
    text "Подпись плательщика_____________  М.П.      Подпись кассира_________________"    
    move_down 20
  end
  def draw_table
    table = []
    # period = ['Год','Январь','','','','','','Июль']
    @account.payments.each do |p|
      row = []
      row[0] = p.utility.display_name
      row[1] = number_with_precision p.amount, :precision => 2
      row[2] = p.is_counter ? '' : "#{@account.months_number} мес."
      row[3] = p.is_counter ? p.old_value_counter : '' 
      row[4] = p.is_counter ? p.new_value_counter : '' 
      row[5] = p.is_counter ? p.quantity : '' 
      table << row
    end
    row = ['<b>ИТОГО (рос. руб.)</b>','','','','','']
    row[1] = "<b>#{@account.total}</b>"
    [
      ['<b>Услуга</b>','<b>Сумма</b>', '<b>Период оплаты</b>', '<b>Было</b>', '<b>Стало</b>', '<b>Разница</b>']
    ] + table + [row]
  end
end