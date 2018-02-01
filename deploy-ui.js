const Deployer = require('ssh-deploy-release');
const { execSync } = require('child_process');

execSync('rm -rf public/', (err) => {
    if (err) {
        console.log(err); return;
    }
    console.log('Cleaning up public folder');
});

execSync('mkdir public', (err) => {
    if (err) {
        console.log(err); return;
    }
    console.log('Created public folder...');
    
});

execSync('cp server.js public/server.js', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Copied Server');
});

execSync('cp package.json public/package.json', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Copied Server');
});

execSync('cp package-lock.json public/package-lock.json', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Copied Server');
});

console.log('Copying compiled files');
execSync('cp -r dist public', (err) => {
    if (err) {
        console.log(err); return;
    }
    console.log('Copied compiled files');
});

var options = {};

options = {
    localPath: 'public',
    host: 'sourceclone.com',
    username: 'ubuntu',
    privateKeyFile: '/home/praveen/Downloads/SourceCloneMumblify.pem',
    deployPath: '/home/ubuntu/blog-ui'
};

const deployer = new Deployer(options);
deployer.deployRelease(() => {
    console.log('Ok !')
});