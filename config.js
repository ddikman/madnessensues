
var environment = (process.env['NODE_ENV'] || 'development').toLowerCase();

var production = {
	port: 80
};

var development = {
	port: 3000
};

var environmentConfig = development;
if(environment == "production")
	environmentConfig = production;

environmentConfig.environment = environment;

module.exports = environmentConfig;