// script-local-images.js — using local repository product images (p001-p012)
(function(){
  async function init(){
    try{
      // Product data with local image paths from repository
      const PRODUCTS = [
        { id: "P001", name: "Aurora Diamond Pendant", price: 2750, img: "p001.jpg", desc: "18K gold pendant with brilliant-cut diamond accent.", available: true },
        { id: "P002", name: "Solstice Gold Ring", price: 2890, img: "p002.jpg", desc: "Classic 22K gold ring with polished finish.", available: true },
        { id: "P003", name: "Evelyn Diamond Studs", price: 3200, img: "p003.jpg", desc: "Pair of diamond studs set in 14K gold.", available: true },
        { id: "P004", name: "Celeste Gold Bangle", price: 2705, img: "p004.jpg", desc: "Delicate gold bangle with a satin sheen.", available: true },
        { id: "P005", name: "Orion Diamond Bracelet", price: 3420, img: "p005.jpg", desc: "Tennis-style bracelet featuring round diamonds.", available: true },
        { id: "P006", name: "Riviera Gold Necklace", price: 3050, img: "p006.jpg", desc: "Fine gold chain with textured links.", available: true },
        { id: "P007", name: "Luna Solitaire Ring", price: 3780, img: "p007.jpg", desc: "Solitaire diamond in a timeless 18K gold setting.", available: true },
        { id: "P008", name: "Ivy Diamond Cluster", price: 2899, img: "p008.jpg", desc: "Cluster diamonds arranged in a floral motif.", available: true },
        { id: "P009", name: "Mariner Gold Hoop Set", price: 2765, img: "p009.jpg", desc: "Set of two gold hoops with secure latch.", available: true },
        { id: "P010", name: "Seraph Diamond Collar", price: 3350, img: "p010.jpg", desc: "Bold collar necklace with diamond accent stones.", available: true },
        { id: "P011", name: "Helena Locket", price: 2975, img: "p011.jpg", desc: "Engravable locket in polished gold.", available: true },
        { id: "P012", name: "Vega Gold Pendant", price: 2825, img: "p012.jpg", desc: "Modern pendant with brushed gold surface.", available: true }
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
        // Local images with simple size variants
        return `${basePath} 800w, ${basePath} 1600w`;
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
          <img src="${p.img}" srcset="${srcsetFor(p.img)}" sizes="(max-width:600px) 100vw, 300px" alt="${p.name}" loading="lazy" />
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
      <img src="${p.img}" srcset="${srcsetFor(p.img)}" sizes="(max-width:600px) 100vw, 200px" alt="${p.name}" style="width:220px;height:180px;object-fit:contain;border-radius:6px" loading="lazy" />
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
      <img src="${p.img}" srcset="${srcsetFor(p.img)}" sizes="200px" alt="${p.name}" style="width:120px;height:100px;object-fit:contain;border-radius:6px" loading="lazy" />
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

      // Form submission with client-side validation - NO FREE COUPON
      checkoutForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const formData = new FormData(checkoutForm);
        const confirmed = document.getElementById("confirmTransfer");
        const productId = formData.get('product_id');

        if(!productId){ alert('No product selected'); return; }
        const product = PRODUCTS.find(x=>x.id===productId);
        if(!product){ alert('Invalid product'); return; }
        if(!product.available){ alert('This product is already reserved/sold.'); return; }

        // basic client-side validation
        const name = formData.get('customer_name');
        const email = formData.get('customer_email');
        const bankRef = formData.get('bank_reference');
        if(!name || !email){ alert('Please fill your name and email.'); return; }
        if(!bankRef){ alert('Please fill the bank transfer reference.'); return; }
        if(!confirmed || !confirmed.checked){ alert('Please confirm you will make the bank transfer.'); return; }

        const payload = {};
        formData.forEach((v,k)=>{ payload[k]=v });
        payload.product_price = Number(payload.product_price);
        payload.confirmTransfer = true;

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
            orderResult.textContent = `Order submitted — reference: ${data.orderId}. Please complete the bank transfer to account 4890010100591001 and keep the transfer reference.`;
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
