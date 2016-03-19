/**
 * Created by bert on 3/19/16.
 */

(function (undefined) {
    function Logger() {
        Logger.prototype.log = function (message /*...*/) {
            console.log.apply(console, arguments);
        };
    }
    this.Logger = Logger;
})();