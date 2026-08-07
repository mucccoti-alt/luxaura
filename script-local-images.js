// script-local-images.js — now uses event delegation, responsive srcset, client-side validation and product reservation UI
const PRODUCTS = [
  { id: "P001", name: "Aurora Diamond Pendant", price: 2750, img: "images/p001.jpg", desc: "18K gold pendant with brilliant-cut diamond accent.", available: true },
  { id: "P002", name: "Solstice Gold Ring", price: 2890, img: "images/p002.jpg", desc: "Classic 22K gold ring with polished finish.", available: true },
  { id: "P003", name: "Evelyn Diamond Studs", price: 3200, img: "images/p003.jpg", desc: "Pair of diamond studs set in 14K gold.", available: true },
  { id: "P004", name: "Celeste Gold Bangle", price: 2705, img: "images/p004.jpg", desc: "Delicate gold bangle with a satin sheen.", available: true },
  { id: "P005", name: "Orion Diamond Bracelet", price: 3420, img: "images/p005.jpg", desc: "Tennis-style bracelet featuring round diamonds.", available: true },
  { id: "P006", name: "Riviera Gold Necklace", price: 3050, img: "images/p006.jpg", desc: "Fine gold chain with textured links.", available: true },
  { id: "P007", name: "Luna Solitaire Ring", price: 3780, img: "images/p007.jpg", desc: "Solitaire diamond in a timeless 18K gold setting.", available: true },
  { id: "P008", name: "Ivy Diamond Cluster", price: 2899, img: "images/p008.jpg", desc: "Cluster diamonds arranged in a floral motif.", available: true },
  { id: "P009", name: "Mariner Gold Hoop Set", price: 2765, img: "images/p009.jpg", desc: "Set of two gold hoops with secure latch.", available: true },
  { id: "P010", name: "Seraph Diamond Collar", price: 3350, img: "images/p010.jpg", desc: "Bold collar necklace with diamond accent stones.", available: true },
  { id: "P011", name: "Helena Locket", price: 2975, img: "images/p011.jpg", desc: "Engravable locket in polished gold.", available: true },
  { id: "P012", name: "Vega Gold Pendant", price: 2825, img: "images/p012.jpg", desc: "Modern pendant with brushed gold surface.", available: true }
];

const productsContainer = document.getElementById("products");
const modal = document.getElementById("checkoutModal");
const closeModalBtn = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalProduct = document.getElementById("modalProduct");
const checkoutForm = document.getElementById("checkoutForm");
const yearSpan = document.getElementById("year");
const orderResult = document.getElementById("orderResult");

function formatPrice(n){ return `$${n.toLocaleString()}` }

function srcsetFor(basePath){
  // expects basePath like images/p001.jpg
  const base = basePath.replace(/\.jpg$/i, '');
  const s1 = `${base}.jpg 800w`;
  const s2 = `${base}@2x.jpg 1600w`;
  return `${s1}, ${s2}`;
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
          <source type="image/webp" srcset="${p.img.replace(/\.jpg$/, '.webp')} , ${p.img.replace(/\.jpg$/, '@2x.webp')} 1600w">
          <img src="${p.img}" srcset="${srcsetFor(p.img)}" sizes="(max-width:600px) 100vw, 300px" alt="${p.name}" loading="lazy" width="800" height="600" />
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
        <button class="btn view" data-action="view" data-id="${p.id}">View</button>
        <button class="btn primary buy" data-action="buy" data-id="${p.id}" ${p.available? '' : 'disabled'}>Buy Now</button>
      </div>
    `;
    productsContainer.appendChild(card);
  });
}

// Event delegation for view/buy
productsContainer.addEventListener('click', (e)=>{
  const btn = e.target.closest('button');
  if(!btn) return;
  const action = btn.dataset.action;
  const id = btn.dataset.id;
  if(action === 'view') return handleView(id);
  if(action === 'buy') return handleBuy(id);
});

function handleView(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  // show a nicer modal view instead of alert
  modalTitle.textContent = p.name;
  modalProduct.innerHTML = `
    <picture>
      <source type="image/webp" srcset="${p.img.replace(/\.jpg$/, '.webp')} , ${p.img.replace(/\.jpg$/, '@2x.webp')} 1600w">
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
      <source type="image/webp" srcset="${p.img.replace(/\.jpg$/, '.webp')} , ${p.img.replace(/\.jpg$/, '@2x.webp')} 1600w">
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

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e)=>{ if(e.target===modal) closeModal(); });

yearSpan.textContent = new Date().getFullYear();

// Form submission with client-side validation and reservation UI
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
  if(!name || !email || !bankRef){ alert('Please fill your name, email and bank transfer reference.'); return; }
  if(!confirmed.checked){ alert('Please confirm you will make the bank transfer.'); return; }

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
      orderResult.textContent = `Order submitted — reference: ${data.orderId}. Please complete the bank transfer to the account you were shown and keep the transfer reference.`;
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
