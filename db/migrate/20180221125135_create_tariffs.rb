class CreateTariffs < ActiveRecord::Migration[5.1]
  def change
    create_table :tariffs do |t|
      t.integer  "category_id"
      t.string   "name"
      t.decimal  "value",       precision: 10, scale: 2,               null: false
      t.date     "start_date"
      t.float    "low_edge",                             default: 0.0
      t.float    "top_edge",                             default: 0.0

      t.timestamps
    end
  end
end
