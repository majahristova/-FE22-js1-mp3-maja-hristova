const btn = document.querySelector('#btn');
btn.addEventListener('click', choosecountry);
const er = document.querySelector('#errorp');
const container = document.querySelector('#country-container')

let populationArr = [];


function choosecountry(event) {
    event.preventDefault();
    const inputbox = document.querySelector('#inputbox');

    const input = inputbox.value;
    inputbox.value = '';
    fetchcountrylist(input);
}

function fetchcountrylist(lang) {
    const url = `https://restcountries.com/v3.1/lang/${lang}`;

    fetch(url)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json()
            } else {
                throw 'ERROR LANGUAGE NOT FOUND'

            }
        })
        .then(showlanginfo)
        .catch(displayerrormessage);
}



function showlanginfo(data) {

    data.sort((a, b) =>b.population-a.population);

    container.innerHTML ='';
    er.innerText =''; 

    for (let i = 0; i < data.length; i++) {

        const countrydiv = document.createElement('div');
        container.appendChild(countrydiv);

        populationArr.push(data[i].population);


        const name = document.createElement('h3');
        countrydiv.appendChild(name);
        name.innerText = "Country = " + data[i].name.common;


        const subregion = document.createElement('p');
        countrydiv.appendChild(subregion);
        subregion.innerText = "Subregion = " + data[i].subregion


        const capital = document.createElement('p');
        countrydiv.appendChild(capital);
        capital.innerText = "Capital = " + data[i].capital;


        const population = document.createElement('h5');
        countrydiv.appendChild(population);
        population.innerText = "Population = " + data[i].population;


        const img = document.createElement('img');
        countrydiv.appendChild(img);;
        img.src = data[i].flags.png;


    }
    
    const max = Math.max(...populationArr);
    const populationunique = populationArr.indexOf(max);
    const populationstyle = document.querySelectorAll('h5'); 
    
    populationstyle[populationunique].style.border ="2px solid black";
}

function displayerrormessage(error) {
    er.innerText = error;

}