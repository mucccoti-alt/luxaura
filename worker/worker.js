export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'POST' && url.pathname === '/api/orders') {
      const contentType = request.headers.get('content-type') || '';
      let data = {};
      try {
        if (contentType.includes('application/json')) {
          data = await request.json();
        } else {
          const formData = await request.formData();
          data = Object.fromEntries(formData);
        }
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      // determine if this is a free order via promo or explicit flag
      const promo = (data.promo_code || '').toString().trim();
      const isFree = data.is_free === true || String(data.is_free) === 'true' || promo.toLowerCase() === 'free';

      // required fields (bank_reference not required for free orders)
      const required = ['product_id', 'product_name', 'product_price', 'customer_name', 'customer_email'];
      for (const r of required) {
        if (!data[r]) {
          return new Response(JSON.stringify({ error: `Missing ${r}` }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
      }

      if (!isFree) {
        if (!(data.confirmTransfer === true || data.confirmTransfer === 'on' || data.confirmTransfer === 'true')) {
          return new Response(JSON.stringify({ error: 'You must confirm the bank transfer.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if (!data.bank_reference) {
          return new Response(JSON.stringify({ error: 'Missing bank_reference' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
      }

      const productId = String(data.product_id);
      const lockKey = `lock:${productId}`;

      try {
        const existing = await env.ORDERS.get(lockKey);
        if (existing) {
          return new Response(JSON.stringify({ error: 'Product is already reserved or being processed. Please try another item or contact support.', reservedBy: existing }), { status: 409, headers: { 'Content-Type': 'application/json' } });
        }
      } catch (err) {
        // if KV read fails, continue but log
        console.error('KV read failed', err);
      }

      const id = `order_${Date.now()}_${Math.random().toString(36).slice(2,9)}`;
      const order = Object.assign({}, data, { id, received_at: new Date().toISOString(), status: isFree ? 'completed' : 'pending' });

      try {
        // store the order record
        await env.ORDERS.put(`order:${id}`, JSON.stringify(order));
        // create a short-term lock for this product (24 hours)
        await env.ORDERS.put(lockKey, id, { expirationTtl: 60 * 60 * 24 });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Failed to store order' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }

      // return bank account only when not free
      if (isFree) {
        return new Response(JSON.stringify({ success: true, orderId: id, free: true }), { status: 201, headers: { 'Content-Type': 'application/json' } });
      } else {
        const bankAccount = '4890010100591001';
        return new Response(JSON.stringify({ success: true, orderId: id, bankAccount }), { status: 201, headers: { 'Content-Type': 'application/json' } });
      }
    }

    return new Response('Not found', { status: 404 });
  }
}
