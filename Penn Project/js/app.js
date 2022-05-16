const baseUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php?";
const searchUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=";
const imgUrl = "https://storage.googleapis.com/ygoprodeck.com/pics_small/";
const searchDiv = document.getElementById('search-div');
let search = "name=";
let searchItem = "";
let inpSearch = document.getElementById("inp-search").value;
let listItem = document.createElement('div');
let filterVar = '';



console.log(inpSearch);
getDiv = document.getElementById('content');
const cardByName = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Dark Magician';
let cardData =  [
    {
        id: 0,
        name: '',
        type: '',
        desc: '',
        race: '',
        atk: 0,
        def: 0,
        level: 0,
        race: '',
        attribute: '',
        archetype: '',
        image_url: "",
    }  
]


// fetch all cards: https://db.ygoprodeck.com/api/v7/cardinfo.php
//Ramdon Card: https://db.ygoprodeck.com/api/v7/randomcard.php
// Get card by name: https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Dark Magician
 

 
    
    
    const contenEL = document.getElementById('content');
    
  
 
   
 


    async function cardSearch(query){
        let res;
        
        listItem.classList.add('content-div');
        
        
        if(query){
            res = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${query}`)
        }
        else{
           res = await fetch(baseUrl);
         }
 
            let results = await res.json().then(function (data) {

                if(query){
                  //  searchDiv.innerHTML ='';
                    getDiv.innerHTML = '';
                    cardData = data.data[0];
                    searchCard(cardData);
                  
                }
                else{
                    
                    //searchDiv.innerHTML ='';
                    getDiv.innerHTML = '';
                    const filterRadioButton = document.createElement('div');
                   
                   
                    console.log(filterVar);
                    // original Number of cards 11930
                    for(let i = 1; i < 501; i++){

                        if(!filterVar){
                            cardData = data.data[i];
                        //console.log(data.data[i].type == 'Normal Monster');
                            ShowAllCards(cardData,i);
                        }

                        else if( data.data[i].type === filterVar ){
                            cardData = data.data[i];
                            ShowAllCards(cardData,i);
                             console.log(data.data[i].type === filterVar);
                        }
                       
                        
                       
                       
                    }
                  
                   
                   
                }
                
                

            });
           
            console.log(cardData);


           
            getDiv.appendChild(listItem);
    }
    
    function ShowAllCards(data, count){
        const mainContentListItem = document.createElement('div'); 
                        mainContentListItem.classList.add('content-div');
                        mainContentListItem.innerHTML = `
                        <img src="${imgUrl+data.id}.jpg" alt="card photo"/><br/>
                        <p> Entry: ${count}</p>
                        <p> Id: ${data.id}</p><br/>
                        <p>Name: ${data.name}</p><br/>
                        <p>Type: ${data.type}</p><br/>
                        
                        <p>Card Desscription:<br/> ${data.desc}</p>
                        <p class="attrib">Attribute: ${data.attribute}</p><br/>
                        <p> Type of monster: ${data.race}</p>
                        <p> Atk: ${data.atk} / Def: ${data.def}</p>
               
    
                              `;
                              //getDiv.appendChild(listItem);
                              getDiv.insertAdjacentElement('beforeend', mainContentListItem);
    }

    function searchCard(data){
        const mainContentItem = listItem.innerHTML = `            
        <img src="${imgUrl+data.id}.jpg" alt="card photo"/><br/>
        <p> Id: ${data.id}</p><br/>
        <p>Name: ${data.name}</p><br/>
        <p>Type: ${data.type}</p><br/>
        
        <p>Card Desscription: ${data.desc}</p>
        <p class="attrib">Attribute: ${data.attribute}</p><br/>
        <p> Type of monster: ${data.race}</p>
        <p> Atk: ${data.atk} / Def: ${data.def}</p>
       
        

              `;
    }

    function clearSearch(){
        listItem.innerHTML = " ";
    }
 
       
   
    document.getElementById('none').addEventListener("click", () => {
        searchItem = '';
        filterVar = '';
        console.log(filterVar);
       })
    
     document.getElementById('normal').addEventListener("click", () => {
        document.getElementById("inp-search").innerText = '';
        searchItem = '';
        filterVar = '';
        filterVar = "Normal Monster";
        console.log(filterVar);
       })
       document.getElementById('effect').addEventListener("click", () => {
        searchItem = '';
        filterVar = '';
        filterVar = "Effect Monster";
        console.log(filterVar);
       })
       document.getElementById('spell').addEventListener("click", () => {
        searchItem = '';
        filterVar = '';
        filterVar = "Spell Card";
        console.log(filterVar);
       })
       document.getElementById('trap').addEventListener("click", () => {
        searchItem = '';
        filterVar = '';
        filterVar = "Trap Card";
        console.log(filterVar);
       })

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("inp-search").addEventListener("change", () =>{

            searchItem =  document.getElementById("inp-search").value  ;
            console.log(searchItem);
    })
        
    
    document.getElementById("search-button").addEventListener("click", () => {
      
    cardSearch(searchItem);
})

  
   
  
});
