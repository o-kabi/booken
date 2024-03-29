var mongoose = require('mongoose');

module.exports = {
    url : function (env) {
        if (env === 'development')
        {
            return 'mongodb://localhost:27017/booken-test'
        }
        return 'mongodb://localhost:27017/booken'
    },
    
    connect : function (env) {
        if (env === 'development')
        {
            connectDb(env);
            dropCreate();
        }
    }
}
function getUrl (env) {
    if (env === 'development')
    {
        return 'mongodb://localhost:27017/booken-test'
    }
    return 'mongodb://localhost:27017/booken'
}

function connectDb (env) {
    mongoose.connect(getUrl(env));
}

function dropCreate () {
    mongoose.connection.on('open', function () {
        mongoose.connection.db.dropDatabase(function (err) {
            console.log('booken-test database dropped');
            seed();
        })
    });
}

function seed () {
    var Account = require('../app/models/account');

    
    var Town = require('../app/models/town');
    var towns = ['Derby', 'London', 'Manchester'];
    towns.forEach(function (town) {
        var entry = new Town({ name: town });
        entry.save();
    })
    
    Account.register(new Account({ username: 'admin', lending: [] }), 'admin', function () {
        console.log('admin account created');
    });
}