const title = document.querySelector('.title h2');
const result = document.querySelector('.result');

const fetchData = async () => {
  try {
    const { data } = await axios.get('/api/survey');
    const response = data
      .map((vote) => {
        const { id, room, votes } = vote;
        return `<li>
        <div class='key'>${room.toUpperCase().substring(0, 2)}</div>
        <div>
        <h4>${room}</h4>
        <p class='vote-${id}' data-votes='${votes}'>${votes} votes</p>
        </div>
        <button data-id='${id}'>
        <i class='fas fa-vote-yea'></i>
        </button>
      </li>`;
      })
      .join('');
    result.innerHTML = response;
  } catch (error) {
    result.innerHTML = `<h2>There was an error</h2>`;
  }
};

window.addEventListener('load', () => {
  fetchData();
});
