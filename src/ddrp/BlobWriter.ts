import {IOCallback, Writer} from '../io/types';
import DDRPDClient from './DDRPDClient';

/**
 * A [[Writer]] that writes data to a DDRP blob via gRPC.
 * Users must first check-out a blob via [[DDRPDClient.checkout]]
 * to receive a txId. Blob updates made via [[BlobWriter]] must
 * be committed separately.
 */
export default class BlobWriter implements Writer {
  private readonly client: DDRPDClient;

  private readonly txId: number;

  private offset: number;

  /**
   * Constructs a new BlobWriter.
   *
   * @param client - A gRPC write stream. Returned by [[DDRPDClient.createWriteStream]].
   * @param txId - The transaction ID of the blob being modified. Returned by [[DDRPDClient.checkout]].
   * @param offset - The offset to start writing at.
   */
  constructor (client: DDRPDClient, txId: number, offset = 0) {
    this.client = client;
    this.txId = txId;
    this.offset = offset;
  }

  write (buf: Buffer, cb: IOCallback): void {
    this.client.writeAt(this.txId, this.offset, buf)
      .then((res) => {
        const bytesWritten = res.getByteswritten();
        const writeErr = res.getWriteerr();
        this.offset += bytesWritten;
        cb(writeErr ? new Error(`Error while writing: ${writeErr}`) : null, bytesWritten);
      }, (err) => cb(err, 0));
  }
}