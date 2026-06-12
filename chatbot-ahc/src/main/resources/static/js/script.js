let caseTypes = [];

let currentPhysicalFilingData = null;

const chatBody = document.getElementById("chatBody");
// HELPERS
function scrollBottom() {
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addBotMessage(message) {
  const div = document.createElement("div");

  div.className = "bot-message";

  div.innerHTML = message;

  chatBody.appendChild(div);

  scrollBottom();
}

function addUserMessage(message) {
  const div = document.createElement("div");

  div.className = "user-message";

  div.textContent = message;

  chatBody.appendChild(div);

  scrollBottom();
}

function createButtons(options) {
  const container = document.createElement("div");

  container.className = "options";

  options.forEach((option) => {
    const btn = document.createElement("button");

    btn.className = "option-btn";

    btn.textContent = option;

    btn.addEventListener("click", () => {
      handleOption(option);
    });

    container.appendChild(btn);
  });

  chatBody.appendChild(container);

  scrollBottom();
}

function createBackButton(callback) {
  const container = document.createElement("div");

  container.className = "options";

  const btn = document.createElement("button");

  btn.className = "option-btn";

  btn.textContent = "⬅ Back";

  btn.addEventListener("click", callback);

  container.appendChild(btn);

  chatBody.appendChild(container);

  scrollBottom();
}

function generateCaseTypeDropdown(id = "caseType") {
  let html = `
        <select
            id="${id}"
            class="case-type-select"
        >
            <option value="">
                Select Case Type
            </option>
    `;

  caseTypes.forEach((type) => {
    html += `
      <option value="${type.CaseType}">
          ${type.FullForm}
      </option>
  `;
  });

  html += `
        </select>
    `;

  return html;
}
// START CHAT
async function loadCaseTypes() {
  try {
    const response = await fetch("js/caseTypes.json");

    caseTypes = await response.json();

    console.log("Loaded", caseTypes.length, "case types");
  } catch (error) {
    console.error("Error loading case types:", error);
  }
}

function startChat() {
  addBotMessage("👋 Welcome to High Court of Judicature at Allahabad");

  addBotMessage("Please select a query.");

  createButtons([
    "Case Details",
    "Case Filing Status",
    "Roster / Constitution / Arrangement / Supplementary Constitution",
  ]);
}
// OPTION HANDLER
function handleOption(option) {
  addUserMessage(option);

  if (option === "Case Details") {
    addBotMessage("Do you have case details?");

    addBotMessage("1. Case Type");
    addBotMessage("2. Case Number");
    addBotMessage("3. Case Year");

    createButtons(["Yes", "No", "Back"]);
  } else if (option === "Case Filing Status") {
    addBotMessage("Select Filing Mode.");

    createButtons(["eFiling", "Physical", "Back"]);
  } else if (option === "eFiling") {
    showDiaryNumberForm();
  } else if (option === "Physical") {
    showTokenNumberForm();
  } else if (
    option ===
    "Roster / Constitution / Arrangement / Supplementary Constitution"
  ) {
    addBotMessage("Select an option.");

    createButtons([
      "Roster",
      "Constitution",
      "Arrangement",
      "Supplementary Constitution",
      "Back",
    ]);
  } else if (
    option === "Roster" ||
    option === "Constitution" ||
    option === "Arrangement" ||
    option === "Supplementary Constitution"
  ) {
    addBotMessage("API integration pending.");

    createButtons(["Another Query"]);
  } else if (option === "Yes") {
    showYesForm();
  } else if (option === "No") {
    showNoOptions();
  } else if (option === "Back") {
    restartChat();
  } else if (option === "Another Query") {
    restartChat();
  }
}
// YES FLOW
function showYesForm() {
  addBotMessage("Please provide the following details.");

  const form = document.createElement("div");

  form.className = "dynamic-form";

  form.innerHTML = `
    ${generateCaseTypeDropdown("caseType")}

    <input
        id="caseNumber"
        placeholder="Case Number"
    >

    <input
        id="filingYear"
        placeholder="Case Year"
    >

    <button id="submitYes">
        Submit
    </button>

    <button
        id="backFromYes"
        type="button"
    >
        ⬅ Back
    </button>
`;

  chatBody.appendChild(form);

  document.getElementById("submitYes").addEventListener("click", (event) => {
    event.target.disabled = true;
    const caseNumber = document.getElementById("caseNumber").value.trim();

    const filingYear = document.getElementById("filingYear").value.trim();

    const caseTypeId = document.getElementById("caseType").value;

    const caseTypeText =
      document.getElementById("caseType").options[
        document.getElementById("caseType").selectedIndex
      ].text;

    if (!caseNumber || !filingYear || !caseTypeId) {
      addBotMessage("⚠ Please fill all fields.");

      event.target.disabled = false;

      return;
    }

    if (!/^\d{4}$/.test(filingYear)) {
      addBotMessage("⚠ Case Year must be 4 digits.");

      event.target.disabled = false;
      return;
    }

    console.log({
      caseNumber,
      filingYear,
      caseTypeId,
      caseTypeText,
    });

    const requestData = {
      caseType: parseInt(caseTypeId),
      caseNumber: parseInt(caseNumber),
      caseYear: parseInt(filingYear),
    };

    searchCase(requestData);
  });

  document.getElementById("backFromYes").addEventListener("click", () => {
    restartChat();
  });

  scrollBottom();
}
// NO FLOW
let selectedFields = [];

function showNoOptions() {
  addBotMessage("Select at least 3 search criteria.");

  const options = [
    "Case Number",
    "Case Year",
    "Case Type",
    "Petitioner Name",
    "Respondent Name",
    "Advocate Name",
    "Judge Name",
    "Court Number",
    "District",
  ];

  const container = document.createElement("div");

  container.className = "options";

  options.forEach((field) => {
    const btn = document.createElement("button");

    btn.className = "option-btn";

    btn.textContent = field;

    btn.addEventListener("click", () => {
      if (selectedFields.includes(field)) {
        selectedFields = selectedFields.filter((item) => item !== field);

        btn.classList.remove("selected");
      } else {
        selectedFields.push(field);

        btn.classList.add("selected");
      }
    });

    container.appendChild(btn);
  });

  chatBody.appendChild(container);

  const submitDiv = document.createElement("div");

  submitDiv.className = "submit-container";

  submitDiv.innerHTML = `
        <button
            class="submit-selection-btn"
            id="submitSelection"
        >
            Submit Selection
        </button>
    `;

  chatBody.appendChild(submitDiv);

  document
    .getElementById("submitSelection")
    .addEventListener("click", processSelection);

  scrollBottom();

  createBackButton(() => {
    restartChat();
  });
}
// PROCESS SELECTION
function processSelection() {
  if (selectedFields.length < 3) {
    addBotMessage("⚠ Please select at least 3 fields.");

    return;
  }

  showDynamicForm();
}
// DYNAMIC FORM
function showDynamicForm() {
  addBotMessage("Please provide the selected details.");

  const form = document.createElement("div");

  form.className = "dynamic-form";

  let html = "";

  selectedFields.forEach((field) => {
    if (field === "Case Type") {
      html += generateCaseTypeDropdown("dynamicCaseType");
    } else {
      html += `
        <input
            placeholder="${field}"
            name="${field}"
        >
    `;
    }
  });

  html += `
    <button id="submitDetails">
        Submit Details
    </button>

    <button
        type="button"
        id="backDynamic"
    >
        ⬅ Back
    </button>
`;
  form.innerHTML = html;

  chatBody.appendChild(form);

  document.getElementById("submitDetails").addEventListener("click", () => {
    const requestData = {};
    selectedFields.forEach((field) => {
      if (field === "Case Type") {
        requestData.caseType = document.getElementById("dynamicCaseType").value;
      } else {
        const input = document.querySelector(`input[name="${field}"]`);

        const value = input.value.trim();

        switch (field) {
          case "Case Number":
            requestData.caseNumber = value;
            break;

          case "Case Year":
            requestData.filingYear = value;
            break;

          case "Petitioner Name":
            requestData.petitionerName = value;
            break;

          case "Respondent Name":
            requestData.respondentName = value;
            break;

          case "Advocate Name":
            requestData.advocateName = value;
            break;

          case "Judge Name":
            requestData.judgeName = value;
            break;

          case "Court Number":
            requestData.courtNumber = value;
            break;

          case "District":
            requestData.district = value;
            break;
        }
      }
    });

    searchCase(requestData);
  });

  document.getElementById("backDynamic").addEventListener("click", () => {
    restartChat();
  });

  scrollBottom();
}

function showDiaryNumberForm() {
  addBotMessage("Enter Diary Number.");

  const form = document.createElement("div");

  form.className = "dynamic-form";

  form.innerHTML = `
    <input
      id="diaryNumber"
      placeholder="Diary Number"
    >

    <button id="submitDiary">
      Submit
    </button>

    <button id="backDiary">
      ⬅ Back
    </button>
  `;

  chatBody.appendChild(form);

  document.getElementById("submitDiary").addEventListener("click", () => {
    addBotMessage("API integration pending.");
  });

  document.getElementById("backDiary").addEventListener("click", restartChat);

  scrollBottom();
}

function showTokenNumberForm() {
  addBotMessage("Enter Token Number.");

  const form = document.createElement("div");

  form.className = "dynamic-form";

  form.innerHTML = `
    <input
      id="tokenNumber"
      placeholder="Example: 12558852026"
    >

    <button id="submitToken">
      Submit
    </button>

    <button id="backToken">
      ⬅ Back
    </button>
  `;

  chatBody.appendChild(form);

  document.getElementById("submitToken").addEventListener("click", async () => {
    const tokenNumber = document.getElementById("tokenNumber").value.trim();

    if (!tokenNumber) {
      addBotMessage("⚠ Please enter Token Number.");

      return;
    }

    try {
      addBotMessage("🔍 Searching filing status...");

      const response = await fetch(
        "http://localhost:8080/api/physical-filing-status",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            tokenNumber: tokenNumber,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Server Error");
      }

      const data = await response.json();

      currentPhysicalFilingData = data;

      const filing = data.filingDetails;

      const defects = data.defects || [];

      const defect = defects.length > 0 ? defects[0] : null;

      addBotMessage(`

            <div class="filing-status-container">

              <div class="filing-header">

                <div class="status-chip">

                  ${
                    filing.DisplayCaseNumber
                      ? "🟢 REGISTERED"
                      : "🟠 UNDER PROCESS"
                  }

                </div>

                <br>

                <h3>
                  📄 Filing Status
                </h3>

                <div class="case-number">

                  ${filing.DisplayCaseNumber || "Not Registered Yet"}

                </div>

                <br>

                <div>

                  👤
                  ${filing.PetitionerName}

                </div>

                <br>

                <div>

                  🏛
                  ${filing.RespondentName}

                </div>

              </div>

              <br>

              <h4>
                🚇 Case Journey
              </h4>

              <div class="timeline">

                <div class="timeline-item">

                  <span class="dot green-dot"></span>

                  <div>

                    <strong>
                      Filing Submitted
                    </strong>

                    <br>

                    ${filing.CreatedDT}

                  </div>

                </div>

                ${
                  defect
                    ? `
                  <div class="timeline-item">

                    <span class="dot orange-dot"></span>

                    <div>

                      <strong>
                        Defect Raised
                      </strong>

                      <br>

                      ${defect.DefectRaiseDate}

                    </div>

                  </div>

                  <div class="timeline-item">

                    <span class="dot green-dot"></span>

                    <div>

                      <strong>
                        Defect Cleared
                      </strong>

                      <br>

                      ${defect.DefectRemovalDate}

                    </div>

                  </div>
                  `
                    : ""
                }

                ${
                  filing.DisplayCaseNumber
                    ? `
                  <div class="timeline-item">

                    <span class="dot blue-dot"></span>

                    <div>

                      <strong>
                        Case Registered
                      </strong>

                      <br>

                      ${filing.DisplayCaseNumber}

                    </div>

                  </div>
                  `
                    : ""
                }

              </div>

              <br>

              <div class="quick-insights">

                <h4>
                  📊 Quick Insights
                </h4>

                <br>

                🎟 Token Number :
                ${filing.TokenNumber}

                <br><br>

                📂 File Number :
                ${filing.FileNumber}

                <br><br>

                ⚠ Defects Found :
                ${defects.length}

                <br><br>

                👥 Total Parties :
                ${
                  parseInt(filing.TotalPetitioner || 0) +
                  parseInt(filing.TotalRespondent || 0)
                }

              </div>

              ${
                defect
                  ? `
                <br>

                <div class="remark-box">

                  <strong>

                    💬 Defect Remark

                  </strong>

                  <br><br>

                  ${defect.Remark || "No Remarks"}

                </div>
                `
                  : ""
              }

              <br>

              <button
                class="option-btn"
                onclick="
                  openFilingViewMore(
                    '${filing.TokenNumber}'
                  )
                "
              >
                📋 View Complete Filing Details
              </button>

              <button
                class="option-btn"
                onclick="
                  restartChat()
                "
              >
                Another Query
              </button>

            </div>

          `);
    } catch (error) {
      console.error(error);

      addBotMessage("❌ Unable to fetch filing status.");
    }
  });

  document.getElementById("backToken").addEventListener("click", restartChat);

  scrollBottom();
}

function openFilingViewMore(
    tokenNumber
) {

    window.open(
        "filing-view-more.html?tokenNumber="
        + tokenNumber,
        "_blank"
    );
}

// API
async function searchCase(requestData) {
  try {
    const loader = document.createElement("div");

    loader.className = "bot-message";

    loader.id = "searchLoader";

    loader.innerHTML = `
    <div>
        🔍 Searching case details
    </div>

    <div class="typing-loader">

        <span></span>

        <span></span>

        <span></span>

    </div>
`;

    chatBody.appendChild(loader);

    scrollBottom();

    const response = await fetch("http://localhost:8080/api/case-details", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Server Error");
    }

    const data = await response.json();

    document.getElementById("searchLoader")?.remove();

    showResponse(data);
  } catch (error) {
    console.error(error);

    document.getElementById("searchLoader")?.remove();

    addBotMessage("❌ Unable to fetch case details.");
  }
}

function showResponse(data) {
  if (data.caseId == 0 || data.caseNumber === "NOT FOUND" || !data.caseNumber) {
    addBotMessage(`
            ❌ No case found for the entered
            Case Type, Case Number and Case Year.
        `);

    return;
  }

  addBotMessage(`
        <strong>✅ Case Found</strong>

        <br><br>

        <strong>Case Number:</strong>
        ${data.caseNumber}

        <br><br>

        <strong>Party Name:</strong>
        ${data.partyName}

        <br><br>

        <strong>Status:</strong>
        ${data.status}

        <br><br>

        <button
            class="option-btn"
            onclick="openViewMore(${data.caseId})"
        >
            View More
        </button>

        <button
            class="option-btn"
            onclick="restartChat()"
        >
            Back
        </button>
    `);
}
function openViewMore(caseId) {
  window.location.href = "view-more.html?caseId=" + caseId;
}

// RESTART
function restartChat() {
  selectedFields = [];

  chatBody.innerHTML = "";

  startChat();
}
// INIT
loadCaseTypes().then(() => {
  startChat();
});

const chatLauncher = document.getElementById("chatLauncher");

const chatWidget = document.getElementById("chatWidget");

const maximizeBtn = document.getElementById("maximizeBtn");

const closeBtn = document.getElementById("closeBtn");

chatLauncher.addEventListener("click", () => {
  chatWidget.style.display = "block";

  chatLauncher.style.display = "none";
});

closeBtn.addEventListener("click", () => {
  chatWidget.style.display = "none";

  chatLauncher.style.display = "block";
});

maximizeBtn.addEventListener("click", () => {
  chatWidget.classList.toggle("maximized");
});
