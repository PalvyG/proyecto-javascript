/*!
* Start Bootstrap - Shop Homepage v5.0.5 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


// CARRITO

// ARRAY PRODUCTOS
const products = [
    {id:1, title:'Funko Pop de Goku', price: 1500, stock: true, category: 'figure'},
    {id:2, title:'Carta de Charizard', price: 2000, stock: true, category: 'card'},
    {id:3, title:'Carta de Pikachu', price: 500, stock: false, category: 'card'},
    {id:4, title:'Figura a escala de Broly', price: 4000, stock: true, category: 'figure'}
];

const cartStorage = localStorage.getItem('cart');

const cart = JSON.parse(cartStorage) ?? [];

const cartTotalAmountStart = cart.reduce ((sum, product) => sum + product.price, 0);

document.getElementById('cart-string').innerHTML = `${cart.length} - $${cartTotalAmountStart}`;

// GENERADOR CARDS
const generateCards = (arrayFiltered) => {
let generatorCards = ``;
arrayFiltered.forEach((product) => {
    generatorCards +=`    <div class="col mb-5">
    <div class="card h-100">
        <!-- Product image-->
        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${product.title}</h5>
                <!-- Product price-->
                $${product.price}
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a class="btn btn-outline-dark mt-auto mb-2 btn_add-cart" href="#" onclick="addToCart(${product.id})">Agregar al carrito</a></div>
            <div class="text-center"><a class="btn btn-outline-dark mt-auto btn_remove-cart" href="#" onclick="removeFromCart(${product.id})">Eliminar del carrito</a></div>
        </div>
    </div>
</div>`;
})
document.getElementById('container-products').innerHTML = generatorCards;
};
generateCards(products);

// FUNCION AGREGAR UN product AL CARRTTO
const addToCart = (productId) =>{
    const foundIndex = products.findIndex(product => product.id == productId);
    if (products[foundIndex].stock == true) {
        cart.push(products[foundIndex]);
        const cartTotalAmount = cart.reduce ((sum, product) => sum + product.price, 0);
        document.getElementById('cart-string').innerHTML = `${cart.length} - $${cartTotalAmount}`
        const cartJSON = JSON.stringify(cart)
        localStorage.setItem('cart', cartJSON);
    } else {
        console.log(`No tenemos stock de "${products[foundIndex].title}" :/`)
    }
};


// FUNCION ELIMINAR UN PRODUCTO DEL CARRTTO
const removeFromCart = (cartProductId) => {
    const foundIndexCart = cart.findIndex(cartProduct => cartProduct.id == cartProductId);
    if (foundIndexCart != -1) {
        cart.splice(foundIndexCart,1);
        const cartTotalAmount = cart.reduce ((sum, product) => sum + product.price, 0);
        document.getElementById('cart-string').innerHTML = `${cart.length} - $${cartTotalAmount}`
        const cartJSON = JSON.stringify(cart)
        localStorage.setItem('cart', cartJSON);
    } else {
        console.log(`El producto que intentaste eliminar no estaba en tu carrito.`)
    }
};


//  TODO: FUNCION ORDENAR DE MAYOR A MENOR PRECIO
/* const orderByPriceHigher = () => {
    products.sort = () => {
        
    }
}; */

// TODO: FUNCION ORDENAR DE MENOR A MAYOR PRECIO
/* const orderByPriceLower = () => {
    products.sort = () => {
        
    }
}; */

// FUNCION MOSTRAR PRODUCTOS EN EL CARRITO
const btnShowCart = document.getElementById('btn_show-cart')
btnShowCart.onclick = () => {
    console.log ('Estos son los productos que tenés en el carrito:');
    cart.forEach((product) => {
        console.log(`${product.title} - $${product.price}`)
    })
    const cartTotalAmount = cart.reduce ((sum, product) => sum + product.price, 0)
    console.log (`El total de tu carrito es de $${cartTotalAmount}`)
};

/* FUNCION FILTRAR POR CATEGORIAS */
const filterByCategory = (category) => {
    const categoryArray = products.filter((product) => product.category == category)
    generateCards(categoryArray)
}

const categoryAll = document.getElementById('category_all')
categoryAll.onclick = () => {generateCards(products)}

const categoryCards = document.getElementById('category_cards')
categoryCards.onclick = () => {filterByCategory('card')}

const categoryFigures = document.getElementById('category_figures')
categoryFigures.onclick = () => {filterByCategory('figure')}

const categoryInStock = document.getElementById('category_in-stock')
categoryInStock.onclick = () => {
    const stockTrueArray = products.filter((product) => product.stock == true)
    generateCards(stockTrueArray)
}

const botonPrueba = document.getElementById('boton_prueba')
botonPrueba.onclick = () => {
    document.getElementById('modal_prueba')
}