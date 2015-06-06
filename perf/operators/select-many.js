var RxOld = require("rx");
var RxNew = require("rx-3");

module.exports = function (suite) {
    
    var oldSelectManyWithImmediateScheduler = RxOld.Observable.range(0, 10, RxOld.Scheduler.immediate).selectMany(function (x) { return RxOld.Observable.range(x, 10, RxOld.Scheduler.immediate); });
    var oldSelectManyWithCurrentThreadScheduler = RxOld.Observable.range(0, 10, RxOld.Scheduler.currentThread).selectMany(function (x) { return RxOld.Observable.range(x, 10, RxOld.Scheduler.currentThread); });
    var newSelectManyWithImmediateScheduler = RxNew.Observable.range(0, 10).selectMany(function (x) { return RxNew.Observable.range(x, 10); });
    var newSelectManyWithCurrentThreadScheduler = RxNew.Observable.range(0, 10, RxNew.Scheduler).selectMany(function (x) { return RxNew.Observable.range(x, 10, RxNew.Scheduler); });

    return suite
        .add('old selectMany with immediate scheduler', function () {
            oldSelectManyWithImmediateScheduler.subscribe();
        })
        .add('old selectMany with current thread scheduler', function () {
            oldSelectManyWithCurrentThreadScheduler.subscribe();
        })
        .add('new selectMany with immediate scheduler', function () {
            newSelectManyWithImmediateScheduler.subscribe();
        })
        .add('new selectMany with current thread scheduler', function () {
            newSelectManyWithCurrentThreadScheduler.subscribe();
        });
}