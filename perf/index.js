var Rx = require("rx");
var colors = require("colors");
var Observable = Rx.Observable;
var Benchmark = require("benchmark");
var suite = new Benchmark.Suite;

Observable.from([
        require("perf/immediate-scheduler/observable/from-array"),
        require("perf/immediate-scheduler/observable/from-with-array"),
        require("perf/immediate-scheduler/observable/from-with-string"),
        require("perf/immediate-scheduler/observable/of"),
        require("perf/immediate-scheduler/observable/range"),

        require("perf/immediate-scheduler/operators/combine-latest"),
        require("perf/immediate-scheduler/operators/concat-many"),
        require("perf/immediate-scheduler/operators/filter"),
        require("perf/immediate-scheduler/operators/merge"),
        require("perf/immediate-scheduler/operators/reduce"),
        require("perf/immediate-scheduler/operators/select-many"),
        require("perf/immediate-scheduler/operators/select-many-observable"),
        require("perf/immediate-scheduler/operators/select"),
        require("perf/immediate-scheduler/operators/scan"),
        require("perf/immediate-scheduler/operators/to-array"),
        require("perf/immediate-scheduler/operators/zip"),

        require("perf/current-thread-scheduler/observable/from-array"),
        require("perf/current-thread-scheduler/observable/from-with-array"),
        require("perf/current-thread-scheduler/observable/from-with-string"),
        require("perf/current-thread-scheduler/observable/of"),
        require("perf/current-thread-scheduler/observable/range"),

        require("perf/current-thread-scheduler/operators/combine-latest"),
        require("perf/current-thread-scheduler/operators/concat-many"),
        require("perf/current-thread-scheduler/operators/filter"),
        require("perf/current-thread-scheduler/operators/merge"),
        require("perf/current-thread-scheduler/operators/reduce"),
        require("perf/current-thread-scheduler/operators/select-many"),
        require("perf/current-thread-scheduler/operators/select-many-observable"),
        require("perf/current-thread-scheduler/operators/select"),
        require("perf/current-thread-scheduler/operators/scan"),
        require("perf/current-thread-scheduler/operators/to-array"),
        require("perf/current-thread-scheduler/operators/zip"),

    ])
    .concatMap(function (test) {
        var tests = test(new Benchmark.Suite());
        return Observable.defer(function () {

            var cycles = new Rx.ReplaySubject();
            var complete = new Rx.ReplaySubject();

            tests.on("cycle", function (e) {
                cycles.onNext(String(e.target));
            }).on("complete", function () {
                var fastest = this.filter("fastest");
                var fastestName = String(fastest.pluck("name"));
                var fastestTime = parseFloat(this.filter("fastest").pluck("hz"));
                var slowestTime = parseFloat(this.filter("slowest").pluck("hz"));
                
                // percent change formula: ((V2 - V1) / |V1|) * 100
                if(fastestName.substr(0, 3) === "new") {
                    complete.onNext("\t" + (Math.round((fastestTime - slowestTime) / slowestTime * 10000) / 100) + "% " + "faster".green +" than Rx\n");
                } else {
                    complete.onNext("\t" + (Math.round((slowestTime - fastestTime) / fastestTime * 10000) / 100) + "% " + "slower".red + " than Rx\n");
                }
            }).run({ "async": true });

            return cycles.merge(complete).take(tests.length + 1);
        });
    })
    .subscribe(console.log.bind(console));

/*
var Rx = require("rx");
var Observable = Rx.Observable;
var Benchmark = require("benchmark");
var suite = new Benchmark.Suite;

Observable.from([
        require("perf/observable/from-array"),
        require("perf/observable/from-with-array"),
        require("perf/observable/from-with-string"),
        require("perf/observable/of"),
        require("perf/observable/range"),

        require("perf/operators/combine-latest"),
        require("perf/operators/concat-many"),
        require("perf/operators/filter"),
        require("perf/operators/merge"),
        require("perf/operators/reduce"),
        require("perf/operators/select-many"),
        require("perf/operators/select-many-observable"),
        require("perf/operators/select"),
        require("perf/operators/scan"),
        require("perf/operators/to-array"),
        require("perf/operators/zip"),
    ])
    .concatMap(function (test) {
        var tests = test(new Benchmark.Suite());
        return Observable.defer(function () {

            var cycles = Observable.fromEvent(tests, "cycle", function(e) {
                return String(e.target);
            });

            var complete = Observable.fromEvent(tests, "complete", function(e) {
                return "Fastest is '" + this.filter("fastest").pluck("name") + "'\n";
            });

            var results = cycles.merge(complete).take(tests.length + 1).replay();

            return Rx.Observable.using(
                function() {
                    var connection = results.connect();
                    tests.run({ async: true });
                    return connection;
                },
                function() { return results; }
            );
        });
    })
    .subscribe(console.log.bind(console));
*/