// structure the request payload sent to the external API

package com.ahc.chatbot.model;

public class CaseDetailsRequest {

    private Integer CaseType;
    private Integer CaseNumber;
    private Integer CaseYear;

    public Integer getCaseType() {
        return CaseType;
    }

    public void setCaseType(Integer caseType) {
        CaseType = caseType;
    }

    public Integer getCaseNumber() {
        return CaseNumber;
    }

    public void setCaseNumber(Integer caseNumber) {
        CaseNumber = caseNumber;
    }

    public Integer getCaseYear() {
        return CaseYear;
    }

    public void setCaseYear(Integer caseYear) {
        CaseYear = caseYear;
    }
}