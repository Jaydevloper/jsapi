const elList = document.getElementById('list');
const elForm = document.getElementById('form');
const elSearch = document.getElementById('search');
const elBTn = document.getElementById('btn');
const elBody = document.querySelector('.Dark-mode')
const elHeader = document.querySelector('.site-header');
const elSelect = document.getElementById('select')
const API = 'https://restcountries.com/v3.1'

function makeData (url,sucsses,error){
elList.innerHTML = `
<p class = "not-found__error">Loading...</p> <div class = "not-found__animation"></div>`
fetch(url)
.then(response =>response.json())
.then(data => {
    if(data.length > 0) sucsses(data.slice(0,50))
    else error()
})
}
function create (name,className='',content=''){
    const element  = document.createElement(name);
    if (className){
        element.className = (className)
    }
    if (content && typeof content === 'string'){
        element.textContent = content;
        return element
    }
    if (content){
        element.append(content);
        return element
    }
    return element
}
function render (api){
    api.forEach(el => {
    const elItem = create('li','site-main-list__item','');
    const elImg = create('img','site-main-list__item-img','');
    elImg.src = el.flags.png;
    elImg.width = '264'
    elImg.height = '160'
    const elName = create('h2','site-main-list__item-head',`${el.name.common}`);
    const elPopulation = create('p','site-main-list__item-page',`Population: ${el.population}`);
    const elRegion = create('p','site-main-list__item-page',`Region: ${el.region}`)
    const elCapital = create('p','site-main-list__item-page',`Capital: ${el.capital}`)
    elItem.append(elImg,elName,elPopulation,elRegion,elCapital)
    elList.append(elItem);
    elBTn.addEventListener('click', () =>{
        elItem.classList.toggle('site-main-list__item--white')
    })
    });
   
}

const notFound = () =>{
    elList.innerHTML = `<p class = "not-found">404 Not Found</p> `
}

(function  (){
    makeData(API+'/all',render,notFound)
})()

elBTn.addEventListener('click', () =>{
    elBody.classList.toggle('Dark-mode--white');
    elHeader.classList.toggle('site-header--white');
    elBTn.classList.toggle('site-header__wrraper-btn--white');
    elSearch.classList.toggle('site-main-search__search--white');
    elSelect.classList.toggle('site-main-search__select--white');
})

elForm.addEventListener('submit',(e) => {
    e.preventDefault();
    elList.innerHTML = ''
    if (elSearch.value.trim()){
        makeData( API+'/name/'+elSearch.value,render,notFound);
    }
});

function seletes (arr){
    arr.forEach(el =>{
        const elOption = create('option','',el.region);
        elOption.value = el.region
        elSelect.append(elOption)
        elSelect.addEventListener('change', () =>{
            if (elSelect.value){
                makeData(API+'/capital/'+elSelect.value,render,notFound)
            }
                
        })
    })
}
makeData(API+'/all',seletes,notFound)

