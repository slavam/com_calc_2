class Flat < ApplicationRecord
  belongs_to :user
  has_many :utilities, dependent: :destroy
  has_many :accounts, dependent: :destroy
  default_scope -> { order(:created_at)}
  before_save :default_values
  validates :user_id, presence: true
  validates :payer_lastname, presence: true, length: { maximum: 50 }
  
  def payer_fullname
    self.payer_lastname+' '+self.payer_firstname+' '+self.payer_middlename
  end
  
  def payer_shortname
    self.payer_lastname+' '+((self.payer_firstname.present? and self.payer_firstname>'') ? self.payer_firstname[0,1]+'.'+
    ((self.payer_middlename.present? and self.payer_middlename>'') ? self.payer_middlename[0]+'.' : '') : '')
  end
  
  private
    def default_values
      self.total_area ||= 0
      self.heated_area ||= 0
      self.residents_number ||= 0
    end
end
