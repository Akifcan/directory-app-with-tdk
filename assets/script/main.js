const articleItem = document.querySelector('.article-item')
const mean = document.querySelector('.mean')
const toggleSettings = document.querySelector('.vertical')
const settingsArea = document.querySelector('.settings-area')
const select = document.querySelector('select')
const on = document.getElementById('on')
const off = document.getElementById('off')


toggleSettings.addEventListener('click', function(){
    settingsArea.classList.toggle('active')
})

setUseDictionary()

function setUseDictionary(){
    if(!localStorage.useDictionary){
        localStorage.useDictionary = 'on'
    }
    if(localStorage.useDictionary == 'on'){
        on.setAttribute('selected', 'selected')
    }else if(localStorage.useDictionary == 'off'){
        off.setAttribute('selected', 'selected')
    }
}

select.addEventListener('change', function(){
    localStorage.useDictionary = select.value
})


articleItem.addEventListener('mouseup', function () {
    if(localStorage.useDictionary == 'on'){
        let selectedText = window.getSelection().toString()
        if (selectedText.length > 3) {
            let arr = selectedText.split(' ')
            if (arr.length == 1) {
                showMean(arr[0])
            }
        }
    }
})

async function showMean(word) {
    const p = mean.querySelector('p')
    const h3 = mean.querySelector('h3')
    let data = await fetch(`https://sozluk.gov.tr/gts?ara=${word}`)
        .then(response => response.json())
        .then(wordMean => {
            if (!wordMean.error) {
                h3.innerText = word
                p.innerText = wordMean[0].anlamlarListe[0].anlam
                mean.classList.add('active')
                setTimeout(() => {
                    mean.classList.remove('active')
                }, 5000)
            }
        })
}

