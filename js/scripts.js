/*!
* Start Bootstrap - Shop Homepage v5.0.5 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


// CARRITO

// ARRAY PRODUCTOS
let products = [
    { id: 1, title: 'Funko Pop de Pikachu', price: 1500, stock: true, category: 'figure', thumbnail: "https://http2.mlstatic.com/D_NQ_NP_795834-MLA48341511152_112021-O.webp" },
    { id: 2, title: 'Carta de Charizard', price: 2000, stock: true, category: 'card', thumbnail: "https://www.cardtrader.com/uploads/blueprints/image/153134/charizard-vmax-rare-shiny-sv107-shining-fates.png" },
    { id: 3, title: 'Carta de Gogeta', price: 500, stock: false, category: 'card', thumbnail: "https://static.cardmarket.com/img/d05e9d335f68f97387e358e0c75c6dad/items/1049/BT11/488149.jpg" },
    { id: 4, title: 'Figura a escala de Broly', price: 4000, stock: true, category: 'figure', thumbnail: "https://d3nt9em9l1urz8.cloudfront.net/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/b/z/bzbp35705_1.jpg" }
];

const cartStorage = localStorage.getItem('cart');

const cart = JSON.parse(cartStorage) ?? [];

const cartTotalAmountStart = cart.reduce((sum, product) => sum + product.price, 0);

document.getElementById('cart-string').innerHTML = `${cart.length} - $${cartTotalAmountStart}`;

// GENERADOR CARDS
const generateCards = (arrayFiltered) => {
    let generatorCards = ``;
    arrayFiltered.forEach((product) => {
        generatorCards += `    <div class="card-responsive col mb-5">
    <div class="card h-100">
        <!-- Product image-->
        <img class="card-img-top" src="${product.thumbnail}" alt="..." />
        <!-- Product details-->
        <div class="card-body p-2">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder product-title">${product.title}</h5>
                <!-- Product price-->
                $${product.price}
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-2 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a class="btn btn-outline-dark mt-auto mb-2 btn_add-cart" href="#" onclick="addToCart('${product.id}')">Agregar <i class="bi-cart-fill me-1"></i></a></div>
        </div>
    </div>
</div>`;
    })
    document.getElementById('container-products').innerHTML = generatorCards;
};


// TODO: FUNCION MOSTRAR DETALLE PRODUCTO

// Agregar esta línea de código al generador de cards
/* <div class="text-center"><a class="btn btn-outline-dark mt-auto mb-2 btn_show-details" data-toggle="modal" data-target="#productModal" href="#">Ver detalles</a></div> */

/* const showDetails = () => {
    let btnArray = document.getElementsByClassName("btn_show-details");
    for (let i=0; i < btnArray.length; i++) {
        btnArray[i].onclick = () => {
            let productDetails =
            `<div class="modal-dialog" role="document">
            <div class="modal-content" id="cartModalContent">
                <div class="modal-header">
                    <h5 class="modal-title" id="cartModalLabel">${document.getElementsByClassName("product-title")[0].innerHTML}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="cartModalBody">
                    <div id="cartModalProducts"></div>
                    <div class="d-flex justify-content-between">
                        <div id="cartTotalH5"><h5>Total:</h5></div>
                        <div id="cartModalTotalAmount"></div>
                    </div>
                </div>
                <div class="modal-footer" id="cartModalFooter">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary">Agregar <i class="bi-cart-fill me-1"></i></button>
                </div>
            </div>
        </div>`;
        document.getElementById("productModal").innerHTML = productDetails;
        }
    };
}; */

// FUNCION ACTUALIZACION INDICE CARRITO (CANT. PROD. Y TOTAL EN $) Y SU ALMACENAMIENTO EN JSON
const cartReduce = () => {
    const cartTotalAmount = cart.reduce((sum, product) => sum + product.price, 0);
    document.getElementById('cart-string').innerHTML = `${cart.length} - $${cartTotalAmount}`
    const cartJSON = JSON.stringify(cart);
    localStorage.setItem('cart', cartJSON);
}

