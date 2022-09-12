if (document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded', ready);
}else{
	ready();
}

function ready(){
	var remove = document.getElementsByClassName('btn-danger');
	for (var i = 0; i < remove.length; i++){
	var button = remove[i];
	button.addEventListener('click', removeItem);
	}

	var qtyInput = document.getElementsByClassName('cart-quantity-input');
	for (var i = 0; i < qtyInput.length; i++){
		var input = qtyInput[i];
		input.addEventListener('change', qtyChange);
	}
	var add = document.getElementsByClassName('shop-item-button');
	for (var i = 0; i < add.length; i++){
		var button = add[i];
		button.addEventListener('click', addItem);
	}

	document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchased);
}

function purchased(){
	alert("Thank you for your purchase");
	var cartItems = document.getElementsByClassName('cart-items')[0];
	while(cartItems.hasChildNodes()){
		cartItems.removeChild(cartItems.firstChild);
	}
	cartTotal();
}

function removeItem(event){
	var buttonclicked = event.target;
		buttonclicked.parentElement.parentElement.remove();
		cartTotal();
}

function qtyChange(event){
	var input = event.target;
	if (isNaN(input.value)|| input.value <= 0){
		input.value = 1;
	}
	cartTotal();
}

function addItem(event){
	var button = event.target;
	var shopItem = button.parentElement.parentElement;
	var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
	var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
	var image = shopItem.getElementsByClassName('shop-item-image')[0].src;
	addItemCart(title, price, image);
	cartTotal();
}

function addItemCart(title, price, image){
	var newRow = document.createElement('div');
	newRow.classList.add('cart-row');
	var newItem = document.getElementsByClassName('cart-items')[0];
	var itemNames = newItem.getElementsByClassName('cart-item-title');
	for (var i = 0; i < itemNames.length; i++){
		if(itemNames[i].innerText == title){
			alert('This item is already added to the cart');
			return;
		}
	}
	var newContent =`<div class="cart-item cart-column">
                        	<img class="cart-item-image" src="${image}" width="100" height="100">
                        	<span class="cart-item-title">${title}</span>
                    	</div>
                    	<span class="cart-price cart-column">${price}</span>
                    	<div class="cart-quantity cart-column">
                        	<input class="cart-quantity-input" type="number" value="1">
                        	<button class="btn btn-danger" type="button">REMOVE</button>
                    	</div>`;
	newRow.innerHTML = newContent;
	newItem.append(newRow);
	newRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItem);
	newRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', qtyChange);
}

function cartTotal(){
	var cartItem = document.getElementsByClassName('cart-items')[0];
	var cartRows = cartItem.getElementsByClassName('cart-row');
	var total = 0;

	for (var i = 0; i < cartRows.length; i++){
		var cartRow = cartRows[i];
		var priceElement = cartRow.getElementsByClassName('cart-price')[0];
		var qtyElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
		var price = parseFloat(priceElement.innerText.replace('$', ''));
		var quantity = qtyElement.value;
		total = total + (price * quantity);
	}
	total = Math.round(total * 100) / 100;
	document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}