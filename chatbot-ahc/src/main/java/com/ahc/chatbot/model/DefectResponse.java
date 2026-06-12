package com.ahc.chatbot.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DefectResponse {

    @JsonProperty("DefectName")
    private String defectName;

    @JsonProperty("DefectRaiseDate")
    private String defectRaiseDate;

    @JsonProperty("DefectRemovalDate")
    private String defectRemovalDate;

    @JsonProperty("Remark")
    private String remark;

    @JsonProperty("RemarkRemoval")
    private String remarkRemoval;

    public String getDefectName() {
        return defectName;
    }

    public void setDefectName(
            String defectName) {
        this.defectName = defectName;
    }

    public String getDefectRaiseDate() {
        return defectRaiseDate;
    }

    public void setDefectRaiseDate(
            String defectRaiseDate) {
        this.defectRaiseDate = defectRaiseDate;
    }

    public String getDefectRemovalDate() {
        return defectRemovalDate;
    }

    public void setDefectRemovalDate(
            String defectRemovalDate) {
        this.defectRemovalDate = defectRemovalDate;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(
            String remark) {
        this.remark = remark;
    }

    public String getRemarkRemoval() {
        return remarkRemoval;
    }

    public void setRemarkRemoval(
            String remarkRemoval) {
        this.remarkRemoval = remarkRemoval;
    }
}