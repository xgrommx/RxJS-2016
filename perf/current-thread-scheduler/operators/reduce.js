var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldReduceWithCurrentThreadScheduler = RxOld.Observable.range(0, 25, RxOld.Scheduler.currentThread).reduce(add);
    var newReduceWithCurrentThreadScheduler = RxNew.Observable.range(0, 25, RxNew.Scheduler).reduce(add);

    return suite
        .add('old reduce with current thread scheduler', function () {
            oldReduceWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        })
        .add('new reduce with current thread scheduler', function () {
            newReduceWithCurrentThreadScheduler.subscribe(_next, _throw, _return);
        });

    function add(acc, x) {
        return x + x
    }
    function _next(x) { }
    function _throw(e){ }
    function _return(){ }
};