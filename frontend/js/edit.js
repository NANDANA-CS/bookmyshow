const params = new URLSearchParams(window.location.search)
const id = params.get("id")

async function loadmovie(){
    const res = await fetch(`http://localhost:4000/getmovie/${id}`)
    const data = await res.json()
    console.log(data);
    

    data.forEach((movie)=>{
    
            document.getElementById("name").value = movie.name
            if (movie.screen.includes("2K"))
                document.getElementById("2k").checked = true
            if (movie.screen.includes("4K"))
                document.getElementById("4k").checked = true
            if (movie.screen.includes("IMAX"))
                document.getElementById("imax").checked = true
            if (movie.language.includes("Malayalam"))
                document.getElementById("mala").checked = true
            if (movie.language.includes("English"))
                document.getElementById("eng").checked = true
            if (movie.language.includes("Tamil"))
                document.getElementById("tamil").checked = true
            if (movie.language.includes("Hindi"))
                document.getElementById("hindi").checked = true
            if (movie.language.includes("Telugu"))
                document.getElementById("telu").checked = true
            if (movie.language.includes("Kannada"))
                document.getElementById("kannada").checked = true
            dur=""
            duration=movie.duration.split("r")
            dur="0"+duration[0].slice(0,1)+":"+duration[1].slice(0,2)
            document.getElementById("duration").value = dur
            movie.category.forEach((cat) => {
                if (document.getElementById(cat)) {
                    document.getElementById(cat).checked = true
                }
            });
            document.getElementById("posterprev").innerHTML = `<img style="height:100%;" src="${movie.poster}" alt="poster preview">`   
            document.getElementById("bannerprev").innerHTML = `<img style="width:100%;" src="${movie.banner}" alt="banner preview">`  
            document.getElementById("certificate").value = movie.certificate;
            document.getElementById("relsdate").value = movie.relsdate.slice(0, 10)
    })
}

loadmovie()


document.getElementById("movies").addEventListener("submit",async(e)=>{
    e.preventDefault()
    let screen=[]
    let language=[]
    let category=[]
    let name=document.getElementById("name").value
    let duration=document.getElementById("duration").value
    let certificate=document.getElementById("certificate").value
    let relsdate=document.getElementById("relsdate").value

    s2k=document.getElementById("2k")
    s4k=document.getElementById("4k")
    simax=document.getElementById("imax")

    if(s2k.checked)
        screen.push("2K")
    if(s4k.checked)
        screen.push("4K")
    if(simax.checked)
        screen.push("imax")
    console.log(screen);
    
    mala = document.getElementById("mala")
    eng = document.getElementById("eng")
    tamil = document.getElementById("tamil")
    hindi = document.getElementById("hindi")
    telu = document.getElementById("telu")
    kannada = document.getElementById("kannada")

    if(mala.checked)
        language.push("Malayalam")
    if(eng.checked)
        language.push("English")
    if(tamil.checked)
        language.push("Tamil")
    if(hindi.checked)
        language.push("Hindi")
    if(telu.checked)
        language.push("Telugu")
    if(kannada.checked)
        language.push("Kannada")

    let hm=duration.split(":")
    hm[0]=hm[0].slice(1,)
    duration=hm[0]+"hr"+hm[1]+"min"
    console.log(duration);
    

    action = document.getElementById("Action")
    comedy = document.getElementById("Comedy")    
    thriller = document.getElementById("Thriller")
    crime = document.getElementById("Crime")
    romantic = document.getElementById("Romantic")
    horror = document.getElementById("Horror")
    animation = document.getElementById("Animation")
    drama = document.getElementById("Drama")
    scifi = document.getElementById("Sci-fi")
    genre = [action, comedy, thriller, crime, romantic, horror, animation, drama, scifi]


    for(let i of genre){
        if(i.checked){
            category.push(i.value)
        }
    }
    try {
        const res = await fetch(`http://localhost:4000/update/${id}`,{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify({name,screen,language,duration,certificate,category,relsdate})
        })
        const data = await res.json()
        if(res.status===200){    
            alert("success")  
        }else{
            console.log(data);
            
            alert(data.error)
        }
    } catch (error) {
        console.log(error);
    }
    
})