const country = document.querySelector("#country")
const filter = document.querySelector("#filter")
const option = document.querySelector("select")
const add = document.querySelector("#add")
const countryList = document.querySelector("#countries")
const listOfCountries = ["France", "Singapore", "Paraguay"]
const removeBtn = document.querySelector(".removeBtn")

add.addEventListener("submit", event => {
    event.preventDefault()
    if (country.value !== "") {
        if (continentIsSelected()) {
            listOfCountries.push(country.value /*+ "    " + option.value*/)
        }
    } else {
        alert("Please insert a country!")
    }
    country.value = ""
    drawList(listOfCountries)
})

const continentIsSelected = () => {
    if (option.value === "selectContinent") {
        alert("Select a continent from the list!")
        return false
    }
    return true
}

const drawList = arr => {
    countryList.innerHTML = ""
    arr.forEach(x => {
        const li = document.createElement("li")
        li.textContent = x
        const removeBtn = document.createElement("button")
        removeBtn.className = "removeBtn"
        removeBtn.textContent = "🗑️"
        removeBtn.addEventListener("click", () => {
            removeCountry(x)
        })
        li.appendChild(removeBtn)
        countryList.appendChild(li)
    })
} 
drawList(listOfCountries)

const removeCountry = x => {
    const index = listOfCountries.indexOf(x)
    listOfCountries.splice(index, 1)
    drawList(listOfCountries)
}

filter.addEventListener("input", event => {
    const searchFor = event.currentTarget.value.toLowerCase()
    const filteredCountries = listOfCountries.filter(country => {
        return country.toLowerCase().includes(searchFor)
    })
    drawList(filteredCountries)
})

