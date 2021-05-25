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

class Cards {
    constructor() {
        this.renderCards(newObjOfItems)
        this.bindInputChange()
    }

    renderCards(arr){
        let container = document.querySelector('.wrapper')
        container.innerHTML = ''


        arr.forEach(item => {
            const image = document.createElement('img')
            image.setAttribute('src', `${item.imgUrl}`)  /*добавляем изображение*/
            image.className = '.image_wrap img'

            container.innerHTML += `

                  <div class="card_1">

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
        </div>
            `

        })

        // const button = document.createElement('button')    /*добавляем кнопку*/
        // button.className = 'button_card_1'
        // button.innerText = 'Read more info'
        //
        //
        // let wrap = container.querySelector('.butt_wrapper')
        // wrap.append(button)

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
    #display = []
    constructor() {
        this.search = ''

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
        } else {
            this.#colors.push(color)
            this.renderFilteredItems()
        }

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
            this.#memory = this.#memory.filter(c => memory !== c)
            return
        } else {
            this.#memory.push(memory)
            this.renderFilteredItems()
        }

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
                if(item.os === os){
                    isOsEx = true
                }
            })
            if(!isOsEx){
                return false
            }
            return true


            let isMemoryEx = !this.memory.length

            this.memory.forEach(storage => {
                if(item.storage === storage){
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


