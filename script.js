document.addEventListener("DOMContentLoaded", () => {
  const tableView = document.getElementById("tableview");
  const verticalView = document.getElementById("verticalview");
  const toggleButton = document.getElementById("view-toggle");

// フィルター入力欄を作成
const createFilterInput = () => {
  const filterContainer = document.createElement("div");
  filterContainer.className = "filter-container";

  const filterInput = document.createElement("input");
  filterInput.type = "text";
  filterInput.placeholder = "フィルター: 任意の文字を入力";
  filterInput.id = "filter-input";

  // フィルタリング機能
  filterInput.addEventListener("input", () => {
    const filterValue = filterInput.value.toLowerCase();
    const rows = document.querySelectorAll("#tableview tbody tr");
    rows.forEach((row) => {
      const rowText = row.textContent.toLowerCase();
      row.style.display = rowText.includes(filterValue) ? "" : "none";
    });
  });

  filterContainer.appendChild(filterInput);
  tableView.prepend(filterContainer); // テーブルの上にフィルターを挿入
};

// テーブルビューを作成
const createTableView = () => {
  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>キャラ名 / 学名</th>
        <th>画像</th>
        <th>分類 / タイプ</th>
        <th>特徴</th>
      </tr>
    </thead>
    <tbody>
    ${chara
      .map(
        (c) => `
      <tr id="chara${c.id}">
        <td>${c.id}</td>
        <td>
          <div>
            <p><strong>キャラ名:</strong> ${c.name}</p>
            <p><strong>和名:</strong> ${c.scientificNameJa}</p>
            <p><strong>学名:</strong> ${c.scientificNameEn}</p>
          </div>
        </td>
        <td>${c.img}</td>
        <td>
          <p><strong>Type:</strong> ${c.type}</p>
          <p><strong>Phylum:</strong> ${c.taxonomy.phylum}</p>
          <p><strong>Class:</strong> ${c.taxonomy.class}</p>
          <p><strong>Order:</strong> ${c.taxonomy.order}</p>
          <p><strong>Family:</strong> ${c.taxonomy.family}</p>
        </td>
        <td>
          <p><strong>細菌学的特徴:</strong> ${c.bacterialFeatures}</p>
          <p><strong>臨床的特徴:</strong> ${c.clinicalFeatures}</p>
          <p><strong>その他:</strong> ${c.additionalInfo}</p>
          <p><strong>LPSN:</strong> ${c.lpsn}</p>
        </td>
      </tr>
    `
      )
      .join("")}
    </tbody>
  `;
  tableView.innerHTML = "";
  createFilterInput(); // フィルター入力欄を作成
  tableView.appendChild(table);
};

  const createVerticalView = () => {
    verticalView.innerHTML = chara
      .map(
        (c) => `
        <div class="character" id="chara${c.id}">
          <div class="character-container">
            <div class="character-image">
              ${c.img}
              <h2>${c.name}</h2>
            </div>
            <div class="character-details">
              <h2>${c.scientificNameEn}</h2>
              <p><strong>和名:</strong> ${c.scientificNameJa}</p>
              <p><strong>分類:</strong></p>
              <p>Type: ${c.type}</p>
              <p>Phylum: ${c.taxonomy.phylum}</p>
              <p>Class: ${c.taxonomy.class}</p>
              <p>Order: ${c.taxonomy.order}</p>
              <p>Family: ${c.taxonomy.family}</p>
              <p><strong>細菌学的特徴:</strong> ${c.bacterialFeatures}</p>
              <p><strong>臨床的特徴:</strong> ${c.clinicalFeatures}</p>
              <p><strong>その他:</strong> ${c.additionalInfo}</p>
              <p><strong>LPSN:</strong> ${c.lpsn}</p>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }; 

  toggleButton.addEventListener("click", () => {
    if (tableView.style.display === "none") {
      tableView.style.display = "block";
      verticalView.style.display = "none";
      toggleButton.textContent = "切り替え: Vertical View";
    } else {
      tableView.style.display = "none";
      verticalView.style.display = "block";
      toggleButton.textContent = "切り替え: Table View";
    }
  });

  // Initialize views
  createTableView();
  createVerticalView();
});
