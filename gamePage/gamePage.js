// array of playing cards
// deck of 52 cards
const playingDeck = [
    "A♥", "2♥", "3♥", "4♥", "5♥", "6♥", "7♥", "8♥", "9♥", "10♥", "J♥", "Q♥", "K♥",
    "A♠", "2♠", "3♠", "4♠", "5♠", "6♠", "7♠", "8♠", "9♠", "10♠", "J♠", "Q♠", "K♠",
    "A♦", "2♦", "3♦", "4♦", "5♦", "6♦", "7♦", "8♦", "9♦", "10♦", "J♦", "Q♦", "K♦",
    "A♣", "2♣", "3♣", "4♣", "5♣", "6♣", "7♣", "8♣", "9♣", "10♣", "J♣", "Q♣", "K♣"];

// shuffled deck of 52 cards
let playingDeckReady = shuffleArray(playingDeck)

// array of player cards
let playerCards = []

// array of dealer cards
let dealerCards = []

// player and dealer cards display
let playerNewCards = document.createElement("ul")
let dealerNewCards = document.createElement("ul")

function gameStart()
{
    playerNewCards.className = "player-new-cards"
    document.getElementById("player-field-cards").appendChild(playerNewCards)
    dealerNewCards.className = "dealer-new-cards"
    document.getElementById("dealer-field-cards").appendChild(dealerNewCards)

    // dealing cards for player and dealer
    playerCards.push(getOneCard())
    dealerCards.push(getOneCard())
    playerCards.push(getOneCard())
    dealerCards.push(getOneCard())

    // show what cards did the player get
    for (let i = 0; i < playerCards.length; i++)
    {
        let singleCard = document.createElement("li")
        singleCard.className = "showedCard"
        singleCard.innerHTML = playerCards[i]
        playerNewCards.appendChild(singleCard)
    }

    // show total points for the player
    document.getElementById("player-field-cards-sum").textContent = checkSumOfCards(playerCards)

    // show to player the second card from the dealer
    for (let i = 0; i < dealerCards.length; i++)
    {
        let singleCard = document.createElement("li")
        singleCard.className = "showedCard"
        singleCard.innerHTML = dealerCards[i]

        // hide first card and its value
        if (i === 0)
        {
            singleCard.className = "closedCard"
            singleCard.innerHTML = "?"
        }
        dealerNewCards.appendChild(singleCard)
    }
}

// get first item for the shuffled deck
function getOneCard()
{
    let oneCard = playingDeckReady[0]
    playingDeckReady = playingDeckReady.slice(1,-1)
    return oneCard
}

// get one card form deck for player
function takeCard()
{
    playerCards.push(getOneCard())

    // display card
    let singleCard = document.createElement("li")
    singleCard.className = "showedCard"
    singleCard.innerHTML = playerCards[playerCards.length-1]
    playerNewCards.appendChild(singleCard)

    // update number of points
    document.getElementById("player-field-cards-sum").textContent = checkSumOfCards(playerCards)

    // simple check if the player got more than 21 and automatically lost
    if(checkSumOfCards(playerCards) > 21)
    {
        // start dealer turn to make a decision
        enough()
    }
}

// dealer function that makes decisions automatically
function enough()
{
    // show the hidden card
    let unseenCard = document.getElementsByClassName("closedCard")
    unseenCard.item(0).innerHTML = dealerCards[0]
    unseenCard.item(0).className = "showedCard"

    //dealer approach to the game/casino rules
    while (checkSumOfCards(dealerCards) < 17)
    {
        dealerCards.push(getOneCard())

        // display card
        let singleCard = document.createElement("li")
        singleCard.className = "showedCard"
        singleCard.innerHTML = dealerCards[dealerCards.length-1]
        dealerNewCards.appendChild(singleCard)

    }

    // update points for dealer
    document.getElementById("dealer-field-cards-sum").textContent = checkSumOfCards(dealerCards)

    // disable buttons
    document.getElementById("button-get-card").disabled = true;
    document.getElementById("button-enough").disabled = true;

    // check function for who won the round
    whoWon()

    // ask for play again
    let button = document.createElement("button");
    button.innerHTML = "Play Again";
    button.onclick = function playAgain()
    {
        location.reload();
    };
    document.body.appendChild(button)
}

// compare who won depending on cards
function whoWon()
{
    if(checkSumOfCards(playerCards) > 21 && checkSumOfCards(dealerCards) > 21)
    {
        document.getElementById("game-outcome").textContent = "Its a draw"
    }
    else if(checkSumOfCards(playerCards) <= 21 && checkSumOfCards(dealerCards) > 21)
    {
        document.getElementById("game-outcome").textContent = "Player wins!"
    }
    else if(checkSumOfCards(playerCards) > 21 && checkSumOfCards(dealerCards) <= 21)
    {
        document.getElementById("game-outcome").textContent = "Players lose!"
    }
    else if(checkSumOfCards(playerCards) <= 21 && checkSumOfCards(dealerCards) <= 21)
    {
        if(checkSumOfCards(dealerCards) > checkSumOfCards(playerCards))
        {
            document.getElementById("game-outcome").textContent = "Players lose!"
        }
        else if(checkSumOfCards(dealerCards) === checkSumOfCards(playerCards))
        {
            document.getElementById("game-outcome").textContent = "Its a draw"
        }
        else
        {
            document.getElementById("game-outcome").textContent = "Players wins!"
        }
    }
}

// check the sum of points of the array that has been given
function checkSumOfCards(arr)
{
    // check for aces
    let sumOfCards = 0
    let countAces = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].match(/[a-z]/i))
        {
            if (arr[i].match("A"))
            {
                countAces = countAces + 1
            }
            else if (arr[i].match("J"))
            {
                sumOfCards = sumOfCards + 2
            }
            else if (arr[i].match("Q"))
            {
                sumOfCards = sumOfCards + 3
            }
            else if (arr[i].match("K"))
            {
                sumOfCards = sumOfCards + 4
            }
        }
        else if (arr[i].match("10"))
        {
            sumOfCards = sumOfCards + 10
        }
        else
        {
            let number = arr[i].slice(0,1)
            sumOfCards += parseInt(number)
        }
    }

    // count aces them accordingly to the rules of Blackjack
    if (sumOfCards === 0 && countAces === 2)
    {
        sumOfCards = 21
    }
    else if (sumOfCards > 0 && countAces > 0)
    {
        if (sumOfCards > 10)
        {
            sumOfCards = sumOfCards + countAces
        }
        else if (sumOfCards + countAces <= 11)
        {
            sumOfCards = sumOfCards + 11 + (countAces - 1)
        }
    }
    else if (sumOfCards === 0 && countAces > 2)
    {
        sumOfCards = sumOfCards + 11 + (countAces - 1)
    }

    return sumOfCards
}

// shuffle an given array
function shuffleArray(array)
{
    for (let i = array.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}