class Event < OpenStruct

  def self.service
    @service ||= EventfulService.new
  end

  def self.find_by(location)
    service.get_events(location).map do |event|
      Event.new(event)
    end
  end

end
