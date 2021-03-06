import blake2b from 'blake2b';
import {encodeStringSync} from '../io/encoding';

/**
 * Returns a blob's seal hash. A blob's seal hash consists of the
 * `blake2b-256` hash of the blob's modification timestamp and
 * its new Merkle root. This hash is then signed and passed to
 * [[DDRPDClient.commit]] to commit changes to a blob post-modification.
 *
 * @param timestamp - The blob's modification timestamp.
 * @param name - The blob's TLD.
 * @param merkleRoot - The Merkle root of the blob.
 */
export function sealHash (name: string, timestamp: Date, merkleRoot: Buffer): Buffer {
  const h = blake2b(32);
  const nameBuf = encodeStringSync(name);
  const timeBuf = Buffer.alloc(4);
  timeBuf.writeUInt32BE(Math.floor(timestamp.getTime() / 1000), 0);
  h.update(Buffer.from('DDRPBLOB', 'ascii'));
  h.update(nameBuf);
  h.update(timeBuf);
  h.update(merkleRoot);
  // include zero reservedRoot
  h.update(Buffer.alloc(32));
  return Buffer.from(h.digest());
}
