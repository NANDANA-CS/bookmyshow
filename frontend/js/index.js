console.log("index.js");

async function loadData() {
    try{
        const res = await fetch("http://localhost:8000/api/movie/load", {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        if (!res.ok) {
            throw new Error("server error")
        }
       
    
        console.log(res);
        const data = await res.json()
        console.log(data);
        document.getElementById("user").textContent = data.userdata.email
        let str = " "
        data.data.forEach(movie => {
            str += `
        <a href="/preview.html?id=${movie._id}"><div class="card">
            <img src="${movie.poster}" alt="${movie.name}">
            <p class="title">${movie.name}</p>
           <p class="category">${Array.isArray(movie.category) ? movie.category.join(', ') : movie.category}</p>
        </div></a>
      `
        })
        document.getElementById("cards").innerHTML = str
    }catch(err){
        console.log(err);
        
    }
   
}
loadData()

