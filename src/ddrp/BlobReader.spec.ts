import DDRPDClient from './DDRPDClient';
import {BufferedReader} from '../io/BufferedReader';
import {BlobReader} from './BlobReader';
import {readAll} from '../io/util';
import {assert} from 'chai';
import crypto = require('crypto');

describe('BlobReader', () => {
  before(function () {
    if (!process.env.DDRP_URL) {
      this.skip();
    }
  });

  it('should read blobs', (done) => {
    const client = new DDRPDClient(process.env.DDRP_URL!);
    const r = new BufferedReader(new BlobReader('transistor', client), 1024*1024);
    const h = crypto.createHash('sha1');
    readAll(r, (err, data) => {
      if (err) {
        done(err);
        return;
      }
      h.update(data!);
      assert.equal(h.digest('hex'), '446cf9ee53a31c3ca35d1412718dab41ba639bb8');
      done();
    });
  }).timeout(10000);
});