class CreateFlats < ActiveRecord::Migration[5.1]
  def change
    create_table :flats do |t|
      t.references :user, index: true, foreign_key: true
      t.string :address
      t.string :payer_firstname
      t.string :payer_middlename
      t.string :payer_lastname
      t.float  :total_area
      t.float  :heated_area
      t.integer :residents_number
      t.float   :lat
      t.float   :lng
      t.integer :owner_id

      t.timestamps
    end
  end
end
