package com.ahc.chatbot.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FilingStatusResponse {

    @JsonProperty("TokenFor")
    private String tokenFor;

    @JsonProperty("TokenNumber")
    private String tokenNumber;

    @JsonProperty("DraftNumber")
    private String draftNumber;

    @JsonProperty("PetitionerName")
    private String petitionerName;

    @JsonProperty("RespondentName")
    private String respondentName;

    @JsonProperty("CreatedDT")
    private String createdDT;

    @JsonProperty("TotalPetitioner")
    private String totalPetitioner;

    @JsonProperty("TotalRespondent")
    private String totalRespondent;

    @JsonProperty("FileCaseType")
    private String fileCaseType;

    @JsonProperty("FileCaseYear")
    private String fileCaseYear;

    @JsonProperty("FileNumber")
    private String fileNumber;

    @JsonProperty("DisplayCaseNumber")
    private String displayCaseNumber;

    @JsonProperty("RegCaseType")
    private String regCaseType;

    @JsonProperty("RegCaseYear")
    private String regCaseYear;

    @JsonProperty("RegFileNumber")
    private String regFileNumber;

    public String getTokenFor() {
        return tokenFor;
    }

    public void setTokenFor(String tokenFor) {
        this.tokenFor = tokenFor;
    }

    public String getTokenNumber() {
        return tokenNumber;
    }

    public void setTokenNumber(String tokenNumber) {
        this.tokenNumber = tokenNumber;
    }

    public String getDraftNumber() {
        return draftNumber;
    }

    public void setDraftNumber(String draftNumber) {
        this.draftNumber = draftNumber;
    }

    public String getPetitionerName() {
        return petitionerName;
    }

    public void setPetitionerName(String petitionerName) {
        this.petitionerName = petitionerName;
    }

    public String getRespondentName() {
        return respondentName;
    }

    public void setRespondentName(String respondentName) {
        this.respondentName = respondentName;
    }

    public String getCreatedDT() {
        return createdDT;
    }

    public void setCreatedDT(String createdDT) {
        this.createdDT = createdDT;
    }

    public String getTotalPetitioner() {
        return totalPetitioner;
    }

    public void setTotalPetitioner(String totalPetitioner) {
        this.totalPetitioner = totalPetitioner;
    }

    public String getTotalRespondent() {
        return totalRespondent;
    }

    public void setTotalRespondent(String totalRespondent) {
        this.totalRespondent = totalRespondent;
    }

    public String getFileCaseType() {
        return fileCaseType;
    }

    public void setFileCaseType(String fileCaseType) {
        this.fileCaseType = fileCaseType;
    }

    public String getFileCaseYear() {
        return fileCaseYear;
    }

    public void setFileCaseYear(String fileCaseYear) {
        this.fileCaseYear = fileCaseYear;
    }

    public String getFileNumber() {
        return fileNumber;
    }

    public void setFileNumber(String fileNumber) {
        this.fileNumber = fileNumber;
    }

    public String getDisplayCaseNumber() {
        return displayCaseNumber;
    }

    public void setDisplayCaseNumber(String displayCaseNumber) {
        this.displayCaseNumber = displayCaseNumber;
    }

    public String getRegCaseType() {
        return regCaseType;
    }

    public void setRegCaseType(String regCaseType) {
        this.regCaseType = regCaseType;
    }

    public String getRegCaseYear() {
        return regCaseYear;
    }

    public void setRegCaseYear(String regCaseYear) {
        this.regCaseYear = regCaseYear;
    }

    public String getRegFileNumber() {
        return regFileNumber;
    }

    public void setRegFileNumber(String regFileNumber) {
        this.regFileNumber = regFileNumber;
    }
}