module FriendSelect
  # add methods here used in PollsController to find user's FB photo, user can type in a name and see list of a friend's friends

  



  def self.fb_connect(token)
    graph = Koala::Facebook::API.new(token)
    friends = graph.get_connection("me", "friends")
 
    photos.map! do |photo| 
      {
        id: photo["id"],
        url: photo["source"],
        num_tags: photo["tag_count"],
        male_likes: photo["male_likes"],
        female_likes: photo["female_likes"],
        total_likes: photo["male_likes"] + photo["female_likes"],
      }
    end
  end

   def self.batch(token, sort_by)
    photos_array = self.fb_connect(token)
  end

end