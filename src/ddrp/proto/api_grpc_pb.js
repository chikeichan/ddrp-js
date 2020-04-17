// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var api_pb = require('./api_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_AddPeerReq(arg) {
  if (!(arg instanceof api_pb.AddPeerReq)) {
    throw new Error('Expected argument of type AddPeerReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AddPeerReq(buffer_arg) {
  return api_pb.AddPeerReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_BanPeerReq(arg) {
  if (!(arg instanceof api_pb.BanPeerReq)) {
    throw new Error('Expected argument of type BanPeerReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_BanPeerReq(buffer_arg) {
  return api_pb.BanPeerReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_BlobInfoReq(arg) {
  if (!(arg instanceof api_pb.BlobInfoReq)) {
    throw new Error('Expected argument of type BlobInfoReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_BlobInfoReq(buffer_arg) {
  return api_pb.BlobInfoReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_BlobInfoRes(arg) {
  if (!(arg instanceof api_pb.BlobInfoRes)) {
    throw new Error('Expected argument of type BlobInfoRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_BlobInfoRes(buffer_arg) {
  return api_pb.BlobInfoRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CheckoutReq(arg) {
  if (!(arg instanceof api_pb.CheckoutReq)) {
    throw new Error('Expected argument of type CheckoutReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CheckoutReq(buffer_arg) {
  return api_pb.CheckoutReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CheckoutRes(arg) {
  if (!(arg instanceof api_pb.CheckoutRes)) {
    throw new Error('Expected argument of type CheckoutRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CheckoutRes(buffer_arg) {
  return api_pb.CheckoutRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CommitReq(arg) {
  if (!(arg instanceof api_pb.CommitReq)) {
    throw new Error('Expected argument of type CommitReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CommitReq(buffer_arg) {
  return api_pb.CommitReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CommitRes(arg) {
  if (!(arg instanceof api_pb.CommitRes)) {
    throw new Error('Expected argument of type CommitRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CommitRes(buffer_arg) {
  return api_pb.CommitRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CountHeadersRes(arg) {
  if (!(arg instanceof api_pb.CountHeadersRes)) {
    throw new Error('Expected argument of type CountHeadersRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CountHeadersRes(buffer_arg) {
  return api_pb.CountHeadersRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetConfigRes(arg) {
  if (!(arg instanceof api_pb.GetConfigRes)) {
    throw new Error('Expected argument of type GetConfigRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetConfigRes(buffer_arg) {
  return api_pb.GetConfigRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetStatusRes(arg) {
  if (!(arg instanceof api_pb.GetStatusRes)) {
    throw new Error('Expected argument of type GetStatusRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetStatusRes(buffer_arg) {
  return api_pb.GetStatusRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ListBlobInfoReq(arg) {
  if (!(arg instanceof api_pb.ListBlobInfoReq)) {
    throw new Error('Expected argument of type ListBlobInfoReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ListBlobInfoReq(buffer_arg) {
  return api_pb.ListBlobInfoReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PreCommitReq(arg) {
  if (!(arg instanceof api_pb.PreCommitReq)) {
    throw new Error('Expected argument of type PreCommitReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PreCommitReq(buffer_arg) {
  return api_pb.PreCommitReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PreCommitRes(arg) {
  if (!(arg instanceof api_pb.PreCommitRes)) {
    throw new Error('Expected argument of type PreCommitRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PreCommitRes(buffer_arg) {
  return api_pb.PreCommitRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_QueryPeersReq(arg) {
  if (!(arg instanceof api_pb.QueryPeersReq)) {
    throw new Error('Expected argument of type QueryPeersReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_QueryPeersReq(buffer_arg) {
  return api_pb.QueryPeersReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_QueryPeersRes(arg) {
  if (!(arg instanceof api_pb.QueryPeersRes)) {
    throw new Error('Expected argument of type QueryPeersRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_QueryPeersRes(buffer_arg) {
  return api_pb.QueryPeersRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ReadAtReq(arg) {
  if (!(arg instanceof api_pb.ReadAtReq)) {
    throw new Error('Expected argument of type ReadAtReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ReadAtReq(buffer_arg) {
  return api_pb.ReadAtReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ReadAtRes(arg) {
  if (!(arg instanceof api_pb.ReadAtRes)) {
    throw new Error('Expected argument of type ReadAtRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ReadAtRes(buffer_arg) {
  return api_pb.ReadAtRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ReadReq(arg) {
  if (!(arg instanceof api_pb.ReadReq)) {
    throw new Error('Expected argument of type ReadReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ReadReq(buffer_arg) {
  return api_pb.ReadReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ReadRes(arg) {
  if (!(arg instanceof api_pb.ReadRes)) {
    throw new Error('Expected argument of type ReadRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ReadRes(buffer_arg) {
  return api_pb.ReadRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SendUpdateReq(arg) {
  if (!(arg instanceof api_pb.SendUpdateReq)) {
    throw new Error('Expected argument of type SendUpdateReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SendUpdateReq(buffer_arg) {
  return api_pb.SendUpdateReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SendUpdateRes(arg) {
  if (!(arg instanceof api_pb.SendUpdateRes)) {
    throw new Error('Expected argument of type SendUpdateRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SendUpdateRes(buffer_arg) {
  return api_pb.SendUpdateRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TruncateReq(arg) {
  if (!(arg instanceof api_pb.TruncateReq)) {
    throw new Error('Expected argument of type TruncateReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TruncateReq(buffer_arg) {
  return api_pb.TruncateReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UnbanPeerReq(arg) {
  if (!(arg instanceof api_pb.UnbanPeerReq)) {
    throw new Error('Expected argument of type UnbanPeerReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UnbanPeerReq(buffer_arg) {
  return api_pb.UnbanPeerReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_WriteReq(arg) {
  if (!(arg instanceof api_pb.WriteReq)) {
    throw new Error('Expected argument of type WriteReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_WriteReq(buffer_arg) {
  return api_pb.WriteReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var DDRPService = exports.DDRPService = {
  getStatus: {
    path: '/DDRP/GetStatus',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: api_pb.GetStatusRes,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_GetStatusRes,
    responseDeserialize: deserialize_GetStatusRes,
  },
  getConfig: {
    path: '/DDRP/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: api_pb.GetConfigRes,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_GetConfigRes,
    responseDeserialize: deserialize_GetConfigRes,
  },
  addPeer: {
    path: '/DDRP/AddPeer',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.AddPeerReq,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_AddPeerReq,
    requestDeserialize: deserialize_AddPeerReq,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  unbanPeer: {
    path: '/DDRP/UnbanPeer',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.UnbanPeerReq,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_UnbanPeerReq,
    requestDeserialize: deserialize_UnbanPeerReq,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  banPeer: {
    path: '/DDRP/BanPeer',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.BanPeerReq,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_BanPeerReq,
    requestDeserialize: deserialize_BanPeerReq,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  queryPeers: {
    path: '/DDRP/QueryPeers',
    requestStream: false,
    responseStream: true,
    requestType: api_pb.QueryPeersReq,
    responseType: api_pb.QueryPeersRes,
    requestSerialize: serialize_QueryPeersReq,
    requestDeserialize: deserialize_QueryPeersReq,
    responseSerialize: serialize_QueryPeersRes,
    responseDeserialize: deserialize_QueryPeersRes,
  },
  checkout: {
    path: '/DDRP/Checkout',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.CheckoutReq,
    responseType: api_pb.CheckoutRes,
    requestSerialize: serialize_CheckoutReq,
    requestDeserialize: deserialize_CheckoutReq,
    responseSerialize: serialize_CheckoutRes,
    responseDeserialize: deserialize_CheckoutRes,
  },
  write: {
    path: '/DDRP/Write',
    requestStream: true,
    responseStream: false,
    requestType: api_pb.WriteReq,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_WriteReq,
    requestDeserialize: deserialize_WriteReq,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  truncate: {
    path: '/DDRP/Truncate',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.TruncateReq,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_TruncateReq,
    requestDeserialize: deserialize_TruncateReq,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  preCommit: {
    path: '/DDRP/PreCommit',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.PreCommitReq,
    responseType: api_pb.PreCommitRes,
    requestSerialize: serialize_PreCommitReq,
    requestDeserialize: deserialize_PreCommitReq,
    responseSerialize: serialize_PreCommitRes,
    responseDeserialize: deserialize_PreCommitRes,
  },
  commit: {
    path: '/DDRP/Commit',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.CommitReq,
    responseType: api_pb.CommitRes,
    requestSerialize: serialize_CommitReq,
    requestDeserialize: deserialize_CommitReq,
    responseSerialize: serialize_CommitRes,
    responseDeserialize: deserialize_CommitRes,
  },
  read: {
    path: '/DDRP/Read',
    requestStream: false,
    responseStream: true,
    requestType: api_pb.ReadReq,
    responseType: api_pb.ReadRes,
    requestSerialize: serialize_ReadReq,
    requestDeserialize: deserialize_ReadReq,
    responseSerialize: serialize_ReadRes,
    responseDeserialize: deserialize_ReadRes,
  },
  readAt: {
    path: '/DDRP/ReadAt',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.ReadAtReq,
    responseType: api_pb.ReadAtRes,
    requestSerialize: serialize_ReadAtReq,
    requestDeserialize: deserialize_ReadAtReq,
    responseSerialize: serialize_ReadAtRes,
    responseDeserialize: deserialize_ReadAtRes,
  },
  getBlobInfo: {
    path: '/DDRP/GetBlobInfo',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.BlobInfoReq,
    responseType: api_pb.BlobInfoRes,
    requestSerialize: serialize_BlobInfoReq,
    requestDeserialize: deserialize_BlobInfoReq,
    responseSerialize: serialize_BlobInfoRes,
    responseDeserialize: deserialize_BlobInfoRes,
  },
  listBlobInfo: {
    path: '/DDRP/ListBlobInfo',
    requestStream: false,
    responseStream: true,
    requestType: api_pb.ListBlobInfoReq,
    responseType: api_pb.BlobInfoRes,
    requestSerialize: serialize_ListBlobInfoReq,
    requestDeserialize: deserialize_ListBlobInfoReq,
    responseSerialize: serialize_BlobInfoRes,
    responseDeserialize: deserialize_BlobInfoRes,
  },
  countHeaders: {
    path: '/DDRP/CountHeaders',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: api_pb.CountHeadersRes,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_CountHeadersRes,
    responseDeserialize: deserialize_CountHeadersRes,
  },
  sendUpdate: {
    path: '/DDRP/SendUpdate',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.SendUpdateReq,
    responseType: api_pb.SendUpdateRes,
    requestSerialize: serialize_SendUpdateReq,
    requestDeserialize: deserialize_SendUpdateReq,
    responseSerialize: serialize_SendUpdateRes,
    responseDeserialize: deserialize_SendUpdateRes,
  },
};

exports.DDRPClient = grpc.makeGenericClientConstructor(DDRPService);
