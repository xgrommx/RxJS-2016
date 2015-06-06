var expect = require("chai").expect;
var Scheduler = require("rx-3/Scheduler");
var of = require("rx-3/observable/of");
var zip = require("rx-3/operators/zip");
var zipAll = require("rx-3/operators/zip-all");

describe("zip", function() {
    it("should combine two observables", function(done) {
        var a = of(1, 2, 3);
        var b = of(4, 5, 6, 7, 8);
        var r = [[1, 4], [2, 5], [3, 6]];
        var i = 0;
        zipAll.call(of(a, b)).subscribe(
            function(vals) {
                expect(vals).to.deep.equal(r[i++]);
            }, null,
            function() {
                done();
            });
    });
    it("should combine a source with a second", function(done) {
        var a = of(1, 2, 3);
        var b = of(4, 5, 6, 7, 8);
        var r = [[1, 4], [2, 5], [3, 6]];
        var i = 0;
        zip.call(a, b).subscribe(
            function(vals) {
                expect(vals).to.deep.equal(r[i++]);
            }, null,
            function() {
                done();
            });
    });
    it("should combine two immediately-scheduled observables", function(done) {
        var a = of(1, 2, 3, Scheduler);
        var b = of(4, 5, 6, 7, 8, Scheduler);
        var r = [[1, 4], [2, 5], [3, 6]];
        var i = 0;
        zipAll.call(of(a, b)).subscribe(
            function(vals) {
                expect(vals).to.deep.equal(r[i++]);
            }, null,
            function() {
                done();
            });
    });
    it("should combine an immediately-scheduled source with an immediately-scheduled second", function(done) {
        var a = of(1, 2, 3, Scheduler);
        var b = of(4, 5, 6, 7, 8, Scheduler);
        var r = [[1, 4], [2, 5], [3, 6]];
        var i = 0;
        zip.call(a, b).subscribe(
            function(vals) {
                expect(vals).to.deep.equal(r[i++]);
            }, null,
            function() {
                done();
            });
    });
});