// script-local-images.js — using Cloudinary product images (p001-p012)
(function(){
  async function init(){
    try{
      // Product data with Cloudinary URLs
      const PRODUCTS = [
        { id: "P001", name: "Aurora Diamond Pendant", price: 2750, img: "https://res.cloudinary.com/n4yp34k5/image/upload/295d43ee8ce9543810683fee1019d993", desc: "18K gold pendant with brilliant-cut diamond accent.", available: true },
        { id: "P002", name: "Solstice Gold Ring", price: 2890, img: "https://res.cloudinary.com/n4yp34k5/image/upload/f847b3a1a1ee618f5c0ecb39c4406f63", desc: "Classic 22K gold ring with polished finish.", available: true },
        { id: "P003", name: "Evelyn Diamond Studs", price: 3200, img: "https://res.cloudinary.com/n4yp34k5/image/upload/9fb168c3ea887f3fd878355d607a68be", desc: "Pair of diamond studs set in 14K gold.", available: true },
        { id: "P004", name: "Celeste Gold Bangle", price: 2705, img: "https://res.cloudinary.com/n4yp34k5/image/upload/bdb2977a7cb2ef3e6e5eb7a6638eca38", desc: "Delicate gold bangle with a satin sheen.", available: true },
        { id: "P005", name: "Orion Diamond Bracelet", price: 3420, img: "https://res.cloudinary.com/n4yp34k5/image/upload/2dccf718292c1bebb9e82180df7cfcc0", desc: "Tennis-style bracelet featuring round diamonds.", available: true },
        { id: "P006", name: "Riviera Gold Necklace", price: 3050, img: "https://res.cloudinary.com/n4yp34k5/image/upload/771602ad5c618b574f40e172d46d0dd0", desc: "Fine gold chain with textured links.", available: true },
        { id: "P007", name: "Luna Solitaire Ring", price: 3780, img: "https://res.cloudinary.com/n4yp34k5/image/upload/05ec352998b3eea6741e0b7ae8b20924", desc: "Solitaire diamond in a timeless 18K gold setting.", available: true },
        { id: "P008", name: "Ivy Diamond Cluster", price: 2899, img: "https://res.cloudinary.com/n4yp34k5/image/upload/c4b78d81e9c39e934dac176cef8d1084", desc: "Cluster diamonds arranged in a floral motif.", available: true },
        { id: "P009", name: "Mariner Gold Hoop Set", price: 2765, img: "https://res.cloudinary.com/n4yp34k5/image/upload/1d114edaf1089f93d7df7e60f0fbc680", desc: "Set of two gold hoops with secure latch.", available: true },
        { id: "P010", name: "Seraph Diamond Collar", price: 3350, img: "https://res.cloudinary.com/n4yp34k5/image/upload/f84f214b2f14884265fa8f8ddd675b67", desc: "Bold collar necklace with diamond accent stones.", available: true },
        { id: "P011", name: "Helena Locket", price: 2975, img: "https://res.cloudinary.com/n4yp34k5/image/upload/d2dfe3b35202696fa73ea64c2386c7c7", desc: "Engravable locket in polished gold.", available: true },
        { id: "P012", name: "Vega Gold Pendant", price: 2825, img: "https://res.cloudinary.com/n4yp34k5/image/upload/967bd31fa095a8f117952a03635eae24", desc: "Modern pendant with brushed gold surface.", available: true }
      ];

      // DOM elements
      const productsContainer = document.getElementById("products");
      const modal = document.getElementById("checkoutModal");
      const closeModalBtn = document.getElementById("closeModal");
      const modalTitle = document.getElementById("modalTitle");
      const modalProduct = document.getElementById("modalProduct");
      const checkoutForm = document.getElementById("checkoutForm");
      const yearSpan = document.getElementById("year");
      const orderResult = document.getElementById("orderResult");

      if(!productsContainer) throw new Error('Missing #products container');
      if(!modal) throw new Error('Missing #checkoutModal');
      if(!checkoutForm) throw new Error('Missing #checkoutForm');

      function formatPrice(n){ return `$${n.toLocaleString()}` }

      function srcsetFor(basePath){
        // Cloudinary supports transformations; provide responsive variants
        const base = basePath.replace('/upload/', '/upload/w_800,q_80/');
        const base2x = basePath.replace('/upload/', '/upload/w_1600,q_80/');
        return `${base} 800w, ${base2x} 1600w`;
      }

      function renderProducts(){
        productsContainer.innerHTML = '';
        PRODUCTS.forEach(p=>{
          const card = document.createElement("article");
          card.className = "card";
          card.dataset.productId = p.id;

          const availability = p.available ? '' : '<div class="sold">Sold / Processing</div>';

          card.innerHTML = `
      <div class="product-image">
        <picture>
          <img src="${p.img}?w=800&q=80" srcset="${srcsetFor(p.img)}" sizes="(max-width:600px) 100vw, 300px" alt="${p.name}" loading="lazy" />
        </picture>
      </div>
      <div class="product-info">
        <div class="product-title">${p.name}</div>
        <div class="product-price">${formatPrice(p.price)}</div>
        <div class="small">${p.desc}</div>
        <div class="small">Product code: ${p.id}</div>
        ${availability}
      </div>
      <div class="btns" style="margin-top:.75rem">
        <button class="btn" data-id="${p.id}" data-action="view">View</button>
        <button class="btn primary buy" data-id="${p.id}" data-action="buy" ${p.available ? '' : 'disabled'}>Buy Now</button>
      </div>
    `;
          productsContainer.appendChild(card);
        });
      }

      // Event delegation for view/buy
      productsContainer.addEventListener('click', (e)=>{
        const btn = e.target.closest('button');
        if(!btn || !productsContainer.contains(btn)) return;
        const action = btn.dataset.action;
        const id = btn.dataset.id;
        if(action === 'view') return handleView(id);
        if(action === 'buy') return handleBuy(id);
      });

      function handleView(id){
        const p = PRODUCTS.find(x=>x.id===id);
        if(!p) return;
        modalTitle.textContent = p.name;
        modalProduct.innerHTML = `
    <picture>
      <img src="${p.img}?w=200&q=80" srcset="${srcsetFor(p.img)}" sizes="(max-width:600px) 100vw, 200px" alt="${p.name}" style="width:220px;height:180px;object-fit:contain;border-radius:6px" loading="lazy" />
    </picture>
    <div>
      <div style="font-weight:700">${p.name}</div>
      <div style="color:#b8860b;font-weight:700;margin-top:.25rem">${formatPrice(p.price)}</div>
      <div class="small" style="margin-top:.5rem">${p.desc}</div>
      <div class="small">Product code: ${p.id}</div>
    </div>
  `;
        openModal();
      }

      function handleBuy(id){
        const p = PRODUCTS.find(x=>x.id===id);
        if(!p) return;
        if(!p.available){
          alert('Sorry — this product has already been reserved or sold.');
          return;
        }
        modalTitle.textContent = `Buy: ${p.name}`;
        modalProduct.innerHTML = `
    <picture>
      <img src="${p.img}?w=120&q=80" srcset="${srcsetFor(p.img)}" sizes="200px" alt="${p.name}" style="width:120px;height:100px;object-fit:contain;border-radius:6px" loading="lazy" />
    </picture>
    <div>
      <div style="font-weight:700">${p.name}</div>
      <div style="color:#b8860b;font-weight:700;margin-top:.25rem">${formatPrice(p.price)}</div>
      <div class="small" style="margin-top:.5rem">${p.desc}</div>
      <div class="small">Product code: ${p.id}</div>
    </div>
  `;
        document.getElementById("product_id").value = p.id;
        document.getElementById("product_name").value = p.name;
        document.getElementById("product_price").value = p.price;
        openModal();
      }

      function openModal(){
        modal.classList.remove("hidden");
        modal.setAttribute("aria-hidden","false");
      }
      function closeModal(){
        modal.classList.add("hidden");
        modal.setAttribute("aria-hidden","true");
      }

      if(closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
      if(modal) modal.addEventListener("click", (e)=>{ if(e.target===modal) closeModal(); });

      yearSpan.textContent = new Date().getFullYear();

      // Form submission with client-side validation and reservation UI
      checkoutForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const formData = new FormData(checkoutForm);
        const confirmed = document.getElementById("confirmTransfer");
        const productId = formData.get('product_id');
        const promo = (formData.get('promo_code') || '').trim();
        const isFree = promo.toLowerCase() === 'free';

        if(!productId){ alert('No product selected'); return; }
        const product = PRODUCTS.find(x=>x.id===productId);
        if(!product){ alert('Invalid product'); return; }
        if(!product.available){ alert('This product is already reserved/sold.'); return; }

        // basic client-side validation
        const name = formData.get('customer_name');
        const email = formData.get('customer_email');
        const bankRef = formData.get('bank_reference');
        if(!name || !email){ alert('Please fill your name and email.'); return; }
        if(!isFree){
          if(!bankRef){ alert('Please fill the bank transfer reference.'); return; }
          if(!confirmed || !confirmed.checked){ alert('Please confirm you will make the bank transfer.'); return; }
        }

        const payload = {};
        formData.forEach((v,k)=>{ payload[k]=v });
        payload.product_price = isFree ? 0 : Number(payload.product_price);
        payload.confirmTransfer = isFree ? false : true;
        if(isFree) payload.is_free = true;

        // disable the buy button to prevent double submits while request in-flight
        const buyBtn = productsContainer.querySelector(`button.buy[data-id="${productId}"]`);
        if(buyBtn) buyBtn.disabled = true;

        try{
          const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const data = await res.json();
          if(res.ok){
            orderResult.classList.remove('hidden','error');
            orderResult.classList.remove('error');
            orderResult.classList.add('order-result');
            if(data.bankAccount){
              orderResult.textContent = `Order submitted — reference: ${data.orderId}. Please complete the bank transfer to the account ${data.bankAccount} and keep the transfer reference.`;
            } else if(data.free){
              orderResult.textContent = `Order completed for free — reference: ${data.orderId}.`; 
            } else {
              orderResult.textContent = `Order submitted — reference: ${data.orderId}.`;
            }
            // mark product unavailable locally (the Worker sets a lock server-side)
            product.available = false;
            const card = productsContainer.querySelector(`article[data-product-id="${productId}"]`);
            if(card){
              const sold = document.createElement('div'); sold.className = 'sold'; sold.textContent = 'Sold / Processing';
              const info = card.querySelector('.product-info');
              if(info) info.appendChild(sold);
              const btn = card.querySelector('button.buy'); if(btn) btn.disabled = true;
            }
            checkoutForm.reset();
            setTimeout(()=>closeModal(),1200);
          } else {
            orderResult.classList.remove('hidden');
            orderResult.classList.add('error');
            orderResult.textContent = data.error || 'Submission failed';
            if(buyBtn) buyBtn.disabled = false;
          }
        }catch(err){
          orderResult.classList.remove('hidden');
          orderResult.classList.add('error');
          orderResult.textContent = 'Network error — please try again later.';
          if(buyBtn) buyBtn.disabled = false;
        }
      });

      renderProducts();

      // expose for backwards compatibility
      window.handleBuy = handleBuy;
      window.handleView = handleView;

    }catch(err){
      console.error('script-local-images initialization error', err);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
