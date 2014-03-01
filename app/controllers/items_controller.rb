
class ItemsController < ApplicationController

  def index
    @items = Item.all.order("id")
    respond_to do |format|
      format.html
      format.json { render json: @items}
    end
  end

  def new
  end

  def create
    @item = Item.create(item_params)
    render json: @item
  end

  def show
  end

  private

  def item_params
    params.require(:item).permit(:name, :url, :poll_id)
  end

end
