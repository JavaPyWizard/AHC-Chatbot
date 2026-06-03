// define the response sent back to the frontend

package com.ahc.chatbot.model;

public class ChatResponse {

	private String caseNumber;
	private String status;
    private String petitioner;
    private String respondent;
    private String nextHearingDate;
    
    public String getCaseNumber() {
        return caseNumber;
    }
    
    public void setCaseNumber(String caseNumber) {
        this.caseNumber = caseNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPetitioner() {
        return petitioner;
    }

    public void setPetitioner(String petitioner) {
        this.petitioner = petitioner;
    }

    public String getRespondent() {
        return respondent;
    }

    public void setRespondent(String respondent) {
        this.respondent = respondent;
    }

    public String getNextHearingDate() {
        return nextHearingDate;
    }
    
    public void setNextHearingDate(String nextHearingDate) {
        this.nextHearingDate = nextHearingDate;
    }
}