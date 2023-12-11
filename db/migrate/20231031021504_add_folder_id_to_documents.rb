class AddFolderIdToDocuments < ActiveRecord::Migration[7.0]
  def change
    add_reference :documents, :folder, null: false, foreign_key: true
  end
end
