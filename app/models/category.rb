class Category < ApplicationRecord
  has_many :tariffs
  
  def self.active_categories
    sql = 'select * from categories where id in (select distinct(category_id) from tariffs) order by id;'
    self.find_by_sql(sql)
  end
end
