import {IOCallback, Reader, Writer} from '../io/types';
import {chain, chainIO} from '../io/util';
import {decodeString} from '../io/decoding';
import {encodeString} from '../io/encoding';
import {Message} from './Message';

/**
 * Possible subtypes for a [[Connection]] message. A [[Connection]]
 * method whose subtype is not one of the spec-defined types will
 * have a type of [[ConnectionType.UNKNOWN]].
 */
export enum ConnectionType {
  FOLLOW = 'FOLLOW',
  BLOCK = 'BLOCK',
  UNKNOWN = 'UNKNOWN'
}

export class Connection extends Message {
  public static readonly TYPE = Buffer.from([0x43, 0x4E, 0x54]);

  public static readonly FOLLOW_SUBTYPE = Buffer.from([0x46, 0x00, 0x00, 0x00]);

  public static readonly BLOCK_SUBTYPE = Buffer.from([0x42, 0x00, 0x00, 0x00]);

  public readonly tld: string;

  public readonly subdomain: string | null;

  constructor (version: number, subtype: Buffer, tld: string, subdomain: string | null) {
    super(Connection.TYPE, version, subtype);
    this.tld = tld;
    this.subdomain = subdomain;
  }

  public connectionType (): ConnectionType {
    if (this.subtype.equals(Connection.FOLLOW_SUBTYPE)) {
      return ConnectionType.FOLLOW;
    }
    if (this.subtype.equals(Connection.BLOCK_SUBTYPE)) {
      return ConnectionType.BLOCK;
    }
    return ConnectionType.UNKNOWN;
  }
}

/**
 * Encodes a [[Connection]] into a Writer.
 *
 * @param w
 * @param connection
 * @param cb
 */
export function encodeConnection (w: Writer, connection: Connection, cb: IOCallback) {
  chainIO(
    cb,
    (cb) => encodeString(w, connection.tld, cb),
    (cb) => encodeString(w, connection.subdomain || '', cb),
  );
}

/**
 * Decodes a [[Connection]] from a Reader.
 *
 * @param r
 * @param version
 * @param subtype
 * @param cb
 */
export function decodeConnection (r: Reader, version: number, subtype: Buffer, cb: (err: any, connection: Connection | null) => void) {
  let tld: string;
  let subdomain: string | null;
  chain(
    (err) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, new Connection(
        version,
        subtype,
        tld,
        subdomain,
      ));
    },
    (cb) => decodeString(r, (err, s) => {
      if (err) {
        return cb(err);
      }
      tld = s!;
      cb(null);
    }),
    (cb) => decodeString(r, (err, s) => {
      if (err) {
        return cb(err);
      }
      subdomain = s!.length > 0 ? s! : null;
      cb(null);
    })
  );
}