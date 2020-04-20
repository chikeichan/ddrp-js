import {readTestData} from '../testutil/testData';
import {createRefhash} from './refhash';
import {promisify} from 'util';
import {decodeEnvelope} from './Envelope';
import {BufferView} from '../io/BufferView';
import {assert} from 'chai';

describe('refhash', () => {
  it('should generate correct refhashes', async () => {
    const inputs: { file: string, hash: string }[] = [
      {
        file: 'post.bin',
        hash: '7688d5d8585be74db8f550a230d263aef09c6c2b98d0975cc9c6468ce4158a9c',
      },
      {
        file: 'post-adata.bin',
        hash: '1e3526792cde50a6abd17c5437b6f6708c2c7d0a5e7b64a4a3f9249b39a59648',
      },
      {
        file: 'follow.bin',
        hash: 'b7f9dcbef95e0ded65f6d711c8e922fea33668cfd3b7b16d95abeb23a140201d',
      },
      {
        file: 'block.bin',
        hash: 'ac94e94fa9c34389eeaad6ba80f4c57a3917a2ae57ec731345cc11983130468e',
      },
      {
        file: 'media.bin',
        hash: '32509ac11f20901338a1ea2fa8e7a2bf973ed36f5e1be3de29f6b9558104488b',
      },
      {
        file: 'like.bin',
        hash: 'b94e61e38d06301d85ca6813cd56a7060557c615cd2f8e98238024526bd3c267',
      },
      {
        file: 'pin.bin',
        hash: '6baf001bd8524023df64621f83fa05a7d81c0470edef724d2ccfcf69941770a9',
      },
      {
        file: 'unknown.bin',
        hash: '2aeaf841b3d7a59464e0f0715f48a8a80d4cbe0461ee73c1e017816f6cf35222',
      },
    ];
    const pDecodeEnvelope = promisify(decodeEnvelope);

    for (const input of inputs) {
      const file = await readTestData(input.file);
      const envelope = await pDecodeEnvelope(new BufferView(file));
      const refhash = await createRefhash(envelope!, 'testsub', 'testtld');
      assert.equal(refhash.toString('hex'), input.hash);
    }
  });
});