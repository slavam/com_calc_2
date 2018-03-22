Rails.application.routes.draw do
  resources :flats do
    resources :utilities
    resources :accounts
  end
  root 'tariffs#index'
  resources :tariffs
  resources :categories
  get 'sessions/new'

  get  '/signup',  to: 'users#new'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
