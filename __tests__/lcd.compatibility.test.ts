import { once } from 'node:events';
import { createServer, Server } from 'node:http';
import { AddressInfo } from 'node:net';
import { LCDClient } from '@cosmology/lcd';
import { LCDQueryClient } from '../src/codegen/cosmos/bank/v1beta1/query.lcd';
import { QueryAllBalancesRequest } from '../src/codegen/cosmos/bank/v1beta1/query';

describe('generated LCD clients with the maintained Axios dependency', () => {
  let server: Server;
  afterEach(async () => {
    server?.closeAllConnections();
    if (server?.listening)
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve()))
      );
  });

  it('preserves pagination bytes, endpoint prefixes, booleans and arbitrary-precision amounts', async () => {
    let requestUrl: URL;
    server = createServer((request, response) => {
      requestUrl = new URL(request.url!, 'http://localhost');
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(
        JSON.stringify({
          balances: [{ denom: 'umfx', amount: '9007199254740993' }],
          pagination: { next_key: 'AAH/' },
        })
      );
    }).listen(0, '127.0.0.1');
    await once(server, 'listening');
    const requestClient = new LCDClient({
      restEndpoint: `http://127.0.0.1:${
        (server.address() as AddressInfo).port
      }/lcd`,
    });
    const query = new LCDQueryClient({ requestClient });
    const key = new Uint8Array([251, 255, 0]);
    const result = await query.allBalances(
      QueryAllBalancesRequest.fromPartial({
        address: 'manifest1test',
        resolveDenom: true,
        pagination: { key, limit: BigInt(2), reverse: true },
      })
    );
    expect(requestUrl!.pathname).toBe(
      '/lcd/cosmos/bank/v1beta1/balances/manifest1test'
    );
    expect(requestUrl!.searchParams.get('pagination.key')).toBe(
      Buffer.from(key).toString('base64')
    );
    expect(requestUrl!.searchParams.get('pagination.limit')).toBe('2');
    expect(requestUrl!.searchParams.get('pagination.reverse')).toBe('true');
    expect(requestUrl!.searchParams.get('resolve_denom')).toBe('true');
    expect(result.balances[0].amount).toBe('9007199254740993');
    expect(result.pagination.next_key).toBe('AAH/');
  });

  it('preserves HTTP and gRPC error evidence through a generated query', async () => {
    server = createServer((_request, response) => {
      response.writeHead(404, { 'content-type': 'application/json' });
      response.end('{"code":5,"message":"account not found"}');
    }).listen(0, '127.0.0.1');
    await once(server, 'listening');
    const query = new LCDQueryClient({
      requestClient: new LCDClient({
        restEndpoint: `http://127.0.0.1:${
          (server.address() as AddressInfo).port
        }`,
      }),
    });
    await expect(
      query.balance({ address: 'manifest1missing', denom: 'umfx' })
    ).rejects.toMatchObject({
      isAxiosError: true,
      response: {
        status: 404,
        data: { code: 5, message: 'account not found' },
      },
    });
  });
});
