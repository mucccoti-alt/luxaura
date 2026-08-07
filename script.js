// script.js — updated to use studio-style Unsplash photos (responsive srcset + lazy loading)
const PRODUCTS = [
  { id: "P001", name: "Aurora Diamond Pendant", price: 2750, imgBase: "https://images.unsplash.com/photo-1531799101675-7a8bb0f2873b" , desc: "18K gold pendant with brilliant-cut diamond accent." },
  { id: "P002", name: "Solstice Gold Ring", price: 2890, imgBase: "https://images.unsplash.com/photo-1509395176047-4a66953fd231" , desc: "Classic 22K gold ring with polished finish." },
  { id: "P003", name: "Evelyn Diamond Studs", price: 3200, imgBase: "https://images.unsplash.com/photo-1520975911261-9f1fa1b2e3b6" , desc: "Pair of diamond studs set in 14K gold." },
  { id: "P004", name: "Celeste Gold Bangle", price: 2705, imgBase: "https://images.unsplash.com/photo-1534837143817-ec7f2b3e75a2" , desc: "Delicate gold bangle with a satin sheen." },
  { id: "P005", name: "Orion Diamond Bracelet", price: 3420, imgBase: "https://images.unsplash.com/photo-1549887534-1e27a1a59d0d" , desc: "Tennis-style bracelet featuring round diamonds." },
  { id: "P006", name: "Riviera Gold Necklace", price: 3050, imgBase: "https://images.unsplash.com/photo-1570082072637-b31b5f6b2fc8" , desc: "Fine gold chain with textured links." },
  { id: "P007", name: "Luna Solitaire Ring", price: 3780, imgBase: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3" , desc: "Solitaire diamond in a timeless 18K gold setting." },
  { id: "P008", name: "Ivy Diamond Cluster", price: 2899, imgBase: "https://images.unsplash.com/photo-1562158076-7d4a3b672f0a" , desc: "Cluster diamonds arranged in a floral motif." },
  { id: "P009", name: "Mariner Gold Hoop Set", price: 2765, imgBase: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" , desc: "Set of two gold hoops with secure latch." },
  { id: "P010", name: "Seraph Diamond Collar", price: 3350, imgBase: "https://images.unsplash.com/photo-1561185127-3d3c2d62c2a0" , desc: "Bold collar necklace with diamond accent stones." },
  { id: "P011", name: "Helena Locket", price: 2975, imgBase: "https://images.unsplash.com/photo-1554995207-c18c203602cb" , desc: "Engravable locket in polished gold." },
  { id: "P012", name: "Vega Gold Pendant", price: 2825, imgBase: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f" , desc: "Modern pendant with brushed gold surface." }
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

function imageSrcset(base){
  // Unsplash accepts width parameter; provide 800 and 1600 versions
  const s1 = `${base}?auto=format&fit=crop&w=800&q=80`;
  const s2 = `${base}?auto=format&fit=crop&w=1600&q=80`;
  return `${s1} 800w, ${s2} 1600w`;
}

function imageSrc(base){
  return `${base}?auto=format&fit=crop&w=800&q=80`;
}

function renderProducts(){
  PRODUCTS.forEach(p=>{
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="product-image">
        <img src="${imageSrc(p.imgBase)}" srcset="${imageSrcset(p.imgBase)}" sizes="(max-width:600px) 100vw, 300px" alt="${p.name}" loading="lazy" />
      </div>
      <div class="product-info">
        <div class="product-title">${p.name}</div>
        <div class="product-price">${formatPrice(p.price)}</div>
        <div class="small">${p.desc}</div>
        <div class="small">Product code: ${p.id}</div>
      </div>
      <div class="btns" style="margin-top:.75rem">
        <button class="btn" data-id="${p.id}" onclick="viewProduct('${p.id}')">View</button>
        <button class="btn primary" data-id="${p.id}" onclick="buyNow('${p.id}')">Buy Now</button>
      </div>
    `;
    productsContainer.appendChild(card);
  });
}

function viewProduct(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  alert(`${p.name}\nPrice: ${formatPrice(p.price)}\n\n${p.desc}`);
}

function buyNow(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  modalTitle.textContent = `Buy: ${p.name}`;
  modalProduct.innerHTML = `
    <img src="${imageSrc(p.imgBase)}" srcset="${imageSrcset(p.imgBase)}" sizes="200px" alt="${p.name}" style="width:120px;height:100px;object-fit:contain;border-radius:6px" loading="lazy" />
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

// AJAX form submit to our Worker endpoint /api/orders
checkoutForm.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const formData = new FormData(checkoutForm);
  const confirmed = document.getElementById("confirmTransfer");
  if(!confirmed.checked){
    alert("You must confirm you will transfer payment to account 4890010100591001.");
    return;
  }
  const payload = {};
  formData.forEach((v,k)=>{ payload[k]=v });
  payload.product_price = Number(payload.product_price);
  payload.confirmTransfer = true;

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
      orderResult.textContent = `Order submitted — reference: ${data.orderId}. Please complete the bank transfer to 4890010100591001 and keep the transfer reference.`;
      checkoutForm.reset();
      setTimeout(()=>closeModal(),800);
    } else {
      orderResult.classList.remove('hidden');
      orderResult.classList.add('error');
      orderResult.textContent = data.error || 'Submission failed';
    }
  }catch(err){
    orderResult.classList.remove('hidden');
    orderResult.classList.add('error');
    orderResult.textContent = 'Network error — please try again later.';
  }
});

renderProducts();

// expose for inline onclick
window.buyNow = buyNow;
window.viewProduct = viewProduct;
