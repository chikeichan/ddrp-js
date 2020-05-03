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
        hash: 'c9ef8d7e86c6a56565a5ce99e0239afc3ce361a274c85bb60d7aa5bbb01fa21e',
      },
      {
        file: 'post-adata.bin',
        hash: 'a2c5f25ffcb2f8bbf408a9d2245ef436773a0625e61226ee0b7ee23e936cc393',
      },
      {
        file: 'follow.bin',
        hash: '2268b954a249277e4271349a9998ffd1b1ad41d6d50ad31d909bdae2830f094a',
      },
      {
        file: 'block.bin',
        hash: '9ba13cd09edc64eb57004ff2597c465cfe8071f25e1d20880605f9834684f331',
      },
      {
        file: 'media.bin',
        hash: '3fefbcf936e50e6b8ed04df992c527767e40f134df7f59054169a4cde57b82f7',
      },
      {
        file: 'like.bin',
        hash: '5d910b4db3907be959f057455c5bba1c7189ee09dfae42aa762977311477df45',
      },
      {
        file: 'pin.bin',
        hash: 'f8cd246a34e9f77d66ccbf4299683dd1da00e37a7cf053ffad0a65f3397e6521',
      },
      {
        file: 'unknown.bin',
        hash: '626bf47ffde1333cb2f34cf8f7a2bb700cd730dc91ba839eb0a6fd19b240266b',
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