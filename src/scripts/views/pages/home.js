import ArtikelSource from '../../data/artikel-source';
import { createArtikel, createLeaderboard } from '../templates/template-creator';
import {  onAuthStateChanged, signOut   }from "firebase/auth";
import { auth, db } from "../../data/firebase";



import { ref, onValue, query, orderByChild  } from "firebase/database";



const Home = {
    async render() {
      return `

    
      <header class="masthead">
          <div class="container">
              <div class="masthead-heading ">Merokok Bukanlah Kebiasaan</div>
              <a class="btn-second btn-xl text-uppercase " href="/#/forum">Go to Forum</a>
          </div>
      </header> 

      <div id="loader"></div>

      <!-- article Grid-->
      <section class="page-section bg-light" id="portfolio">
          <div class="container">
              <div class="text-center">
                  <h2 class="section-heading ">Artikel</h2>
                  <span class="heading-line"></span>
              </div>
              <div class="row" id="kontenartikel">
                  
              </div>
          </div>
      </section>

      <!-- event -->
      
      <section class="page-section bg-light" id="event">
          <div class="container">
              <div class="text-center">
                  <h2 class="section-heading ">Event</h2>
                  <span class="heading-line"></span>
              </div>
              <div class="row">
                  <div class="col-md-6 mb-4">
                      <div class="hovereffect">
                          <img class="img-fluid" src="img/rokok/rokok.jpg" alt="" />
                          <div class="overlay">
                          <h2>Event 1</h2>
                          <a class="info" data-toggle="modal" ><h2>Hari Tanpa Tembakau Sedunia</h2>
                              <p>30 Desember di Jakarta</p></a>
                      </div>

                  </div>
                  </div>
                  <div class="col-md-6 mb-4">
                      <div class="hovereffect">
                          <img class="img-fluid" src="img/rokok/rokok.jpg" alt="" />
                          <div class="overlay">
                          <h2>Event 2</h2>
                          <a class="info" data-toggle="modal" ><h2>Hari Tanpa Tembakau Sedunia</h2>
                              <p>30 Desember di Jakarta</p></a>
                      </div>
                  </div>
                  </div>
              </div>
          </div>
      </section>
      <section class="page-section bg-light" id="leaderboard">
          <div class="container">
              <div class="text-center">
                  <h2 class="section-heading ">Leaderboard</h2>
                  <span class="heading-line"></span>
              </div>
              <div class="row" id="">
                  <div class="col-md-12">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">No</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Bebas Rokok</th>
                          </tr>
                        </thead>
                        <tbody id="peringkat">
                          
                        </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </section>
      `;
    },
   
    async afterRender() {
      // Fungsi ini akan dipanggil setelah render()

      const artikel = await ArtikelSource.articles();
      const artikelContainer = document.querySelector('#kontenartikel');
      const leaderboardRow = document.querySelector('#peringkat');
      const datas = [{}];
      datas.shift();
      let count=0;
      let no = 1;


      onAuthStateChanged(auth, (user) => {
        if (user) {
            
            document.getElementById("logout").style.display="block";

        } else {
            
            document.getElementById("logout").style.display="none";

            
        }
        });

        document.getElementById("loader").style.display="none";
        document.getElementById("page-top").style.display="block";
        
      artikel.forEach((art) => {
        artikelContainer.innerHTML += createArtikel(art);
      });


      const orderAsc = query(ref(db, 'leaderboard/'), orderByChild('longest'));
     
      onValue(orderAsc, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          datas.unshift(childData);
                  
          // ...
        });
        while(count<datas.length){
            
            leaderboardRow.innerHTML += createLeaderboard(datas[count],no);
            no++
            count++;
        }

      }, {
        onlyOnce: true,
      });

      

      logout.addEventListener('click',(e)=>{
        signOut(auth).then(() => {
            // Sign-out successful.
            window.location.href = "/#";
            }).catch((error) => {
            // An error happened.
            });
    
      })
      
      
      
    },
  };
   
  export default Home;