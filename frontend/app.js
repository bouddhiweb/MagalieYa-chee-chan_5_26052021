import Cards from "./classes/Cards.js";

fetch('http://localhost:3000/api/teddies')
    .then(response=>response.json())
    .then(cards=>{
        cards.forEach(cardsData => {
            const cards = new Cards(cardsData);
            cards.display();
        })
    })
