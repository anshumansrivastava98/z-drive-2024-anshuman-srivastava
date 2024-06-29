fetchData();

let tableData = [];
let currentPage = 1;
let rowsPerPageOptions = [5, 10, 20, 50];
let rowsPerPage = rowsPerPageOptions[0];

function fetchData() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      formatData(response);
    });
}

function formatData(data) {
  data.map((element) => {
    const newRow = {};
    Object.keys(element).forEach((item) => {
      if (item === "name") {
        newRow["name"] = element["name"]["common"];
      } else if (item === "population") {
        newRow["population"] = element["population"];
      } else if (item === "region") {
        newRow["region"] = element["region"];
      } else if (item === "startOfWeek") {
        newRow["startOfWeek"] = element["startOfWeek"];
      } else if (item === "unMember") {
        newRow["unMember"] = element["unMember"];
      } else if (item === "subregion") {
        newRow["subregion"] = element["subregion"];
      }
    });
    tableData.push(newRow);
  });
  console.log(tableData);
  renderTable();
}

function renderTable() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  paginateData(tableData, currentPage, rowsPerPage).forEach((row) => {
    const rowElement = document.createElement("tr");
    Object.values(row).forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      rowElement.appendChild(cell);
    });
    tableBody.appendChild(rowElement);
  });
  updatePage();
}

function paginateData(data, page, rowToDisplay) {
  const startIndex = page - 1 + rowToDisplay;
  return data.slice(startIndex, startIndex + rowToDisplay);
}

function updatePage() {
  const pageNumbers = document.getElementById("page-numbers");
  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");

  const totalPages = tableData.length;
  pageNumbers.innerHTML = "";

  const startPage = Math.max(1, currentPage - 5);
  const endPage = Math.min(totalPages, currentPage + 5);

  for (let i = startPage; i < endPage; i++) {
    const pageNumber = document.createElement("button");
    pageNumber.textContent = i;

    if (i == currentPage) {
      pageNumber.disabled = true;
    } else {
      pageNumber.addEventListener("click", () => {
        goToPage(i);
      });
    }
    pageNumbers.appendChild(pageNumber);
  }

  prevButton.disabled = currentPage == 1;
  nextButton.disabled = currentPage == totalPages;

  prevButton.addEventListener("click", () => {
    goToPage(currentPage - 1);
  });
  nextButton.addEventListener("click", () => {
    goToPage(currentPage + 1);
  });
}

function goToPage(page) {
  currentPage = page;
  renderTable();
}
