const params =
    new URLSearchParams(
        window.location.search
    );

const tokenNumber =
    params.get(
        "tokenNumber"
    );

loadFilingDetails();

async function loadFilingDetails() {

    try {

        const response =
            await fetch(
                "http://localhost:8080/api/physical-filing-status",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        tokenNumber:
                            tokenNumber
                    })
                }
            );

        if (!response.ok) {

            throw new Error(
                "Server Error"
            );
        }

        const data =
            await response.json();

        console.log(data);

        const filing =
            data.filingDetails;

        document.getElementById(
    "printDate"
).textContent =
    new Date()
    .toLocaleString();

        const defects =
            data.defects || [];

            const defect =
    defects.length > 0
        ? defects[0]
        : null;

        /* AMAZON TRACKER */

document.getElementById(
    "timelineContainer"
).innerHTML = `

<div class="amazon-tracker">

    <div class="tracker-wrapper">

        <div class="tracker-step completed">

            <div class="tracker-dot">
                ✓
            </div>

            <div class="tracker-text">

                <strong>
                    Filing Submitted
                </strong>

                <span>
                    ${filing.CreatedDT}
                </span>

            </div>

        </div>

        <div class="tracker-line"></div>

        ${
            defect
            ?
            `
            <div class="tracker-step completed">

                <div class="tracker-dot">
                    ✓
                </div>

                <div class="tracker-text">

                    <strong>
                        Defect Raised
                    </strong>

                    <span>
                        ${defect.DefectRaiseDate}
                    </span>

                </div>

            </div>

            <div class="tracker-line"></div>

            <div class="tracker-step completed">

                <div class="tracker-dot">
                    ✓
                </div>

                <div class="tracker-text">

                    <strong>
                        Defect Cleared
                    </strong>

                    <span>
                        ${defect.DefectRemovalDate}
                    </span>

                </div>

            </div>

            <div class="tracker-line"></div>
            `
            :
            ""
        }

        <div class="tracker-step completed">

            <div class="tracker-dot">
                ✓
            </div>

            <div class="tracker-text">

                <strong>
                    Registered
                </strong>

                <span>
                    ${filing.DisplayCaseNumber}
                </span>

            </div>

        </div>

    </div>

</div>

`;

document.getElementById(
    "loadingContainer"
).style.display = "none";

/* SUMMARY CARDS */

document.getElementById(
    "summaryCards"
).innerHTML = `

<div class="summary-grid">

    <div class="summary-card">
        <h4>🎟 Token Number</h4>
        <p>${filing.TokenNumber}</p>
    </div>

    <div class="summary-card">
        <h4>📁 File Number</h4>
        <p>${filing.FileNumber}</p>
    </div>

    <div class="summary-card">
        <h4>⚠ Defects Found</h4>
        <p>${defects.length}</p>
    </div>

    <div class="summary-card">
        <h4>👥 Total Parties</h4>
        <p>
            ${
                parseInt(filing.TotalPetitioner || 0)
                +
                parseInt(filing.TotalRespondent || 0)
            }
        </p>
    </div>

</div>

`;

/* CASE SUMMARY */

document.getElementById(
    "summaryContainer"
).innerHTML = `

<div class="section-card">

    <div class="section-title">
        Case Summary
    </div>

    <div class="section-body">

        <table class="report-table">

            <tr>
                <td>Case Number</td>
                <td>${filing.DisplayCaseNumber}</td>
            </tr>

            <tr>
                <td>Petitioner</td>
                <td>${filing.PetitionerName}</td>
            </tr>

            <tr>
                <td>Respondent</td>
                <td>${filing.RespondentName}</td>
            </tr>

            <tr>
                <td>Status</td>
                <td>
                    ${
                        filing.DisplayCaseNumber
                        ?
                        "✅ Registered"
                        :
                        "⏳ Under Process"
                    }
                </td>
            </tr>

        </table>

    </div>

</div>

`;

/* DEFECT DETAILS */

document.getElementById(
    "defectContainer"
).innerHTML = defect ? `

<div class="section-card">

    <div class="section-title">
        ⚠ Defect Details
    </div>

    <div class="section-body">

        <table class="report-table">

            <tr>
                <td>Defect Raised On</td>
                <td>${defect.DefectRaiseDate}</td>
            </tr>

            <tr>
                <td>Defect Cleared On</td>
                <td>${defect.DefectRemovalDate}</td>
            </tr>

            <tr>
                <td>Remark</td>
                <td>${defect.Remark || "N/A"}</td>
            </tr>

            <tr>
                <td>Remark Removal</td>
                <td>${defect.RemarkRemoval || "N/A"}</td>
            </tr>

        </table>

    </div>

</div>

`
:
"";

/* FILING DETAILS */

document.getElementById(
    "filingContainer"
).innerHTML = `

<div class="section-card">

    <div class="section-title">
        📄 Filing Details
    </div>

    <div class="section-body">

        <table class="report-table">

            <tr>
                <td>Token For</td>
                <td>${filing.TokenFor}</td>
            </tr>

            <tr>
                <td>Token Number</td>
                <td>${filing.TokenNumber}</td>
            </tr>

            <tr>
                <td>Draft Number</td>
                <td>${filing.DraftNumber}</td>
            </tr>

            <tr>
                <td>Created Date</td>
                <td>${filing.CreatedDT}</td>
            </tr>

            <tr>
                <td>File Case Type</td>
                <td>${filing.FileCaseType}</td>
            </tr>

            <tr>
                <td>File Case Year</td>
                <td>${filing.FileCaseYear}</td>
            </tr>

            <tr>
                <td>File Number</td>
                <td>${filing.FileNumber}</td>
            </tr>

        </table>

    </div>

</div>

`;

/* PARTY DETAILS */

document.getElementById(
    "partyContainer"
).innerHTML = `

<div class="section-card">

    <div class="section-title">
        👥 Party Details
    </div>

    <div class="section-body">

        <table class="report-table">

            <tr>
                <td>Petitioner Name</td>
                <td>${filing.PetitionerName}</td>
            </tr>

            <tr>
                <td>Respondent Name</td>
                <td>${filing.RespondentName}</td>
            </tr>

            <tr>
                <td>Total Petitioners</td>
                <td>${filing.TotalPetitioner}</td>
            </tr>

            <tr>
                <td>Total Respondents</td>
                <td>${filing.TotalRespondent}</td>
            </tr>

        </table>

</div>

`;
} catch (error) {

        console.error(
            error
        );

        document.getElementById(
            "loadingContainer"
        ).innerHTML =
            "Failed to load filing details";

    }

}