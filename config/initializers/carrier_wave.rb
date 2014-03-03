CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider => 'AWS', # required
    :aws_access_key_id => ENV['MICHAEL_MUSE_AWS_KEY_1'], # required
    :aws_secret_access_key => ENV['MICHAEL_MUSE_AWS_SECRET_1'] # required
  }


  config.fog_directory = ENV['MICHAEL_MUSE_S3_BUCKET_FINAL_PROJ'] # required
end