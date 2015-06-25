class Event < OpenStruct

  def self.service
    @service ||= EventfulService.new  # get (or establish) a client connection to Eventful
  end

  def self.find_by(location)
    service.get_events(location).map do |event|
      Event.new(event)
    end
  end

  def self.get_json_map_data(location: { lat: "39.750081", lon: "-104.999703" } )
    service.get_events(location).map do |event|  # go to EventfulService > events, return the parsed hash, and map the Events data a new array
      geo_data(event)                            # create new 'geo_data' objects for each Event (in private method below)
    end
  end



      private

              def self.geo_data(event)  # creates GeoJSON data with each event
                {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [ event[:longitude], event[:latitude] ]
                    },
                    properties: {
                      title:         event[:title],
                      start_time:    event[:start_time],
                      venue_name:    event[:venue_name],
                      venue_address: event[:venue_address],
                      description:   event[:description],
                      url:           event[:url],
                      :'marker-color' => '#F38E19',
                      :'marker-size' => 'small'
                    }
                }
              end

end
