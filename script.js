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
    let movie_card = document.querySelector(".card")
    console.log(movie_card)
    data.map(film => {
        console.log(film)
        let img=document.createElement('img')
        // let h4=document.createElement('h4')
        // let container=document.createElement('div')
        // let span1=document.createElement('span')
        // let span2=document.createElement('span')
        // let p=document.createElement('p')
        // let div=document.createElement('div')
        // let button=document.createElement('button')
        // img.src=`${film.poster}`
        img.setAttribute('src',  `${film.poster}`)
        img.setAttribute('style', 'width:100%;')
        movie_card.appendChild(img)
        // img.alt="movie poster"
        // img.style.width="100%"
        // h4.innerHTML=`${film.title}`
        // container.class="container"
        // span1.innerHTML=`Showtime :${film.showtime}`
        // span2.innerHTML=`${film.runtime} minutes`
        // p.innerHTML=`${film.description}`
        // button.innerHTML=`Buy ticket`
        // button.id=`${film.id}`

        // div.appendChild(button)
        // container.appendChild(h4)
        // container.appendChild(span1)
        // container.appendChild(span2)
        // container.appendChild(p)
        // container.appendChild(div)

        // movie_card.appendChild(img)
        // movie_card.appendChild(container)

        // movie_card.innerHtml=`
        // <img  src"${film.poster}" alt="movie poster" style="width: 100%;" >
        //         <div class="container">
        //             <h4><b>${film.title}</b></h4>
        //             <span>Showtime:${film.showtime} </span>
        //             <span>Showtime:${film.runtime} minutes </span>
        //             <p>${film.description}</p>
        //             <div>
        //                 <button id=${film.id}>Buy ticket</button>
        //             </div>
        //         </div>
        // `
        //     let buyBtn=document.querySelector(`#${film.id}`)
        //     buyBtn.addEventListener("onclick", (e)=>{

        //     })

    }
    )
}