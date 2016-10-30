# config valid only for current version of Capistrano
lock '3.6.0'

set :application, 'sideshopgames'
set :user, "ec2-user"
set :host, "http://ec2-54-197-15-52.compute-1.amazonaws.com"
set :repo_url, 'https://github.com/Nooobody/Sideshopgames.git'

set :ssh_options, {
  user: "ec2-user",
  keys: ["~/.ssh/ITT2Key.pem","~/.ssh/sideshopgames_deploy.pub"],
  config: false,
  forward_agent: true
}

set :deploy_to, '/var/www/sideshopgames'

namespace :deploy do
  desc "Restart application"
  task :restart do
    invoke "pm2:restart"
  end

  after :publishing, :restart
  before 'deploy:updated', 'npm:install'
end
