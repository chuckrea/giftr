
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
    # @item = Item.create(item_params)
    @item = Item.new
    @item.name = params[:item][:name]
    @item.url = params[:item][:url]
    @item.poll_id = params[:item][:poll_id]
    @item.image = params[:item][:image]
    @item.save!
    # binding.pry
    # unless @item.image 
    #   @item.image = '/default.jpg'
    #   @item.save
    # end

    render json: @item
  end

  def show
  end

  # private

  # def item_params
  #   params.require(:item).permit(:name, :url, :poll_id, :image)
  # end

end
