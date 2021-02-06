// sending a request to get our product.json file that contains our product details.
let requestURL = "assets/js/products.json";
let request = new XMLHttpRequest(); // the XMLHttpRequest helps us to make network request to recieve data from the server,in this case help us to retrieve products.json
request.open("GET", requestURL);
request.responseType = "json";
request.send();

const addToCartButton = document.querySelectorAll(".btn-to-cart");
const purchase = document.querySelector(".btn-purchase");
const quantityElement = document.querySelector(".cart-quantity-input");

// All our functions are going to called when the request has load on our DOM.
request.onload = function () {
  const projectData = request.response;
  // console.log(projectData);
  let groupPeople = projectData.groupMembers;

  for (let i = 0; i < groupPeople.length; i++) {
    console.log(
      // `welcome to the group ${groupPeople[i]} this is our ${projectData.projectName} project`
    );
  }
  update(projectData);
  let groupProducts = projectData.products;
//   addToCart();
  addToDom(groupProducts)
};

// function to add products to cart.

function addToDom(Products){
    const mainSection = document.querySelector('.section');
    const divSection = document.querySelector('.section-1');
    for(let i=0; i<Products.length; i++){
        let divElement = document.createElement('div');
        divElement.setAttribute('class','card');
        divElement.setAttribute('style','width:18rem');
        let currentProduct = Products[i];
        let imageSource = currentProduct.image;
        let productName = currentProduct.name;
        let productPrice =Number(currentProduct.price);

        let divContents=` <img src="${imageSource}" class="card-img-top"  height="200px">
        <div class="card-body">
          <h5 class="card-title">${productName}</h5>
          <p class="card-price">₦${productPrice}</p>
          <a href="#" class="btn btn-primary btn-to-cart">Add to cart</a>
        </div>
        `
        divElement.innerHTML=divContents
        divSection.append(divElement);
        // console.log(divElement);
        // console.log(`this is the image ${imageSource}, and this is the name ${productName} and this is the price of the product, ${productPrice}`)
    }
    mainSection.appendChild(divSection);
    // addToCart();
    const addToCartButton =mainSection.querySelectorAll('.btn-to-cart');
for(let i=0; i<addToCartButton.length; i++){
  let button =addToCartButton[i]
  button.addEventListener('click',function(){
    let wholeElement=button.parentElement.parentElement;
    console.log(wholeElement)
    addToCartClicked(wholeElement)
  })
}

function addToCartClicked(myElement) {
  let imageSource = myElement.querySelector(".card-img-top").src;
  let title = myElement.querySelector(".card-title").innerHTML;
  let price = myElement.querySelector(".card-price").innerHTML;
  console.log(`my imagesource is ${imageSource} and my title is ${title} and my price is ${price}`)
  addItemToCart(title,price,imageSource)
}

function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.querySelector(".cart-items");
  console.log(cartItems)
  var cartItemNames = cartItems.querySelectorAll(".cart-item-title");
  // console.log(cartItemNames);
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerHTML == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  let cartRowContents = `
            <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span> 
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  // console.log(cartRow)
  

  let removeButton = cartItems.querySelectorAll('.btn-danger')
  for (let i = 0; i < removeButton.length; i++) {
    let button = removeButton[i]
    button.addEventListener('click', function(e){
        e.target.parentElement.parentElement.remove()
        updateCartTotal(cartItems)
    })
    Window.scrollTo(0,5000);
  }
  
  updateCartTotal(cartItems);
  quantityChanged(cartItems)
  purchaseProducts(cartItems);
}

}

function updateCartTotal(cartItems){
  let total =0;
  // console.log(cartItems);
  let cartRow=cartItems.querySelectorAll('.cart-row')
  // console.log(cartRow)
  let priceElement=cartItems.querySelectorAll('.cart-price');
  let quantityElement=cartItems.querySelectorAll(".cart-quantity-input");
  // console.log(priceElement);
  // console.log(quantityElement);
  for(let i=0; i<priceElement.length; i++){
    let presentCartRow =cartRow[i];
    let presentPriceElement=priceElement[i];
    let presentQuantity=quantityElement[i];
    let price =presentPriceElement.innerText.replace('₦', '');
    // console.log(presentPriceElement.innerHTML,price,presentQuantity.value)
    let quantityValue =presentQuantity.value;
    total=total + price * quantityValue
  }
  // console.log(total);
  let totalElement =document.querySelector('.cart-total-price');
  totalElement.innerHTML =`₦${total}`;
}

function quantityChanged(cartItems){
  let quantityInputs =cartItems.querySelectorAll('.cart-quantity-input');
  // console.log(quantityInputs)
  // console.log("we are fine thank you very much for asking");
  for(i=0; i<quantityInputs.length ; i++){
    let button = quantityInputs[i];
    button.addEventListener('change' , function(){
      // console.log(button.value);
      if(button.value <=0){
        button.value=1;
      }
      updateCartTotal(cartItems);
    })
  }
}



//function to update the total amount.
function update(jsonObj) {
  groupProducts = jsonObj.products;
  let total = 0;
  for (let i = 0; i < addToCartButton.length; i++) {
    addToCartButton[i].addEventListener("click", function () {
      total += Number(groupProducts[i].price);
      // console.log(total);
    });
  }
}

// function to remove products from our cart.

// This functions is to give an information when we are done doing all our buying.
function purchaseProducts(cartItems) {
  let purchaseButton= document.querySelector('.btn-purchase')
  // console.log(purchaseButton);
  purchaseButton.addEventListener('click', function(){
    if(!cartItems.hasChildNodes()){
      alert("Please buy something into the cart before purchasing")
      return;
    }
    alert("Thank You for shopping with the Blue Coporation");
    while(cartItems.hasChildNodes()){
      cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal(cartItems);
  })
}

// she is taking seflie , why w, Beom Him is always innocent , you must be relieved , why are you saying , i she deserved it, how dare she try to join our club, you the one beneffited fromm the death of a school student. Are you a psychopath, why? Are we're are the , they are from Japan, why do like the forgotten for the initiate and make it happene for it is the only i need to know , this is the thriller cause this i the only 

// the target property of the event object is always a reference to the element the event occured upon.