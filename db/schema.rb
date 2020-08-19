# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180408063113) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.date "start_date", null: false
    t.integer "months_number", default: 1
    t.decimal "total", precision: 10, scale: 2, default: "0.0"
    t.integer "flat_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "unit"
    t.boolean "is_counter", default: false
    t.boolean "is_variable_tariff", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "flats", force: :cascade do |t|
    t.bigint "user_id"
    t.string "address"
    t.string "payer_firstname"
    t.string "payer_middlename"
    t.string "payer_lastname"
    t.float "total_area"
    t.float "heated_area"
    t.integer "residents_number"
    t.float "lat"
    t.float "lng"
    t.integer "owner_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_flats_on_user_id"
  end

  create_table "payments", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "utility_id"
    t.integer "months_number", default: 1
    t.decimal "amount", precision: 10, scale: 2, null: false
    t.float "tariff", null: false
    t.float "quantity", null: false
    t.boolean "is_counter", default: false
    t.float "old_value_counter"
    t.float "new_value_counter"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_payments_on_account_id"
    t.index ["utility_id"], name: "index_payments_on_utility_id"
  end

  create_table "tariffs", force: :cascade do |t|
    t.integer "category_id"
    t.string "name"
    t.decimal "value", precision: 10, scale: 2, null: false
    t.date "start_date"
    t.float "low_edge", default: 0.0
    t.float "top_edge", default: 0.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "last_name"
    t.string "first_name"
    t.string "middle_name"
    t.string "login"
    t.string "password_digest"
    t.string "email"
    t.string "role", default: "user"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["login"], name: "index_users_on_login", unique: true
  end

  create_table "utilities", force: :cascade do |t|
    t.integer "flat_id", null: false
    t.integer "category_id", null: false
    t.integer "tariff_id", null: false
    t.string "description"
    t.float "start_value_counter"
    t.float "last_value_counter"
    t.boolean "is_active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "flats", "users"
  add_foreign_key "payments", "accounts"
  add_foreign_key "payments", "utilities"
end
