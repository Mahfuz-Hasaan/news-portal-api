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
  newsDatas.forEach((newsData) => {
    console.log(newsData.title);
  });
};

// loadNewsCatagiories()
