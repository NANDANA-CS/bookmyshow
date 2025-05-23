async function login(event){
    event.preventDefault()
    const email=document.getElementById('email').value
    const password=document.getElementById("password").value
    
    try {
        const res=await fetch('http://localhost:8000/api/sign/login',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                email:email,password:password
            })
        })
        const data=await res.json()
        console.log(data);

        if (res.status===200) {
            localStorage.setItem("token",data.token)
            alert(data.message)
            window.location.href="/"
        }
        
    } catch (error) {
        console.log(error);
        
    }
}
    