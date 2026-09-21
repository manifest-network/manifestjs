const assert = require('node:assert/strict');
const { once } = require('node:events');
const http = require('node:http');
const { test } = require('node:test');
const axios = require('axios');
const { LCDClient } = require('../main');

async function withServer(t, handler) {
  const server = http.createServer(handler);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(async () => {
    server.closeAllConnections();
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  });
  return `http://127.0.0.1:${server.address().port}/lcd`;
}

test('preserves endpoint prefixes, query options, headers, and JSON response data', async (t) => {
  let received;
  const restEndpoint = await withServer(t, (req, res) => {
    received = { url: req.url, header: req.headers['x-request-id'] };
    res.setHeader('content-type', 'application/json');
    res.end(
      JSON.stringify({
        balances: [{ denom: 'umfx', amount: '9007199254740993' }],
        pagination: { next_key: 'AA==' },
      })
    );
  });
  const client = new LCDClient({ restEndpoint });
  assert.equal(client.restEndpoint, `${restEndpoint}/`);
  assert.equal(client.timeout, 10000);
  const get = client.get;
  const result = await get('cosmos/bank/v1beta1/balances/tenant', {
    params: { 'pagination.key': 'a+/=', 'pagination.limit': '2' },
    headers: { 'X-Request-Id': 'compatibility' },
  });
  const requested = new URL(received.url, restEndpoint);
  assert.equal(requested.pathname, '/lcd/cosmos/bank/v1beta1/balances/tenant');
  assert.equal(requested.searchParams.get('pagination.key'), 'a+/=');
  assert.equal(requested.searchParams.get('pagination.limit'), '2');
  assert.equal(received.header, 'compatibility');
  assert.equal(result.balances[0].amount, '9007199254740993');
  assert.equal(result.pagination.next_key, 'AA==');
});

test('preserves JSON POST payloads and bound post methods', async (t) => {
  let received;
  const restEndpoint = await withServer(t, async (req, res) => {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    received = {
      method: req.method,
      body: JSON.parse(Buffer.concat(chunks).toString()),
    };
    res.setHeader('content-type', 'application/json');
    res.end('{"accepted":true}');
  });
  const client = new LCDClient({ restEndpoint });
  const post = client.post;
  assert.deepEqual(
    await post('transactions', {
      tx_bytes: 'AA==',
      mode: 'BROADCAST_MODE_SYNC',
    }),
    { accepted: true }
  );
  assert.deepEqual(received, {
    method: 'POST',
    body: { tx_bytes: 'AA==', mode: 'BROADCAST_MODE_SYNC' },
  });
});

test('retains Axios status and grpc-gateway error data', async (t) => {
  const restEndpoint = await withServer(t, (_req, res) => {
    res.writeHead(503, { 'content-type': 'application/json' });
    res.end('{"code":14,"message":"temporarily unavailable"}');
  });
  await assert.rejects(
    new LCDClient({ restEndpoint }).get('unavailable'),
    (error) => {
      assert.ok(axios.isAxiosError(error));
      assert.equal(error.response.status, 503);
      assert.deepEqual(error.response.data, {
        code: 14,
        message: 'temporarily unavailable',
      });
      return true;
    }
  );
});

test('cancels an in-flight request with AbortSignal', async (t) => {
  let acknowledge;
  const requested = new Promise((resolve) => {
    acknowledge = resolve;
  });
  const restEndpoint = await withServer(t, () => acknowledge());
  const controller = new AbortController();
  const pending = new LCDClient({ restEndpoint }).get('slow', {
    signal: controller.signal,
  });
  const rejection = assert.rejects(
    pending,
    (error) => error.code === 'ERR_CANCELED' && axios.isCancel(error)
  );
  await requested;
  controller.abort();
  await rejection;
});

test('preserves configured request deadlines', async (t) => {
  const restEndpoint = await withServer(t, () => {});
  await assert.rejects(
    new LCDClient({ restEndpoint, timeout: 25 }).get('slow'),
    (error) => {
      assert.ok(axios.isAxiosError(error));
      assert.equal(error.code, 'ECONNABORTED');
      assert.match(error.message, /timeout/);
      return true;
    }
  );
});
