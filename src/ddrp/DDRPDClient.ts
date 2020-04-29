import {DDRPv1Client} from './proto/v1/api_grpc_pb';
import * as grpc from 'grpc';
import {
  AddPeerReq,
  BanPeerReq,
  BlobInfoReq,
  BlobInfoRes,
  CheckoutReq,
  CommitReq,
  Empty,
  ListBlobInfoReq,
  ListPeersReq,
  ListPeersRes,
  PreCommitReq,
  ReadAtReq,
  SendUpdateReq,
  TruncateReq,
  UnbanPeerReq,
  WriteReq
} from './proto/v1/api_pb';
import {Peer} from './Peer';
import {BlobInfo} from './BlobInfo';
import {Status} from './Status';

/**
 * The base gRPC client used to interact with DDRPD nodes.
 */
export default class DDRPDClient {
  private readonly client: DDRPv1Client;

  /**
   * Constructs a new client.
   *
   * @param url - Hostname and port of the DDRPD node's RPC server.
   * @param credentials - Unused at this time.
   */
  constructor (url: string, credentials = grpc.credentials.createInsecure()) {
    this.client = new DDRPv1Client(url, credentials);
  }

  getStatus (): Promise<Status> {
    const req = new Empty();
    return new Promise((resolve, reject) => this.client.getStatus(req, (err, res) => {
      if (err) {
        return reject(err);
      }
      if (!res) {
        return reject(new Error('res is undefined'));
      }

      return {
        peerId: Buffer.from(res.getPeerid_asU8()).toString('hex'),
        peerCount: res.getPeercount(),
        headerCount: res.getHeadercount(),
        txBytes: res.getTxbytes(),
        rxBytes: res.getRxbytes(),
      };
    }));
  }

  /**
   * Connects to a peer.
   */
  addPeer (ip: string, peerId: Buffer = Buffer.alloc(0), verify: boolean = false): Promise<void> {
    const req = new AddPeerReq();
    req.setIp(ip);
    req.setPeerid(peerId);
    req.setVerifypeerid(verify);

    return new Promise((resolve, reject) => this.client.addPeer(req, (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    }));
  }

  /**
   * Bans a peer.
   */
  banPeer (ip: string, durationMS: number): Promise<void> {
    const req = new BanPeerReq();
    req.setIp(ip);
    req.setDurationms(durationMS);

    return new Promise((resolve, reject) => this.client.banPeer(req, (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    }));
  }

  /**
   * Unbans a peer.
   */
  unbanPeer (ip: string): Promise<void> {
    const req = new UnbanPeerReq();
    req.setIp(ip);

    return new Promise((resolve, reject) => this.client.unbanPeer(req, (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    }));
  }

