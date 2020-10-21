const loginForm = document.querySelector('.login');
const emailError = document.querySelector('.emailError');
const passwordError = document.querySelector('.passwordError');

loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    
    //reset errors

    emailError.textContent = '';
    passwordError.textContent = '';

    //set value

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    
    try{

        const res = await fetch('/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email,password})
        })
        const data = await res.json();
        if(data.user){
            location.assign('/');
        }
        if(data.errors){
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password; 
        }

    }catch(err){

    }

})