// FUNCION AGREGAR UN PRODUCTO AL CARRTTO
const addToCart = (productId) => {
    const foundIndex = products.findIndex(product => product.id == productId);
    if (products[foundIndex].stock == true) {
        cart.push(products[foundIndex]);
        Toastify({
            text: "El producto fue agregado al carrito exitosamente! :D",
            duration: 2500,
        }).showToast();
        cartReduce();
    } else {
        Toastify({
            text: "Lo sentimos, no tenemos stock del producto solicitado. :(",
            duration: 2500,
            style: {
                background: "linear-gradient(to right, #ff7152, #f12711)",
            },
        }).showToast();
    }
};

// FUNCION ELIMINAR UN PRODUCTO DEL CARRTTO
const removeFromCart = (cartProductId) => {
    const foundIndexCart = cart.findIndex(cartProduct => cartProduct.id == cartProductId);
    if (foundIndexCart != -1) {
        cart.splice(foundIndexCart, 1);
        cartReduce();
        generateCardsCart();
        Toastify({
            text: "El producto fue eliminado del carrito exitosamente. :(",
            duration: 2500,
        }).showToast();
    } else {
        console.log(`El producto que intentaste eliminar no estaba en tu carrito.`)
    }
};

// FUNCION BORRAR TODO EL CARRITO
const btnRemoveAllCart = document.getElementById('btn_removeAllCart');
btnRemoveAllCart.onclick = () => {
    if (cart.length == 0) {
        Toastify({
            text: "El carrito está vacío!",
            duration: 2500,
            gravity: "bottom",
            position: "center",
            style: {
                background: "linear-gradient(to right, #ff7152, #f12711)",
            },
        }).showToast();
    } else {
        cart.splice(0, cart.length);
        cartReduce();
        generateCardsCart();
        Toastify({
            text: "El carrito fue vaciado exitosamente. :(",
            duration: 2500,
            gravity: "bottom",
            position: "center",
            style: {
                background: "linear-gradient(to right, #8E2DE2, #4A00E0)",
            },
        }).showToast();
    }
}

// FUNCION MOSTRAR PRODUCTOS EN EL CARRITO
const generateCardsCart = () => {
    let generatorCardsCart = ``;
    cart.forEach((product) => {
        generatorCardsCart += `
        <div class='d-flex justify-content-between align-items-center cart-modal_product'>
        <div><p class= 'cart-modal_product_title'>${product.title}</h5></div>
        <div class='d-flex align-items-center gap-10px'><p class= 'cart-modal_product_price'>$${product.price}</p><a class="btn btn-outline-dark mt-n3 btn_remove-cart" href="#" onclick="removeFromCart('${product.id}')"><i class="fa-solid fa-trash-can"></i></a></div>
        </div>`;
        }),
    document.getElementById('cartModalProducts').innerHTML = generatorCardsCart;
    const cartModalReduce = cart.reduce((sum, product) => sum + product.price, 0);
    let cartModalTotalAmount = `<h5>$${cartModalReduce}</h5>`
    document.getElementById('cartModalTotalAmount').innerHTML = cartModalTotalAmount;
};

const btnShowCart = document.getElementById('btn_show-cart');
btnShowCart.onclick = () => {
    generateCardsCart();
}


/* FUNCION FILTRAR POR CATEGORIAS */
const filterByCategory = (category) => {
    const categoryArray = products.filter((product) => product.category == category)
    generateCards(categoryArray)
}

const categoryAll = document.getElementById('category_all')
categoryAll.onclick = () => { generateCards(products) }

const categoryCards = document.getElementById('category_cards')
categoryCards.onclick = () => { filterByCategory('card') }

const categoryFigures = document.getElementById('category_figures')
categoryFigures.onclick = () => { filterByCategory('figure') }

const categoryInStock = document.getElementById('category_in-stock')
categoryInStock.onclick = () => {
    const stockTrueArray = products.filter((product) => product.stock == true)
    generateCards(stockTrueArray)
}

// FUNCION ORDENAR DE MAYOR A MENOR PRECIO
const orderByPriceHigher = document.getElementById('price_higher')
orderByPriceHigher.onclick = () => {
    products.sort((a,b) => (a.price < b.price ? 1 : -1));
    generateCards(products)
};

