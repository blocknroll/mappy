require 'test_helper'

class EventfulServiceTest < ActiveSupport::TestCase

  test 'it exists' do
    assert EventfulService
  end

  test 'it gets all events by location' do
    VCR.use_cassette('eventful_service#get_events') do
      service = EventfulService.new
      location = { lat: "39.750081", lon: "-104.999703" }
      results = service.get_events(location)

      assert_equal "Denver", results.first[:city_name]
      assert_equal "CO",     results.first[:region_abbr]
      assert_equal "80211",  results.first[:postal_code]
    end
  end



end
