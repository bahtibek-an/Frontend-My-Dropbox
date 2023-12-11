class Document < ApplicationRecord
  belongs_to :user
  belongs_to :folder
  validates :name, presence: true
  has_many_attached :attachments
  has_paper_trail
end
