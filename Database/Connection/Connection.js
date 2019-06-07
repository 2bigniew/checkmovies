let sequalize;
switch(process.env.NODE_ENV) {
    case 'development': sequalize = require('./DevConnection'); break;
    case 'production': sequalize = require('./ProdConnection'); break;
    case 'test': sequalize = require('./TestConnection'); break;
    default: console.log('Please, choose enviroment type');
}

module.exports = sequalize;