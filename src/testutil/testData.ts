import * as path from 'path';
import {BufferView} from '../io/BufferView';
import {decodeEnvelope, encodeEnvelope, Envelope} from '../social/Envelope';
import {MutableBuffer} from '../io/MutableBuffer';
import {assert} from 'chai';
import fs = require('fs');

export const testDataPath = path.join(__dirname, '..', '..', 'testdata');

export function readTestData (filename: string): Promise<Buffer> {
  return fs.promises.readFile(path.join(testDataPath, filename));
}

export async function assertEnvelope (filename: string, additionalChecks?: (envelope: Envelope) => void) {
  const expBuf = await readTestData(filename);
  const r = new BufferView(expBuf);
  const envelope = await new Promise<Envelope>((resolve, reject) => decodeEnvelope(r, (err, envelope) => {
    if (err) {
      return reject(err);
    }
    resolve(envelope!);
  }));
  const actBuf = new MutableBuffer();
  await new Promise((resolve, reject) => encodeEnvelope(actBuf, envelope, (err, _) => {
    if (err) {
      return reject(err);
    }
    resolve();
  }));
  assert.equal(actBuf.bytes().toString('hex'), expBuf.toString('hex'));
  if (additionalChecks) {
    additionalChecks(envelope);
  }
}