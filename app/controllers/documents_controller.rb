class DocumentsController < ApplicationController
  load_and_authorize_resource
  before_action :set_document, only: %i[ show edit update destroy ]

  # GET /documents or /documents.json

def index
  @folder = Folder.find(params[:folder_id]) # Get the folder context
  @documents = @folder.documents
end


 # GET /folders/:folder_id/documents/:id
def show
  @folder = Folder.find(params[:folder_id])
  @document = @folder.documents.find(params[:id])
end


 # GET /folders/:folder_id/documents/new
def new
  @folder = Folder.find(params[:folder_id])
  @document = @folder.documents.new
end


def edit
  @folder = Folder.find(params[:folder_id])
  @document = @folder.documents.find(params[:id])
end


  # POST /documents or /documents.json

def create
  @folder = Folder.find(params[:folder_id]) 
  @document = @folder.documents.new(document_params) # Build a new document within the folder
  @document.user = current_user
  respond_to do |format|
    if @document.save
      format.html { redirect_to folder_document_path(@folder, @document), notice: "Document was successfully updated." }
      format.json { render :show, status: :ok, location: folder_document_path(@folder, @document) }
    else
      format.html { render :new, status: :unprocessable_entity }
      format.json { render json: @document.errors, status: :unprocessable_entity }
    end
  end
end


# PATCH/PUT /folders/:folder_id/documents/:id
def update
  @folder = @document.folder

  respond_to do |format|
    if @document.update(document_params)
      format.html { redirect_to folder_document_path(@folder, @document), notice: "File was successfully updated." }
      format.json { render :show, status: :ok, location: folder_document_path(@folder, @document) }
    else
      format.html { render :edit, status: :unprocessable_entity }
      format.json { render json: @document.errors, status: :unprocessable_entity }
    end
  end
end



  # DELETE /documents/1 or /documents/1.json
  def destroy
    @document.destroy

    respond_to do |format|
      format.html { redirect_to documents_url, notice: "File was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_document
      @document = Document.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def document_params
      params.require(:document).permit(:name, attachments: [])
    end
end

