import {assertEnvelope} from '../testutil/testData';
import {Connection, ConnectionType} from './Connection';
import {assert} from 'chai';

describe('Connection', () => {
  it('should encode and decode blocks', async () => {
    await assertEnvelope('block.bin', (envelope) => {
      assert.instanceOf(envelope.message, Connection);
      assert.equal((envelope.message as Connection).connectionType(), ConnectionType.BLOCK);
    });
  });

  it('should encode and decode follows', async () => {
    await assertEnvelope('follow.bin', (envelope) => {
      assert.instanceOf(envelope.message, Connection);
      assert.equal((envelope.message as Connection).connectionType(), ConnectionType.FOLLOW);
    });
  });
});