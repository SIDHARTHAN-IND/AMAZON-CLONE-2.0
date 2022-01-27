function getCartItems(){
    db.collection("cart-items").onSnapshot((snapshot) => {
        let cartItems = [];
        snapshot.docs.forEach((doc) => {
            cartItems.push({
                id: doc.id,
                ...doc.data()
            })
        })
        generateCartItems(cartItems);
    })
}

function decreaseCount(itemId) {
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc){
        if (doc.exists) {

        }
    })
}

function generateCartItems(cartItems){
    let itemsHTML = "";
    cartItems.forEach((item) => {
        itemsHTML+= `
        <div class="cart-item flex items-center pb-4  border-b border-gray-100">
                        <div class="cart-item-image w-40 h-24 bg-white p-4 rounded-lg">
                            <img class="w-full h-full object-contain " src="${item.image}">
                        </div>
                        <div class="cart-item-details flex-grow">
                            <div class="cart-item-title font-bold text-sm text-gray-600">
                                ${item.name}
                            </div>
                            <div class="cart-item-brand text-sm text-gray-400">
                                ${item.make}
                            </div>
                        </div>
                        <div class="cart-item-counter w-48 flex items-center">
                            <div data-id="${item.id}" class="cart-items-decrease cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center mr-2 hover:bg-gray-200"> 
                                <i class="fas fa-chevron-left"></i>
                            </div>
                            <h4 class="text-gray-400">x${item.quantity}</h4>
                            <div data-id="${item.id}" class="cart-items-increase cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center ml-2 items-center hover:bg-gray-200">
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                        <div class="cart-item-total-cost w-48 font-bold text-gray-400">
                            $${item.price *item.quantity}
                        </div>
                        <div class="cart-item-delete w-10 font-bold text-gray-300 cursor-pointer hover:text-gray-400">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
        `

    })
    document.querySelector(".cart-items").innerHTML = itemsHTML;
    createEventListeners();
}
function createEventListeners(){
    let decreaseButtons = document.querySelectorAll(".cart-items-decrease");
    let increaseButtons = document.querySelectorAll(".cart-items-increase");

    decreaseButtons.forEach((button) => {
        button.addEventListener("click",function(){
            decreaseCount(button.dataset.id);
        })
    })
}
getCartItems()