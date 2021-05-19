let newObjOfItems = JSON.parse(JSON.stringify(items))

for(let i = 0; i < newObjOfItems.length; i++){
    newObjOfItems[i].orderInfo.orders = i + 6  /*добавляем новое свойство: количество заказов товара*/

    newObjOfItems[i].stockPage = "img/icons/check.svg"

    if(newObjOfItems[i].orderInfo.inStock === 0) newObjOfItems[i].stockPage = "img/icons/close.svg"

    if (i % 2) newObjOfItems[i].orderInfo.orders = i + 154
    if (i % 3) newObjOfItems[i].orderInfo.orders = i + 254
}

document.addEventListener('DOMContentLoaded', function () {



    const renderCardOfItem = item => {

        const divElem = document.createElement('div')
        divElem.className = 'card_1'

        const button = document.createElement('button')    /*добавляем кнопку*/
        button.className = 'button_card_1'
        button.innerText = 'Add to cart'

        if (item.orderInfo.inStock === 0) button.setAttribute('class', 'button_card_1_disabled')

        const image = document.createElement('img')
        image.setAttribute('src', `${item.imgUrl}`)  /*добавляем изображение*/
        image.className = '.image_wrap img'

        const imageHeart = document.createElement('img')
        imageHeart.setAttribute('src', "img/icons/like_empty.svg")   /*добавляем верхнюю кнопку*/
        imageHeart.className = '.card_1 button[type=submit] img'




        divElem.innerHTML = `
        <button type="submit"></button>

        <div class="image_wrap">

        
            <h1>${item.name}</h1>

             <div class="checkk">
                <img src="${item.stockPage}" alt="pic">
            <p class="check"> <span class="amount">${item.orderInfo.inStock}</span> left in stock</p>
            </div>
            <div class="butt_wrapper">
             <p class="price">Price: <span class="price">${item.price}</span> $</p>
             </div>
             

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

        let buttonType = divElem.querySelector('button[type=submit]')
        buttonType.prepend(imageHeart)

        let imageWrap = divElem.querySelector('.image_wrap ')
        imageWrap.prepend(image)

        let wrap = divElem.querySelector('.butt_wrapper')
        wrap.append(button)


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






