//console.log('ok');
let count = 0, previousId;

document.getElementById('blog').onclick = function() {
    //console.log('clicked');
    window.location.href = 'blog.html';
};

const videoCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();

   // console.log(previousId)

  //  console.log(data.data);

    const tab = document.getElementById("tab");

    const tabCategory = data.data;

    tabCategory.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <a onclick="handleLoadVideos('${category.category_id}',${0})" class="tab" id="tab${category.category_id}">${category.category}</a>
            `;
        tab.appendChild(div);
      });
};

const handleLoadVideos = async (categoryId,sort) => {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );

    const data = await response.json();

    if(count){
        document.getElementById(`tab${previousId}`).classList.remove('tab-active');
    }

    document.getElementById(`tab${categoryId}`).classList.add('tab-active');

  //  console.log(data.data.length);
  
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    const noContainer = document.getElementById("no-container");
    noContainer.innerHTML = "";

    if(!data.data.length){
        const div = document.createElement("div");

        div.innerHTML = `<div class="card">
        <figure class="px-10 pt-10">
          <img src="./images/icon.png" alt="icon" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">Oops!! Sorry, There is no content here</h2>
        </div>
      </div>`

        noContainer.appendChild(div);
    }

    let finalData = data.data;

    if(sort && finalData.length){
        finalData = data.data.sort(compare);
      //  console.log(finalData[0].others.views);
        
    }

    finalData?.forEach((videos) => {
    //    console.log(videos);

        const div = document.createElement("div");

        if(videos.others.posted_date && videos.authors[0].verified){
            const hour = Math.floor(videos.others.posted_date/3600);
            const min = Math.floor((videos.others.posted_date%3600)/60);
            
            div.innerHTML = `
            <div class="card bg-base-100 shadow-xl">
            <div id="clock" class="relative">
                <figure class="h-40">
                    <img src=${videos.thumbnail} alt="thumbnail" class="rounded-xl" />
                </figure>
                <div class="absolute bottom-0 right-0 bg-black text-white">
                <p>${hour} hrs ${min} mins ago</p>
                </div>
            </div>
    
            <div class="flex gap-2 mt-2">
                <div class="avatar">
                    <div class="w-12 h-fit rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src=${videos.authors[0].profile_picture}/>
                    </div>
                </div>
    
                <div>
                    <h2 class="card-title">${videos.title}</h2>
                
                    <div class="flex gap-2">
                        <p>${videos.authors[0].profile_name}</p>
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <p>${videos.others.views}</p>
                </div>
            </div>
          </div>
                
                `;
        }
        
        else if(videos.others.posted_date){
            const hour = Math.floor(videos.others.posted_date/3600);
            const min = Math.floor((videos.others.posted_date%3600)/60);
            
            div.innerHTML = `
            <div class="card bg-base-100 shadow-xl">
            <div id="clock" class="relative">
                <figure class="h-40">
                    <img src=${videos.thumbnail} alt="thumbnail" class="rounded-xl" />
                </figure>
                <div class="absolute bottom-0 right-0 bg-black text-white">
                <p>${hour} hrs ${min} mins ago</p>
                </div>
            </div>
    
            <div class="flex gap-2 mt-2">
                <div class="avatar">
                    <div class="w-12 h-fit rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src=${videos.authors[0].profile_picture}/>
                    </div>
                </div>
    
                <div>
                    <h2 class="card-title">${videos.title}</h2>
                
                    <div class="flex gap-2">
                        <p>${videos.authors[0].profile_name}</p>
                        <i class="fa-solid fa-circle-check hidden"></i>
                    </div>
                    <p>${videos.others.views}</p>
                </div>
            </div>
          </div>
                
                `;
        }
        else if(videos.authors[0].verified){
            div.innerHTML = `
            <div class="card bg-base-100 shadow-xl">
            <div id="clock" class="relative">
                <figure class="h-40">
                    <img src=${videos.thumbnail} alt="thumbnail" class="rounded-xl" />
                </figure>
                <div class="absolute bottom-0 right-0 bg-black text-white">
                <p></p>
                </div>
            </div>
    
            <div class="flex gap-2 mt-2">
                <div class="avatar">
                    <div class="w-12 h-fit rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src=${videos.authors[0].profile_picture}/>
                    </div>
                </div>
    
                <div>
                    <h2 class="card-title">${videos.title}</h2>
                
                    <div class="flex gap-2">
                        <p>${videos.authors[0].profile_name}</p>
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <p>${videos.others.views}</p>
                </div>
            </div>
          </div>
                
                `;
        }
        else{
            div.innerHTML = `
            <div class="card bg-base-100 shadow-xl">
            <div id="clock" class="relative">
                <figure class="h-40">
                    <img src=${videos.thumbnail} alt="thumbnail" class="rounded-xl" />
                </figure>
                <div class="absolute bottom-0 right-0 bg-black text-white">
                <p></p>
                </div>
            </div>
    
            <div class="flex gap-2 mt-2">
                <div class="avatar">
                    <div class="w-12 h-fit rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src=${videos.authors[0].profile_picture}/>
                    </div>
                </div>
    
                <div>
                    <h2 class="card-title">${videos.title}</h2>
                
                    <div class="flex gap-2">
                        <p>${videos.authors[0].profile_name}</p>
                        <i class="fa-solid fa-circle-check hidden"></i>
                    </div>
                    <p>${videos.others.views}</p>
                </div>
            </div>
          </div>
                
                `;
        }
        cardContainer.appendChild(div);
      });

     previousId = categoryId;
     count++;
  };
  
document.getElementById("sort_video").onclick = function() {
  //  alert("Button was clicked!");
    handleLoadVideos(previousId,1);
  };

  function compare(a, b) {

    return parseInt(b.others.views) - parseInt(a.others.views);
}
videoCategory();
handleLoadVideos("1000",0);