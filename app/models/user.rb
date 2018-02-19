class User < ApplicationRecord
  before_save { self.email = email.downcase }
  validates :login, presence: true, length: { maximum: 50, minimum: 4 }, uniqueness: { case_sensitive: true }
  validates :last_name, presence: true, length: { maximum: 50 }
  validates :first_name, length: { maximum: 50 }
  validates :middle_name, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  has_secure_password
  validates :password, presence: true, length: { minimum: 4 }, :on => :create
  ROLES = [:admin, :user]
  after_initialize :set_default_role, :if => :new_record?
  
  def set_default_role
    self.role ||= :user
  end
  
  def admin?
    self.role == 'admin'
  end
end
