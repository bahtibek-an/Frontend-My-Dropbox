class FoldersController < ApplicationController
  load_and_authorize_resource
  before_action :set_folder, only: %i[ show edit update destroy ]

  # GET /folders or /folders.json
  def index
    @folders = current_user.folders
  end

  # GET /folders/1 or /folders/1.json
  def show
    @folder = Folder.find(params[:id])
    @documents = @folder.documents
  end
  

  # GET /folders/new
  def new
    @folder = Folder.new
  end

  # GET /folders/1/edit
  def edit
  end

  # POST /folders or /folders.json
  def create
    @folder = current_user.folders.new(folder_params)
  
 
    if @folder.save
      redirect_to folder_path(@folder)
    else
      render :new
    end
  end  
  

  # PATCH/PUT /folders/1 or /folders/1.json
  def update
    respond_to do |format|
      if @folder.update(folder_params)
        format.html { redirect_to folder_url(@folder), notice: "Folder was successfully updated." }
        format.json { render :show, status: :ok, location: @folder }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @folder.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /folders/1 or /folders/1.json
  def destroy
    @folder.documents.destroy_all # Delete all associated documents
    @folder.destroy # Delete the folder

    respond_to do |format|
      format.html { redirect_to folders_url, notice: "Folder was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_folder
      @folder = Folder.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def folder_params
      params.require(:folder).permit(:name)
    end
end
