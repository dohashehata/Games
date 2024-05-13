import { Details } from "./Details.module.js";
import { Ui } from "./Ui.module.js";

export class Home{
    constructor(){
        this.getGames("mmorpg");

    document.querySelectorAll(".nav-link").forEach((Link)=>{
        Link.addEventListener('click',(e)=>{
            document.querySelector(".navbar-nav .active").classList.remove("active");
            e.target.classList.add("active")
           
            this.getGames(e.target.dataset.category)

        })
    }
    )
   this.ui = new Ui()
    }


 async getGames(category){
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a9df11e194msh5731efd71796706p143187jsnf6ff814118ed',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        this.ui.displayDataGame(result);
        this.startEvent();
        loading.classList.add("d-none");
    } catch (error) {
        console.error(error);
    }
}




startEvent() {
    document.querySelectorAll(".card").forEach((item) => {
       item.addEventListener("click", () => {
          const id = item.dataset.id;
          this.showDetails(id);
       });
    });
 }

 showDetails(idGame) {
    const details = new Details(idGame);
    document.querySelector(".games").classList.add("d-none");
    document.querySelector(".details").classList.remove("d-none");
 }

}