import {sealHash} from './hash';
import { assert } from 'chai';

describe('sealHash', () => {
  it('should calculate the correct hash', function () {
    const date = new Date(0);
    const zeroHash = Buffer.alloc(32);
    const h = sealHash('testname.', date, zeroHash);
    assert.equal(h.toString('hex'), '257bad656522bce6245a416b533cdcee4dee9c9eee46e539cbb7202d2907c7bd');
  });
});
