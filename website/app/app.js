// defining some variables
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=65d23d47ebd43cc5f7d84941a325a0c5&units=imperial'; 
const holder = document.getElementById('entryHolder');
const button = document.getElementById('generate');
const postData = async ( url = '', data = {})=>
{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: 
      {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
    try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      }
}
const createIU = async ()=>
{
        const res = await fetch('/data');
        try
        {
        const data = await res.json();
        if(data.feelings){
            holder.innerHTML = `Feelings: ${data.feelings}<br>
            Temperature: ${data.temp} degrees <br>
            Date: ${data.date}`;
        }else {
            holder.innerHTML = `Feelings: <br>
            Temperature: ${data.temp} degrees <br>
            Date: ${data.date}`;
        }}
        catch(error)
        {
        console.log(error);
        }
}
createIU();
const updateUi = async ()=>
{
    const res = await fetch('/data');
    try{
      const data = await res.json();
      if(data.feelings){
        holder.innerHTML = `Feelings: ${data.feelings} <br>
        Temperature: ${data.temp} degrees <br>
        Date: ${data.date}`;
    }else {
        holder.innerHTML = `Feelings: <br>
        Temperature: ${data.temp} degrees <br>
        Date: ${data.date}`;
    }}
  catch(error){
      console.log(`error ${error}`)
  }
}
  updateUi();
  button.addEventListener("click", ()=> {
      const code = document.getElementById('zip').value;
      const ValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(code);
      const feeling = document.getElementById('feelings').value;
      const date = new Date().toISOString().slice(0, 10);
      if(ValidZip){
        (async function () {
          try{const res = await fetch(url+code+apiKey);
              const data = await res.json();
              const recentEntry = {
                feelings: feeling,
                temp: data.main.temp,
                date: date,
              };
              return recentEntry;
            }
          catch(error){
              console.log(`error ${error}`)
          }
      })().then((recentEntry)=>{postData('/post', recentEntry)})
      .then(
        (e) => {updateUi()}
        )
      }else{
        alert('Invalid zip code! ' + '\n' + 'Please enter a valid 5-digit zip code');
      }
      
     
  })