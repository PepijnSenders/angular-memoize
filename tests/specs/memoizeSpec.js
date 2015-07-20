'use strict';

describe('Testing simple cache', function() {

    beforeEach(module('pep.memoizeApp'));

    it('Should save data in local cache', inject(function(memoize) {
        function memoizeThisFunction(a, b, c, testFunction) {
            if (testFunction) {
                testFunction(a, b, c);
            }

            return [a, b, c];
        }

        function anotherFunction(a, testFunction) {
            if (testFunction) {
                testFunction(a + 'aap');
            }

            return [a];
        }

        memoize(function() {
            return memoizeThisFunction('a', 'b', 'c', function(a, b, c) {
                expect(a).toEqual('a');
                expect(b).toEqual('b');
                expect(c).toEqual('c');
            });
        });

        memoize(function() {
            return memoizeThisFunction('a', 'b', 'c', function() {
                fail('Should have cached function');
            });
        });

        memoize(function() {
            return anotherFunction('b', function(a) {
                expect(a).toEqual('baap');
            });
        });

        memoize(function() {
            return anotherFunction('a', function() {
                fail('Should have cached function');
            });
        });

        memoize(function() {
            return memoizeThisFunction('a', 'b', 'c', function(a, b, c) {
                expect(a).toEqual('a');
                expect(b).toEqual('b');
                expect(c).toEqual('c');
            });
        });

    }));

});
