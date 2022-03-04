
const cards = document.getElementById('shoppingCart');
const templateCartProducts = document.getElementById('productCart').content;
const productsCart = document.getElementById('productsCart');
let cart = {};

document.addEventListener('DOMContentLoaded', () => {
	fetchData();
	console.log(templateCartProducts)
});

cards.addEventListener('click', e => {
	addCart(e);
});


const fetchData = async () => {
	const products = './products.json';
	try {
		const res = await fetch(products);
		const data = await res.json();
		console.log(data);
		pintarData(data);
	} catch (err) {
		console.log(err);
	}
};

const pintarData = (data) => {
	const templateCard = document.getElementById('card').content;
	const fragment = document.createDocumentFragment();

	data.forEach((item) => {
		const clone = templateCard.cloneNode(true);
		clone.querySelector('img').src = item.img;
		clone.querySelector('h5').textContent = item.title;
		clone.querySelector('p span').textContent = item.price;
		clone.querySelector('a').dataset.id = item.id;
		fragment.appendChild(clone);
	});
	cards.appendChild(fragment);
};

const addCart = e => {
	if(e.target.classList.contains('btn')){
		setCart(e.target.parentElement);
	}
	e.stopPropagation();
}
const setCart = productInfo => {
	const product = {
		name: productInfo.querySelector('h5').textContent,
		price: productInfo.querySelector('span').textContent,
		id: productInfo.querySelector('.btn').dataset.id
	}
	cart[product.id] = {...product}
	showCart();
	console.log(cart);
}

const showCart = () => {
	const fragment = document.createDocumentFragment();
	productsCart.innerHTML = "";
	Object.values(cart).forEach(value => {
		const clone = templateCartProducts.cloneNode(true);
		clone.querySelector('h5').textContent = value.name;
		clone.querySelector('p').textContent = `$ ${value.price}`;
		
		fragment.appendChild(clone);
	});
	productsCart.appendChild(fragment);
}

