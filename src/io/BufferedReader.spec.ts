import {BufferedReader} from './BufferedReader';
import {BufferView} from './BufferView';
import * as util from 'util';
import {assert} from 'chai';
import {EOF} from './types';
import crypto = require('crypto');

describe('BufferedReader', () => {
  it('should support regular reads', async () => {
    const data = crypto.randomBytes(256);
    const br = new BufferedReader(new BufferView(data), 8);
    const readPromise = util.promisify(br.read);

    // get the first five bytes
    const firstFive = Buffer.alloc(5);
    await readPromise(firstFive);
    // get the next five bytes to test a read from the
    // underlying reader
    const secondFive = Buffer.alloc(5);
    await readPromise(secondFive);
    // get another 5 bytes to read within the
    // next buffer
    const thirdFive = Buffer.alloc(5);
    await readPromise(thirdFive);

    assert.deepEqual(firstFive, data.slice(0, 5));
    assert.deepEqual(secondFive, data.slice(5, 10));
    assert.deepEqual(thirdFive, data.slice(10, 15));
  });

  it('should support reads larger than the buffer size', async () => {
    const data = crypto.randomBytes(256);
    const br = new BufferedReader(new BufferView(data), 8);
    const readPromise = util.promisify(br.read);

    // get the first five bytes
    const firstFive = Buffer.alloc(5);
    await readPromise(firstFive);
    // get the next twelve bytes to overflow the
    // buffer size
    const nextTwelve = Buffer.alloc(12);
    await readPromise(nextTwelve);
    // get another 4 bytes to read within the
    // next buffer
    const nextFour = Buffer.alloc(4);
    await readPromise(nextFour);

    assert.deepEqual(firstFive, data.slice(0, 5));
    assert.deepEqual(nextTwelve, data.slice(5, 17));
    assert.deepEqual(nextFour, data.slice(17, 21));
  });

  it('should support reads perfectly within the buffer size', async () => {
    const data = crypto.randomBytes(256);
    const br = new BufferedReader(new BufferView(data), 8);
    const readPromise = util.promisify(br.read);

    const first128 = Buffer.alloc(128);
    await readPromise(first128);
    const second128 = Buffer.alloc(128);
    await readPromise(second128);
    const third128 = Buffer.alloc(128);
    try {
      await readPromise(third128);
      throw new Error('should not get here');
    } catch (e) {
      assert.equal(e, EOF);
    }

    assert.deepEqual(first128, data.slice(0, 128));
    assert.deepEqual(second128, data.slice(128));
  });

  it('should support reading small amounts from the buffer', async () => {
    const data = crypto.randomBytes(256);
    const br = new BufferedReader(new BufferView(data), 128);
    const readPromise = util.promisify(br.read);

    for (let i = 0; i < data.length; i++) {
      const buf = Buffer.alloc(1);
      await readPromise(buf);
      assert.equal(buf[0], data[i]);
    }
  });

  it('should handle EOF behavior - first read is larger than underlying reader', (done) => {
    const data = crypto.randomBytes(256);
    const br = new BufferedReader(new BufferView(data), 8);
    const buf = Buffer.alloc(data.length + 1);
    br.read(buf, (err, n) => {
      assert.equal(err, EOF);
      assert.equal(n, data.length);
      assert.deepEqual(buf.slice(0, data.length), data);
      br.read(Buffer.alloc(1), (err, n) => {
        assert.equal(err, EOF);
        assert.equal(n, 0);
        done();
      });
    });
  });

  it('should handle EOF behavior - boundary read is larger than underlying reader', (done) => {
    const data = crypto.randomBytes(256);
    const br = new BufferedReader(new BufferView(data), 8);
    const buf = Buffer.alloc(data.length - 7);
    br.read(buf, (err, n) => {
      assert.isNull(err);
      assert.equal(n, buf.length);
      assert.deepEqual(buf, data.slice(0, data.length - 7));
      const nextBuf = Buffer.alloc(8);
      br.read(nextBuf, (err, n) => {
        assert.equal(err, EOF);
        assert.equal(n, 7);
        assert.deepEqual(nextBuf.slice(0, 7), data.slice(data.length - 7));
        done();
      });
    });
  });

  it('should handle EOF behavior - bufSize is larger than underlying reader', (done) => {
    const data = crypto.randomBytes(7);
    const br = new BufferedReader(new BufferView(data), 8);
    const buf = Buffer.alloc(3);
    br.read(buf, (err, n) => {
      assert.isNull(err);
      assert.equal(n, buf.length);
      assert.deepEqual(buf, data.slice(0, 3));
      const nextBuf = Buffer.alloc(5);
      br.read(nextBuf, (err, n) => {
        assert.equal(err, EOF);
        assert.equal(n, 4);
        assert.deepEqual(nextBuf.slice(0, 4), data.slice(3));
        done();
      });
    });
  });
});