// const getData = function () {
// 	const xhttp = new XMLHttpRequest();
// 	xhttp.open('GET', 'products.json', true);
// 	xhttp.send();
// 	xhttp.onreadystatechange = function () {
// 		if (this.readyState == 4 && this.status == 200) {
// 			let data = JSON.parse(this.response);
// 			let products = document.querySelector('#products');
// 			products.innerHTML = '';
// 			for (let item of data) {
// 				products.innerHTML += `
//                 <div id="product">
//                     <h2 id="product__title">${item.title}</h2>
//                     <p id="product__price">${item.price}</p>
//                 </div>
//                 `;
// 			}
// 		}
// 	};
// };
// getData();

document.addEventListener('DOMContentLoaded', () => {
	fetchData();
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
	const cards = document.getElementById('shoppingCart');
	const templateCard = document.getElementById('card').content;
	const fragment = document.createDocumentFragment();

	data.forEach((item) => {
		const clone = templateCard.cloneNode(true);
		clone.querySelector('img').src = item.img;
		clone.querySelector('h5').textContent = item.title;
		clone.querySelector('p span').textContent = item.price;
		fragment.appendChild(clone);
	});
	cards.appendChild(fragment);
};
