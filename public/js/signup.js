const signupForm = document.querySelector('.signup');
const emailError = document.querySelector('.emailError');
const passwordError = document.querySelector('.passwordError');
const confirmPasswordError = document.querySelector('.confirmPasswordError');
signupForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    
    //reset errors

    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';

    //set value

    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const confirmPassword = signupForm.confirmPassword.value;
if(password == confirmPassword){
    
    try{

        const res = await fetch('/signup',{
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
}else{
    confirmPasswordError.textContent = 'Password does match';
}

})