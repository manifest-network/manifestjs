import { MsgWithdraw, MsgWithdrawResponse } from '../src/codegen/liftedinit/billing/v1/tx';
import {
  QueryProviderWithdrawableRequest,
  QueryProviderWithdrawableResponse
} from '../src/codegen/liftedinit/billing/v1/query';
import {
  registry,
  MessageComposer
} from '../src/codegen/liftedinit/billing/v1/tx.registry';
import { AminoConverter } from '../src/codegen/liftedinit/billing/v1/tx.amino';
import { BinaryWriter } from '../src/codegen/binary';

const WITHDRAW_TYPE_URL = '/liftedinit.billing.v1.MsgWithdraw';
const WITHDRAW_AMINO_TYPE = 'lifted/billing/MsgWithdraw';

// A representative opaque cursor. The exact bytes are meaningless to the SDK —
// the point of ENG-475 is that they survive a full response -> request round-trip
// unmodified so a client can page provider-wide withdrawal to completion.
const CURSOR = new Uint8Array([0x01, 0x9e, 0x84, 0x5b, 0xff, 0x00, 0x7a]);
const CURSOR_B64 = Buffer.from(CURSOR).toString('base64');

describe('MsgWithdraw.key (opaque pagination cursor)', () => {
  const providerWide: MsgWithdraw = {
    sender: 'manifest1provider',
    leaseUuids: [],
    providerUuid: '019e845b-0000-7000-8000-000000000000',
    limit: BigInt(100),
    key: CURSOR
  };

  it('exposes the expected typeUrl and aminoType', () => {
    expect(MsgWithdraw.typeUrl).toBe(WITHDRAW_TYPE_URL);
    expect(MsgWithdraw.aminoType).toBe(WITHDRAW_AMINO_TYPE);
  });

  it('round-trips a provider-wide withdraw with an opaque key through proto encode/decode', () => {
    const decoded = MsgWithdraw.decode(MsgWithdraw.encode(providerWide).finish());
    expect(decoded).toEqual(providerWide);
    expect(decoded.key).toEqual(CURSOR);
  });

  it('round-trips the key through fromAmino/toAmino as base64', () => {
    const amino = MsgWithdraw.toAmino(providerWide);
    expect(amino.key).toBe(CURSOR_B64);
    expect(MsgWithdraw.fromAmino(amino)).toEqual(providerWide);
  });

  it('emits the key at proto field 5 (wire tag 0x2a)', () => {
    // Encode a message whose only non-default field is the key, so the payload
    // begins with the key's field tag. Field 5, wire type 2 => (5<<3)|2 = 0x2a.
    const bytes = MsgWithdraw.encode(MsgWithdraw.fromPartial({ key: CURSOR })).finish();
    expect(bytes[0]).toBe(0x2a);
    expect(bytes[1]).toBe(CURSOR.length);
  });

  it('omits the key on the wire when empty', () => {
    const bytes = MsgWithdraw.encode(
      MsgWithdraw.fromPartial({ providerUuid: 'provider-uuid' })
    ).finish();
    expect(bytes.includes(0x2a)).toBe(false);
  });

  it('fromPartial defaults the key to an empty Uint8Array', () => {
    expect(MsgWithdraw.fromPartial({}).key).toEqual(new Uint8Array());
  });

  it('decodes a pre-ENG-475 MsgWithdraw (no field 5) with an empty key', () => {
    // What a peer built before the cursor existed would emit: fields 1-4 only.
    const writer = BinaryWriter.create();
    writer.uint32(10).string('manifest1provider'); // sender (field 1)
    writer.uint32(26).string('provider-uuid'); // provider_uuid (field 3)
    writer.uint32(32).uint64(BigInt(50)); // limit (field 4)
    const decoded = MsgWithdraw.decode(writer.finish());
    expect(decoded.key).toEqual(new Uint8Array());
    expect(decoded.providerUuid).toBe('provider-uuid');
    expect(decoded.limit).toBe(BigInt(50));
  });
});

describe('MsgWithdrawResponse.next_key (opaque cursor)', () => {
  const morePages: MsgWithdrawResponse = {
    totalAmounts: [{ denom: 'umfx', amount: '1000' }],
    payoutAddress: 'manifest1payout',
    withdrawalCount: BigInt(50),
    hasMore: true,
    nextKey: CURSOR
  };

  it('round-trips next_key through proto encode/decode', () => {
    const decoded = MsgWithdrawResponse.decode(MsgWithdrawResponse.encode(morePages).finish());
    expect(decoded).toEqual(morePages);
    expect(decoded.nextKey).toEqual(CURSOR);
    expect(decoded.hasMore).toBe(true);
  });

  it('round-trips next_key through fromAmino/toAmino as base64', () => {
    const amino = MsgWithdrawResponse.toAmino(morePages);
    expect(amino.next_key).toBe(CURSOR_B64);
    expect(amino.has_more).toBe(true);
    expect(MsgWithdrawResponse.fromAmino(amino)).toEqual(morePages);
  });

  it('emits next_key at proto field 5 (wire tag 0x2a)', () => {
    const bytes = MsgWithdrawResponse.encode(
      MsgWithdrawResponse.fromPartial({ nextKey: CURSOR })
    ).finish();
    expect(bytes[0]).toBe(0x2a);
    expect(bytes[1]).toBe(CURSOR.length);
  });

  it('emits an empty next_key when the final page is reached', () => {
    const lastPage = MsgWithdrawResponse.fromPartial({ hasMore: false });
    expect(lastPage.nextKey).toEqual(new Uint8Array());
    const bytes = MsgWithdrawResponse.encode(lastPage).finish();
    expect(bytes.includes(0x2a)).toBe(false);
  });
});

