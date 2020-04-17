import {sealAndSign} from './signatures';
import {assert} from 'chai';
import SECP256k1Signer from './signer';

describe('sealAndSign', () => {
  it('should calculate the correct signature', function () {
    const signer = SECP256k1Signer.fromHexPrivateKey('86d4da79175bf6984ef62676a20069d35527c45ccc398d46b7fdb9b0783cccf7');
    const sig = sealAndSign(signer, 'testname', new Date(0), Buffer.alloc(32));
    assert.equal(sig.toString('hex'), '1bae1a5f1573a92dd48c18958030cee51810a399b71439ad2f44542e76ad18a8994f99f22bb321fe74595945c420d32e7fa2f574672e4481c99de6f87e1717b8ba');
  });
});
