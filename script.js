// create fetch requests of the db

// get request
const fetchFilmsOrFilm = async () => {
    let response;
    try {
        // if(id){
        //     response = await fetch(`http://localhost:3000/films/${id}`)
        // }else{
        //     response = await fetch("http://localhost:3000/films")
        // }
        response = await fetch("http://localhost:3000/films")

        if (response.status != 200) {
            throw new Error("data not found")
        } else {
            const data = await response.json()
            return data
        }
    } catch (e) {
        throw new Error(e)
    }
}

// patch request
const patchFilm = async (body, id) => {
    let options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
        },
        body: JSON.stringify(body)
    }
    try {
        const response = await fetch(`http://localhost:3000/films/${id}`)
        if (response.status != 200) {
            throw new Error("data not found")
        } else {
            const data = await response.json()
            return data
        }
    } catch (e) {
        throw new Error(e)
    }
}


// on load fetch data from db and pass it to page
document.addEventListener("DOMContentLoaded", () => {
    // access page elements


    // fetch our data
    fetchFilmsOrFilm()
        .then(res => {
            handleRes(res)
            console.log(res)
        })
        .catch(e => console.log(e))
})


// function to pass each data to the page


function handleRes(data) {
    // let available_tickets=document.querySelector("#remaining-tickets")
    let movie_card = document.querySelector("#movie-list")
    console.log(movie_card)
    data.map(film => {
        let maindiv= document.createElement("div")
        maindiv.setAttribute('class', 'movie-item')
        maindiv.innerHTML=
        `
        <div class="play">
        <a href="#" onclick="document.getElementById('id01').style.display='block'" class="w1-button">
            <i class="fa-solid fa-circle-play"></i>
        </a>
        <span id="remaining-tickets">${film.capacity -film.tickets_sold} rem</span>
    </div>

    <div class="card">
        <img src="${film.poster}" alt="Avatar"
           style="width: 100%;" >
        <div class="container">
            <h4><b>${film.title}</b></h4>
            <p>Showtime: ${film.showtime}</p>
            <p>Time: ${film. runtime}</p>
            <button id="${film.id}">Buy ticket</button>
        </div>
    </div>
        `
        movie_card.appendChild(maindiv)
    }
    )
}