console.log("index.js");

async function loadData() {
    const res= await fetch("http://localhost:8000/api/movie/load")
    console.log(res);
    const data=await res.json()
    console.log(data);  
let str=" "
data.forEach(movie => {
    str+=`
    <a href="/preview.html?id=${movie._id}"><div class="card">
        <img src="${movie.poster}" alt="${movie.name}">
        <p class="title">${movie.name}</p>
        <p class="category">${movie.category.join(', ')}</p>
    </div></a>
  `
})
document.getElementById("cards").innerHTML=str
}
loadData()