// FUNCION ORDENAR DE MENOR A MAYOR PRECIO
const orderByPriceLower = document.getElementById('price_lower')
orderByPriceLower.onclick = () => {
    products.sort((a,b) => (a.price > b.price ? 1 : -1));
    generateCards(products)
};

/* FUNCION VALIDACION DE CUENTA */
const validateEmail = (email) => {
    return String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    
    const buttonEnableValidation = () => {
        const accountEmailError = document.getElementById('emailError').innerHTML
        const accountPasswordError = document.getElementById('passwordError').innerHTML
        accountEmailError + accountPasswordError == '' ? btnValidate.disabled = false : btnValidate.disabled = true;
    }
    
    document.getElementById('accountEmail').onchange = (e) => {
        const accountEmail = e.target.value
    const isAccountEmailValid = validateEmail(accountEmail);
    isAccountEmailValid ? document.getElementById('emailError').innerHTML = `` : document.getElementById('emailError').innerHTML = `<p class="error_login">El correo electrónico es inválido.</p>`;
    buttonEnableValidation ();
}

document.getElementById('accountPassword').onchange = (e) => {
    const accountPassword = e.target.value
    accountPassword.length >= 8 ? document.getElementById('passwordError').innerHTML = `` : document.getElementById('passwordError').innerHTML = `<p class="error_login">La contraseña debe contener 8 caracteres (mín).</p>`;
    buttonEnableValidation ();
}

const accountValidations = () => {
    const accountEmail = document.getElementById('accountEmail').value
    const accountPassword = document.getElementById('accountPassword').value
    const isAccountEmailValid = validateEmail(accountEmail)
    if (isAccountEmailValid && accountPassword.length >= 8) {
        document.getElementById('emailError').innerHTML = ``
        document.getElementById('passwordError').innerHTML = ``
        Swal.fire({
            title: '¡Bienvenido!',
            text: `Sesión iniciada correctamente con el correo "${accountEmail}"`,
            icon: 'success',
            confirmButtonText: 'CERRAR'
        })
        document.getElementById('accountModalLabel').innerHTML = 'Datos de la sesión'
        document.getElementById('accountModalBody').innerHTML = `<p>Sesión iniciada con el correo "${accountEmail}"</p>`
        document.getElementById('btnValidate').hidden = true;
        document.getElementById('btnCloseSession').hidden = false;
    } else if (isAccountEmailValid == false) {
        document.getElementById('emailError').innerHTML = `<p class="error_login">El correo electrónico es inválido.</p>`
    } else if (accountPassword.length < 8) {
        document.getElementById('passwordError').innerHTML = `<p class="error_login">La contraseña debe contener 8 caracteres (mín).</p>`
    }
}

const btnValidate = document.getElementById('btnValidate')
btnValidate.onclick = () => {
    accountValidations();
}

// FUNCIÓN CERRAR SESIÓN
const btnCloseSession = document.getElementById('btnCloseSession');
btnCloseSession.onclick = () => {
    Swal.fire({
        title: '¡Hasta pronto!',
        text: `Has cerrado tu sesión.`,
        icon: 'success',
        confirmButtonText: 'CERRAR'
    })
    document.getElementById('accountModalLabel').innerHTML = 'Iniciar sesión'
    document.getElementById('accountModalBody').innerHTML = `
    <div id="emailError"></div>
    <input class="modal_input" type="email" id="accountEmail" placeholder="E-Mail">
    <div id="passwordError"></div>
    <input class="modal_input" type="password" id="accountPassword" placeholder="Contraseña">
    <p class="leyenda">Longitud mínima: 8 caracteres</p>`
    document.getElementById('btnCloseSession').hidden = true;
    document.getElementById('btnValidate').hidden = false;
}

// FECTH
API_URL = 'https://api.mercadolibre.com'
API_ENDPOINT_SEARCH_NICKNAME = '/sites/MLA/search?nickname='
const fetchDataBase = () => {
    fetch(API_URL + API_ENDPOINT_SEARCH_NICKNAME + 'FVENTAS+ONCE')
        .then((response) => response.json())
        .then((data) => {
            productsML = data.results;
            productsML.forEach ((product) => {
                product.stock = true
            })
            products = products.concat(productsML);
            console.log(data);
            generateCards(products);
            showDetails();
        })
}

fetchDataBase();