  /**
   * Returns the DDRPD node's list of connected peers.
   */
  listPeers (): Promise<Peer[]> {
    const req = new ListPeersReq();
    const stream = this.client.listPeers(req);

    return new Promise((resolve, reject) => {
      const out: Peer[] = [];

      stream.on('data', (peer: ListPeersRes) => out.push({
        peerId: Buffer.from(peer.getPeerid_asU8()).toString('hex'),
        ip: peer.getIp(),
        isBanned: peer.getBanned(),
        isConnected: peer.getConnected(),
        txBytes: peer.getTxbytes(),
        rxBytes: peer.getRxbytes(),
      }));

      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(out));
    });
  }

  /**
   * Checks out a blob for modification. Returns a transaction ID for
   * use with other methods that modify the blob.
   *
   * @param name - The name of the blob you'd like to check out.
   */
  checkout (name: string): Promise<number> {
    const req = new CheckoutReq();
    req.setName(name);
    return new Promise((resolve, reject) => this.client.checkout(req, (err, res) => {
      if (err) {
        return reject(err);
      }

      resolve(res!.getTxid());
    }));
  }

  /**
   * Opens a write stream suitable for writing DDRP blobs.
   *
   * You'll probably want to wrap this in a [[BlobWriter]].
   * Note that writing to blobs requires them to be checked out
   * using the [[checkout]] method below.
   */
  createWriteStream (): grpc.ClientWritableStream<WriteReq> {
    return this.client.write(() => ({}));
  }

  /**
   * Truncates the blob. Equivalent to setting the blob's contents
   * to all zeroes.
   *
   * @param txId - The transaction ID of the blob being modified.
   */
  truncate (txId: number): Promise<void> {
    const req = new TruncateReq();
    req.setTxid(txId);
    return new Promise((resolve, reject) => this.client.truncate(req, (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    }));
  }

  /**
   * Generates the blob's new Merkle root for local signing.
   *
   * @param txId - The transaction ID of the blob being modified.
   */
  preCommit (txId: number): Promise<Buffer> {
    const req = new PreCommitReq();
    req.setTxid(txId);
    return new Promise((resolve, reject) => this.client.preCommit(req, (err, res) => {
      if (err) {
        return reject(err);
      }

      resolve(Buffer.from(res!.getMerkleroot_asU8()));
    }));
  }

  /**
   * Commits pending blob modifications associated with the `txId`.
   *
   * @param txId - The transaction ID of the blob being modified.
   * @param timestamp - The timestamp of the modification.
   * @param signature - The signature of the modification.
   * @param broadcast - Whether or not to gossip this update to DDRP peers.
   */
  commit (txId: number, timestamp: Date, signature: Buffer, broadcast = false): Promise<void> {
    const req = new CommitReq();
    req.setTxid(txId);
    req.setTimestamp(Math.floor(timestamp.getTime() / 1000));
    req.setSignature(signature);
    req.setBroadcast(broadcast);
    return new Promise((resolve, reject) => this.client.commit(req, (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    }));
  }

  /**
   * Reads len data from a blob at the given offset. You will likely want to use
   * [[BlobReader]] rather than this method directly.
   *
   * @param name - The blob's name.
   * @param offset - The offset to start reading from.
   * @param len - The length of the data to read.
   */
  readAt (name: string, offset: number, len: number): Promise<Buffer> {
    const req = new ReadAtReq();
    req.setName(name);
    req.setOffset(offset);
    req.setLen(len);

    return new Promise((resolve, reject) => this.client.readAt(req, (err, res) => {
      if (err) {
        return reject(err);
      }

      resolve(Buffer.from(res!.getData_asU8()));
    }));
  }

  /**
   * Gets metadata about a particular blob.
   *
   * @param name
   */
  getBlobInfo (name: string): Promise<BlobInfo> {
    const req = new BlobInfoReq();
    req.setName(name);
    return new Promise((resolve, reject) => this.client.getBlobInfo(req, (err: any, res?: BlobInfoRes) => {
      if (err) {
        return reject(err);
      }
      if (!res) {
        return reject(new Error('res is undefined'));
      }

      resolve({
        name,
        publicKey: Buffer.from(res.getPublickey_asU8()).toString('hex'),
        importHeight: res.getImportheight(),
        timestamp: res.getTimestamp() * 1000,
        merkleRoot: Buffer.from(res.getMerkleroot_asU8()).toString('hex'),
        reservedRoot: Buffer.from(res.getReservedroot_asU8()).toString('hex'),
        receivedAt: res.getReceivedat() * 1000,
        signature: Buffer.from(res.getSignature_asU8()).toString('hex'),
        timebank: res.getTimebank(),
      });
    }));
  }

  /**
   * Streams [[BlobInfo]] for all names DDRP is aware of.
   *
   * @param start
   * @param limit
   * @param cb
   */
  streamBlobInfo (start: string, limit: number, cb: (info: BlobInfo) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      let count = 0;
      const req = new ListBlobInfoReq();
      req.setStart(start);
      const stream = this.client.listBlobInfo(req);
      stream.on('data', (res: BlobInfoRes) => {
        if (count === limit) {
          return;
        }
        cb({
          name: res.getName(),
          publicKey: Buffer.from(res.getPublickey_asU8()).toString('hex'),
          importHeight: res.getImportheight(),
          timestamp: res.getTimestamp() * 1000,
          merkleRoot: Buffer.from(res.getMerkleroot_asU8()).toString('hex'),
          reservedRoot: Buffer.from(res.getReservedroot_asU8()).toString('hex'),
          receivedAt: res.getReceivedat() * 1000,
          signature: Buffer.from(res.getSignature_asU8()).toString('hex'),
          timebank: res.getTimebank(),
        });
        count++;
        if (count === limit) {
          stream.destroy();
        }
      });
      stream.on('err', (err: any) => reject(err));
      stream.on('end', () => {
        stream.destroy();
        resolve();
      });
    });
  }

  /**
   * Send Update
   */
  sendUpdate (name: string): Promise<number> {
    const req = new SendUpdateReq();
    req.setName(name);

    return new Promise((resolve, reject) => this.client.sendUpdate(req, (err, res) => {
      if (err) {
        return reject(err);
      }
      if (!res) {
        return reject(new Error('res is undefined'));
      }

      resolve(res.getRecipientcount());
    }));
  }
}
