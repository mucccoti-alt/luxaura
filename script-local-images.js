// script.js — now referencing local image files (images/p001.jpg ...)
const PRODUCTS = [
  { id: "P001", name: "Aurora Diamond Pendant", price: 2750, img: "images/p001.jpg" , desc: "18K gold pendant with brilliant-cut diamond accent." },
  { id: "P002", name: "Solstice Gold Ring", price: 2890, img: "images/p002.jpg" , desc: "Classic 22K gold ring with polished finish." },
  { id: "P003", name: "Evelyn Diamond Studs", price: 3200, img: "images/p003.jpg" , desc: "Pair of diamond studs set in 14K gold." },
  { id: "P004", name: "Celeste Gold Bangle", price: 2705, img: "images/p004.jpg" , desc: "Delicate gold bangle with a satin sheen." },
  { id: "P005", name: "Orion Diamond Bracelet", price: 3420, img: "images/p005.jpg" , desc: "Tennis-style bracelet featuring round diamonds." },
  { id: "P006", name: "Riviera Gold Necklace", price: 3050, img: "images/p006.jpg" , desc: "Fine gold chain with textured links." },
  { id: "P007", name: "Luna Solitaire Ring", price: 3780, img: "images/p007.jpg" , desc: "Solitaire diamond in a timeless 18K gold setting." },
  { id: "P008", name: "Ivy Diamond Cluster", price: 2899, img: "images/p008.jpg" , desc: "Cluster diamonds arranged in a floral motif." },
  { id: "P009", name: "Mariner Gold Hoop Set", price: 2765, img: "images/p009.jpg" , desc: "Set of two gold hoops with secure latch." },
  { id: "P010", name: "Seraph Diamond Collar", price: 3350, img: "images/p010.jpg" , desc: "Bold collar necklace with diamond accent stones." },
  { id: "P011", name: "Helena Locket", price: 2975, img: "images/p011.jpg" , desc: "Engravable locket in polished gold." },
  { id: "P012", name: "Vega Gold Pendant", price: 2825, img: "images/p012.jpg" , desc: "Modern pendant with brushed gold surface." }
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

function renderProducts(){
  PRODUCTS.forEach(p=>{
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="product-image">
        <img src="${p.img}" alt="${p.name}" loading="lazy" width="800" height="600" />
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
    <img src="${p.img}" alt="${p.name}" style="width:120px;height:100px;object-fit:contain;border-radius:6px" loading="lazy" />
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
