if (!window.pep) {
    window.pep = {};
}

window.pep.memoizeApp = (function(angular) {

    var memoizeApp = angular.module('pep.memoizeApp', []);

    return memoizeApp;

}(angular));
