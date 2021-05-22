const searchBar = document.querySelector('#searchBar');
const searchResultsDiv = document.querySelector('#searchResults');

searchBar.addEventListener('submit', (event) => {
  event.preventDefault();
  searchResultsDiv.innerHTML = '';
  let searchPhrase = searchBar.elements.searchPhrase.value;
  makeHttpRequest(searchPhrase);
});

const makeHttpRequest = async (searchPhrase) => {
  const response = await axios.get(
    `http://api.tvmaze.com/search/shows?q=${searchPhrase}`
  );
  showResults(response.data);
};

const showResults = (searchResults) => {
  console.log(searchResults);
  searchResults.forEach((searchResult) => {
    if (searchResult.show.image) {
      let card = createCard();
      let cardImage = createImage(searchResult.show.image.medium);
      card.append(cardImage);
      let cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      let cardTitle = createCardTitle(searchResult.show.name);
      cardBody.append(cardTitle);
      let cardDesc = createCardDesc(
        searchResult.show.rating.average,
        searchResult.show.runtime
      );
      cardBody.append(cardDesc);
      let redirect = createRedirectLink(searchResult.show.url);
      cardBody.append(redirect);
      card.append(cardBody);
      searchResultsDiv.append(card);
    }
  });
};

const createCard = () => {
  const card = document.createElement('div');
  card.classList.add('card', 'm-1');
  card.style.width = '212px';
  return card;
};

const createImage = (imageURL) => {
  const image = document.createElement('img');
  image.classList.add('card-img-top');
  image.src = imageURL;
  image.style.height = '295px';
  image.style.width = '210px';
  return image;
};

const createCardTitle = (title) => {
  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.innerText = title;
  return cardTitle;
};

const createCardDesc = (rating, runtime) => {
  const cardDesc = document.createElement('p');
  cardDesc.classList.add('card-text');
  cardDesc.innerHTML = `<p><b>rating</b>: ${rating}</p><p><b>runtime</b>: ${runtime} mins</p>`;
  return cardDesc;
};

const createRedirectLink = (url) => {
  let redirect = document.createElement('a');
  redirect.href = url;
  redirect.classList.add('card-link');
  redirect.innerHTML = 'view';
  return redirect;
};
