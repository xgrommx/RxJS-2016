var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldFilterWithCurrentThreadScheduler = RxOld.Observable.range(0, 50, RxOld.Scheduler.currentThread).filter(divByTwo).filter(divByTen);
    var newFilterWithCurrentThreadScheduler = RxNew.Observable.range(0, 50, RxNew.Scheduler).filter(divByTwo).filter(divByTen);

    return suite
        .add('old filter with current thread scheduler', function () {
            oldFilterWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new filter with current thread scheduler', function () {
            newFilterWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        });

    function divByTwo(x) {
        return x / 2 === 0;
    }

    function divByTen(x) {
        return x / 10 === 0;
    }
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};
