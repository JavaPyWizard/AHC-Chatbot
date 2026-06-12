package com.ahc.chatbot.model;

import java.util.List;

public class PhysicalFilingStatusResponse {

    private FilingStatusResponse filingDetails;

    private List<DefectResponse> defects;

    public FilingStatusResponse getFilingDetails() {
        return filingDetails;
    }

    public void setFilingDetails(
            FilingStatusResponse filingDetails) {

        this.filingDetails =
                filingDetails;
    }

    public List<DefectResponse> getDefects() {
        return defects;
    }

    public void setDefects(
            List<DefectResponse> defects) {

        this.defects =
                defects;
    }
}