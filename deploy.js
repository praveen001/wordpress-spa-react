const Deployer = require('ssh-deploy-release');

var options = {};

options = {
    localPath: 'dist',
    host: 'sourceclone.com',
    username: 'ubuntu',
    privateKeyFile: '/home/praveen/Downloads/',
    deployPath: '/home/ubuntu/mix/strategy'
};

const deployer = new Deployer(options);
deployer.deployRelease(() => {
    console.log('Ok !')
});