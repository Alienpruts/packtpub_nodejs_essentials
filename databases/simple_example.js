/**
 * Created by bert on 4/1/16.
 */

var LevelUp = require('level');

var db = new LevelUp('./example-db', {
    valueEncoding: 'json',
});

db.put('jsonKey', { inner: 'value'}, function (error) {
    if (error) {
        return console.log('Error!', error);
    }

    db.get('jsonKey', function (error, value) {
        if (error) {
            return console.log('Error!', error);
        }

        console.log("jsonKey = ", value);
    });
});
