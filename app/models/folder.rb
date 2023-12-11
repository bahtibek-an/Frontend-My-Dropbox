class Folder < ApplicationRecord
  belongs_to :user
  has_many :documents
end
