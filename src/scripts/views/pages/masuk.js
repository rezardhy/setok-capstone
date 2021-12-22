import { firebaseConfig, app, auth } from "../../data/firebase";
import {  signInWithEmailAndPassword  }from "firebase/auth";


const Masuk = {
    async render() {
      return `

        <div class="container mt-5">
          <div class="row">
                  <div class="col-md-4"> </div>

              <div class="col-md-4" id="formlogin">
                  <div class="d-flex justify-content-center login-form" >
                      <div>
                          <div>
                            <div class="form-group">
                              <label for="exampleInputEmail1" class="Tc">Email address</label>
                              <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                            </div>
                            <div id="loader"></div>
                            <div class="form-group">
                              <label for="exampleInputPassword1" class="Tc">Password</label>
                              <input type="password" class="form-control" id="password" placeholder="Password">
                            </div>
                            <small id="daftar" class="form-text Tc">Belum Punya Akun? <a href="/#/daftar" class="Tc"> Daftar</a></small>
                            <button  id="login" class="btn btn-primary">Masuk</button>
                          </div>
                  </div>
              </div>
          </div>
      </div>

     

      `;
    },
   
    async afterRender() {
        try {
          document.getElementById('page-top').style.display = "block";
        document.getElementById('loader').style.display = "none";
        login.addEventListener('click',(e)=>{
          document.getElementById('loader').style.display = "block";

            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                document.getElementById('loader').style.display = "none";

                const user = userCredential.user;
                window.location.href = "/#/profil";

    
    
                // ...
            })
            .catch((error) => {
                document.getElementById('loader').style.display = "none";
                const errorMessage = error.message;
                window.alert(errorMessage);
            });
    
        })
        } catch (error) {
          
        }



    },
  };
   
  
  
  export default Masuk;