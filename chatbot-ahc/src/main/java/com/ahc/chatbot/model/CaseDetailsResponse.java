// map the response received from the external API

package com.ahc.chatbot.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CaseDetailsResponse {

    @JsonProperty("Case_id")
    private Long caseId;

    @JsonProperty("Case_number")
    private String caseNumber;

    @JsonProperty("Party_Name")
    private String partyName;

    @JsonProperty("Status")
    private String status;

    public Long getCaseId() {
        return caseId;
    }

    public void setCaseId(Long caseId) {
        this.caseId = caseId;
    }

    public String getCaseNumber() {
        return caseNumber;
    }

    public void setCaseNumber(String caseNumber) {
        this.caseNumber = caseNumber;
    }

    public String getPartyName() {
        return partyName;
    }

    public void setPartyName(String partyName) {
        this.partyName = partyName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}