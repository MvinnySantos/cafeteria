let cartItems = [];

document.addEventListener('DOMContentLoaded', () => {
  const cartIcon = document.getElementById('cart-icon');
  const modal = document.getElementById('cart-modal');
  const closeModal = document.querySelector('.close');
  const cartItemsList = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('total-display');

  cartIcon.addEventListener('click', () => {
    modal.style.display = 'block';
    updateCartDisplay();
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const itemName = button.parentElement.querySelector('h3').innerText;
      const itemPrice = parseFloat(button.parentElement.querySelector('.price').innerText.replace('R$ ', '').replace(',', '.'));
      cartItems.push({ name: itemName, price: itemPrice });
      alert(`${itemName} adicionado ao carrinho!`);
    });
  });

  function updateCartDisplay() {
    cartItemsList.innerHTML = '';
    let total = 0;
    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - R$ ${item.price.toFixed(2).replace('.', ',')}`;
      cartItemsList.appendChild(li);
      total += item.price;
    });
    totalDisplay.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
  }

  const sendWhatsAppButton = document.getElementById('send-whatsapp');
  sendWhatsAppButton.addEventListener('click', () => {
    if (cartItems.length > 0) {
      const itemsMessage = cartItems.map(item => `${item.name} - R$ ${item.price.toFixed(2).replace('.', ',')}`).join('%0A');
      const totalMessage = `Total: R$ ${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2).replace('.', ',')}`;
      const message = `Olá! Aqui estão os itens do meu pedido:${itemsMessage}${totalMessage}`;
      const phoneNumber = '5571986821061';
      const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

      window.open(whatsappLink, '_blank');
      cartItems = []; 
      updateCartDisplay();
    } else {
      alert('O carrinho está vazio! Adicione itens antes de enviar o pedido.');
    }
  });
});
