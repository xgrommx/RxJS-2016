var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldZipWithCurrentThreadScheduler = RxOld.Observable.zip(RxOld.Observable.range(0, 10, RxOld.Scheduler.currentThread), RxOld.Observable.range(0, 10, RxOld.Scheduler.currentThread), add);
    var newZipWithCurrentThreadScheduler = RxNew.Observable.zip(RxNew.Observable.range(0, 10, RxNew.Scheduler), RxNew.Observable.range(0, 10, RxNew.Scheduler), add);

    return suite
        .add('old zip with current thread scheduler', function () {
            oldZipWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new zip with current thread scheduler', function () {
            newZipWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        });
    
    function add(x, y) {
        return x + y;
    }
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};