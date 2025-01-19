document.addEventListener("DOMContentLoaded", () => {
  const tableView = document.getElementById("tableview");
  const verticalView = document.getElementById("verticalview");
  const panelView = document.getElementById("panelview");

  // Define featureImages to avoid ReferenceError
  const featureImages = {
    "Royal Family": "img/royal-bg.png",
    "Common": "img/common-bg.png",
    "Water": "img/water-bg.png",
    "Hot": "img/hot-bg.png",
    "Default": "img/default-bg.png",
  };

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
    const maxBsl = 4; // 最大BSLレベル
    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>キャラ / 名称</th>
          <th>分類 / タイプ</th>
          <th>特徴</th>
          <th>キーワード</th>
        </tr>
      </thead>
      <tbody>
      ${chara
        .map(
          (c) => {
            const yellowStars = "★".repeat(c.bsl || 0); // 黄色い星
            const grayStars = "☆".repeat(maxBsl - (c.bsl || 0)); // 灰色の星

            return `
        <tr id="chara${c.id}">
          <td>${c.id}</td>
          <td>
            <div>
            <div>${c.img}</div>
              <p><strong>キャラ名:</strong> ${c.name}</p>
              <p><strong>和名:</strong> ${c.scientificNameJa}</p>
              <p><strong>学名:</strong> ${c.scientificNameEn}</p>            
            </div>
          </td>

          <td>
            <p><strong>Type:</strong> ${c.type}</p>
            <p><strong>Phylum:</strong> ${c.taxonomy.phylum}</p>
            <p><strong>Class:</strong> ${c.taxonomy.class}</p>
            <p><strong>Order:</strong> ${c.taxonomy.order}</p>
            <p><strong>Family:</strong> ${c.taxonomy.family}</p>
          </td>
          <td>
            <p><strong>細菌学的特徴:</strong> ${c.bacterialFeatures[0]}</p>
            <p><strong>臨床的特徴:</strong> ${c.clinicalFeatures[0]}</p>
            <p><strong>感染症法:</strong> ${c.law}</p>
            <p><strong>BSL:</strong> <span class="stars">${yellowStars}${grayStars}</span></p>
            <p><strong>その他:</strong> ${c.additionalInfo[0]}</p>
            <p><strong>LPSN:</strong> ${c.lpsn}</p>
          </td>
          <td>${c.quiztag}</td>
        </tr>
      `;
          }
        )
        .join("")}
      </tbody>
    `;
    tableView.innerHTML = "";
    createFilterInput(); // フィルター入力欄を作成
    tableView.appendChild(table);
  };

  const createVerticalView = () => {
    const maxBsl = 4; // 最大BSLレベル
    verticalView.innerHTML = chara
      .map(
        (c) => {
          const yellowStars = "★".repeat(c.bsl || 0); // 黄色い星
          const grayStars = "☆".repeat(maxBsl - (c.bsl || 0)); // 灰色の星

          return `
          <div class="character" id="chara${c.id}">
            <div class="character-container">
              <div class="character-image">
                ${c.img}
                <h2>${c.name}</h2>
              </div>
              <div class="character-details">
                <h2><ruby>${c.scientificNameEn}<rt>${c.scientificNameEnRubi}</rt></ruby></h2>
                <p><strong>和名:</strong> ${c.scientificNameJa}</p>
                <p><strong>臨床的分類:</strong> ${c.type}</p>
                <table>
                <caption style="text-align:left;"><strong>タキソノミー</strong></caption>
                <tr><th>Phylum</th><th>Class</th><th>Order</th><th>Family</th></tr>
                <tr><td>${c.taxonomy.phylum}</td><td>${c.taxonomy.class}</td><td>${c.taxonomy.order}</td><td>${c.taxonomy.family}</td></tr>
                </table>
                <p><strong>細菌学的特徴:</strong> <span>${c.bacterialFeatures[0]}</span>${c.bacterialFeatures.length > 1 ? ` <br><button class="toggle-details" data-type="bacterialFeatures">もっと詳しく</button>` : ""}</p>
                <p><strong>臨床的特徴:</strong> <span>${c.clinicalFeatures[0]}</span>${c.clinicalFeatures.length > 1 ? ` <br><button class="toggle-details" data-type="clinicalFeatures">もっと詳しく</button>` : ""}</p>
                <p><strong>その他:</strong> <span>${c.additionalInfo[0]}</span>${c.additionalInfo.length > 1 ? ` <br><button class="toggle-details" data-type="additionalInfo">もっと詳しく</button>` : ""}</p>
              </div>
            </div>
          </div>
        `;
        }
      )
      .join("");

    // Add event listeners for toggle details
    verticalView.querySelectorAll(".toggle-details, .close-details").forEach((button) => {
      button.addEventListener("click", () => {
        const type = button.dataset.type;
        const parent = button.parentElement;
        const index = [...verticalView.querySelectorAll(".character")].indexOf(parent.closest(".character"));
        const details = chara[index][type];

        if (button.classList.contains("toggle-details")) {
          parent.querySelector("span").innerHTML = details.join("<br>");
          button.textContent = "閉じる";
          button.classList.remove("toggle-details");
          button.classList.add("close-details");
        } else {
          parent.querySelector("span").innerHTML = details[0];
          button.textContent = "もっと詳しく";
          button.classList.remove("close-details");
          button.classList.add("toggle-details");
        }
      });
    });
  };
  
  const createPanelView = () => {
    panelView.innerHTML = chara
      .map(
        (c) => `
        <div 
          class="panel-character" 
          id="chara${c.id}" 
          data-tooltip="特徴: ${c.bacterialFeatures}&#10;臨床: ${c.clinicalFeatures}&#10;感染症法: ${c.law || "情報なし"}"
          style="background-image: url('${featureImages[c.feature] || featureImages.Default}');" 
          ${c.card ? `onclick="window.open('${c.card}', '_blank')"` : ""}
        >
          <div class="panel-header">Baikins No. ${c.id}</div>
          <div class="panel-image">${c.img}</div>
          <div class="panel-name">${c.name}</div>
        </div>
      `
      )
      .join("");
  };

  const views = ["tableview", "verticalview", "panelview", "howtouse","aboutBaikins","taxonomy","relatedpage"];
  const viewSelect = document.getElementById("view-select");

  // Function to switch views
  const switchView = (selectedView) => {
    views.forEach((view) => {
      document.getElementById(view).style.display = view === selectedView ? "block" : "none";
    });
  };

  // Event listener for dropdown selection change
  viewSelect.addEventListener("change", (e) => {
    switchView(e.target.value);
  });

  // Initialize views (default to Table View)
  switchView("tableview");
  createTableView();
  createVerticalView();
  createPanelView();
});
