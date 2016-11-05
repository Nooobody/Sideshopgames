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
