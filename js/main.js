const elList = document.getElementById('list');
const elForm = document.getElementById('form');
const elSearch = document.getElementById('search');

let countryData = [];
fetch('https://restcountries.com/v3.1/all')
.then(response =>response.json())
.then(data =>{
    countryData = data.slice(0,50)
    render(countryData);
})

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
const render = (api) =>{
    api.forEach(el => {
    const elItem = create('li','site-main-list__item','');
    const elImg = create('img','site-main-list__item-img','');
    elImg.src = el.flags.png;
    elImg.width = '264'
    elImg.height = '160'
    const elName = create('h2','site-main-list__item-head',el.name.common);
    const elPopulation = create('p','site-main-list__item-page',el.population);
    const elRegion = create('p','site-main-list__item-page',el.region)
    const elCapital = create('p','site-main-list__item-page',el.capital)
    elItem.append(elImg,elName,elPopulation,elRegion,elCapital)
    elList.append(elItem);
    });
}
elForm.addEventListener('submit',(e) => {
    e.preventDefault();
    elList.innerHTML = ''
    if (elSearch.value){
        const regax = new RegExp(elSearch.value,'gi');
        const filteredCountries = countryData.filter(api => {
            return api.name.common.match(regax);
        })
        render(filteredCountries)
    }
});
