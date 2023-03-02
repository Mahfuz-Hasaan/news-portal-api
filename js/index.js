const loadNewsCatagiories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  showNewsCatagories(data.data.news_category);
};

const showNewsCatagories = (newsDatas) => {
  const newsTopicContainer = document.getElementById("news-topic-container");

  newsDatas.forEach((newsData) => {
    const newsTopic = document.createElement("div");
    newsTopic.innerHTML = `
            <button class="btn btn-ghost" id="btn-ghost"onclick="showNewsDetails('${newsData.category_id}','${newsData.category_name}')">${newsData.category_name}</button>
        `;
    newsTopicContainer.appendChild(newsTopic);
  });
};

const showNewsDetails = async (category_id, category_name) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  const res = await fetch(url);
  const data = await res.json();
  showNews(data.data, category_name);
};

const showNews = (newsDatas, category_name) => {
  document.getElementById('alert-msg').innerText = `${newsDatas.length} items to show for ${category_name}`;

  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
  newsDatas.forEach((newsData) => {
    const childOfCard = document.createElement('div');
    childOfCard.innerHTML = `
    <div class="card card-side bg-lime-50 shadow-xl  my-4">
    <figure class="rounded-md"><img src="${newsData.thumbnail_url}" class="p-5 card-img"/></figure>
    <div class="card-body">
      <h2 class="card-title text-2xl font-bold pb-2">${newsData.title}</h2>
      <p>${newsData.details.slice(0,300)}................</p>

      <div class="footer-part-of-news-details flex justify-between items-center">
        <div class="flex gap-x-4 items-center">
            <div class="writer-img"><img class="h-10 w-10 rounded-full rounded-full" src="${newsData.author.img}"alt=""></div>
            <div class="name-date">
                <p>${newsData.author.name}</p>
                <p>jan 10,2022</p>
            </div>
        </div>
        <div class="viwer flex gap-x-3">
            <div class="view"><i class="fa-solid fa-eye"></i></div>
            <div class="viewer">${newsData.total_view}</div>
        </div>
        <div class="stars">
            <i class="fa-solid fa-star-half-stroke"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
        </div>
        <div class="card-actions justify-end" id="arrow-sign" onclick="loadFullNews('${newsData._id}')">
        <label for="my-modal-5" class="btn"><i class="fa-solid fa-arrow-right"></i></label> 
        </div>
    </div>
    </div>
  </div>
    `;
    cardContainer.appendChild(childOfCard);
  });
};


const loadFullNews = async(newsDataID) => {
  const url = `https://openapi.programming-hero.com/api/news/${newsDataID}`;
  const res = await(fetch(url));
  const data = await res.json();
  showFullNews(data.data[0]);
}

const showFullNews = fullNewsData =>{
  console.log(fullNewsData.details);
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
      <img src="${fullNewsData.image_url}">
      <h2 class="card-title text-2xl font-bold pb-2">${fullNewsData.title}</h2>
      <p>${fullNewsData.details}</p>
      <div class="modal-action">
      <label for="my-modal-5" class="btn">Yay!</label>
      </div>
  
  `;
  
}
// loadNewsCatagiories()
