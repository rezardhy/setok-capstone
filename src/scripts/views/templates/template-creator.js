
const createArtikel = (artikel) => `
<div class="col-lg-3 col-sm-3 mb-3 mb-lg-0" >
    <div class="portfolio-item" >
         <img height="300" class="img-fluid" src="${artikel.urlToImage ? artikel.urlToImage:'https://picsum.photos/id/666/800/450?grayscale'}" alt="Gambar" />
        <div class="portfolio-caption">
            <div class="portfolio-caption-heading">${artikel.title.slice(0, 50)}...</div>
            <div class="portfolio-caption-subheading text-muted"><a href="${artikel.url}"><p>${artikel.content? artikel.content.slice(0, 100):'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries .'.slice(0, 100)}...</p></a></div>
        </div>
                            
    </div>
                    
</div>


`;

const createLeaderboard = (lb,count)=> 
`
    <tr>
    <th scope="row">${count}</th>
    <td>${lb.name}</td>
    <td>${lb.longest} hari</td>
    </tr>


`;

const createForum = (forum)=>


`
<div class="col-md-6"></div>
    <h2 id=judul">${forum.judul}</h2>
    <div class="forum">
        <p id="nama">By ${forum.namaUser}</p>
        <p class="tgl_f" id="tanggal">${forum.tanggal}</p>
        <p class="desk_f" id="isi">${forum.isi}</p>
    </div>
</div>    `
    
;



export { createArtikel, createLeaderboard, createForum };

