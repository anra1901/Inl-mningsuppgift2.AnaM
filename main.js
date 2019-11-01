const country = document.querySelector("#country")
const filter = document.querySelector("#filter")
// const option = document.querySelector("select")
const add = document.querySelector("#add")
const countryList = document.querySelector("#countries")
const listOfCountries = ["France", "Italy", "Germany"]
const removeBtn = document.querySelector(".removeBtn")

add.addEventListener("submit", event => {
    event.preventDefault()
    if (country.value !== "") {
        listOfCountries.push(country.value)
    } else {
        alert("Please insert a country!")
    }
    country.value = ""
    drawList(listOfCountries)
})

function drawList(arr) {
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
} drawList(listOfCountries)

function removeCountry(x) {
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

