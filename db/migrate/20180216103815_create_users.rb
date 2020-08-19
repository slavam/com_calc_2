class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :last_name
      t.string :first_name
      t.string :middle_name
      t.string :login
      t.string :password_digest
      t.string :email
      t.string :role, default: :user

      t.timestamps
    end
    add_index :users, :login, unique: true
    add_index :users, :email, unique: true
  end
end
