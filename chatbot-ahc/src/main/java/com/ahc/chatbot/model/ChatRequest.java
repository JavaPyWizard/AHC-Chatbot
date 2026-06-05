// // Represents data received from the frontend chatbot

package com.ahc.chatbot.model;

public class ChatRequest {

    private Integer caseType;
    private Integer caseNumber;
    private Integer caseYear;

    public Integer getCaseType() {
        return caseType;
    }

    public void setCaseType(Integer caseType) {
        this.caseType = caseType;
    }

    public Integer getCaseNumber() {
        return caseNumber;
    }

    public void setCaseNumber(Integer caseNumber) {
        this.caseNumber = caseNumber;
    }

    public Integer getCaseYear() {
        return caseYear;
    }

    public void setCaseYear(Integer caseYear) {
        this.caseYear = caseYear;
    }
}