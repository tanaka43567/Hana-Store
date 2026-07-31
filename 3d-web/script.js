const heroCard = document.querySelector('.hero-card');
const model = document.querySelector('.model-3d');
const addButtons = document.querySelectorAll('.add-btn');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = [];

if (heroCard && model) {
  heroCard.addEventListener('mousemove', (event) => {
    const rect = heroCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    model.style.transform = `rotateY(${x * 12}deg) rotateX(${y * -12}deg) translateY(-6px)`;
  });

  heroCard.addEventListener('mouseleave', () => {
    model.style.transform = '';
  });
}

addButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.product-item');
    const name = item?.dataset.name || 'Produk';
    const price = Number(item?.dataset.price || 0);

    cart.push({ name, price });
    renderCart();
  });
});

function renderCart() {
  if (!cartItems) return;

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.name}</span><span>Rp ${item.price.toLocaleString('id-ID')}</span>`;
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'hapus';
    removeBtn.addEventListener('click', () => {
      cart.splice(index, 1);
      renderCart();
    });
    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });

  if (cartCount) cartCount.textContent = cart.length;
  if (cartTotal) cartTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Keranjang masih kosong.');
      return;
    }

    alert('Checkout berhasil! Terima kasih telah berbelanja di Hana\'Store.');
    cart = [];
    renderCart();
  });
}
