
const usersList = [];
const callAPI = async () => {
    const data = await fetch('https://randomuser.me/api/?results=10&nat=ua');
    handleErrors(data);

    const { results: users } = await data.json();

    return users;
};

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

async function getUsers() {
    try {
        const users = await callAPI();
        usersList.push(...users);
        renderUsers(usersList);
    } catch (e) {
        console.log(e);
    }
}

const mainContainer = document.querySelectorAll('.main__content')[0];

const renderUsers = (usersList) => {
    let usersListContainer = document.createElement('div');
    usersListContainer.classList.add('users');

    let users = usersList.map((user) => createUser(user)).join("");
    usersListContainer.innerHTML = users;
    mainContainer.appendChild(usersListContainer);
}

const createUser = (user) => {
    // let user = 
    console.log(user)
    return `
        <div class="users__item">
            <div class="user">
                <div class="user-block">
                    <div class="user-poster">
                        <img src="${user.picture.medium}" alt="${user.name.first + ' ' + user.name.last}">
                    </div>

                    <div class="user-headings">
                        <h5>Hey, my name is <strong>${user.name.first + ' ' + user.name.last}</strong></h5>
                        <h6>I am ${user.dob.age} years old</h6>
                    </div>

                    <div class="user-description">
                        <p>${user.location.country + ', ' + user.location.city}</p>
                        <p>
                            <a href="mailto:${user.email}">${user.email}</a>
                        </p>
                        <p>
                            <a href="tel:${user.phone}">${user.phone}</a>
                        </p>
                    </div>

                    <div class="user-button">
                        <a href="more">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}


// //init
getUsers();