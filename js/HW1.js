let newObjOfItems = JSON.parse(JSON.stringify(items))

for(let i = 0; i < newObjOfItems.length; i++){
    newObjOfItems[i].orderInfo.orders = i + 6  /*добавляем новое свойство: количество заказов товара*/

    newObjOfItems[i].stockPage = "img/icons/check.svg"
    newObjOfItems[i].button = "button_card_1"


    if(newObjOfItems[i].orderInfo.inStock === 0) {
        newObjOfItems[i].stockPage = "img/icons/close.svg"
        newObjOfItems[i].button = "button_card_1_disabled"
    }

    if (i % 2) newObjOfItems[i].orderInfo.orders = i + 154
    if (i % 3) newObjOfItems[i].orderInfo.orders = i + 254
}



console.log(newObjOfItems)


document.addEventListener('DOMContentLoaded', function () {



    const renderCardOfItem = item => {

        const divElem = document.createElement('div')
        divElem.className = 'card_1'



        divElem.innerHTML = `
        <button type="submit">
            <img src="img/icons/like_empty.svg" alt="submit"/>
        </button>

        <div class="image_wrap">

        <img src="${item.imgUrl}" alt="picture">
            <h1>${item.name}</h1>

             <div class="checkk">
                <img src="${item.stockPage}" alt="pic">
            <p class="check"> <span class="amount">${item.orderInfo.inStock}</span> left in stock</p>
            </div>
             <p class="price">Price: <span class="price">${item.price}</span> $</p>
             <button class="${item.button}">Add to cart</button>

          </div>

         <div class="card_1_bottom">
            <div class="avarageWrapper">
            <p class="views"> <span class="rating">${item.orderInfo.reviews}%</span> Positive reviews</p>
                <span class="aboveAvarage">Above avarage</span>
            </div>
                <div class="amountOfOrdersWrapper">
                <span class="amountOfOrders">${item.orderInfo.orders}</span>
                    <p class="orders"> orders</p>
                </div>

        </div>
    `


        return divElem
    }



    const renderCards = newObjOfItems => {
        const containerElem = document.querySelector('.wrapper')


        newObjOfItems.forEach(item => {
            const card = renderCardOfItem(item)
            containerElem.appendChild(card)
        })


    }

    renderCards(newObjOfItems)


})








