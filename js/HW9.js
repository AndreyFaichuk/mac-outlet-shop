document.addEventListener('DOMContentLoaded', function() {

    let newObjOfItems = JSON.parse(JSON.stringify(items))

    for (let i = 0; i < newObjOfItems.length; i++) {
        newObjOfItems[i].orderInfo.orders = i + 6  /*добавляем новое свойство: количество заказов товара*/
        newObjOfItems[i].stockPage = "img/icons/check.svg"

        if (newObjOfItems[i].os === null) newObjOfItems[i].os = "no information given"
        if (newObjOfItems[i].chip.cores === null) newObjOfItems[i].chip.cores = "no information given"
        if (newObjOfItems[i].chip.name === 'H!') newObjOfItems[i].chip.name = "no information given"

        if (newObjOfItems[i].orderInfo.inStock === 0) newObjOfItems[i].stockPage = "img/icons/close.svg"

        if (i % 2) newObjOfItems[i].orderInfo.orders = i + 154
        if (i % 3) newObjOfItems[i].orderInfo.orders = i + 254
    }


    const slider = item => {
        const slider = document.createElement('div')
        slider.className = 'slider'


        const sliderButton = document.createElement('button')
        sliderButton.className = 'button_top_ipad'
        sliderButton.innerText = 'Read more info'

        slider.innerHTML = `

        <div class="ipad">
                   <img src="${item.imgUrl}" alt="pic">
                   <div class="buttonSliderWrapper">
                    <h1>${item.name}</h1>
                    <h3>${item.price} $</h3>
                    </div>
                </div>
        `

        let sliderButtons = slider.querySelector('.ipad .buttonSliderWrapper')
        sliderButtons.append(sliderButton)

        sliderButton.id = item.id

        sliderButton.onclick = function (){
            showModal(item)
        }


        return slider

    }
    const renderSlide = newObjOfItems => {
        const containerElem = document.querySelector('.sliderWrapper')
        newObjOfItems.forEach(item => {
            const card = slider(item)
            containerElem.append(card)
        })
    }

    renderSlide(newObjOfItems)


    const showModal = data => {
        const modal = document.querySelector('.modal')
        modal.onclick = (event) => {
            if (modal === event.target) {
                document.body.style.overflow = ''
                return modal.classList.remove('modal_active')
            }
        }

        modal.classList.add('modal_active')
        document.body.style.overflow = 'hidden'

        const buttonInModal = document.createElement('button')    /*добавляем кнопку в модальное окно*/
        buttonInModal.className = 'modalButton'
        buttonInModal.innerText = 'Add to cart'

        if (data.orderInfo.inStock === 0) buttonInModal.setAttribute('class', 'modalButton_disabled')


        modal.querySelector('.modal_container').innerHTML = `
       
        <div class="modal_image">
            <img src="${data.imgUrl}" alt="pic">
        </div>
        
         <div class="modal_info">
            <h1>${data.name}</h1>
            <div class="card_1_bottom">
                <div class="avarageWrapper">
                    <p class="views"> <span class="rating">${data.orderInfo.reviews}%</span> Positive reviews</p>
                    <span class="aboveAvarage">Above avarage</span>
                </div>
                <div class="amountOfOrdersWrapper">
                    <span class="amountOfOrders">${data.orderInfo.orders}</span>
                    <p class="orders"> orders</p>
                </div>

            </div>
            <div class="infoAboutItem">
                <ul>
                    <li><p>Color: <span>${data.color}</span></p></li>
                    <li><p>Operating System: <span>${data.os}</span> </p></li>
                    <li><p>Chip: <span>${data.chip.name}</span></p></li>
                    <li><p>Cores: <span>${data.chip.cores}</span></p></li>
                    <li><p>Height: <span>${data.size.height} cm</span></p></li>
                    <li><p>Width: <span>${data.size.width} cm</span></p></li>
                    <li><p>Depth: <span>${data.size.depth} cm</span></p></li>
                    <li><p>Weight: <span>${data.size.weight} g</span></p></li>
                </ul>
            </div>
        </div>
        <div class="modal_priceAndButton">
                <h1>$ ${data.price}</h1>
                <p>Stock: <span class="modal_Pcs">${data.orderInfo.inStock}</span> pcs.</p>
        </div>
    `

        let modalButton = document.querySelector('.modal .modal_priceAndButton')
        modalButton.append(buttonInModal)

        modalButton.id = data.id

        modalButton.onclick = (event) => {
            if (modalButton !== event.target && event.target.className === 'modalButton') {
                console.log(modalButton.id)
            }
        }

        return modal
    }


    // const renderCardOfItem = item => {
    //
    //     const divElem = document.createElement('div')
    //     divElem.className = 'card_1'
    //
    //     const button = document.createElement('button')    /*добавляем кнопку*/
    //     button.className = 'button_card_1'
    //     button.innerText = 'Read more info'
    //
    //     if (item.orderInfo.inStock === 0) button.setAttribute('class', 'button_card_1_disabled')
    //
    //     const image = document.createElement('img')
    //     image.setAttribute('src', `${item.imgUrl}`)  /*добавляем изображение*/
    //     image.className = '.image_wrap img'
    //
    //     const imageHeart = document.createElement('img')
    //     imageHeart.setAttribute('src', "img/icons/like_empty.svg")   /*добавляем верхнюю кнопку*/
    //     imageHeart.className = '.card_1 button[type=submit]'
    //
    //
    //     divElem.innerHTML = `
    //     <button type="submit"></button>
    //
    //     <div class="image_wrap">
    //
    //
    //         <h1>${item.name}</h1>
    //
    //          <div class="checkk">
    //             <img src="${item.stockPage}" alt="pic">
    //         <p class="check"> <span class="amount">${item.orderInfo.inStock}</span> left in stock</p>
    //         </div>
    //         <div class="butt_wrapper">
    //          <p class="price">Price: <span class="price">${item.price}</span> $</p>
    //          </div>
    //
    //
    //       </div>
    //
    //      <div class="card_1_bottom">
    //         <div class="avarageWrapper">
    //         <p class="views"> <span class="rating">${item.orderInfo.reviews}%</span> Positive reviews</p>
    //             <span class="aboveAvarage">Above avarage</span>
    //         </div>
    //             <div class="amountOfOrdersWrapper">
    //             <span class="amountOfOrders">${item.orderInfo.orders}</span>
    //                 <p class="orders"> orders</p>
    //             </div>
    //
    //     </div>
    // `
    //
    //     let buttonType = divElem.querySelector('button[type=submit]')
    //     buttonType.prepend(imageHeart)
    //
    //     let imageWrap = divElem.querySelector('.image_wrap ')
    //     imageWrap.prepend(image)
    //
    //     let wrap = divElem.querySelector('.butt_wrapper')
    //     wrap.append(button)
    //
    //
    //     buttonType.addEventListener('click', function () {
    //         item.isFavorite = !item.isFavorite
    //
    //         imageHeart.setAttribute('src', `img/icons/${item.isFavorite ? 'heart.svg' : 'like_empty.svg'}`)
    //     })
    //
    //     button.onclick = function () {
    //         showModal(item)
    //        goTopBtn.className = 'back_to_top'
    //     }
    //
    //     return divElem
    // }
    //
    //
    // const renderCards = newObjOfItems => {
    //     const containerElem = document.querySelector('.wrapper')
    //
    //     newObjOfItems.forEach(item => {
    //         const card = renderCardOfItem(item)
    //         containerElem.appendChild(card)
    //     })
    // }
    //
    // renderCards(newObjOfItems)

    function accordionShowOrHideElements() {
        let imgArrow1 = document.querySelector('#imgArr1'),
            imgArrow2 = document.querySelector('#imgArr2'),
            imgArrow3 = document.querySelector('#imgArr3'),
            imgArrow4 = document.querySelector('#imgArr4'),
            imgArrow5 = document.querySelector('#imgArr5')

        let button1 = document.querySelector('#firstButtonPrice'),
            button2 = document.querySelector('#secondButtonColor'),
            button3 = document.querySelector('#thirdButtonMemory'),
            button4 = document.querySelector('#fourthButtonOS'),
            button5 = document.querySelector('#fifthButtonDisplay')

        let main = document.querySelector('#checkBoxesForFirstButton'),
            main2 = document.querySelector('#checkBoxesForSecondButton'),
            main3 = document.querySelector('#checkBoxesForThirdButton'),
            main4 = document.querySelector('#checkBoxesForFourthButton'),
            main5 = document.querySelector('#checkBoxesForFifthButton')


        button1.addEventListener('click', function () {

            if (main.className === 'hidden') {
                main.className = 'price-filter'
                imgArrow1.className = 'img_rotate'

            } else {
                main.className = 'hidden'
                imgArrow1.className = 'accordion__button-arrow'
            }
        })

        button2.addEventListener('click', function () {

            if (main2.className === 'hidden') {
                main2.className = 'checkbox-row'
                imgArrow2.className = 'img_rotate'
            } else {
                main2.className = 'hidden'
                imgArrow2.className = 'accordion__button-arrow'
            }
        })

        button3.addEventListener('click', function () {

            if (main3.className === 'hidden') {
                main3.className = 'checkbox-row'
                imgArrow3.className = 'img_rotate'
            } else {
                main3.className = 'hidden'
                imgArrow3.className = 'accordion__button-arrow'
            }
        })

        button4.addEventListener('click', function () {

            if (main4.className === 'hidden') {
                main4.className = 'checkbox-row2'
                imgArrow4.className = 'img_rotate'
            } else {
                main4.className = 'hidden'
                imgArrow4.className = 'accordion__button-arrow'
            }
        })

        button5.addEventListener('click', function () {

            if (main5.className === 'hidden') {
                main5.className = 'checkbox-row2'
                imgArrow5.className = 'img_rotate'
            } else {
                main5.className = 'hidden'
                imgArrow5.className = 'accordion__button-arrow'
            }
        })

    }

    accordionShowOrHideElements()


    function accorditionShowOrHide() {

        const filterButton = document.querySelector('#filterButton')
        const mainSectionOfAccordition = document.querySelector('#section')

        filterButton.addEventListener('click', function () {
            if (mainSectionOfAccordition.className === 'hidden') {
                mainSectionOfAccordition.className = 'section'
            } else {
                mainSectionOfAccordition.className = 'hidden'
            }
        })

    }

    accorditionShowOrHide()

})



   const trackScroll = ()  => {
        let scrolled = window.pageYOffset;
        let coord = document.documentElement.clientHeight * 4

     return scrolled >= coord ? goTopBtn.classList.add('back_to_top-show') : goTopBtn.classList.remove('back_to_top-show')
    }

    const backToTop = () => window.pageYOffset > 0 ? window.scrollBy(0, -window.pageYOffset) : backToTop

    let goTopBtn = document.querySelector('.back_to_top');

    window.addEventListener('scroll', trackScroll);
    goTopBtn.addEventListener('click', backToTop);
