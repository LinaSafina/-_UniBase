const URL = 'https://jsonplaceholder.typicode.com/posts';

const tBody = document.querySelector('.post-list');
const mainContent = document.querySelector('main');

getData();

async function getData() {
  try {
    const response = await fetch(URL);
    const dataArr = await response.json();

    dataArr.forEach((post) => {
      const tr = document.createElement('tr');
      const userId = document.createElement('td');
      const postId = document.createElement('td');
      const title = document.createElement('td');
      const postBody = document.createElement('td');

      userId.textContent = post.userId;
      postId.textContent = post.id;
      title.textContent = post.title;
      postBody.textContent = post.body;

      tr.append(userId, postId, title, postBody);
      console.log(tr);
      tBody.append(tr);
    });
  } catch (e) {
    const h2 = document.createElement('h2');
    h2.append(e.message);
    mainContent.append(h2);
  }
}
