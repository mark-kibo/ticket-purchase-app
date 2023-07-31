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
                    <span>Tickets: ${film.capacity - film.tickets_sold}</span>
                </div>
                <div class="info">
                    <p>${film.description}</p>
                </div>
                <div class="buy-btn"><button id="${film.id}">Buy ticket</button></div>
            </div>
        `



        movie_card.appendChild(card)
        let buy_ticket = document.getElementById(`${film.id}`)
        buy_ticket.addEventListener('click', (e) => {
            document.getElementById('id02').style.display = 'block';
        })




        if (film.tickets_sold === film.capacity) {
            buy_ticket.setAttribute('disabled', 'true')
        }
        // once the button is clicked for the specific movie open a form modal
        let patchBody = {
            tickets_sold: `${parseInt(film.tickets_sold)}`
        }

    }
    )


    let form = document.querySelector('#ticket-form')
    let qrdiv = document.getElementById("qr-code")
    // get form modal data and pass it to our qr code  
    form.addEventListener("submit", (e) => {
        let info = {}
        e.preventDefault()
        e.target.querySelectorAll('input').forEach(element => {
            info[`${element.name}`] = element.value

        });
        console.log(info)
        // patch body  
        patchBody.tickets_sold = `${parseInt(patchBody.tickets_sold) + parseInt(info.tickets)}`

        console.log(buy_ticket.id)
        // execute patch after 5 seconds
        setTimeout(() => {
            console.log(patchFilm(patchBody, buy_ticket.id))
        }, 5000)

    })
}