import DDRPDClient from '../ddrp/DDRPDClient';
import {EnvelopeWriter} from './EnvelopeWriter';
import SECP256k1Signer from '../crypto/signer';
import {readTestData} from '../testutil/testData';
import {decodeEnvelope} from './Envelope';
import {BufferView} from '../io/BufferView';
import {BlobReader} from '../ddrp/BlobReader';
import {readAll} from '../io/util';
import {assert} from 'chai';
import util = require('util');
import crypto = require('crypto');

describe('EnvelopeWriter', () => {
  before(function () {
    if (!process.env.DDRP_URL || !process.env.TEST_PRIVATE_KEY || !process.env.TEST_TLD) {
      this.skip();
    }
  });

  it('should write and commit envelopes', async () => {
    const postBuf = await readTestData('post.bin');
    const likeBuf = await readTestData('like.bin');
    const followBuf = await readTestData('follow.bin');
    const pDecodeEnvelope = util.promisify(decodeEnvelope);
    const post = await pDecodeEnvelope(new BufferView(postBuf));
    const like = await pDecodeEnvelope(new BufferView(likeBuf));
    const follow = await pDecodeEnvelope(new BufferView(followBuf));
    const client = new DDRPDClient(process.env.DDRP_URL!);
    const signer = SECP256k1Signer.fromHexPrivateKey(process.env.TEST_PRIVATE_KEY!);
    const writer = new EnvelopeWriter(client, process.env.TEST_TLD!, true, signer);
    await writer.open();
    await writer.writeEnvelope(post!);
    await writer.writeEnvelope(like!);
    await writer.writeEnvelope(follow!);
    await writer.commit();

    const r = new BlobReader(process.env.TEST_TLD!, client);
    const h = crypto.createHash('sha1');
    await new Promise((resolve, reject) => readAll(r, (err, data) => {
      if (err) {
        return reject(err);
      }
      h.update(data!);
      resolve();
    }));
    assert.equal(h.digest('hex'), '0da1dfe2bd6d8b80662e92918e3332017eab1a8b');
  }).timeout(10000);
});