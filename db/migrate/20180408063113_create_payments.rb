class CreatePayments < ActiveRecord::Migration[5.1]
  def change
    create_table :payments do |t|
      t.references :account, index: true, foreign_key: true
      t.references :utility, index: true, foreign_key: true
      t.integer :months_number, default: 1
      t.decimal :amount,      :precision => 10, :scale => 2, :null => false
      t.float :tariff, :null => false
      t.float :quantity, :null => false
      t.boolean :is_counter, default: false
      t.float :old_value_counter
      t.float :new_value_counter

      t.timestamps
    end
  end
end
