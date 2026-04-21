//@ts-nocheck
import { TelescopeGeneratedType } from "../../../types";
import { Registry } from "@cosmjs/proto-signing";
import { MsgCreateProvider, MsgUpdateProvider, MsgDeactivateProvider, MsgCreateSKU, MsgUpdateSKU, MsgDeactivateSKU, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, TelescopeGeneratedType<any, any, any>]> = [["/liftedinit.sku.v1.MsgCreateProvider", MsgCreateProvider], ["/liftedinit.sku.v1.MsgUpdateProvider", MsgUpdateProvider], ["/liftedinit.sku.v1.MsgDeactivateProvider", MsgDeactivateProvider], ["/liftedinit.sku.v1.MsgCreateSKU", MsgCreateSKU], ["/liftedinit.sku.v1.MsgUpdateSKU", MsgUpdateSKU], ["/liftedinit.sku.v1.MsgDeactivateSKU", MsgDeactivateSKU], ["/liftedinit.sku.v1.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createProvider(value: MsgCreateProvider) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgCreateProvider",
        value: MsgCreateProvider.encode(value).finish()
      };
    },
    updateProvider(value: MsgUpdateProvider) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgUpdateProvider",
        value: MsgUpdateProvider.encode(value).finish()
      };
    },
    deactivateProvider(value: MsgDeactivateProvider) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgDeactivateProvider",
        value: MsgDeactivateProvider.encode(value).finish()
      };
    },
    createSKU(value: MsgCreateSKU) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgCreateSKU",
        value: MsgCreateSKU.encode(value).finish()
      };
    },
    updateSKU(value: MsgUpdateSKU) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgUpdateSKU",
        value: MsgUpdateSKU.encode(value).finish()
      };
    },
    deactivateSKU(value: MsgDeactivateSKU) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgDeactivateSKU",
        value: MsgDeactivateSKU.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createProvider(value: MsgCreateProvider) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgCreateProvider",
        value
      };
    },
    updateProvider(value: MsgUpdateProvider) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgUpdateProvider",
        value
      };
    },
    deactivateProvider(value: MsgDeactivateProvider) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgDeactivateProvider",
        value
      };
    },
    createSKU(value: MsgCreateSKU) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgCreateSKU",
        value
      };
    },
    updateSKU(value: MsgUpdateSKU) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgUpdateSKU",
        value
      };
    },
    deactivateSKU(value: MsgDeactivateSKU) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgDeactivateSKU",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgUpdateParams",
        value
      };
    }
  },
  toJSON: {
    createProvider(value: MsgCreateProvider) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgCreateProvider",
        value: MsgCreateProvider.toJSON(value)
      };
    },
    updateProvider(value: MsgUpdateProvider) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgUpdateProvider",
        value: MsgUpdateProvider.toJSON(value)
      };
    },
    deactivateProvider(value: MsgDeactivateProvider) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgDeactivateProvider",
        value: MsgDeactivateProvider.toJSON(value)
      };
    },
    createSKU(value: MsgCreateSKU) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgCreateSKU",
        value: MsgCreateSKU.toJSON(value)
      };
    },
    updateSKU(value: MsgUpdateSKU) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgUpdateSKU",
        value: MsgUpdateSKU.toJSON(value)
      };
    },
    deactivateSKU(value: MsgDeactivateSKU) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgDeactivateSKU",
        value: MsgDeactivateSKU.toJSON(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgUpdateParams",
        value: MsgUpdateParams.toJSON(value)
      };
    }
  },
  fromJSON: {
    createProvider(value: any) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgCreateProvider",
        value: MsgCreateProvider.fromJSON(value)
      };
    },
    updateProvider(value: any) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgUpdateProvider",
        value: MsgUpdateProvider.fromJSON(value)
      };
    },
    deactivateProvider(value: any) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgDeactivateProvider",
        value: MsgDeactivateProvider.fromJSON(value)
      };
    },
    createSKU(value: any) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgCreateSKU",
        value: MsgCreateSKU.fromJSON(value)
      };
    },
    updateSKU(value: any) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgUpdateSKU",
        value: MsgUpdateSKU.fromJSON(value)
      };
    },
    deactivateSKU(value: any) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgDeactivateSKU",
        value: MsgDeactivateSKU.fromJSON(value)
      };
    },
    updateParams(value: any) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromJSON(value)
      };
    }
  },
  fromPartial: {
    createProvider(value: MsgCreateProvider) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgCreateProvider",
        value: MsgCreateProvider.fromPartial(value)
      };
    },
    updateProvider(value: MsgUpdateProvider) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgUpdateProvider",
        value: MsgUpdateProvider.fromPartial(value)
      };
    },
    deactivateProvider(value: MsgDeactivateProvider) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgDeactivateProvider",
        value: MsgDeactivateProvider.fromPartial(value)
      };
    },
    createSKU(value: MsgCreateSKU) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgCreateSKU",
        value: MsgCreateSKU.fromPartial(value)
      };
    },
    updateSKU(value: MsgUpdateSKU) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgUpdateSKU",
        value: MsgUpdateSKU.fromPartial(value)
      };
    },
    deactivateSKU(value: MsgDeactivateSKU) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgDeactivateSKU",
        value: MsgDeactivateSKU.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/liftedinit.sku.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};