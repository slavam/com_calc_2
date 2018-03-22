class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :categories do |t|
      t.string :name
      t.string :description
      t.string :unit
      t.boolean :is_counter, default: false
      t.boolean :is_variable_tariff, default: false

      t.timestamps
    end
  end
end
