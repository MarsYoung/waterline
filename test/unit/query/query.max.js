var Waterline = require('../../../lib/waterline'),
    assert = require('assert');

describe('Collection sum', function () {

  describe('.min()', function () {
    var query;

    before(function (done) {

      var waterline = new Waterline();
      var Model = Waterline.Collection.extend({
        identity: 'user',
        adapter: 'foo',
        attributes: {
          age: 'integer',
          percent: 'float'
        }
      });

      waterline.loadCollection(Model);

      // Fixture Adapter Def
      var adapterDef = {
        find: function (col, criteria, cb) {
          return cb(null, [criteria]);
        }
      };

      waterline.initialize({ adapters: { foo: adapterDef }}, function (err, colls) {
        if (err) return done(err);
        query = colls.user;
        done();
      });
    });

    it('should return criteria with sum set', function (done) {
      query.find()
      .sum('age', 'percent')
      .exec(function (err, obj) {
        if (err) return done(err);

        assert(obj[0].sum[0] === 'age');
        assert(obj[0].sum[1] === 'percent');
        done();
      });
    });

    it('should accept an array', function (done) {
      query.find()
      .sum(['age', 'percent'])
      .exec(function (err, obj) {
        if (err) return done(err);

        assert(obj[0].sum[0] === 'age');
        assert(obj[0].sum[1] === 'percent');
        done();
      });
    });

  });
});
