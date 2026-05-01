import {
  LeaseItem,
  Params,
  CustomDomainTarget,
  Lease,
  LeaseState
} from '../src/codegen/liftedinit/billing/v1/types';
import {
  MsgSetItemCustomDomain,
  MsgSetItemCustomDomainResponse
} from '../src/codegen/liftedinit/billing/v1/tx';
import {
  QueryLeaseByCustomDomainRequest,
  QueryLeaseByCustomDomainResponse
} from '../src/codegen/liftedinit/billing/v1/query';
import {
  registry,
  MessageComposer
} from '../src/codegen/liftedinit/billing/v1/tx.registry';
import { AminoConverter } from '../src/codegen/liftedinit/billing/v1/tx.amino';
import { BinaryWriter } from '../src/codegen/binary';

const TYPE_URL = '/liftedinit.billing.v1.MsgSetItemCustomDomain';
const AMINO_TYPE = 'lifted/billing/MsgSetItemCustomDomain';

describe('MsgSetItemCustomDomain', () => {
  const sample: MsgSetItemCustomDomain = {
    sender: 'manifest1tenant',
    leaseUuid: '0190000-aaaa-7bbb-cccc-ddddeeeeffff',
    serviceName: 'web',
    customDomain: 'app.example.com'
  };

  it('exposes the expected typeUrl and aminoType', () => {
    expect(MsgSetItemCustomDomain.typeUrl).toBe(TYPE_URL);
    expect(MsgSetItemCustomDomain.aminoType).toBe(AMINO_TYPE);
  });

  it('round-trips through proto encode/decode', () => {
    const bytes = MsgSetItemCustomDomain.encode(sample).finish();
    expect(MsgSetItemCustomDomain.decode(bytes)).toEqual(sample);
  });

  it('round-trips through fromAmino/toAmino with snake_case keys', () => {
    const amino = MsgSetItemCustomDomain.toAmino(sample);
    expect(amino).toEqual({
      sender: sample.sender,
      lease_uuid: sample.leaseUuid,
      service_name: sample.serviceName,
      custom_domain: sample.customDomain
    });
    expect(MsgSetItemCustomDomain.fromAmino(amino)).toEqual(sample);
  });

  it('treats an empty custom_domain as a clear (omitted on the wire)', () => {
    const cleared: MsgSetItemCustomDomain = { ...sample, customDomain: '' };
    const bytes = MsgSetItemCustomDomain.encode(cleared).finish();
    // Field 4 (custom_domain) skipped when empty: no 0x22 tag in payload.
    expect(Array.from(bytes).includes(0x22)).toBe(false);
    expect(MsgSetItemCustomDomain.decode(bytes).customDomain).toBe('');
  });

  it('addresses a 1-item legacy lease via empty service_name', () => {
    const legacy: MsgSetItemCustomDomain = {
      ...sample,
      serviceName: ''
    };
    const decoded = MsgSetItemCustomDomain.decode(
      MsgSetItemCustomDomain.encode(legacy).finish()
    );
    expect(decoded.serviceName).toBe('');
    expect(decoded.customDomain).toBe(sample.customDomain);
  });

  it('fromPartial fills defaults for omitted fields', () => {
    expect(MsgSetItemCustomDomain.fromPartial({})).toEqual({
      sender: '',
      leaseUuid: '',
      serviceName: '',
      customDomain: ''
    });
  });

  it('response message encodes to an empty payload', () => {
    const bytes = MsgSetItemCustomDomainResponse.encode({}).finish();
    expect(bytes).toHaveLength(0);
    expect(MsgSetItemCustomDomainResponse.decode(bytes)).toEqual({});
  });
});

