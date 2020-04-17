import {assertEnvelope} from '../testutil/testData';
import {assert} from 'chai';
import {Post} from './Post';

describe('Post', () => {
  it('should encode and decode', async () => {
    await assertEnvelope('post.bin', (envelope) => {
      assert.instanceOf(envelope.message, Post);
    });
  });

  it('should encode and decode with additional data', async () => {
    await assertEnvelope('post-adata.bin', (envelope) => {
      assert.instanceOf(envelope.message, Post);
      assert.equal(envelope.additionalData!.toString('hex'), '68657265277320612062756e6368206f6620657874726120646174610000');
    });
  });
});