describe('provider-wide withdrawal pagination loop (ENG-475 reachability)', () => {
  it('feeds a response next_key straight back into the next request key', () => {
    // Page 1 response advertises another page via an opaque next_key...
    const page = MsgWithdrawResponse.decode(
      MsgWithdrawResponse.encode(
        MsgWithdrawResponse.fromPartial({ hasMore: true, nextKey: CURSOR })
      ).finish()
    );
    expect(page.hasMore).toBe(true);

    // ...which is echoed back as MsgWithdraw.key to fetch page 2. Before ENG-475
    // neither field existed, so this loop was impossible to express.
    const nextRequest = MsgWithdraw.decode(
      MsgWithdraw.encode(
        MsgWithdraw.fromPartial({ providerUuid: 'provider-uuid', key: page.nextKey })
      ).finish()
    );
    expect(nextRequest.key).toEqual(CURSOR);
  });
});

describe('MsgWithdraw registry / composer integration', () => {
  it('registers MsgWithdraw by typeUrl', () => {
    const entry = registry.find(([url]) => url === WITHDRAW_TYPE_URL);
    expect(entry).toBeDefined();
    expect(entry?.[1]).toBe(MsgWithdraw);
  });

  it('carries the cursor through MessageComposer.encoded.withdraw', () => {
    const msg = MsgWithdraw.fromPartial({ providerUuid: 'provider-uuid', key: CURSOR });
    const composed = MessageComposer.encoded.withdraw(msg);
    expect(composed.typeUrl).toBe(WITHDRAW_TYPE_URL);
    expect(MsgWithdraw.decode(composed.value).key).toEqual(CURSOR);
  });

  it('registers an amino converter under the lifted/billing alias', () => {
    expect(AminoConverter[WITHDRAW_TYPE_URL]).toBeDefined();
    expect(AminoConverter[WITHDRAW_TYPE_URL].aminoType).toBe(WITHDRAW_AMINO_TYPE);
  });
});

describe('Query/ProviderWithdrawable — cursor pagination (replaces limit/has_more)', () => {
  it('round-trips the request pagination through proto encode/decode', () => {
    const req = QueryProviderWithdrawableRequest.fromPartial({
      providerUuid: 'provider-uuid',
      pagination: { key: CURSOR, limit: BigInt(100) }
    });
    const decoded = QueryProviderWithdrawableRequest.decode(
      QueryProviderWithdrawableRequest.encode(req).finish()
    );
    expect(decoded.providerUuid).toBe('provider-uuid');
    expect(decoded.pagination?.key).toEqual(CURSOR);
    expect(decoded.pagination?.limit).toBe(BigInt(100));
  });

  it('emits request pagination at proto field 3 (wire tag 0x1a), not the old field 2', () => {
    // Only pagination set => payload begins with its tag. Field 3, wire type 2
    // => (3<<3)|2 = 0x1a. The removed `limit` lived at field 2 (tag 0x10).
    const bytes = QueryProviderWithdrawableRequest.encode(
      QueryProviderWithdrawableRequest.fromPartial({ pagination: { limit: BigInt(5) } })
    ).finish();
    expect(bytes[0]).toBe(0x1a);
  });

  it('no longer exposes the removed `limit` field on the request', () => {
    expect('limit' in QueryProviderWithdrawableRequest.fromPartial({})).toBe(false);
  });

  it('round-trips the response pagination through proto encode/decode', () => {
    const resp = QueryProviderWithdrawableResponse.fromPartial({
      amounts: [{ denom: 'umfx', amount: '5000' }],
      leaseCount: BigInt(42),
      pagination: { nextKey: CURSOR, total: BigInt(0) }
    });
    const decoded = QueryProviderWithdrawableResponse.decode(
      QueryProviderWithdrawableResponse.encode(resp).finish()
    );
    expect(decoded.leaseCount).toBe(BigInt(42));
    expect(decoded.pagination?.nextKey).toEqual(CURSOR);
  });

  it('emits response pagination at proto field 4 (wire tag 0x22)', () => {
    // Field 4, wire type 2 => (4<<3)|2 = 0x22. The removed `has_more` lived at
    // field 3 (tag 0x18).
    const bytes = QueryProviderWithdrawableResponse.encode(
      QueryProviderWithdrawableResponse.fromPartial({ pagination: { nextKey: CURSOR } })
    ).finish();
    expect(bytes[0]).toBe(0x22);
  });

  it('no longer exposes the removed `has_more` field on the response', () => {
    expect('hasMore' in QueryProviderWithdrawableResponse.fromPartial({})).toBe(false);
  });
});