describe('Tx registry / amino integration', () => {
  it('registers MsgSetItemCustomDomain by typeUrl', () => {
    const entry = registry.find(([url]) => url === TYPE_URL);
    expect(entry).toBeDefined();
    expect(entry?.[1]).toBe(MsgSetItemCustomDomain);
  });

  it('exposes the message via MessageComposer.encoded.setItemCustomDomain', () => {
    const msg: MsgSetItemCustomDomain = {
      sender: 'manifest1abc',
      leaseUuid: 'uuid-1',
      serviceName: 'web',
      customDomain: 'app.example.com'
    };
    const composed = MessageComposer.encoded.setItemCustomDomain(msg);
    expect(composed.typeUrl).toBe(TYPE_URL);
    expect(MsgSetItemCustomDomain.decode(composed.value)).toEqual(msg);
  });

  it('exposes the message via MessageComposer.withTypeUrl.setItemCustomDomain', () => {
    const msg: MsgSetItemCustomDomain = {
      sender: 'manifest1abc',
      leaseUuid: 'uuid-1',
      serviceName: '',
      customDomain: ''
    };
    const composed = MessageComposer.withTypeUrl.setItemCustomDomain(msg);
    expect(composed).toEqual({ typeUrl: TYPE_URL, value: msg });
  });

  it('registers an amino converter under the lifted/billing alias', () => {
    expect(AminoConverter[TYPE_URL]).toBeDefined();
    expect(AminoConverter[TYPE_URL].aminoType).toBe(AMINO_TYPE);
    expect(AminoConverter[TYPE_URL].toAmino).toBe(MsgSetItemCustomDomain.toAmino);
    expect(AminoConverter[TYPE_URL].fromAmino).toBe(MsgSetItemCustomDomain.fromAmino);
  });
});

describe('LeaseItem.customDomain', () => {
  const item: LeaseItem = {
    skuUuid: 'sku-uuid',
    quantity: BigInt(2),
    lockedPrice: { denom: 'umfx', amount: '1000' },
    serviceName: 'web',
    customDomain: 'web.example.com'
  };

  it('round-trips through proto encode/decode', () => {
    const decoded = LeaseItem.decode(LeaseItem.encode(item).finish());
    expect(decoded).toEqual(item);
  });

  it('round-trips through fromAmino/toAmino with snake_case keys', () => {
    const amino = LeaseItem.toAmino(item);
    expect(amino.custom_domain).toBe('web.example.com');
    expect(LeaseItem.fromAmino(amino)).toEqual(item);
  });

  it('decodes a v1 LeaseItem (no custom_domain field) with empty customDomain', () => {
    // Construct a payload that omits field 5 — what a pre-custom_domain peer
    // would emit. Decoding must default customDomain to "".
    const writer = BinaryWriter.create();
    writer.uint32(10).string('sku-uuid'); // sku_uuid
    writer.uint32(16).uint64(BigInt(1)); // quantity
    // skip locked_price (zero-value) and service_name to keep the payload tight
    const bytes = writer.finish();

    const decoded = LeaseItem.decode(bytes);
    expect(decoded.skuUuid).toBe('sku-uuid');
    expect(decoded.quantity).toBe(BigInt(1));
    expect(decoded.customDomain).toBe('');
  });

  it('omits custom_domain on the wire when empty', () => {
    const cleared: LeaseItem = { ...item, customDomain: '' };
    const bytes = LeaseItem.encode(cleared).finish();
    // Field 5 wire tag for `string` is (5<<3)|2 = 0x2a. Confirm absent.
    expect(Array.from(bytes).includes(0x2a)).toBe(false);
  });
});

