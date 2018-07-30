var orderForm = document.querySelector('[data-coffee-order="form"]');
var orderList = document.querySelector(".order-list");

var submit = function (event) {
    event.preventDefault();

    var coffeeOrder = document.getElementsByName('coffee');
    var email = document.getElementsByName('emailAddress');
    var size = document.querySelector('[name="size"]:checked');
    var flavor = document.getElementsByName('flavor');
    var strength = document.getElementsByName('strength')

    printOrder(coffeeOrder, email, size, flavor, strength);
    
}

var printOrder = function (coffeeOrder, email, size, flavor, strength) {
    var orderListItem = document.createElement('li')
    var checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    orderListItem.appendChild(checkbox);
    orderListItem.textContent = `${coffeeOrder[0].value}, ${email[0].value}, ${size.value}, ${flavor[0].value}, ${strength[0].value}`

    
    orderList.appendChild(orderListItem);
};



orderForm.addEventListener('submit', submit);
checkbox.addEventListener('click', removeOrder);

