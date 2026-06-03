let caseTypes = [];
let currentScreen = "main";

const chatBody = document.getElementById("chatBody");
const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");

// HELPERS
  themeBtn.textContent = isDark ? "☀️" : "🌙";

  localStorage.setItem("theme", isDark ? "dark" : "light");
});

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
// START CHAT
            id="${id}"
            class="case-type-select"
        >
            <option value="">
                Select Case Type
            </option>
    `;

  caseTypes.forEach((type) => {
    html += `
            <option value="${type.value}">
                ${type.text}
            </option>
        `;
  });

  html += `
        </select>
    `;

  return html;
}

async function loadCaseTypes() {
  try {
    const response = await fetch("caseTypes.json");

    caseTypes = await response.json();

    console.log("Loaded", caseTypes.length, "case types");
  } catch (error) {
    console.error("Error loading case types:", error);
  }
}

function startChat() {
  addBotMessage("👋 Welcome to Allahabad High Court");

  addBotMessage("Please select a query.");

  createButtons(["Case Details"]);
}

function handleOption(option) {
  addUserMessage(option);

  if (option === "Case Details") {
    currentScreen = "caseDetails";

    addBotMessage("Do you have case details?");

    addBotMessage("1. Case Type");
    addBotMessage("2. Case Number");
    addBotMessage("3. Case Year");

    createButtons(["Yes", "No", "Back"]);
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

// NO FLOW
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

    displayResult();
  });

  document
  .getElementById("backFromYes")
  .addEventListener("click", () => {
    restartChat();
  });

  scrollBottom();
}

let selectedFields = [];

function showNoOptions() {
  addBotMessage("Select at least 3 search criteria.");

  const options = [
    "Case Number",
    "Case Year",
    "Case Type",
    "Petitioner Name",
    "Respondent Name",
// PROCESS SELECTION
    "Advocate Name",
    "Judge Name",
    "Court Number",
    "District",
  ];

  const container = document.createElement("div");

// DYNAMIC FORM
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

function processSelection() {
  if (selectedFields.length < 3) {
    addBotMessage("⚠ Please select at least 3 fields.");

    return;
  }

  showDynamicForm();
}

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
// RESULT
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
    displayResult();
  });

  document
  .getElementById("backDynamic")
  .addEventListener("click", () => {
// API
    restartChat();
  });

  scrollBottom();
}

function displayResult() {
  addBotMessage("🔍 Searching case details...");

  setTimeout(() => {
    addBotMessage(`
            <strong>
            ✅ Case Found
            </strong>

            <br><br>

            Case Number:
            123/2025

            <br>

            Petitioner:
            ABC

            <br>

            Respondent:
            XYZ

            <br>

            Status:
            Pending

            <br>

            Next Hearing:
            20-Jul-2026
        `);

    createButtons(["Another Query"]);
  }, 1500);
}

function restartChat() {
  selectedFields = [];

  chatBody.innerHTML = "";

// RESTART
  startChat();
}

loadCaseTypes().then(() => {
  startChat();
});
