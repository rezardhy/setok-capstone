import { auth, db, dbRef } from "../../data/firebase";
import { onAuthStateChanged, signOut   }from "firebase/auth";
import { ref, get, child, update, set } from "firebase/database";
import { nanoid } from "nanoid";

const Profil = {
    async render() {
      return `

     

      <div class="jumbotron mt-5">
        <div class="container"> <h1>Profil</h1>
          <hr class="my-4">
          <p>Profil Perokok</p></div>
          
        </div>
      <div class="container ">


        <div class="row cont-bord">

        <div class="col-md-6">
        <h3>Informasi Umum Pemilik Akun</h3>
        <div id="loader"></div>
      
        <table class="table table-light">
          
          <tbody>
            <tr>
              <th scope="row" >Nama</th>
              <td> : </td>
              <td id="nama"></td>
            </tr>

            <tr>
              <th scope="row">Email</th>
              <td> : </td>
              <td id="email"></td>
            </tr>

            <tr>
              <th scope="row">Rekor Terlama</th>
              <td> : </td>
              <td id="rekor"></td>
            </tr>

            <tr>
              <th scope="row">Rekor Saat Ini</th>
              <td> : </td>
              <td id="rekorNow"></td>
            </tr>

            <tr>
              <th scope="row">Umur</th>
              <td> : </td>
              <td id="umur"></td>
            </tr>
            
          </tbody>
        </table>
      </div>
            <div class="col-md-6"></div>
        </div>
      </div>
      <div class="container ">
        <div class="row cont-bord">
            <div class="col-md-12">
                <h3 id="tanggal"></h3>
                
                <div id="button">
                  <h4>Apakah pengguna merokok pada hari ini?</h4>
                  <button id="addCount" class="btn btn-primary">Ya</button>
                  <button id="resetCount"  class="btn btn-primary">Tidak</button>
                </div>
                <p id="done">Anda Telah Mengisi Laporan Harian</p>
                    
                </div>
            
        </div>
      </div>

      <div class="container ">
        <div class="row cont-bord">
          <div class="col-md-12">
              <h3>Tambahkan Cerita </h3>

              <div class="form-group">
                  <label for="exampleInputEmail1">Judul Cerita</label>
                  <input type="text" class="form-control" id="judul">
              </div>

              <div class="form-group">
                <label >Isi Cerita</label>
                <textarea class="form-control" id="isi" placeholder="Isi dengan cerita pengalam buruk meroko atau tips berehnti merokok" required></textarea>
              </div>
              <button id="sendStory" class="btn btn-primary">Kirim</button>

          </div>
            
        </div>
      </div>
      `;
    },
   
    async afterRender() {
      // Fungsi ini akan dipanggil setelah render()

      const idForum = nanoid(16);
      let user1 = '';

      let nama = "";
      let email = "";
      let rekor = 0;
      let rekorNow = 0;
      let tanggal = '';
      let dateNow = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      console.log(dateNow);

     

      document.getElementById("page-top").style.display="none";
      onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            user1 = user.uid;
            
            document.getElementById("page-top").style.display="block";
            document.getElementById("logout").style.display="block";
            
            // ...

            get(child(dbRef, "leaderboard/" + user1)).then((snapshot) => {
              if (snapshot.exists()) {
                
                nama = snapshot.val().name;
                email = snapshot.val().email;
                rekor = snapshot.val().longest;
                rekorNow = snapshot.val().now;
                tanggal  =snapshot.val().date;
                
               
                
                //console.log(snapshot.val());
              } else {
                console.log("No data available");
              }

              
            }).then(() => {
              document.getElementById("loader").style.display="none";
              document.getElementById("nama").innerHTML = nama;
              document.getElementById("email").innerHTML = email;
              document.getElementById("rekor").innerHTML = rekor + " Hari";
              document.getElementById("rekorNow").innerHTML = rekorNow + " Hari";
              document.getElementById("tanggal").innerHTML = "Laporan Harian Berhenti Merokok ( " + dateNow +" )";

              


              if(tanggal==dateNow){
                document.getElementById("button").style.display="none";
                document.getElementById("done").style.display="block";
              }

              addCount.addEventListener('click',(e)=>{
                rekorNow++;

                if(rekorNow>rekor){
                  update(ref(db,"leaderboard/" + user1 ),{
                    now: rekorNow,
                    longest : rekorNow,
                    date:dateNow
        
                  })
                  window.alert("Rekor berhasil di update");
                  location.reload();
                }

                else{
                  update(ref(db,"leaderboard/" + user1 ),{
                    now: rekorNow,
                    date:dateNow
        
                  })
                  window.alert("Rekor berhasil di update");
                  location.reload();
                }
                
      
              })

              resetCount.addEventListener('click',(e)=>{
                
                update(ref(db,"leaderboard/" + user1 ),{
                  now: 0,
                  date:dateNow
      
                })
                window.alert("Rekor berhasil di update");
                location.reload();
      
              })

              sendStory.addEventListener('click',(e)=>{
                let judul = document.getElementById('judul').value;
                let isi = document.getElementById('isi').value;
                set(ref(db, 'forum/' + idForum),{
                  idUser: user1,
                  namaUser:nama,
                  tanggal:dateNow,
                  judul : judul,
                  isi : isi
                })
                alert("Cerita Berhasil Di Upload");
                location.reload();
      
            
              })
        
            }).catch((error) => {
              console.error(error);
            });

            


        } else {
            // User is signed out
            // ...
            document.getElementById("logout").style.display="none";
            window.location.href = "/#/masuk";
            window.alert("Harap Login");

        }
        });


        

        logout.addEventListener('click',(e)=>{
          signOut(auth).then(() => {
              // Sign-out successful.
              window.location.href = "/#";
              }).catch((error) => {
              // An error happened.
              });
      
        })

    },//

  

  };
   
  export default Profil;