class CreateUtilities < ActiveRecord::Migration[5.1]
  def change
    create_table :utilities do |t|
      t.integer  :flat_id, null: false
      t.integer  :category_id, null: false
      t.integer  :tariff_id, null: false
      t.string   :description
      t.float    :start_value_counter
      t.float    :last_value_counter
      t.boolean  :is_active, default: true

      t.timestamps
    end
  end
end
