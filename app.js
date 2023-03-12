const baseUrl = "https://crudcrud.com/api/fbb164d45ce34f40a11f345fa7b35fed";
const ordersUrl = "https://crudcrud.com/api/fbb164d45ce34f40a11f345fa7b35fed/orders"
// Get a reference to the order form and the tables
const orderForm = document.querySelector('#orderForm');
const tables = document.querySelectorAll('.tables table');


// Function to create a new order
const createOrder = (order) => {
  return axios.post(ordersUrl, order)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
};

// Function to get all orders
const getOrders = () => {
    return axios.get(ordersUrl)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
};

// Function to delete an order
const deleteOrder = (orderId) => {
   return  axios.delete(`${ordersUrl}/${orderId}`)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
};

// Function to display orders on the screen
const displayOrders = (orders) => {
    ordersList.innerHTML = '';
    orders.forEach(order => {
      const li = document.createElement('li');
      const tableId = order.table;
      let table = document.getElementById(tableId);
      if (!table) {
        table = document.createElement('table');
        table.id = tableId;
        const tablesDiv = document.querySelector('.tables');
        tablesDiv.appendChild(table);
        const tableTitle = document.createElement('h3');
        tableTitle.textContent = tableId;
        table.appendChild(tableTitle);
      }
      li.textContent = `${order.dish} - ${order.price}`;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete Order';
      deleteButton.addEventListener('click', () => {
        deleteOrder(order._id)
          .then(() => {
            table.removeChild(li);
            ordersList.removeChild(deleteButton.parentNode);
          });
      });
      li.appendChild(deleteButton);
      table.appendChild(li);
    });
  };
  
// Function to handle form submit
const handleFormSubmit = (event) => {
    event.preventDefault();
    const dishInput = document.getElementById('dish');
    const priceInput = document.getElementById('price');
    const tableInput = document.getElementById('table');
    const order = {
      dish: dishInput.value,
      price: priceInput.value,
      table: tableInput.value
    };
    createOrder(order)
      .then(() => {
        getOrders()
          .then(orders => {
            displayOrders(orders);
            dishInput.value = '';
            priceInput.value = '';
            tableInput.value = '';
          });
      });
  };
  
  orderForm.addEventListener('submit', handleFormSubmit);
  
  getOrders()
    .then(orders => displayOrders(orders));
  