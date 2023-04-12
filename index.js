console.log("We're on board!!")

const warrantsContainer = document.querySelector('#warrants-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:5000/api/MostWanted`

const warrantsCallback = ({ data: warrants }) => displayWarrants(warrants)
const errCallback = err => console.log(err)

const getAllwarrants = () => axios.get(baseURL).then(warrantsCallback).catch(errCallback)
const createWarrant = body => axios.post(baseURL, body).then(warrantsCallback).catch(errCallback)
const deleteWarrant = id => axios.delete(`${baseURL}/${id}`).then(warrantsCallback).catch(errCallback)
const updateWarrant= (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(warrantsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector('#name')
    let bounty = document.querySelector('#bounty')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        name: name.value,
        bounty: bounty.value, 
        imageURL: imageURL.value
    }

    createWarrant(bodyObj)

    name.value = ''
    bounty.value = ''
    imageURL.value = ''
}

function createWarrantCard(warrant) {
    const warrantCard = document.createElement('div')
    warrantCard.classList.add('warrant-card')

    warrantCard.innerHTML = `<img alt='warrant cover image' src=${warrant.imageURL} class="warrant-cover-image"/>
    <p class="name">${warrant.name}</p>
    <div class="btns-container">
        <button onclick="updateWarrant(${warrant.id}, 'minus')">-</button>
        <p class="warrant-bounty">$${warrant.bounty}</p>
        <button onclick="updateWarrant(${warrant.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteWarrant(${warrant.id})">delete</button>
    `


    warrantsContainer.appendChild(warrantCard)
}

function displayWarrants(arr) {
    warrantsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createWarrantCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllwarrants()