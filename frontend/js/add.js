let poster=""
document.getElementById("poster").addEventListener("change",async(e)=>{
    poster=await convertBase64(e.target.files[0])
    document.getElementById("posterprev").innerHTML=`
    <img src="${poster}" width="100%" alt="image preview">`
})

let banner=""
document.getElementById("banner").addEventListener("change",async (e) => {
    banner=await convertBase64(e.target.files[0])
    document.getElementById("bannerprev").innerHTML=`
    <img src="${banner}" alt="image preview" width=100%` 
})

function convertBase64(file) {
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror=(error)=>{
            reject(error)
        }
    })
}


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
        const res = await fetch("http://localhost:4000/add",{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify({name,screen,language,duration,certificate,category,relsdate,poster,banner})
        })
        const data = await res.json()
        if(res.status===201){    
            alert("success")  
        }else{
            console.log(data);
            
            alert(data.error)
        }
    } catch (error) {
        console.log(error);
    }
    
})