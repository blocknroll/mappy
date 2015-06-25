Rails.application.routes.draw do

  get 'maps/index'

  root      'maps#index'
  resources :maps, only: [:index]

end
