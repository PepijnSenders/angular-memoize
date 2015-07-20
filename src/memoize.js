(function(memoizeApp) {

    function memoize() {
        function getIdentifier(args) {
            return JSON.stringify(args);
        }

        var cache = {};

        return function(cb) {
            var identifier = getIdentifier(arguments);
            cache[identifier] = cache[identifier] || cb.apply(cb, arguments);

            return cache[identifier];
        };
    }

    memoizeApp.factory('memoize', memoize);

}(window.pep.memoizeApp));
