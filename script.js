// create fetch requests of the db

// get request
const fetchFilmsOrFilm = async (id=null) => {
    let response;
    try {
        if(id != null){
            response = await fetch(`http://localhost:3000/films/${id}`)
        }else{
            response = await fetch("http://localhost:3000/films")
        }

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
        const response = await fetch(`http://localhost:3000/films/${id}`, options)
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


// delete request

const deleteFilm = async (id) => {
    let options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
        }
    }
    try {
        const response = await fetch(`http://localhost:3000/films/${id}`, options)
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
            console.log(res)
            handleRes(res)
            console.log(res)
        })
        .catch(e => console.log(e))

})


// function to pass each data to the page


function handleRes(data) {
    // 
    let movie_card = document.querySelector("body")
    console.log()

    let patchBody;
    data.map(film => {
        let card = document.createElement('div')
        card.setAttribute('class', 'card')
        card.innerHTML = `
        <div class="poster">
                <img src="${film.poster}" alt="${film.title}"
                    style="width: 100%;">
            </div>
    
            <div class="details">
                <div class="play">
                    <a href="#" onclick="document.getElementById('id01').style.display='block'" class="w1-button">
                        <i class="fa-solid fa-circle-play"></i>
                    </a>
                </div>
                <h4><b>${film.title}</b></h4>
                <div class="rating">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <span>4/5</span>
                </div>
                <div class="tags">
                    <span>Showtime: ${film.showtime}</span>
                    <span>Runtime: ${film.runtime}</span>
                    <span class="tickets">Tickets: ${film.capacity - film.tickets_sold}</span>
                </div>
                <div class="info">
                    <p>${film.description}</p>
                </div>
                <div class="buy-btn"><button id="${film.id}" class="buy">Buy ticket</button>
                <button id="delete-${film.id}" class="delete">Delete</button>
                <button id="edit-${film.id}" class="edit">Edit</button>
                
                </div>
            </div>
        `



        movie_card.appendChild(card)
        let ticketsSpan = document.querySelector(".tickets")
        let buy_ticket = document.getElementById(`${film.id}`)
        let deleteTicket = document.querySelector(`#delete-${film.id}`)
        let editTicket = document.querySelector(`#edit-${film.id}`)

        // event listener to buy ticket
        buy_ticket.addEventListener('click', (e) => {

            let tickets_sold = parseInt(film.tickets_sold) + 1
            console.log(tickets_sold)
            console.log(typeof (e.target.id))

            // update my ticket span wit updated value
            ticketsSpan.innerHTML = `Tickets : ${film.capacity - tickets_sold}`
            // call my patch
            console.log(patchFilm({ "tickets_sold": tickets_sold }, parseInt(e.target.id)))
        })

        // add delete event listener
        deleteTicket.addEventListener("click", (e) => {
            console.log(e.target.id.split("").slice(-1)[0])

            // update our card
            card.remove()
            // delete our data from db
            deleteFilm(e.target.id.split("").slice(-1)[0])
        })

        // edit ticket event listener
        editTicket.addEventListener("click", (e) => {
            // add our edit form modal
            document.getElementById('id02').style.display = 'block';
            // access form elements
            let form = document.querySelector('#ticket-form')
            console.log(e.target.id.split("").slice(-1)[0])
            // store my id
            let elementId=e.target.id.split("").slice(-1)[0]
            // populate my form with the values that are already in the db
            fetchFilmsOrFilm(parseInt(elementId))
                .then(res => {
                    form.querySelectorAll('input').forEach(element => {
                        element.value = res[element.name]
                    }); 
                })
                .catch(e => console.log(e))

            
            // add an event listener to our form to edit data
            form.addEventListener("submit", (e) => {
                let info = {}
                e.preventDefault()
                e.target.querySelectorAll('input').forEach(element => {
                    info[`${element.name}`] = element.value

                });
                console.log(info)
                // change the tickets.sold value to an int
                info["tickets_sold"] = parseInt(info["tickets_sold"])
                console.log(info)
                // execute patch after 
                patchFilm(info, parseInt(elementId))

                // reload page
                window.location.reload();
            })
        })






        if (film.tickets_sold === film.capacity) {
            deleteTicket.setAttribute('disabled', 'true')
            editTicket.setAttribute('disabled', 'true')
            buy_ticket.setAttribute("disabled", "true")
            buy_ticket.innerHTML = "SOLD OUT"


        }

    }
    )

}