class EventfulService

  attr_reader :client

  def initialize
    @client = Hurley::Client.new('http://api.eventful.com/json')
    # connection["app_key"] = ENV["EVENTFUL_KEY"]
  end

  def get_events(location)
    response = client.get("events/search") do |request|
      request.query["app_key"] = ENV["EVENTFUL_KEY"]
      request.query["where"]   = "#{location[:lat]},#{location[:lon]}"
      # request.query["where"]   = "39.750081,-104.999703"
      request.query["within"]  = "3"
      request.options.timeout  = 1
    end
    events = parse(response.body)
    events[:events][:event]
  end




      private

          def parse(response)
            JSON.parse(response, symbolize_names: true)
          end

end
