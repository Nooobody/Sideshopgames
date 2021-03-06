# config valid only for current version of Capistrano
lock '3.6.0'

set :application, 'sideshopgames'
set :user, "ec2-user"
set :host, "http://ec2-35-161-8-185.us-west-2.compute.amazonaws.com"
set :repo_url, 'https://github.com/Nooobody/Sideshopgames.git'

set :ssh_options, {
  user: "ec2-user",
  keys: ["~/.ssh/SideShopGames.pem","~/.ssh/sideshopgames_deploy.pub"],
  config: false,
  forward_agent: true
}

set :deploy_to, '/var/www/sideshopgames'
set :linked_files, ["config/secrets.json"]

set :pm2_config, "/var/www/sideshopgames/current/config/pm2.json"

desc 'Delete server'
task :delete do
  on roles(:web) do
    within current_path do
      execute :pm2, 'delete', fetch(:pm2_config)
    end
  end
end

desc 'Update in memory pm2'
task :update_pm2 do
  on roles(:web) do
    execute :pm2, 'updatePM2'
  end
end

desc 'Start server'
task :start do
  on roles(:web) do
    within current_path do
      execute :pm2, 'start', fetch(:pm2_config)
    end
  end
end

after 'deploy:finished', :delete
after 'deploy:finished', :update_pm2
after 'deploy:finished', :start
