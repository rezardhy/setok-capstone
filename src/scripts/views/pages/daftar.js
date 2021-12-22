import { auth, db, app} from "../../data/firebase";
import { createUserWithEmailAndPassword  }from "firebase/auth";
import { set, ref} from "firebase/database";

const Daftar = {
    async render() {
      return `

      <div class="container mt-5">
      <div class="row">
              <div class="col-md-4"> </div>

          <div class="col-md-4" id="formlogin">
              <div class="d-flex justify-content-center login-form" >
                  <div>
                       <div>
                            <h3>Masukan Biodata</h3>

                            <div class="form-group">
								<label for="name" class="Tc">Nama</label>
								<input type="text" class="form-control" id="name" aria-describedby="name" placeholder="Masukan Nama" required="required"">
							</div>

							<div class="form-group">
								<label for="age" class="Tc">umur</label>
								<input type="number" class="form-control" id="age" aria-describedby="age" placeholder="Masukan Umur" required="required">
							</div>

                            <div class="form-group">
								<label for="name" class="Tc">Pekerjaan</label>
								<input type="text" class="form-control" id="job" aria-describedby="job" placeholder="Masukan Pekerjaan" required="required">
							</div>
                            
                            <div id="loader"></div>

							<div class="form-group">
								<label for="exampleInpuemailtEmail1" class="Tc">Email</label>
								<input type="email" class="form-control" id="email" aria-describedby="email" placeholder="Masukan Email" required="required">
							</div>
						  
							<div class="form-group">
								<label for="password" class="Tc">Password</label>
								<input type="password" class="form-control" id="password" placeholder="Masukan Password" required="required">
							</div>  
                            <small id="emailHelp" class="form-text Tc">Sudah Punya Akun? <a href="/#/masuk" class="Tc"> Masuk</a></small>
                            <button  id="signIn" class="btn btn-primary">Daftar</button>
                        </div>
              </div>
          </div>
      </div>
  </div>

      `;
    },
   
    async afterRender() {
        document.getElementById('page-top').style.display = "block";
        document.getElementById('loader').style.display = "none";
        signIn.addEventListener('click',(e)=>{
            document.getElementById('loader').style.display = "block";
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            let name = document.getElementById('name').value;
            let age = document.getElementById('age').value;
            let job = document.getElementById('job').value;
            let date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                set(ref(db, 'users/' + user.uid),{
                    name:name,
                    email:email,
                    age: age,
                    job: job,
                })
    
                set(ref(db, 'leaderboard/' + user.uid),{
                    name:name,
                    email:email,
                    date:date,
                    longest:0,
                    now:0,
                })

               
                document.getElementById('loader').style.display = "none";
                alert('succes ');
                location.reload();  
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("pesan eror: " + errorMessage);
                document.getElementById('loader').style.display = "none";

                // ..
            });
        })



    },
  };
   
  
  
  export default Daftar;