class Ability
    include CanCan::Ability
  
    def initialize(user)
      can :manage, Folder, user_id: user.id
      can :manage, Document, folder: { user_id: user.id }
      can :create, Document 
    end
  end
  
  