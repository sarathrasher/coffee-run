var orderForm = document.querySelector('[data-coffee-order="form"]');
var orderList = document.querySelector(".order-list");
var checkbox = document.createElement('input');
checkbox.setAttribute('type', 'checkbox');
var orders = [];

var submit = function (event) {
    event.preventDefault();

    var coffeeOrder = document.querySelector('[name="coffee"]');
    var email = document.querySelector('[name="emailAddress"]');
    var size = document.querySelector('[name="size"]:checked');
    var flavor = document.querySelector('[name="flavor"]');
    var strength = document.querySelector('[name="strength"]')

    var orderObject = { coffeeOrder: coffeeOrder.value, email: email.value, size: size.value, flavor: flavor.value, strength: strength.value};

    orders.push(orderObject);

    printOrder(orderObject); 

    localStorage.setItem("coffeeOrders", JSON.stringify(orders));
}

var printOrder = function (order) {
    var orderListItem = document.createElement('li')
    orderListItem.classList.add('order')

    orderStatement = `${order.coffeeOrder}, ${order.email}, ${order.size}, ${order.flavor}, ${order.strength}`

    orderListItem.textContent = orderStatement

    orderListItem.appendChild(checkbox);
    orderList.appendChild(orderListItem);

    var removeOrder = function (event) {
        orderList.removeChild(orderListItem)
    };

    checkbox.addEventListener('click', removeOrder);
};

orders.forEach(function(order) {printOrder(order)});

orderForm.addEventListener('submit', submit);


