import { auth } from "../../data/firebase";
import {  onAuthStateChanged, signOut   }from "firebase/auth";
import { createForum } from '../templates/template-creator';
import { db } from "../../data/firebase";
import { ref, onValue, query, orderByChild  } from "firebase/database";

const Forum = {
    async render() {
      return `
     

        <div class="jumbotron mt-5">
            <div class="container"> <h1>Sharing Place</h1>
                <hr class="my-4">
                <p>Mari Berbagi Cerita dan Keluh Kesah</p>
            </div>
            
        </div>
        
        <div class="container mb-4" id="kontenforum">
            <div id="loader"></div>
        </div>
      
      
      `;
    },
   
    async afterRender() {

      // Fungsi ini akan dipanggil setelah render()
      try {
        document.getElementById("page-top").style.display="block";
      const forum = document.querySelector('#kontenforum');
      const datas = [{}];
      datas.shift();
      let count = 0;
      let user1 = '';
      onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            user1 = user.uid;
            document.getElementById("logout").style.display="block";


          
            // ...
        } else {
          document.getElementById("logout").style.display="none";

            
        }
        });

        const orderAsc = query(ref(db, 'forum/'), orderByChild('tanggal'));
        onValue(orderAsc, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              datas.unshift(childData);
                      
              // ...
            });
                while(count<datas.length){
                
                  forum.innerHTML += createForum(datas[count]);
                  count++;
              }
            document.getElementById("loader").style.display="none";
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
      } catch (error) {
        
      }
  
    

    },
  };
   
  export default Forum;