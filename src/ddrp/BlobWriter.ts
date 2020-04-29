import {WriteReq} from './proto/v1/api_pb';
import * as grpc from 'grpc';
import {IOCallback, Writer} from '../io/types';

/**
 * A [[Writer]] that writes data to a DDRP blob via gRPC.
 * Users must first check-out a blob via [[DDRPDClient.checkout]]
 * to receive a txId. Blob updates made via [[BlobWriter]] must
 * be committed separately.
 */
export default class BlobWriter implements Writer {
  private readonly client: grpc.ClientWritableStream<WriteReq>;

  private readonly txId: number;

  private offset: number;

  /**
   * Constructs a new BlobWriter.
   *
   * @param client - A gRPC write stream. Returned by [[DDRPDClient.createWriteStream]].
   * @param txId - The transaction ID of the blob being modified. Returned by [[DDRPDClient.checkout]].
   * @param offset - The offset to start writing at.
   */
  constructor (client: grpc.ClientWritableStream<WriteReq>, txId: number, offset = 0) {
    this.client = client;
    this.txId = txId;
    this.offset = offset;
  }

  write (buf: Buffer, cb: IOCallback): void {
    const req = new WriteReq();
    req.setTxid(this.txId);
    req.setOffset(this.offset);
    req.setData(buf);
    this.client.write(req, (err: Error) => {
      this.offset += buf.length;
      cb(err, err ? buf.length : 0);
    });
  }

  /**
   * Closes the writer, ending the underlying gRPC stream.
   */
  close (): void {
    this.client.end();
  }
}