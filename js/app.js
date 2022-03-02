console.log('ok!!');
const getData = function(){
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'products.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let data = JSON.parse(this.response);
            let products = document.querySelector('#products');
            products.innerHTML = '';
            for(let item of data){
                products.innerHTML += `
                <div id="product">
                    <h2 id="product__title">${item.title}</h2>
                    <p id="product__price">${item.price}</p>
                </div>
                `;
            }
        }
    }
}
getData();