require 'test_helper'

class EventTest < ActiveSupport::TestCase

  test 'it exists' do
    assert Event
  end

  test 'it finds events by location' do
    VCR.use_cassette("event#find_by_location") do
      location = { lat: "39.750081", lon: "-104.999703" }
      results = Event.find_by(location)

      assert_equal 'Denver',  results.first.city_name
      assert_equal 'CO',      results.first.region_abbr
      assert_equal '80211',   results.first.postal_code
    end
  end

end
