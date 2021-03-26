// // Add To Cart mendapatkan argument dari DOM. Argument: Nama, Quantity
// addToCart('Cheesecake', 5)

// //Update Cart Plus dan Minus menerima argument dari DOM. Argument: Nama
// updateCartPlus('Cheesecake')

// //Delete Cart menerima argument dari DOM. Argument: Nama
// deleteCart('Cheesecake')

// Stores Shopping Cart Data, Array of Object
arrayShoppingCart = []

// Stores All Food Object, Array of Object
arrayFoods = [{
    nama: "Cheesecake",
    description: "Paket Cheesecake Mousse dengan variant rasa coklat, mangga, dan stroberi.",
    harga: 35000,
    linkFoto: './img/Cheesecake.jpg',
},
{
    nama: "Pudding",
    description: "Paket Pudding dengan variant rasa coklat, cheese-biscuit, dan ubi ungu.",
    harga: 50000,
    linkFoto: './img/Puding.jpg'
}, {
    nama: "Klapertart",
    description: "Klapertart adalah makanan khas Manado, dengan campuran susu, mentega dan kelapa.",
    harga: 20000,
    linkFoto: './img/klappertar.jpg'
}]

// Function 1: Nambah object foodObject dari arrayFood ke arrayShoppingCart. DONE
function addToCart(namaDOM, quantity = 1, event) {
    quantity = Number(quantity)

    if (quantity === 0) {
        quantity++
    }
    event.preventDefault()
    for (let i = 0; i < arrayFoods.length; i++) {
        let udahAda = false;
        let nilai = 0;
        for (value of arrayShoppingCart) {
            if (namaDOM === value.nama) {
                udahAda = true
                nilai = value;
                console.log(nilai)
            }
        }
        if (udahAda) {
            nilai.quantity += quantity
            break;

        } else if (namaDOM === arrayFoods[i].nama) {
            arrayFoods[i].quantity = quantity
            arrayShoppingCart.push(arrayFoods[i])
            break
        }
    }
    console.log(arrayShoppingCart);
}

// Function 2: Update shopping cart jika user mengubah data. Misalkan quantitynya dikurangin atau ditambah. DONE
function updateCartPlus(namaDOM) {
    for (const key of arrayShoppingCart) {
        if (namaDOM === key.nama) {
            key.quantity++
        }
    }
    updateCart()
}

function updateCartMinus(namaDOM) {
    for (const key of arrayShoppingCart) {
        if (namaDOM === key.nama) {
            key.quantity--
            if (key.quantity === 0) {
                deleteCart(namaDOM)
            }
        }
    }
    updateCart()
}
function clearCard() {
    konten.innerHTML = ''
}

// Function 3: Read arrayShoppingCart untuk mengetahui sudah ada barang apa saja di shopping cart.
function updateCart() {
    // let reset = document.getElementsByClassName("modal-backdrop")[0];

    // console.log(reset)
    let domCart = document.getElementsByClassName("modal-body")[0];
    domCart.innerHTML = '';
    for (let i = 0; i < arrayShoppingCart.length; i++) {

        let divUpdateCart = document.createElement('div')
        divUpdateCart.innerHTML = `<div class="card mb-3">
            <div class="row g-0">
            <div class="col-md-4">
                <img src="${arrayShoppingCart[i].linkFoto}" alt="..." style="max-height: 150px;">
            </div>
            <div class="col-md-4">
                <div class="card-body">
                <h5 class="card-title">${arrayShoppingCart[i].nama}</h5>
                <p class="card-text"></p>
                <p class="card-text"><small class="text-muted">Rp. ${arrayShoppingCart[i].harga}</small></p>
                <div class="card-text" style="display: flex;">
                    <button type="button" style="border: none; background-color: white; margin-right: 5px;" onclick="updateCartMinus(value)" value="${arrayShoppingCart[i].nama}"><span class="material-icons">
                    remove_circle_outline
                    </span></button>
                    <div style="margin-top: 6px;"><label for="" style="width:40px"><h4>${arrayShoppingCart[i].quantity}</h4></label></div>
                    <button type="button" style="border: none; background-color: white;" onclick="updateCartPlus(value)" value="${arrayShoppingCart[i].nama}"><span class="material-icons">
                    add_circle_outline
                    </span></button>
                </div>
                </div>
            </div>
            <div class="col-md-4" style="text-align: right; padding-right: 5px;">
                <button type="button" class="btn btn-danger" style="margin-top: 5px;" onclick="deleteCart(value)" value="${arrayShoppingCart[i].nama}">Remove</button>
            </div>
            </div>
        </div>`
        domCart.appendChild(divUpdateCart)
    }

    let totalHarga = 0
    for (let j = 0; j < arrayShoppingCart.length; j++) {
        totalHarga += arrayShoppingCart[j].harga * arrayShoppingCart[j].quantity
    }
    totalHarga = Intl.NumberFormat('idr', { style: 'currency', currency: 'IDR' }).format(totalHarga)
    // console.log(totalHarga);

    let domTotal = document.getElementById('total')
    domTotal.innerHTML = ''
    let tempTotal = document.createElement('p')
    tempTotal.innerHTML = totalHarga
    domTotal.appendChild(tempTotal)
    // console.log(domTotal);

}


