const modal = document.querySelector('#modal');
const confirmOrder = document.querySelector('#confirm-order');
const confirmedOrder = document.querySelector('#confirmed-order');

confirmOrder.addEventListener('click', () => {
  modal.showModal();
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});

confirmedOrder.addEventListener('click', () => {
  modal.close();
});
