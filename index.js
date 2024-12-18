// STATE
const state = {
  allUsers: []
}

// QUERY SELECTORS
const main = document.querySelector('main');

// FUNCTIONS
const getUsers = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  state.allUsers = users;
  renderUsers();
}

const renderUsers = () => {
  const userLIs = state.allUsers.map((user) => {
    return `<li>${user.name}</li>`;
  });

  main.innerHTML = `
    <ol>
      ${userLIs.join('<br />')}
    </ol>
  `;

  const ol = document.querySelector('ol');
  ol.addEventListener('click', (event) => {
    if(event.target.tagName === 'LI') {
      renderSingleUser(event.target.innerText);
    }
  });
}

const renderSingleUser = (clickedUsersName) => {
  const foundUser = state.allUsers.find((user) => {
    return user.name === clickedUsersName;
  });

  const detailPageHTML = `
    <h2>${clickedUsersName}</h2>
    <h3>${foundUser.username}</h3>
    <h4>${foundUser.email}</h4>

    <button>Back</button>
  `;

  main.innerHTML = detailPageHTML;

  const button = document.querySelector('button');
  button.addEventListener('click', () => {
    renderUsers();
  });
}

getUsers();