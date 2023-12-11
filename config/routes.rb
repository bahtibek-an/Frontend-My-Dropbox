Rails.application.routes.draw do
  devise_for :users

  authenticated :user do
    root 'folders#index', as: :authenticated_root
  end

  unauthenticated :user do
    root 'pages#home'
  end

  resources :folders do
    resources :documents
  end
end



# Rails.application.routes.draw do
#   devise_for :users
#   root to: 'folders#index'
#   resources :folders do
#     resources :documents
#   end
# end
