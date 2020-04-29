// GENERATED CODE -- DO NOT EDIT!

// package: 
// file: api.proto

import * as api_pb from "./api_pb";
import * as grpc from "grpc";

interface IDDRPv1Service extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getStatus: grpc.MethodDefinition<api_pb.Empty, api_pb.GetStatusRes>;
  addPeer: grpc.MethodDefinition<api_pb.AddPeerReq, api_pb.Empty>;
  banPeer: grpc.MethodDefinition<api_pb.BanPeerReq, api_pb.Empty>;
  unbanPeer: grpc.MethodDefinition<api_pb.UnbanPeerReq, api_pb.Empty>;
  listPeers: grpc.MethodDefinition<api_pb.ListPeersReq, api_pb.ListPeersRes>;
  checkout: grpc.MethodDefinition<api_pb.CheckoutReq, api_pb.CheckoutRes>;
  write: grpc.MethodDefinition<api_pb.WriteReq, api_pb.Empty>;
  truncate: grpc.MethodDefinition<api_pb.TruncateReq, api_pb.Empty>;
  preCommit: grpc.MethodDefinition<api_pb.PreCommitReq, api_pb.PreCommitRes>;
  commit: grpc.MethodDefinition<api_pb.CommitReq, api_pb.CommitRes>;
  readAt: grpc.MethodDefinition<api_pb.ReadAtReq, api_pb.ReadAtRes>;
  getBlobInfo: grpc.MethodDefinition<api_pb.BlobInfoReq, api_pb.BlobInfoRes>;
  listBlobInfo: grpc.MethodDefinition<api_pb.ListBlobInfoReq, api_pb.BlobInfoRes>;
  sendUpdate: grpc.MethodDefinition<api_pb.SendUpdateReq, api_pb.SendUpdateRes>;
}

export const DDRPv1Service: IDDRPv1Service;

export class DDRPv1Client extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getStatus(argument: api_pb.Empty, callback: grpc.requestCallback<api_pb.GetStatusRes>): grpc.ClientUnaryCall;
  getStatus(argument: api_pb.Empty, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.GetStatusRes>): grpc.ClientUnaryCall;
  getStatus(argument: api_pb.Empty, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.GetStatusRes>): grpc.ClientUnaryCall;
  addPeer(argument: api_pb.AddPeerReq, callback: grpc.requestCallback<api_pb.Empty>): grpc.ClientUnaryCall;
  addPeer(argument: api_pb.AddPeerReq, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.Empty>): grpc.ClientUnaryCall;
  addPeer(argument: api_pb.AddPeerReq, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.Empty>): grpc.ClientUnaryCall;
  banPeer(argument: api_pb.BanPeerReq, callback: grpc.requestCallback<api_pb.Empty>): grpc.ClientUnaryCall;
  banPeer(argument: api_pb.BanPeerReq, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.Empty>): grpc.ClientUnaryCall;
  banPeer(argument: api_pb.BanPeerReq, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.Empty>): grpc.ClientUnaryCall;
  unbanPeer(argument: api_pb.UnbanPeerReq, callback: grpc.requestCallback<api_pb.Empty>): grpc.ClientUnaryCall;
  unbanPeer(argument: api_pb.UnbanPeerReq, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.Empty>): grpc.ClientUnaryCall;
  unbanPeer(argument: api_pb.UnbanPeerReq, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.Empty>): grpc.ClientUnaryCall;
  listPeers(argument: api_pb.ListPeersReq, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<api_pb.ListPeersRes>;
  listPeers(argument: api_pb.ListPeersReq, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<api_pb.ListPeersRes>;
  checkout(argument: api_pb.CheckoutReq, callback: grpc.requestCallback<api_pb.CheckoutRes>): grpc.ClientUnaryCall;
  checkout(argument: api_pb.CheckoutReq, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.CheckoutRes>): grpc.ClientUnaryCall;
  checkout(argument: api_pb.CheckoutReq, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.CheckoutRes>): grpc.ClientUnaryCall;
  write(callback: grpc.requestCallback<api_pb.Empty>): grpc.ClientWritableStream<api_pb.WriteReq>;
  write(metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.Empty>): grpc.ClientWritableStream<api_pb.WriteReq>;
  write(metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.Empty>): grpc.ClientWritableStream<api_pb.WriteReq>;
  truncate(argument: api_pb.TruncateReq, callback: grpc.requestCallback<api_pb.Empty>): grpc.ClientUnaryCall;
  truncate(argument: api_pb.TruncateReq, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.Empty>): grpc.ClientUnaryCall;
  truncate(argument: api_pb.TruncateReq, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.Empty>): grpc.ClientUnaryCall;
  preCommit(argument: api_pb.PreCommitReq, callback: grpc.requestCallback<api_pb.PreCommitRes>): grpc.ClientUnaryCall;
  preCommit(argument: api_pb.PreCommitReq, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.PreCommitRes>): grpc.ClientUnaryCall;
  preCommit(argument: api_pb.PreCommitReq, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.PreCommitRes>): grpc.ClientUnaryCall;
  commit(argument: api_pb.CommitReq, callback: grpc.requestCallback<api_pb.CommitRes>): grpc.ClientUnaryCall;
  commit(argument: api_pb.CommitReq, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.CommitRes>): grpc.ClientUnaryCall;
  commit(argument: api_pb.CommitReq, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.CommitRes>): grpc.ClientUnaryCall;
  readAt(argument: api_pb.ReadAtReq, callback: grpc.requestCallback<api_pb.ReadAtRes>): grpc.ClientUnaryCall;
  readAt(argument: api_pb.ReadAtReq, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.ReadAtRes>): grpc.ClientUnaryCall;
  readAt(argument: api_pb.ReadAtReq, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.ReadAtRes>): grpc.ClientUnaryCall;
  getBlobInfo(argument: api_pb.BlobInfoReq, callback: grpc.requestCallback<api_pb.BlobInfoRes>): grpc.ClientUnaryCall;
  getBlobInfo(argument: api_pb.BlobInfoReq, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.BlobInfoRes>): grpc.ClientUnaryCall;
  getBlobInfo(argument: api_pb.BlobInfoReq, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.BlobInfoRes>): grpc.ClientUnaryCall;
  listBlobInfo(argument: api_pb.ListBlobInfoReq, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<api_pb.BlobInfoRes>;
  listBlobInfo(argument: api_pb.ListBlobInfoReq, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<api_pb.BlobInfoRes>;
  sendUpdate(argument: api_pb.SendUpdateReq, callback: grpc.requestCallback<api_pb.SendUpdateRes>): grpc.ClientUnaryCall;
  sendUpdate(argument: api_pb.SendUpdateReq, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.SendUpdateRes>): grpc.ClientUnaryCall;
  sendUpdate(argument: api_pb.SendUpdateReq, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_pb.SendUpdateRes>): grpc.ClientUnaryCall;
}
