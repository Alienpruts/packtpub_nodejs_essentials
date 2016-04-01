/**
 * Created by bert on 4/1/16.
 */

var LevelUp = require('level');

var db = new LevelUp('./example-db');

db.put('key', 'value', function (error) {
    if (error) {
        return console.log('Error!', error);
    }

    db.get('key', function (error, value) {
        if (error) {
            return console.log('Error!', error);
        }

        console.log("key = ", value);
    });
});
