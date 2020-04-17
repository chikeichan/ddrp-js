import {DDRPClient as RPCClient} from './proto/api_grpc_pb';
import * as grpc from 'grpc';
import {
  AddPeerReq,
  BanPeerReq,
  BlobInfoReq,
  BlobInfoRes,
  CheckoutReq,
  CommitReq,
  ListBlobInfoReq,
  PreCommitReq,
  QueryPeersReq,
  QueryPeersRes,
  ReadAtReq,
  SendUpdateReq,
  TruncateReq,
  UnbanPeerReq,
  WriteReq
} from './proto/api_pb';
import {Peer} from './Peer';
import {BlobInfo} from './BlobInfo';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb';

/**
 * The base gRPC client used to interact with DDRPD nodes.
 */
export default class DDRPDClient {
  private readonly client: RPCClient;

  /**
   * Constructs a new client.
   *
   * @param url - Hostname and port of the DDRPD node's RPC server.
   * @param credentials - Unused at this time.
   */
  constructor (url: string, credentials = grpc.credentials.createInsecure()) {
    this.client = new RPCClient(url, credentials);
  }

  /**
   * Send Update
   */
  sendUpdate (name: string): Promise<void> {
    const req = new SendUpdateReq();
    req.setName(name);

    return new Promise((resolve, reject) => this.client.sendUpdate(req, (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    }));
  }

  /**
   * Connects to a peer.
   */
  addPeer (peerId: Buffer, ip: string, port: number): Promise<void> {
    const req = new AddPeerReq();
    req.setAddr(`${ip}:${port}`);
    req.setPeerid(peerId);

    return new Promise((resolve, reject) => this.client.addPeer(req, (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    }));
  }

  /**
   * Returns the DDRPD node's list of connected peers.
   */
  getPeers (includeConnected = true, includeStored = false, includeBanned = false): Promise<Peer[]> {
    const req = new QueryPeersReq();
    req.setIncludeconnected(includeConnected);
    req.setIncludestored(includeStored);
    req.setIncludebanned(includeBanned);
    const stream = this.client.queryPeers(req);

    return new Promise((resolve, reject) => {
      const out: Peer[] = [];

      stream.on('data', (peer: QueryPeersRes) => out.push({
        peerId: Buffer.from(peer.getPeerid_asU8()).toString('hex'),
        ip: this.decodeIP(peer.getIp_asU8()),
        port: peer.getPort(),
        isBanned: peer.getBanned(),
        sentBytes: peer.getSentbytes(),
        receivedBytes: peer.getRecvbytes(),
      }));

      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(out));
    });
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

      resolve({
        name,
        publicKey: Buffer.from(res!.getPublickey_asU8()).toString('hex'),
        timestamp: res!.getTimestamp() * 1000,
        merkleRoot: Buffer.from(res!.getMerkleroot_asU8()).toString('hex'),
      });
    }));
  }

  streamBlobInfo (start: string, limit: number, cb: (info: BlobInfo) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      let sent = 0;
      const req = new ListBlobInfoReq();
      req.setStart(start);
      const stream = this.client.listBlobInfo(req);
      stream.on('data', (res: BlobInfoRes) => {
        if (sent === limit) {
          return;
        }
        cb({
          name: res.getName(),
          publicKey: Buffer.from(res!.getPublickey_asU8()).toString('hex'),
          timestamp: res!.getTimestamp() * 1000,
          merkleRoot: Buffer.from(res!.getMerkleroot_asU8()).toString('hex'),
        });
        sent++;
        if (sent === limit) {
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

  headerCount (): Promise<number> {
    return new Promise((resolve, reject) => {
      const req = new Empty();
      this.client.countHeaders(req, (err, res) => {
        if (err) {
          return reject(err);
        }

        resolve(res!.getCount());
      });
    });
  }

  private decodeIP (ip: Uint8Array): string {
    if (ip.length !== 4) {
      throw new Error('mal-formed IP');
    }

    return `${ip[0]}.${ip[1]}.${ip[2]}.${ip[3]}`;
  }
}
