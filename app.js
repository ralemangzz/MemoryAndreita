// Grab a couple of things
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 6;

//link text
playerLivesCount.textContent = playerLives;

// Generate the data


const getData = () => [
    { imgSrc: "./images/mes1.jpg", name: "mes1"},
    { imgSrc: "./images/mes2.jpg", name: "mes2"},
    { imgSrc: "./images/mes3.jpg", name: "mes3"},
    { imgSrc: "./images/mes4.jpg", name: "mes4"},
    { imgSrc: "./images/mes5.jpg", name: "mes5"},
    { imgSrc: "./images/mes6.jpg", name: "mes6"},
     { imgSrc: "./images/mes1.jpg", name: "mes1"},
    { imgSrc: "./images/mes2.jpg", name: "mes2"},
    { imgSrc: "./images/mes3.jpg", name: "mes3"},
    { imgSrc: "./images/mes4.jpg", name: "mes4"},
    { imgSrc: "./images/mes5.jpg", name: "mes5"},
    { imgSrc: "./images/mes6.jpg", name: "mes6"},
];

//Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(()=> Math.random() - 0.5)
    console.log(cardData);
    return cardData;
};

//Card Generator Function
const cardGenerator = () => {
    const cardData = randomize();
    //Generate the HTML

   cardData.forEach((item)=> {
    const card = document.createElement('div');
    const face = document.createElement('img');
    const back = document.createElement('div');
    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';
    //attach info to the cards
    face.src = item.imgSrc;
    card.setAttribute('name', item.name)
    //attach the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener('click', (e)=>{
        card.classList.toggle('toggleCard');
        checkCards(e);
    })
   });

};

//Check cards
const checkCards = (e) =>{
    console.log(e);
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('toggleCard');

    console.log(flippedCards);
    //Logic
    if(flippedCards.length === 2){
        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
            console.log('match');
            flippedCards.forEach(card =>{
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            });
        }else{
            console.log('wrong');
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                setTimeout(()=> card.classList.remove('toggleCard'), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if(playerLives === 0){
                restart("Lo siento Andreita, intenta de nuevo, te amo!");
            }
        }
    }

    //Run a check to see if we won the game
    if(toggleCard.length === 8){
        restart('Ganaste Andreita, Te amo!')
    }
};

//Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    cardData.forEach((item,index)=>{
        cards[index].classList.remove('toggleCard');
     //Randomize
     setTimeout(()=> {
     cards[index].style.pointerEvents = 'all';
     faces[index].src = item.imgSrc;
     cards[index].setAttribute('name', item.name);
     section.style.pointerEvents = 'all';
     },1000);
    });
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);

};

cardGenerator();

