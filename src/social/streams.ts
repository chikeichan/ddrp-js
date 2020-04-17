import {EOF, Reader} from '../io/types';
import {decodeEnvelopeBuffer, Envelope} from './Envelope';
import {decodeVariableBytes} from '../io/decoding';
import {BufferView} from '../io/BufferView';

/**
 * Reads a single envelope from a Reader. If an envelope length of 0 is
 * encountered, iterateEnvelope will call the callback with a null
 * err and envelope argument in order to facilitate reading from
 * sparse sources.
 *
 * @param r
 * @param cb
 */
export function iterateEnvelope (r: Reader, cb: (err: any, envelope: Envelope | null) => void): void {
  decodeVariableBytes(r, (err, b) => {
    if (err) {
      return cb(err, null);
    }
    if (b!.length === 0) {
      return cb(null, null);
    }
    decodeEnvelopeBuffer(new BufferView(b!), (err, envelope) => {
      if (err) {
        return cb(err, null);
      }
      return cb(null, envelope!);
    });
  });
}

/**
 * Reads all envelopes from a Reader, skipping null bytes until either EOF
 * or an envelope is reached. The callback function is expected to return a
 * boolean signifying whether iteration should continue.
 *
 * @param r
 * @param cb
 */
export function iterateAllEnvelopes (r: Reader, cb: (err: any, envelope: Envelope | null) => boolean) {
  const doIterate = () => iterateEnvelope(r, (err, envelope) => {
    if (err == EOF) {
      return cb(null, null);
    }
    if (err) {
      return cb(err, null);
    }
    if (envelope === null) {
      doIterate();
      return;
    }
    if (cb(null, envelope!)) {
      setImmediate(doIterate);
      return;
    }
    cb(null, null);
  });
  doIterate();
}