#!/usr/bin/ruby
require 'sinatra'
require 'lightwaverf'

lightwaverf = LightWaveRF.new
config = lightwaverf.get_config
rooms = config['room']
sequences = config['sequence']

configure do
  set :environment, :production
end

get '/room/?:room?' do
  content_type :json
  if params['room']
    config['room'].each do | room |
      if room['name'] == params['room']
        return room.to_json
      end
    end
    halt 404, { error: 'no such room', rooms: config['room'] }.to_json
  end
  config['room'].to_json
end

put '/room/:room/:device' do
  content_type :json
  status = params['status'] || 'on'
  config['room'].each do | room |
    if room['name'] == params['room']
      if params['device'] == 'all'
        result = lightwaverf.send params['room'], 'all', status
        return { result: result }.to_json
      end
      room['device'].each do | device |
        if device == params['device']
          result = lightwaverf.send params['room'], device, status
          return { result: result }.to_json
        end
      end
    end
  end
  halt 404, { error: 'no such room or device', rooms: config['room'] }.to_json
end

get '/sequence/?:sequence?' do
  content_type :json
  if params['sequence']
    if config['sequence'][ params['sequence'] ]
      return config['sequence'][ params['sequence'] ].to_json
    end
    halt 404, { error: 'no such sequence', sequences: config['sequence'] }.to_json
  end
  config['sequence'].to_json
end

put '/sequence/?:sequence?' do
  content_type :json
  if config['sequence'][ params['sequence'] ]
    result = lightwaverf.sequence params['sequence'], true
    return { result: result }.to_json
  end
  halt 404, { error: 'no such sequence', sequences: config['sequence'] }.to_json
end

get '/' do
  content_type :json
  { GET: [ '/room', '/sequence' ] }.to_json
end
