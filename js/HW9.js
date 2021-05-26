document.addEventListener('DOMContentLoaded', function() {


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


