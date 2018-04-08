class Account < ApplicationRecord
  belongs_to :flat
  has_many :payments, :dependent => :destroy
  validates :start_date, presence: true
  validates :months_number, presence: true
  validates :total, presence: true
end
