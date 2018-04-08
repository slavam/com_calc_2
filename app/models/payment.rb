class Payment < ApplicationRecord
  belongs_to :account
  belongs_to :utility
  validates :amount, presence: true
  validates :tariff, presence: true
  validates :quantity, presence: true
end
