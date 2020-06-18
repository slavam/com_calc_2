Rails.application.routes.draw do
  get 'pages/home'

  get 'pages/my_todo_items'

  resources :flats do
    resources :utilities
    resources :accounts
  end
  # root 'tariffs#index'
  # logged_in_user do
  root "pages#my_todo_items"
  # get '/*path' => 'pages#my_todo_items'
  # end
  # root 'categories#index'
  # get '/*path' => 'categories#index'
  resources :tariffs
  resources :categories, defaults: { format: :json }
  get 'sessions/new'

  get  '/signup',  to: 'users#new'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  resources :users
  get '/*path' => 'pages#my_todo_items'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