// Function 4: Hapus data pada arrayShoppingCart jika user klik delete pada item tersebut. DONE
function deleteCart(namaDOM) {
    for (let i = 0; i < arrayShoppingCart.length; i++) {
        if (namaDOM === arrayShoppingCart[i].nama) {
            arrayShoppingCart.splice(i, 1)
            console.log(`Deleting ${namaDOM}`)
        }
    }
    updateCart()
}
// /*  */
function loadContent() {
    let cardBody = document.getElementsByClassName('tampilProduk')[0];

    for (i = 0; i < arrayFoods.length; i++) {
        let divCard = document.createElement('div')
        divCard.innerHTML = `
            <div class="card" style="min-width: 250px; max-width: 250px; box-shadow:0px 4px 5px #7E7E7E;">
            <div class="card bg-dark text-white" style="width:100%; margin-left:0px; margin-right:0px; border-style:none">
                             <img src="${arrayFoods[i].linkFoto}" class="card-img-top" alt="...">
                             <div class="card-img-overlay" style="background-color:black;">
                                
                                 <h5 class="card-text" style="margin-top:30%; ">${arrayFoods[i].description}</h5>
                                
                             </div>
                             </div>
            
            <div class="card-body">
            <h5 class="card-title">${arrayFoods[i].nama}</h5>
            
            <h6 class="card-price">Rp. ${arrayFoods[i].harga}</h6>
            <div class="cartQty" >
                <form action="" style="justify-content: center;">
                <button type="submit" class="btn btn-primary" onclick= "addToCart(value, qty.value, event)" value="${arrayFoods[i].nama}"  style="padding: 6px; height: fit-content; margin-right: 18px;">Add to Cart</button>
                <input id="qty" type="number" placeholder="qty" style="width: 50px; padding: 5px; height: fit-content" min=1>
                </form>
            </div>
            </div>
            </div>
            `
        cardBody.appendChild(divCard)
    }
}

loadContent()

function mySearch() {
    let pattern = document.getElementById('search').value
    let cardBody = document.getElementsByClassName('tampilProduk')[0];
    if(pattern.length<3){
        cardBody.innerHTML="";
        loadContent();
        return "apalah";
    }
    if (pattern.length >= 3) {
        pattern = pattern.toLowerCase()
        var filtered = arrayFoods.filter(function (str) { return str.nama.toLowerCase().includes(pattern) })
        console.log(filtered)
    }

    cardBody.innerHTML="";
    for (i = 0; i < filtered.length; i++) {
        let divCard = document.createElement('div')
        divCard.innerHTML = `
            <div class="card" style="min-width: 250px; max-width: 250px; box-shadow:0px 4px 5px #7E7E7E;">
            <div class="card bg-dark text-white" style="width:100%; margin-left:0px; margin-right:0px; border-style:none">
                             <img src="${filtered[i].linkFoto}" class="card-img-top" alt="...">
                             <div class="card-img-overlay" style="background-color:black;">
                                
                                 <h5 class="card-text" style="margin-top:30%; ">${filtered[i].description}</h5>
                                
                             </div>
                             </div>
            
            <div class="card-body">
            <h5 class="card-title">${filtered[i].nama}</h5>
            
            <h6 class="card-price">Rp. ${filtered[i].harga}</h6>
            <div class="cartQty" >
                <form action="" style="justify-content: center;">
                <button type="submit" class="btn btn-primary" onclick= "addToCart(value, qty.value, event)" value="${arrayFoods[i].nama}"  style="padding: 6px; height: fit-content; margin-right: 18px;">Add to Cart</button>
                <input id="qty" type="number" placeholder="qty" style="width: 50px; padding: 5px; height: fit-content" min=1>
                </form>
            </div>
            </div>
            </div>
            `
        cardBody.appendChild(divCard)
    }
}
// $('#myModal').appendTo("body") 