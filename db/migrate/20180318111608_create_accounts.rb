class CreateAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table  :accounts do |t|
      t.date      :start_date,    null: false
      t.integer   :months_number, default: 1
      t.decimal   :total,         precision: 10, scale: 2, default: 0.0
      t.integer   :flat_id,       null: false

      t.timestamps
    end
  end
end
