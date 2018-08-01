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
        orderList.removeChild(orderListItem)
        deleteOrder(order)
    };

    checkbox.addEventListener('click', removeOrder);
};


var getData = function () {
    $.ajax(url, {
        success: function(coffeeOrders) {
            Object.values(coffeeOrders).forEach(function(order) {
                printOrder(order);
            });
            console.log(Object.values(coffeeOrders));
        },
        error: function() {
            console.log('boom!');
        }
    })
};

var post = function (orderObject) {
    $.ajax(url, {
        method: 'POST',
        data: orderObject,
        success: function() {
            printOrder(orderObject);
        },
        })
};

var deleteOrder = function (order) {
    var emailAddress = order.emailAddress;
    var url = `https://dc-coffeerun.herokuapp.com/api/coffeeorders/${emailAddress}`
    $.ajax(url, {
        method: 'DELETE',
        success: function(orderObject) {
            console.log(order);
        }
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
