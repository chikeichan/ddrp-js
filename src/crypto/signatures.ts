import {sealHash} from './hash';
import {Signer} from './signer';

/**
 * Generates a blob's seal hash and signs it. Used to authorize changes to a blob
 * prior to it being committed using [[DDRPDClient.commit]]. Most of this method's
 * parameters can be obtained by calling [[DDRPDClient.preCommit]].
 *
 * @param signer - The signer used to sign this blob.
 * @param name - The blob's TLD.
 * @param timestamp - The blob's modification timestamp.
 * @param merkleRoot - The Merkle root of the blob.
 */
export function sealAndSign (signer: Signer, name: string, timestamp: Date, merkleRoot: Buffer): Buffer {
  const hash = sealHash(name, timestamp, merkleRoot);
  return signer.sign(hash);
}
