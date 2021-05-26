let newObjOfItems = JSON.parse(JSON.stringify(items))

for (let i = 0; i < newObjOfItems.length; i++) {
    newObjOfItems[i].orderInfo.orders = i + 6  /*добавляем новое свойство: количество заказов товара*/
    newObjOfItems[i].stockPage = "img/icons/check.svg"

    if (newObjOfItems[i].os === null) newObjOfItems[i].os = "none"
    if (newObjOfItems[i].chip.cores === null) newObjOfItems[i].chip.cores = "no information given"
    if (newObjOfItems[i].chip.name === 'H!') newObjOfItems[i].chip.name = "no information given"

    if (newObjOfItems[i].orderInfo.inStock === 0) newObjOfItems[i].stockPage = "img/icons/close.svg"

    if (i % 2) newObjOfItems[i].orderInfo.orders = i + 154
    if (i % 3) newObjOfItems[i].orderInfo.orders = i + 254
    if(newObjOfItems[i].os === null) newObjOfItems[i].os = 'Watch Os'
    if(newObjOfItems[i].storage === null) newObjOfItems[i].storage = 'none'
    if(newObjOfItems[i].storage === 22.1654) newObjOfItems[i].storage = 2048
    if(newObjOfItems[i].display === null) newObjOfItems[i].display = 'none'
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



class Cards {
    constructor() {
        this.renderCards(newObjOfItems)
        this.bindInputChange()

    }

    renderCards(arr){
        let container = document.querySelector('.wrapper')
        container.innerHTML = ''

            if(!arr.length){
                container.innerHTML = `<h1>Items not found</h1>`
            }

        arr.forEach(item => {

            const card = document.createElement('div')
            card.className = "card_1"

            const imageHeart = document.createElement('img')
            imageHeart.setAttribute('src', "img/icons/like_empty.svg")   /*добавляем верхнюю кнопку*/
            imageHeart.className = '.card_1 button[type=submit]'

            card.innerHTML = `
                <button type="submit"></button>

                 <div class="image_wrap">

                <img src="${item.imgUrl}" class="image_wrap img">
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

            const button = document.createElement('button')    /*добавляем кнопку*/
            button.className = 'button_card_1'
            button.innerText = 'Read more info'


            if (item.orderInfo.inStock === 0) button.setAttribute('class', 'button_card_1_disabled')

            let wrap = card.querySelector('.butt_wrapper')
            wrap.append(button)
            container.append(card)

            let buttonType = card.querySelector('button[type=submit]')
                buttonType.prepend(imageHeart)

            buttonType.addEventListener('click', function () {
                        item.isFavorite = !item.isFavorite
                imageHeart.setAttribute('src', `img/icons/${item.isFavorite ? 'heart.svg' : 'like_empty.svg'}`)
            })

            button.onclick = function () {
                showModal(item)
                goTopBtn.className = 'back_to_top'
            }
        })


    }

    bindInputChange(){
        const input = document.querySelector('.inputFind')
        input.oninput = function (e){
            findService.search = e.target.value
        }
    }


}

const view = new Cards()




class FindService{
    #search = ''
    #os = []
    #colors = []
    #memory = []
    constructor() {

    }



    get search (){
        return this.#search
    }

    set search (value){
        this.#search = value
        this.renderFilteredItems()
    }

    get colors (){
        return this.#colors
    }

    set colors (color){
        if(this.#colors.includes(color)){
            this.#colors = this.#colors.filter(c => color !== c)
            return
        }
            this.#colors.push(color)
            this.renderFilteredItems()


    }

    get os (){
        return this.#os
    }

    set os (os){
        if(this.#os.includes(os)){
            this.#os = this.#os.filter(c => os !== c)
            return
        }
            this.#os.push(os)
            this.renderFilteredItems()
    }

    get memory (){
        return this.#memory
    }

    set memory (memory){
        if(this.#memory.includes(memory)){
            debugger
            this.#memory = this.#memory.filter(c => memory !== c)
            return
        }
            this.#memory.push(memory)
            this.renderFilteredItems()


    }

    getFilteredItems(){
        return newObjOfItems.filter(item =>{
            const isSearch = item.name.toLowerCase().includes(this.search)
            if (!isSearch) return false

            let isColorEx = !this.colors.length

            this.colors.forEach(color => {
                if(!item.color.includes(color)){
                    isColorEx = true
                }
            })
            if(!isColorEx){
                return false
            }

            let isOsEx = !this.os.length

            this.os.forEach(os => {
                debugger
                if(item.os === os){
                    isOsEx = true
                }
            })
            if(!isOsEx){
                return false
            }
            return true


            let isMemoryEx = !this.memory.length

            this.memory.forEach(memory => {
                if(item.storage === memory){
                    debugger
                    isMemoryEx = true
                }
            })
            if(!isMemoryEx){
                return false
            }
        })
    }

    renderFilteredItems(){
        const result = this.getFilteredItems()
        view.renderCards(result)

    }

}


class Filters{
    constructor() {
        this.dataColors = [
            {
                options: this.initColors,
                type: 'colors'
            }
        ]
        this.dataOS = [
            {
                options: this.initOs,
                type: 'os'
            }
        ]
        this.dataMemory = [
            {
                options: this.initMemory,
                type: 'memory'
            }
        ]
        this.dataDisplay = [
            {
                options: this.initDisplay,
                type: 'display'
            }

        ]

        this.renderFiltersOfColors()
        this.renderFiltersOfOS()
        this.renderFiltersOfMemory()
        this.renderFiltersOfDisplay()

    }

    get initColors(){
        const arrOfColors = []
        newObjOfItems.map(item => item.color).forEach(colors => {
            const result = colors.filter(color => !arrOfColors.includes(color))
            arrOfColors.push(...result)
        })
        return arrOfColors
    }

    get initOs(){
       return  newObjOfItems.map(item => item.os).filter((item,index,arr) => arr.indexOf(item) === index)
    }

    get initMemory(){
        return newObjOfItems.map(item => item.storage).filter((item,index,arr) => arr.indexOf(item) === index).sort((a,b) =>  b - a)
    }

    get initDisplay(){
        return  newObjOfItems.map(item => item.display).filter((item,index,arr) => arr.indexOf(item) === index).sort((a,b) =>  a - b)
    }

    renderFilterOfColor(filterData){
        const divForCheckboxOfColor = document.createElement('div')
        divForCheckboxOfColor.className = 'checkbox-column1'

        filterData.options.forEach(option =>{
            const label = document.createElement('label')
            label.innerText = option

            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'

            checkbox.onchange = () => {
                findService[filterData.type] = option
            }

            label.appendChild(checkbox)

            divForCheckboxOfColor.appendChild(label)
        })
        return divForCheckboxOfColor

    }

    renderFilterOfOS(filterData){
        const divForCheckboxOfOS = document.createElement('div')
        divForCheckboxOfOS.className = 'checkboxOs'

        filterData.options.forEach(option =>{
            const label = document.createElement('label')
            label.innerText = option

            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'

            checkbox.onchange = () => {
                findService[filterData.type] = option
            }

            label.appendChild(checkbox)

            divForCheckboxOfOS.appendChild(label)
        })
        return divForCheckboxOfOS

    }

    renderFilterOfMemory(filterData){
        const divForCheckboxOfMemory = document.createElement('div')
        divForCheckboxOfMemory.className = 'checkbox-column3'

        filterData.options.forEach(option =>{
            const label = document.createElement('label')
            label.innerText = option

            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'

            checkbox.onchange = () => {
                findService[filterData.type] = option
            }

            label.appendChild(checkbox)

            divForCheckboxOfMemory.appendChild(label)

        })
        return divForCheckboxOfMemory

    }

    renderFilterOfDisplay(filterData){
        const divForCheckboxOfDisplay = document.createElement('div')
        divForCheckboxOfDisplay.className = 'checkbox-row4'

        filterData.options.forEach(option =>{
            const label = document.createElement('label')
            label.innerText = option

            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'

            label.appendChild(checkbox)

            divForCheckboxOfDisplay.appendChild(label)
        })
        return divForCheckboxOfDisplay

    }

    renderFiltersOfColors(){
        const filterEl = document.querySelector('.checkbox-column1')
        filterEl.append(...this.dataColors.map(item => this.renderFilterOfColor(item)))
    }

    renderFiltersOfOS(){
        const filterEl = document.querySelector('.checkboxOs')
        filterEl.append(...this.dataOS.map(item => this.renderFilterOfOS(item)))
    }

    renderFiltersOfMemory(){
        const filterEl = document.querySelector('.checkbox-column3')
        filterEl.append(...this.dataMemory.map(item => this.renderFilterOfMemory(item)))
    }

    renderFiltersOfDisplay(){
        const filterEl = document.querySelector('.checkbox-row4')
        filterEl.append(...this.dataDisplay.map(item => this.renderFilterOfDisplay(item)))
    }
}

new Filters()

const findService = new FindService()


