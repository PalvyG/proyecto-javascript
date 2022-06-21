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
    {id:1, title:'Funko Pop de Goku', price: 1500, stock: true},
    {id:2, title:'Carta de Charizard', price: 2000, stock: true},
    {id:3, title:'Carta de Pikachu', price: 500, stock: false},
    {id:4, title:'Figura a escala de Broly', price: 4000, stock: true}
];

const cartProducts = [];


// GENERADOR CARDS
let generatorCards = ``;

const acumuladorCards = () => {
    products.forEach((product) => {
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
            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#" onclick="addToCart(${product.id})">Agregar al carrito</a></div>
            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#" onclick="removeFromCart(${product.id})">Eliminar del carrito</a></div>
        </div>
    </div>
</div>`;
})
}

acumuladorCards();
document.getElementById('container-products').innerHTML = generatorCards;

// FUNCION AGREGAR UN product AL CARRTTO
const addToCart = (productId) =>{
    const foundIndex = products.findIndex(product => product.id == productId);
    if (products[foundIndex].stock == true) {
        cartProducts.push(products[foundIndex]);
        console.log (`Agregaste "${products[foundIndex].title}" al carrito! :D`);
        console.log (`Tenés ${cartProducts.length} productos en el carrito`);
    } else {
        console.log(`No tenemos stock de "${products[foundIndex].title}" :/`)
    }
};


// FUNCION ELIMINAR UN PRODUCTO DEL CARRTTO
const removeFromCart = (cartProductId) => {
    const foundIndexCart = cartProducts.findIndex(cartProduct => cartProduct.id == cartProductId);
    if (foundIndexCart != -1) {
        console.log (`Eliminaste el producto del carrito... :(`);
        cartProducts.splice(foundIndexCart,1);
        console.log (`Tenés ${cartProducts.length} productos en el carrito`);
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

// FUNCION FILTRAR POR STOCK TRUE
const filterByStock = () => {
    const stockTrue = products.filter ((product) => product.stock === true);
    console.log(`Hay ${stockTrue.length} productos en stock:`);
    stockTrue.forEach ((product) => {
        console.log(product.title)
    })
};

//FUNCION MOSTRAR PRODUCTOS EN EL CARRITO
const showCartProducts = () => {
    console.log ('Estos son los productos que tenés en el carrito:');
    cartProducts.forEach((product) => {
        console.log(`${product.title} - $${product.price}`)
    })
    const cartTotalAmount = cartProducts.reduce ((sum, product) => sum + product.price, 0)
    console.log (`El total de tu carrito es de $${cartTotalAmount}`)
};