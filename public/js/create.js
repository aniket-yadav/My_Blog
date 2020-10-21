const createForm = document.querySelector('.create');
const titleError = document.querySelector('.titleError');
const bodyError = document.querySelector('.bodyError');
const userId = document.querySelector('.id').textContent;

createForm.addEventListener('submit',  (e)=>{
    e.preventDefault();


    let okTitle = true;
    let okBody = true;

    //reset errors

    titleError.textContent = '';
    bodyError.textContent = '';

    //set value

    const title = createForm.title.value;
    const body = createForm.body.value;
    const postedby = userId;
   
    if(title == '' ){
        okTitle = false;
        titleError.textContent = "Please enter title for blog";
    }
    if(body == '' ){
        okBody = false;
        bodyError.textContent = "Please enter content for blog";
    }
    if(okTitle && okBody){
      
             fetch('/blogs',{
                    method:'POST',
                    headers:
                    {
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({title,body,postedby})
            }).then((res)=>{
                window.location.assign('/');
            }).catch();
       
    }
});
