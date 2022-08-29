const URL = 'https://jsonplaceholder.typicode.com/posts';

const table = document.querySelector('table');
const tBody = table.tBodies[0];
const searchInput = document.querySelector('input');

drawTable();

async function drawTable() {
  await getData();
  toogleColumnSorting();
  tableSearch();
}

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
      tBody.append(tr);
    });
  } catch (e) {
    const h2 = document.createElement('h2');
    h2.append(e.message);
    mainContent.append(h2);
  }
}

function toogleColumnSorting() {
  const rows = Array.from(tBody.rows);
  const allTh = table.tHead.rows[0].cells;

  for (const th of allTh) {
    const index = th.cellIndex;
    let sorted = false;

    th.addEventListener('click', () => {
      rows.sort((tr1, tr2) => {
        const tr1TextContent = tr1.cells[index].textContent;
        const tr2TextContent = tr2.cells[index].textContent;

        if (index === 0 || index === 1) {
          return sorted
            ? tr1TextContent - tr2TextContent
            : tr2TextContent - tr1TextContent;
        }

        return sorted
          ? tr1TextContent.localeCompare(tr2TextContent)
          : tr2TextContent.localeCompare(tr1TextContent);
      });
      sorted = !sorted;
      tBody.append(...rows);
    });
  }
}

function tableSearch() {
  const rows = Array.from(tBody.rows);

  searchInput.addEventListener('input', (event) => {
    const enteredData = event.target.value.trim().toLowerCase();

    if (enteredData.length < 3) {
      rows.forEach((row) => (row.style.display = 'grid'));
      return;
    }

    rows.forEach((row) => {
      const cells = Array.from(row.cells);

      const isDisplayed = cells.some((cell) => {
        const innerText = cell.textContent;

        return innerText.toLowerCase().includes(enteredData);
      });

      row.style.display = isDisplayed ? 'grid' : 'none';
    });

    tBody.append(...rows);
  });
}
