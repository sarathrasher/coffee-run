var orderForm = document.querySelector('[data-coffee-order="form"]');
var orderList = document.querySelector(".order-list");

var orders = [];

var url = 'https://dc-coffeerun.herokuapp.com/api/coffeeorders'

var printOrder = function (order) {
    var orderText = `${order.coffee}, ${order.emailAddress}, ${order.size}, ${order.flavor}, ${order.strength}`

    var orderListItem = document.createElement('li')
    orderListItem.classList.add('order')
    var orderStatement = document.createElement('p')
    orderStatement.textContent = orderText

    var checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    orderListItem.appendChild(orderStatement);
    orderListItem.appendChild(checkbox);
    orderList.appendChild(orderListItem);

    var removeOrder = function (event) {
        orderListItem.classList.add('green');
        setTimeout(function () {orderList.removeChild(orderListItem)}, 2000);
        deleteOrder(order)
    };

    checkbox.addEventListener('click', removeOrder);
};


var getData = function () {
    var coffeeData = fetch(url)
    coffeeData.then(function (response) {
        var jsonCoffeeOrders = response.json();
        jsonCoffeeOrders.then(function(coffeeOrders) {
            Object.values(coffeeOrders).forEach(function(order) {
                printOrder(order);
            });
        });
    });
};

var post = function (orderObject) {
    var postData = fetch(url, {
        method: 'POST',
        body: JSON.stringify(orderObject),
        headers: {
            'Content-Type': 'application/json'
        } 
    });
    postData.then(res);  
    orderSubmission =  res.json();
    orderSubmission.then(function(orderObject) {
        printOrder(orderSubmission);
    });  
}; 


var deleteOrder = function (order) {
    var emailAddress = order.emailAddress;
    var url = `https://dc-coffeerun.herokuapp.com/api/coffeeorders/${emailAddress}`
    var deleteOrder = fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(order), 
        headers: {
            'Content-Type': 'application/json'
        }
    });
    deleteOrder.then(response)
    var deletedOrder = response.json();
    deletedOrder.then(function() {
        console.log(deletedOrder);
    });
};

var deleteByValue = function (value) {
    var newOrderList = []
    for (var i = 0; i < orders.length; i++) {
        if (orders[i] !== value) {
            newOrderList.push(orders[i]);
        }
    }
    orders = newOrderList;
};

var submit = function (event) {
    event.preventDefault();

    var coffee = document.querySelector('[name="coffee"]');
    var emailAddress = document.querySelector('[name="emailAddress"]');
    var size = document.querySelector('[name="size"]:checked');
    var flavor = document.querySelector('[name="flavor"]');
    var strength = document.querySelector('[name="strength"]')

    var orderObject = {coffee: coffee.value, emailAddress: emailAddress.value, size: size.value, flavor: flavor.value, strength: strength.value};

    post(orderObject);
};

getData();
orderForm.addEventListener('submit', submit);