describe('Params.reservedDomainSuffixes', () => {
  const params: Params = {
    maxLeasesPerTenant: BigInt(10),
    allowedList: ['manifest1allowed'],
    maxItemsPerLease: BigInt(5),
    minLeaseDuration: BigInt(3600),
    maxPendingLeasesPerTenant: BigInt(2),
    pendingTimeout: BigInt(900),
    reservedDomainSuffixes: ['.barney0.manifest0.net', '.fred0.manifest0.net']
  };

  it('round-trips repeated reserved_domain_suffixes', () => {
    const decoded = Params.decode(Params.encode(params).finish());
    expect(decoded.reservedDomainSuffixes).toEqual(params.reservedDomainSuffixes);
  });

  it('round-trips through fromAmino/toAmino with snake_case key', () => {
    const amino = Params.toAmino(params);
    expect(amino.reserved_domain_suffixes).toEqual(params.reservedDomainSuffixes);
    expect(Params.fromAmino(amino).reservedDomainSuffixes).toEqual(
      params.reservedDomainSuffixes
    );
  });

  it('round-trips an empty reserved_domain_suffixes list through amino', () => {
    const minimalAmino = Params.toAmino({
      ...params,
      reservedDomainSuffixes: []
    });
    expect(minimalAmino.reserved_domain_suffixes).toEqual([]);
    expect(Params.fromAmino(minimalAmino).reservedDomainSuffixes).toEqual([]);
  });

  it('decodes a v1 Params payload (no reserved_domain_suffixes) as []', () => {
    // Construct a payload that omits field 7 — what a pre-custom_domain peer
    // would emit. Decoding must default reservedDomainSuffixes to [].
    const writer = BinaryWriter.create();
    writer.uint32(8).uint64(BigInt(10)); // max_leases_per_tenant
    writer.uint32(24).uint64(BigInt(5)); // max_items_per_lease
    writer.uint32(32).uint64(BigInt(3600)); // min_lease_duration
    writer.uint32(40).uint64(BigInt(2)); // max_pending_leases_per_tenant
    writer.uint32(48).uint64(BigInt(900)); // pending_timeout
    const decoded = Params.decode(writer.finish());
    expect(decoded.reservedDomainSuffixes).toEqual([]);
  });
});

describe('CustomDomainTarget', () => {
  it('round-trips through proto encode/decode', () => {
    const target: CustomDomainTarget = {
      leaseUuid: 'lease-uuid',
      serviceName: 'web'
    };
    expect(
      CustomDomainTarget.decode(CustomDomainTarget.encode(target).finish())
    ).toEqual(target);
  });

  it('represents a 1-item legacy lease with empty service_name', () => {
    const target: CustomDomainTarget = {
      leaseUuid: 'lease-uuid',
      serviceName: ''
    };
    const decoded = CustomDomainTarget.decode(
      CustomDomainTarget.encode(target).finish()
    );
    expect(decoded.serviceName).toBe('');
  });
});

describe('Query/LeaseByCustomDomain', () => {
  it('round-trips the request', () => {
    const req: QueryLeaseByCustomDomainRequest = {
      customDomain: 'app.example.com'
    };
    expect(
      QueryLeaseByCustomDomainRequest.decode(
        QueryLeaseByCustomDomainRequest.encode(req).finish()
      )
    ).toEqual(req);
  });

  it('round-trips the response with a non-null lease and service_name', () => {
    const lease: Lease = {
      uuid: 'lease-uuid',
      tenant: 'manifest1tenant',
      providerUuid: 'provider-uuid',
      items: [
        {
          skuUuid: 'sku-uuid',
          quantity: BigInt(1),
          lockedPrice: { denom: 'umfx', amount: '500' },
          serviceName: 'web',
          customDomain: 'app.example.com'
        }
      ],
      state: LeaseState.LEASE_STATE_ACTIVE,
      createdAt: new Date(0),
      lastSettledAt: new Date(0),
      rejectionReason: '',
      closureReason: '',
      metaHash: new Uint8Array(),
      minLeaseDurationAtCreation: BigInt(3600)
    };

    const resp: QueryLeaseByCustomDomainResponse = {
      lease,
      serviceName: 'web'
    };

    const decoded = QueryLeaseByCustomDomainResponse.decode(
      QueryLeaseByCustomDomainResponse.encode(resp).finish()
    );
    expect(decoded.serviceName).toBe('web');
    expect(decoded.lease.uuid).toBe(lease.uuid);
    expect(decoded.lease.items[0].customDomain).toBe('app.example.com');
  });
});
