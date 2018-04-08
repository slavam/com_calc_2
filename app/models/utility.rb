class Utility < ApplicationRecord
  belongs_to :flat
  belongs_to :category
  belongs_to :tariff
  
  def quantity
    return case category.name
      when 'Квартплата'
        self.flat.total_area
      when 'Газ'
        self.flat.residents_number
      when 'ОТОПЛЕНИЕ'
        self.flat.heated_area.round(2)
    end
  end
end
