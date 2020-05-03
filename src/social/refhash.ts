import {encodeEnvelopeMessage, Envelope} from './Envelope';
import blake2b from 'blake2b';
import {encodeTimestampSync, encodeUint32Sync, encodeUint8Sync} from '../io/encoding';
import {MutableBuffer} from '../io/MutableBuffer';
import {ZERO_BUFFER} from '../io/util';

export async function createRefhash (envelope: Envelope, subdomain: string, tld: string): Promise<Buffer> {
  const h = blake2b(32);
  h.update(envelope.message.type);
  h.update(encodeUint8Sync(envelope.message.version));
  h.update(envelope.message.subtype);
  h.update(encodeUint32Sync(envelope.id));
  h.update(encodeTimestampSync(envelope.timestamp));
  const msgBuf = new MutableBuffer();
  await new Promise((resolve, reject) => encodeEnvelopeMessage(msgBuf, envelope, (err, _) => {
    if (err) {
      return reject(err);
    }
    resolve();
  }));
  h.update(msgBuf.bytes());
  h.update(envelope.additionalData ? envelope.additionalData : ZERO_BUFFER);
  h.update(Buffer.from(subdomain, 'utf-8'));
  h.update(Buffer.from(tld, 'utf-8'));
  Buffer.from(tld, 'hex');
  return Buffer.from(h.digest());
}