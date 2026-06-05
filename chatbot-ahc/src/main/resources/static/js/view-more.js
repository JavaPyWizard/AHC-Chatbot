const params = new URLSearchParams(window.location.search);

const caseId = params.get("caseId");

fetch("http://localhost:8080/api/view-more", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    caseId: Number(caseId),
  }),
})
  .then((response) => response.json())
  .then((data) => {

    let lowerCourtHtml = `
<h2>Lower Court Details</h2>
`;

if (
    data.lowerCourtDetails &&
    data.lowerCourtDetails.length > 0
) {

    lowerCourtHtml += `
    <table class="details-table">

        <tr>
            <th>LCR No/Year</th>
            <th>Case No</th>
            <th>Case Year</th>
            <th>District</th>
            <th>Decision Date</th>
            <th>Judge Name</th>
            <th>Court Type</th>
        </tr>
    `;

    data.lowerCourtDetails.forEach(
        (court) => {

            lowerCourtHtml += `
            <tr>

                <td>${court.LCRNoYear || "-"}</td>

                <td>${court.Caseno || "-"}</td>

                <td>${court.CaseYear || "-"}</td>

                <td>${court.DistName || "-"}</td>

                <td>${court.DecisionDate || "-"}</td>

                <td>${court.JudgeName || "-"}</td>

                <td>${court.CourtType || "-"}</td>

            </tr>
            `;
        }
    );

    lowerCourtHtml += `
    </table>
    `;

} else {

    lowerCourtHtml +=
        "No Lower Court Details Available";
}

    let actDetailsHtml = `
    <h2>Act Details</h2>
`;

    if (data.actDetails) {
      actDetailsHtml += `
        <pre>
${JSON.stringify(data.actDetails, null, 2)}
        </pre>
    `;
    } else {
      actDetailsHtml += `
        No Act Details Available
    `;
    }

    document.getElementById("caseContent").innerHTML = `

<h2>Case Information</h2>

<table class="details-table">

    <tr>
        <th>Field</th>
        <th>Value</th>
    </tr>

    <tr>
        <td>Case Number</td>
        <td>${data.caseDetails?.DisplayCaseno || "-"}</td>
    </tr>

    <tr>
        <td>Status</td>
        <td>${data.caseDetails.Status}</td>
    </tr>

    <tr>
        <td>Case Type</td>
        <td>${data.caseDetails.CaseType}</td>
    </tr>

    <tr>
        <td>District</td>
        <td>${data.caseDetails.District}</td>
    </tr>

    <tr>
        <td>State</td>
        <td>${data.caseDetails.StateName}</td>
    </tr>

    <tr>
        <td>Petitioner</td>
        <td>${data.caseDetails.PetName}</td>
    </tr>

    <tr>
        <td>Respondent</td>
        <td>${data.caseDetails.ResName}</td>
    </tr>

    <tr>
        <td>Petitioner Advocate</td>
        <td>${data.caseDetails.PetAdvName}</td>
    </tr>

    <tr>
        <td>Respondent Advocate</td>
        <td>${data.caseDetails.ResAdvName}</td>
    </tr>

    <tr>
        <td>Category</td>
        <td>${data.caseDetails.Category}</td>
    </tr>

    <tr>
        <td>Subcategory</td>
        <td>${data.caseDetails.Subcategory}</td>
    </tr>

    <tr>
        <td>CINO</td>
        <td>${data.caseDetails.CINO}</td>
    </tr>

    <tr>
        <td>Registration Date</td>
        <td>${data.caseDetails.CaseRegistrationDate}</td>
    </tr>

    <tr>
        <td>First Listing Date</td>
        <td>${data.caseDetails.FirstListingDate}</td>
    </tr>

    <tr>
        <td>Next Listing Date</td>
        <td>${data.caseDetails.NextListingDate}</td>
    </tr>

    <tr>
        <td>Bench Type</td>
        <td>${data.caseDetails.BenchTypeName}</td>
    </tr>

    <tr>
        <td>Bench Name</td>
        <td>${data.caseDetails.Benchname}</td>
    </tr>

    <tr>
        <td>Cause List</td>
        <td>${data.caseDetails.Causelistname}</td>
    </tr>

</table>

<hr>

<h2>Party Details</h2>

<h3>Petitioners</h3>

<table class="details-table">

    <tr>
        <th>S.No.</th>
        <th>Petitioner Name</th>
    </tr>

    ${
      data.partyDetails && data.partyDetails.PetitionerList
        ? data.partyDetails.PetitionerList.map(
            (name, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${name}</td>
                </tr>
            `,
          ).join("")
        : `
            <tr>
                <td colspan="2">
                    No Data Available
                </td>
            </tr>
        `
    }

</table>

<h3>Respondents</h3>

<table class="details-table">

    <tr>
        <th>S.No.</th>
        <th>Respondent Name</th>
    </tr>

    ${
      data.partyDetails && data.partyDetails.RespondentList
        ? data.partyDetails.RespondentList.map(
            (name, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${name}</td>
                </tr>
            `,
          ).join("")
        : `
            <tr>
                <td colspan="2">
                    No Data Available
                </td>
            </tr>
        `
    }

</table>

<hr>

        <h2>IA Details</h2>

<table class="details-table">

    <tr>
        <th>Filing No</th>
        <th>Date Of Filing</th>
        <th>Status</th>
        <th>Application No</th>
    </tr>

    ${
      data.iaDetails && data.iaDetails.length > 0
        ? data.iaDetails
            .map(
              (ia) => `
                <tr>

                    <td>
                        ${ia.FilingNo}
                    </td>

                    <td>
                        ${ia.DateOfIAFiling}
                    </td>

                    <td>
                        ${ia.Status}
                    </td>

                    <td>
                        ${ia.FinalApplicationNo}
                    </td>

                </tr>
            `,
            )
            .join("")
        : `
            <tr>
                <td colspan="4">
                    No IA Details Available
                </td>
            </tr>
        `
    }

</table>

<hr>

        <h2>Listing History</h2>

<table class="details-table">

    <tr>
        <th>Date</th>
        <th>Bench</th>
        <th>Court No</th>
        <th>Order</th>
    </tr>

    ${
      data.listingHistory && data.listingHistory.length > 0
        ? data.listingHistory
            .slice(0, 20)
            .map(
              (listing) => `
                <tr>

                    <td>
                        ${listing.Listing_Date}
                    </td>

                    <td>
                        ${listing.Bench_Name}
                    </td>

                    <td>
                        ${listing.Court_No}
                    </td>

                    <td>
                        ${listing.Order_name}
                    </td>

                </tr>
            `,
            )
            .join("")
        : `
            <tr>
                <td colspan="4">
                    No Listing History Available
                </td>
            </tr>
        `
    }

</table>

<hr>

        ${lowerCourtHtml}

        <hr>

        ${actDetailsHtml}
<hr>

<div class="bottom-actions">

    <button onclick="window.history.back()">
         Back
    </button>

    <button onclick="window.print()">
         Print
    </button>

</div>
    `;
  })
  .catch((error) => {
    console.error(error);

    document.getElementById("caseContent").innerHTML =
      "<h2>Unable to load case details.</h2>";
  });
