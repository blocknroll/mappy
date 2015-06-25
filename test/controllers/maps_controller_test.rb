require 'test_helper'

class MapsControllerTest < ActionController::TestCase
  test "should get index" do
    VCR.use_cassette("event#get_json_map_data") do
      get :index
      assert_response :success
    end
  end

end
  
