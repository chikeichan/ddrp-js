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
    const writer = new EnvelopeWriter(client, process.env.TEST_TLD!, signer);
    await writer.open();
    await writer.truncate();
    await writer.writeEnvelope(post!);
    await writer.writeEnvelope(like!);
    await writer.writeEnvelope(follow!);
    await writer.commit(false);

    const r = new BlobReader(process.env.TEST_TLD!, client);
    const h = crypto.createHash('sha1');
    await new Promise((resolve, reject) => readAll(r, (err, data) => {
      if (err) {
        return reject(err);
      }
      h.update(data!);
      resolve();
    }));
    assert.equal(h.digest('hex'), 'fa11b3ea22008ab21e965b21f0ef7af4ee77198c');
  }).timeout(10000);
});