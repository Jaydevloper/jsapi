let countryData = [];
fetch('https://restcountries.com/v3.1/all')
.then(response =>response.json())
.then(data =>{
    countryData = data.slice(0,50)
    render(countryData);
})
