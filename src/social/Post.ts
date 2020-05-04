import {IOCallback, Reader, Writer} from '../io/types';
import {chain, chainIO, ZERO_HASH} from '../io/util';
import {decodeArray, decodeFixedBytes, decodeString} from '../io/decoding';
import {Message} from './Message';
import {encodeArray, encodeFixedBytes, encodeString} from '../io/encoding';

export class Post extends Message {
  public static readonly TYPE = Buffer.from([0x50, 0x53, 0x54]);

  public readonly body: string;

  public readonly title: string | null;

  public readonly reference: Buffer | null;

  public readonly topic: string | null;

  public readonly tags: string[];

  constructor (version: number, subtype: Buffer, body: string, title: string | null, reference: Buffer | null, topic: string | null, tags: string[]) {
    super(Post.TYPE, version, subtype);
    this.body = body;
    this.title = title;
    this.reference = reference;
    this.topic = topic;
    this.tags = tags;
  }
}

/**
 * Encodes a Post into a Writer.
 *
 * @param w
 * @param post
 * @param cb
 */
export function encodePost (w: Writer, post: Post, cb: IOCallback): void {
  chainIO(
    cb,
    (cb) => encodeString(w, post.body, cb),
    (cb) => encodeString(w, post.title || '', cb),
    (cb) => encodeFixedBytes(w, post.reference || ZERO_HASH, cb),
    (cb) => encodeString(w, post.topic || '', cb),
    (cb) => encodeArray<string>(w, (item, cb) => encodeString(w, item, cb), post.tags, cb)
  );
}

/**
 * Decodes a Post from a Reader.
 *
 * @param r
 * @param version
 * @param subtype
 * @param cb
 */
export function decodePost (r: Reader, version: number, subtype: Buffer, cb: (err: any, message: Post | null) => void): void {
  let body: string;
  let title: string | null;
  let reference: Buffer | null;
  let topic: string | null;
  let tags: string[];
  chain(
    (err) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, new Post(
        version,
        subtype,
        body,
        title,
        reference,
        topic,
        tags,
      ));
    },
    (cb) => decodeString(r, (err, b) => {
      if (err) {
        return cb(err);
      }
      body = b!;
      cb(null);
    }),
    (cb) => decodeString(r, (err, b) => {
      if (err) {
        return cb(err);
      }
      title = b!.length > 0 ? b! : null;
      cb(null);
    }),
    (cb) => decodeFixedBytes(r, 32, (err, b) => {
      if (err) {
        return cb(err);
      }
      reference = b!.equals(ZERO_HASH) ? null : b!;
      cb(null);
    }),
    (cb) => decodeString(r, (err, b) => {
      if (err) {
        return cb(err);
      }
      topic = b!.length > 0 ? b! : null;
      cb(null);
    }),
    (cb) => decodeArray<string>(r, (cb) => decodeString(r, cb), (err, t) => {
      if (err) {
        return cb(err);
      }
      tags = t!;
      cb(null);
    }),
  );
}