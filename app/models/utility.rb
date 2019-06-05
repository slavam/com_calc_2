class Utility < ApplicationRecord
  belongs_to :flat
  belongs_to :category
  belongs_to :tariff
  has_many :payments, :dependent => :destroy
  
  def quantity
    return case category.name
      when 'Квартплата'
        self.flat.total_area
      when 'Газ'
        self.flat.residents_number
      when 'ОТОПЛЕНИЕ'
        self.flat.heated_area.round(2)
      when 'ВЫВОЗ ТБО'
        self.flat.residents_number
      else
        0
    end
  end
  
  def display_name
    self.description > '' ? category.description+' ('+self.description+')' : category.description
  end
end
