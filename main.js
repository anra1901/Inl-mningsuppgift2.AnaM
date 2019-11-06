const listOfCountryContinent = [
    { country: "France", date: "2019-10-01", continent: "Europe" },
    { country: "Singapore", date: "2019-12-08", continent: "Asia" },
    { country: "Paraguay", date: "2019-12-15", continent: "South America" }
]
const country = document.querySelector("#country")
const filter = document.querySelector("#filter")
const option = document.querySelector("select")
const add = document.querySelector("#add")
const countryList = document.querySelector("#countries")
const continentList = document.querySelector("#continents")
const removeBtn = document.querySelector(".removeBtn")
let filteredCountries = []
let filteredContinents = []
let showAllContinents = true

const todayCheck = () => {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    return new Date(year, month, day, 0, 0, 0, 0)
}

const drawList = arr => {
    countryList.innerHTML = ""
    arr.forEach(obj => {
        const li = document.createElement("li")
        const countrySpan = document.createElement("span")
        countrySpan.className = "countrySpan"
        countrySpan.textContent = obj.country
        const dateSpan = document.createElement("span")
        if (new Date(obj.date) < todayCheck()) {
            dateSpan.className = "expiredDate"
        } else {
            dateSpan.className = "dateSpan"
        }
        dateSpan.textContent = obj.date
        const continentSpan = document.createElement("span")
        continentSpan.className = "continentSpan"
        continentSpan.textContent = obj.continent
        const removeBtn = document.createElement("button")
        removeBtn.title = "Delete"
        removeBtn.className = "removeBtn"
        removeBtn.textContent = "🗑️"
        removeBtn.addEventListener("click", () => {
            removeCountry(obj)
        })
        li.appendChild(countrySpan)
        li.appendChild(dateSpan)
        li.appendChild(continentSpan)
        li.appendChild(removeBtn)
        countryList.appendChild(li)
    })
}
drawList(listOfCountryContinent)

add.addEventListener("submit", event => {
    event.preventDefault()
    if (country.value !== "") {
        if (continentIsSelected()) {
            listOfCountryContinent.push({ country: country.value, date: theDate.value, continent: option.value })
        }
    } else {
        alert("Please insert a country!")
    }
    resetValues()
    drawList(listOfCountryContinent)
})

const todayDate = () => {
    let date = new Date()
    const dateString = date.toISOString().slice(0, date.toISOString().indexOf("T"))
    document.getElementById("theDate").value = dateString
}
todayDate()


const continentIsSelected = () => {
    if (option.value === "selectContinent") {
        alert("Select a continent from the list!")
        return false
    }
    return true
}

const removeCountry = x => {
    const index = listOfCountryContinent.indexOf(x)
    listOfCountryContinent.splice(index, 1)
    drawList(listOfCountryContinent)
    resetValues()
}

filter.addEventListener("input", event => {
    const searchFor = event.currentTarget.value.toLowerCase()
    if (showAllContinents) {
        filteredCountries = listOfCountryContinent.filter(obj => {
            return obj.country.toLowerCase().includes(searchFor)
        })
    } else {
        filteredCountries = filteredContinents.filter(obj => {
            return obj.country.toLowerCase().includes(searchFor)
        })
    }
    drawList(filteredCountries)
})

const filterByContinent = event => {
    if (event.value === "all") {
        showAllContinents = true
        drawList(listOfCountryContinent)
    } else {
        filteredContinents = listOfCountryContinent.filter(obj => {
            return obj.continent.toLowerCase().includes(event.value)
        })
        showAllContinents = false
        drawList(filteredContinents)
    }

}

const resetRadioBtns = () => {
    const radioBtns = document.getElementsByName("cathegory");
    for (i = 0; i < radioBtns.length; i++) {
        if (radioBtns[i].value === "all") {
            radioBtns[i].checked = true;
        }
    }
}

const resetValues = () => {
    country.value = ""
    option.value = "selectContinent"
    todayDate()
    resetRadioBtns()
}

