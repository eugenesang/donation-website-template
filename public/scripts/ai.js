async function getJSON(url){

    try {
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            return data;
        }else{
            const error = await response.json();
            throw error;
        }
        
    } catch (error) {
        throw error;
    }    
}

const url = "https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=Diani&limit=10&language=en";

const d = getJSON(url).then(d=>{
    console.log(d);
}).catch(e=>{
    console.error(e);
})