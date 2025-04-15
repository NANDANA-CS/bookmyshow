

async function signup(event){
    event.preventDefault()

    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const password = document.getElementById("password").value
    const confirmpassword = document.getElementById("confirmpassword").value
    if(password !== confirmpassword){
        alert("Passwords do not match")
        return
    }
    try {
        const res = await fetch("http://localhost:8000/api/sign/signup",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ username, email,phone,password })
        })
        console.log(res);
        const data = await res.json()
        console.log(data);

        if(res.status===201){
            alert("Signup Successfull")
            window.location.href="/signin"
        }else{
            alert("Signup failed")
        }

    } catch (error) {
        console.log(error);
    }
}
