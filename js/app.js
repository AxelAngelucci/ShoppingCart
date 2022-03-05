const cards = document.getElementById('shoppingCart');
const productsCart = document.getElementById('productsCart');
let cart = {};
let total = 0;
carrito = [];

document.addEventListener('DOMContentLoaded', () => {
	fetchData();
});

document.addEventListener('click', (e) => {
	if (e.target.matches('.btn-agregar')) {
		btnAgregar(e);
	}
	if (e.target.matches('.btn-quitar')) {
		btnQuitar(e);
	}
});

cards.addEventListener('click', (e) => {
	addCart(e);
});

const fetchData = async () => {
	const products = './products.json';
	try {
		const res = await fetch(products);
		const data = await res.json();
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

const addCart = (e) => {
	if (e.target.classList.contains('btn')) {
		setCart(e.target.parentElement);
	}
	e.stopPropagation();
};
const setCart = (productInfo) => {
	const product = {
		name: productInfo.querySelector('h5').textContent,
		price: productInfo.querySelector('span').textContent,
		id: productInfo.querySelector('.btn').dataset.id,
		cantidad: 1,
	};

	const index = carrito.findIndex((item) => item.id === product.id);

	if (index === -1) {
		carrito.push(product);
	} else {
		carrito[index].cantidad++;
	}
	cart[product.id] = { ...product };
	console.log(carrito);
	showCart();
};

const showCart = () => {
	const templateCartProducts = document.getElementById('productCart');
	const fragment = document.createDocumentFragment();
	productsCart.textContent = '';

	carrito.forEach((item) => {
		const clone = templateCartProducts.content.cloneNode(true);
		clone.querySelector('h5').textContent = item.name;
		clone.querySelector('span').textContent = item.cantidad;
		clone.querySelector('.btn-agregar').dataset.id = item.id;
		clone.querySelector('.btn-quitar').dataset.id = item.id;
		clone.querySelector('p').textContent = `$ ${item.price * item.cantidad}`;
		fragment.appendChild(clone);
	});
	productsCart.appendChild(fragment);
	setTotal();
};

const btnAgregar = (e) => {
	carrito.textContent = '';

	carrito = carrito.map((item) => {
		if (e.target.dataset.id === item.id) {
			item.cantidad++;
			return item;
		} else {
			return item;
		}
	});
	showCart();
	
};

const btnQuitar = (e) => {
	carrito.textContent = '';

	carrito = carrito.filter((item) => {
		if (e.target.dataset.id === item.id) {
			if (item.cantidad > 0) {
				item.cantidad--;
				if (item.cantidad === 0) return;
				return item;
			} else {
				return item;
			}
		} else {
			return item;
		}
	});
	showCart();
};

const setTotal = () => {
	total = 0;
	carrito.forEach((item) => {
		total = total + (parseInt(item.price) * item.cantidad);
	});
	if(total > 0){
		showTotal();
	}
	
}

const showTotal = () => {
	const templateTotal = document.getElementById('total');
	const fragment = document.createDocumentFragment();
	const clone = templateTotal.content.cloneNode(true);
	clone.querySelector('p').textContent = `$ ${total}`;
	fragment.appendChild(clone);
	productsCart.appendChild(fragment);
}
