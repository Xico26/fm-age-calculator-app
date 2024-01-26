const form = document.querySelector("#form")

const dayInput = document.querySelector("#day")
const monthInput = document.querySelector("#month")
const yearInput = document.querySelector("#year")

const daySpan = document.querySelector("#dys")
const monthSpan = document.querySelector("#mts")
const yearSpan = document.querySelector("#yrs")

const dayLabel = document.querySelector("#dayLabel")
const monthLabel = document.querySelector("#monthLabel")
const yearLabel = document.querySelector("#yearLabel")

const btn = document.querySelector("#btn")

const dayError = document.querySelector("#dayError")
const monthError = document.querySelector("#monthError")
const yearError = document.querySelector("#yearError")

const daysInMonth = [0,31,28,31,30,31,30,31,31,30,31,30,31]


// Event Handler
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const d = dayInput.value
    const m = monthInput.value
    const y = yearInput.value
    console.log(d,m,y)
    runVerifs(d,m,y)
    if (!hasErrors(d,m,y)) {
        return
    } else {
        calcDate(d,m,y)
    }
    
})

hasErrors = (d,m,y) => {
    return validateDay(d,m) && validateMonth(m) && validateYear(y) && isInPast(d,m,y) && validDateInMonth(d,m)
}

runVerifs = (d,m,y) => {
    validateDay(d)
    validateMonth(m)
    validateYear(y)
    if (validateDay(d) && validateMonth(m) && validateYear(y) && isInPast(d,m,y)){
        validDateInMonth(d,m)
    }
}

// Checks if the day is a valid num, from 0 to 31
validateDay = (d) => {
    if (d === "") {
        dayInput.classList.add("error")
        dayLabel.classList.add("error")
        dayError.innerHTML = "This field is required"
        return false
    } else if (d < 1 || d > 31) {
        dayInput.classList.add("error")
        dayLabel.classList.add("error")
        dayError.innerHTML = "Must be a valid day!"
        return false
    } else {
        dayInput.classList.remove("error")
        dayLabel.classList.remove("error")
        dayError.innerHTML = ""
        return true
    }
}

// Checks if the month is a valid num, from 1 to 12
validateMonth = (m) => {
    if (m === "") {
        monthInput.classList.add("error")
        monthLabel.classList.add("error")
        monthError.innerHTML = "This field is required"
    } else if (m < 1 || m > 12) {
        monthInput.classList.add("error")
        monthLabel.classList.add("error")
        monthError.innerHTML = "Must be a valid month!"
        return false
    } else {
        monthInput.classList.remove("error")
        monthLabel.classList.remove("error")
        monthError.innerHTML = ""
        return true
    }
}

// Checks if the year is a valid num, bigger than 0
validateYear = (y) => {
    if (y === "") {
        yearInput.classList.add("error")
        yearLabel.classList.add("error")
        yearError.innerHTML = "This field is required"
    } else if (y < 0) {
        yearInput.classList.add("error")
        yearLabel.classList.add("error")
        yearError.innerHTML = "Must be a valid year!"
        return false 
    } else {
        yearInput.classList.remove("error")
        yearLabel.classList.remove("error")
        yearError.innerHTML = ""
        return true
    }
}

// Checks if the date is not in the future / is in the past
isInPast = (d,m,y) => {
    const currentDate = new Date
    const currentD = currentDate.getDate()
    const currentM = currentDate.getMonth() + 1
    const currentY = currentDate.getFullYear()
    if (y > currentY) {
        yearInput.classList.add("error")
        yearLabel.classList.add("error")
        yearError.innerHTML = "Must be in the past!"
        return false
    } else if (y == currentY && m > currentM) {
        yearInput.classList.add("error")
        yearLabel.classList.add("error")
        yearError.innerHTML = "Must be in the past!"
        return false
    } else if (y == currentY && m == currentM && d > currentD) {
        yearInput.classList.add("error")
        yearLabel.classList.add("error")
        yearError.innerHTML = "Must be in the past!"
        return false
    } else {
        yearInput.classList.remove("error")
        yearLabel.classList.remove("error")
        yearError.innerHTML = ""
        return true
    }

}

// Checks if the date is valid on that month
validDateInMonth = (d,m) => {
    if (d > daysInMonth[m]) {
        dayInput.classList.add("error")
        dayLabel.classList.add("error")
        monthInput.classList.add("error")
        monthLabel.classList.add("error")
        yearInput.classList.add("error")
        yearLabel.classList.add("error")
        dayError.innerHTML = "Must be a valid date!"
        return false
    } else {
        dayInput.classList.remove("error")
        dayLabel.classList.remove("error")
        monthInput.classList.remove("error")
        monthLabel.classList.remove("error")
        yearInput.classList.remove("error")
        yearLabel.classList.remove("error")
        dayError.innerHTML = ""
        return true
    }
}

calcDate = (gD,gM,gY) => {
    const currentDate = new Date
    const cD = currentDate.getDate()
    const cM = currentDate.getMonth() + 1
    const cY = currentDate.getFullYear()
    const days = calcDays(gD,cD)
    const months = calcMonth(gD,cD,gM,cM)
    const years = calcYear(gD,cD,gM,cM,gY,cY)
    console.log(days)
    console.log(months)
    console.log(years)
    daySpan.innerHTML = days
    monthSpan.innerHTML = months
    yearSpan.innerHTML = years
}

// given, current
calcYear = (gD,cD,gM,cM,gY,cY) => {
    if (gM > cM) {
        return cY - gY - 1
    } else if (gM == cM && gD > cD) {
        return cY - gY - 1
    } else {
        return cY - gY
    }
}

calcMonth = (gD,cD,gM,cM) => {
    if (gM > cM) {
        return (12 - (gM - cM))
    } else if (gM == 12) {
        return cM
    } else if (gM == cM && gD > cD) {
        return 11
    } else {
        return cM - gM
    }
}

calcDays = (gD,cD) => {
    if (gD > cD) {
        return gD - cD
    } else {
        return cD - gD
    }
}