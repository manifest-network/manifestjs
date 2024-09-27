const { join, resolve } = require('path');
const telescope = require('@cosmology/telescope').default;
const rimraf = require('rimraf').rimrafSync;

const protoDirs = [join(__dirname, '/../proto')];

const outPath = join(__dirname, '/../src/codegen');
rimraf(outPath);

telescope({
  protoDirs,
  outPath,
  options: {
    env: 'v-next',
    removeUnusedImports: true,
    classesUseArrowFunctions: true,

    tsDisable: {
      patterns: ['**/tx.registry.ts'],
      files: [
        'cosmos/auth/v1beta1/query.ts',
        'cosmos/authz/v1beta1/authz.ts',
        'cosmos/gov/v1/tx.ts',
        'cosmos/gov/v1beta1/gov.ts',
        'cosmos/gov/v1beta1/tx.ts'
      ]
    },

    prototypes: {
      optionalQueryParams: false,
      useOptionalNullable: true,
      fieldDefaultIsOptional: false,
      addTypeUrlToObjects: true,
      addTypeUrlToDecoders: true,
      addAminoTypeToObjects: true,
      methods: {
        encode: true,
        decode: true,
        fromJSON: true,
        toJSON: true,
        fromPartial: true,
        toAmino: true,
        fromAmino: true,
        toProto: true,
        fromProto: true
      },
      excluded: {
        packages: [
          'ibc.applications.fee.v1',

          // 'cosmos.auth.v1beta1',
          'cosmos.app.v1alpha1',
          'cosmos.app.v1beta1',
          'cosmos.base.kv.v1beta1',
          'cosmos.base.reflection.v1beta1',
          'cosmos.base.snapshots.v1beta1',
          'cosmos.base.store.v1beta1',
          'cosmos.base.tendermint.v1beta1',
          'cosmos.crisis.v1beta1',
          'cosmos.evidence.v1beta1',
          // "cosmos.feegrant.v1beta1",
          'cosmos.genutil.v1beta1',
          // "cosmos.group.v1beta1",

          // 'cosmos.mint.v1beta1',

          'cosmos.autocli.v1',

          // "cosmos.group.v1",
          'cosmos.msg.v1',
          'cosmos.nft.v1beta1',
          'cosmos.capability.v1beta1',
          'cosmos.orm.v1alpha1',
          'cosmos.orm.v1',
          'cosmos.slashing.v1beta1',
          // "cosmos.vesting.v1beta1",
          'google.api',
          'ibc.core.port.v1',
          'ibc.core.types.v1'
        ],
        hardProtos: ['cosmos/accounts/v1/accounts.proto']
      },
      parser: {
        keepCase: false
      },
      typingsFormat: {
        useDeepPartial: true,
        duration: 'duration',
        timestamp: 'date',
        useExact: true,
        autoFixUndefinedEnumDefault: true,
        num64: 'bigint',
        useTelescopeGeneratedType: true,
        customTypes: {
          useCosmosSDKDecimal: true
        }
      },
      patch: {
        'cosmos/group/v1/tx.proto': [
          {
            op: 'add',
            path: '@/MsgSubmitProposal/fields/messages/options',
            value: {
              '(cosmos_proto.accepts_interface)': 'cosmos.base.v1beta1.Msg'
            }
          }
        ]
      }
    },
    stargateClients: {
      enabled: true,
      includeCosmosDefaultTypes: true,
      addGetTxRpc: true
    },
    interfaces: {
      enabled: true,
      useGlobalDecoderRegistry: true,
      useUnionTypes: true
    },
    aminoEncoding: {
      enabled: true,
      useLegacyInlineEncoding: false
    },
    lcdClients: {
      enabled: true
    },
    rpcClients: {
      type: 'tendermint',
      enabled: true,
      camelCase: true,
      useConnectComet: true,
      extensions: true,
      serviceImplement: {
        Msg: {
          type: 'Tx'
        }
      },
    }
  }
})
  .then(() => {
    console.log('✨ all done!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
