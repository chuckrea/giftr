
class ItemsController < ApplicationController

  def index

    @items = Item.where(poll_id: params[:poll_id])
    respond_to do |format|
      format.html
      format.json { render json: @items}
    end
  end

  def new
    @item = Item.new
  end

  def create
    item = Item.new
    item.name = params[:item][:name]
    item.poll_id = params[:item][:poll_id]
    data = params[:image]
    data_index = data.index('base64') + 7
    filedata = data.slice(data_index, data.length)
    decoded_image = Base64.decode64(filedata)
    file = File.new("app/assets/images/1234.jpg", "wb")
    file.write(decoded_image)
    item.image = File.open(file)
    item.url = item.image.url
    item.save!
    item.update_attributes(url: item.image.url)
    
    render json: item
  end



  def show
  end


end
