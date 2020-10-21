
const get_home = (req, res) => {
    res.status(302).redirect('/blogs');
  };

const get_about = (req, res) => {
    res.status(200).render('about', { title: 'About' });
  };

const get_login = (req,res)=>{
    res.status(200).render('login',{title:'Login'});
};

 const get_signup = (req,res)=>{
    res.status(200).render('signup',{title:'Signup'});
};

const get_404 = (req, res) => {
    res.status(404).render('404', { title: '404' });
};


module.exports = {
    get_home,
    get_about,
    get_login,
    get_signup,
    get_404
}