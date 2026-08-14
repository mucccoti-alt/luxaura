// script-local-images.js — wrapped initialization to avoid running before DOM is ready and to surface startup errors
(function(){
  async function init(){
    try{
      // Product data
      const PRODUCTS = [
        { id: "P001", name: "Aurora Diamond Pendant", price: 2750, img: "https://drive.google.com/uc?export=download&id=1IkZn0X70Kz35OXf1DT1B7px-OjFUfDvb", desc: "18K gold pendant with brilliant-cut diamond accent.", available: true },
        { id: "P002", name: "Solstice Gold Ring", price: 2890, img: "https://drive.google.com/uc?export=download&id=1F1HrmdQmvuHser1XLnpCoIr_g4614MZn", desc: "Classic 22K gold ring with polished finish.", available: true },
        { id: "P003", name: "Evelyn Diamond Studs", price: 3200, img: "https://drive.google.com/uc?export=download&id=1KZY0USmQsSdhIdd1pNLHUze1xlFvom9-", desc: "Pair of diamond studs set in 14K gold.", available: true },
        { id: "P004", name: "Celeste Gold Bangle", price: 2705, img: "https://drive.google.com/uc?export=download&id=1Yvr1pQxGcIJpWbxUTQf6fiP3M-S2p7X6", desc: "Delicate gold bangle with a satin sheen.", available: true },
        { id: "P005", name: "Orion Diamond Bracelet", price: 3420, img: "https://drive.google.com/uc?export=download&id=17Wb8-ay4xFi3wWEIQrRK2SdZnwt_ZrcY", desc: "Tennis-style bracelet featuring round diamonds.", available: true },
        { id: "P006", name: "Riviera Gold Necklace", price: 3050, img: "https://drive.google.com/uc?export=download&id=1y2AzyIHpdShwMv1UcDTzvzHk0hlHLPxa", desc: "Fine gold chain with textured links.", available: true },
        { id: "P007", name: "Luna Solitaire Ring", price: 3780, img: "https://drive.google.com/uc?export=download&id=1iw7WBp7UiGHGs6lDmpcFxWA98NyN3wSJ", desc: "Solitaire diamond in a timeless 18K gold setting.", available: true },
        { id: "P008", name: "Ivy Diamond Cluster", price: 2899, img: "https://drive.google.com/uc?export=download&id=1OD1vogO7r_k6fSermzY3CnrcK66k3abA", desc: "Cluster diamonds arranged in a floral motif.", available: true },
        { id: "P009", name: "Mariner Gold Hoop Set", price: 2765, img: "https://drive.google.com/uc?export=download&id=1ct-7FQjeLZXpB3gHFhCq0U_lTIi0OKE9", desc: "Set of two gold hoops with secure latch.", available: true },
        { id: "P010", name: "Seraph Diamond Collar", price: 3350, img: "https://drive.google.com/uc?export=download&id=1pTwwKmFFiZrXNkrmI_wxVkDSLFGL2Zku", desc: "Bold collar necklace with diamond accent stones.", available: true },
        { id: "P011", name: "Helena Locket", price: 2975, img: "https://drive.google.com/uc?export=download&id=1TkQCeo0MjCePmESUmwUoh9lCf-Ul2y36", desc: "Engravable locket in polished gold.", available: true },
        { id: "P012", name: "Vega Gold Pendant", price: 2825, img: "https://drive.google.com/uc?export=download&id=1NB5-GujB2UNsnmkrUn6iV-M4BmK8D3eG", desc: "Modern pendant with brushed gold surface.", available: true }
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
        // When using external URLs we don't have optimized variants yet — return a simple srcset that points to the same URL.
        return `${basePath} 800w, ${basePath} 1600w`;
      }

      function renderProducts(){
        productsContainer.innerHTML = '';
        PRODUCTS.forEach(p=>{
          const card = document.createElement("article");
          card.className = "card";
          card.dataset.productId = p.id;

          const availability = p.available ? '' : '<div class="sold">Sold / Processing</div>';

          card.innerHTML = `\n      <div class="product-image">\n        <picture>\n          <img src="${p.img}" srcset="${srcsetFor(p.img)}" sizes="(max-width:600px) 100vw, 300px" alt="${p.name}" loading="lazy" width="800" height="600" />\n        </picture>\n      </div>\n      <div class="product-info">\n        <div class="product-title">${p.name}</div>\n        <div class="product-price">${formatPrice(p.price)}</div>\n        <div class="small">${p.desc}</div>\n        <div class="small">Product code: ${p.id}</div>\n        ${availability}\n      </div>\n      <div class="btns" style="margin-top:.75rem">\n        <button class="btn view" data-action="view" data-id="${p.id}">View</button>\n        <button class="btn primary buy" data-action="buy" data-id="${p.id}" ${p.available? '' : 'disabled'}>Buy Now</button>\n      </div>\n    `;
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
        modalProduct.innerHTML = `\n    <picture>\n      <img src="${p.img}" srcset="${srcsetFor(p.img)}" sizes="(max-width:600px) 100vw, 200px" alt="${p.name}" style="width:220px;height:180px;object-fit:contain;border-radius:6px" loading="lazy" />\n    </picture>\n    <div>\n      <div style="font-weight:700">${p.name}</div>\n      <div style="color:#b8860b;font-weight:700;margin-top:.25rem">${formatPrice(p.price)}</div>\n      <div class="small" style="margin-top:.5rem">${p.desc}</div>\n      <div class="small">Product code: ${p.id}</div>\n    </div>\n  `;
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
        modalProduct.innerHTML = `\n    <picture>\n      <img src="${p.img}" srcset="${srcsetFor(p.img)}" sizes="200px" alt="${p.name}" style="width:120px;height:100px;object-fit:contain;border-radius:6px" loading="lazy" />\n    </picture>\n    <div>\n      <div style="font-weight:700">${p.name}</div>\n      <div style="color:#b8860b;font-weight:700;margin-top:.25rem">${formatPrice(p.price)}</div>\n      <div class="small" style="margin-top:.5rem">${p.desc}</div>\n      <div class="small">Product code: ${p.id}</div>\n    </div>\n  `;
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
