// contain the chatbot conversation logic and business rules

package com.ahc.chatbot.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ahc.chatbot.model.*;

@Service
public class ChatbotService {

    @Autowired
    private CaseApiService caseApiService;

    public ChatResponse getCaseDetails(
            ChatRequest request) {

        CaseDetailsRequest apiRequest =
                new CaseDetailsRequest();

        apiRequest.setCaseType(
                request.getCaseType());

        apiRequest.setCaseNumber(
                request.getCaseNumber());

        apiRequest.setCaseYear(
                request.getCaseYear());

        try {

            CaseDetailsResponse apiResponse =
                    caseApiService.getBriefCaseDetails(
                            apiRequest);

            ChatResponse response =
                    new ChatResponse();

            response.setCaseId(
                    apiResponse.getCaseId());

            response.setCaseNumber(
                    apiResponse.getCaseNumber());

            response.setPartyName(
                    apiResponse.getPartyName());

            response.setStatus(
                    apiResponse.getStatus());

            return response;

        } catch (Exception e) {

            System.out.println(
                    "CASE NOT FOUND : "
                            + e.getMessage());

            ChatResponse response =
                    new ChatResponse();

            response.setCaseId(0L);

            response.setCaseNumber(
                    "NOT FOUND");

            response.setPartyName(
                    "No case found");

            response.setStatus(
                    "NOT FOUND");

            return response;
        }
    }

    public FilingStatusResponse getFilingStatus(
        String tokenNumber) {

    try {

        return caseApiService
                .getFilingDetailsByTokenNumber(
                        tokenNumber);

    } catch (Exception e) {

        System.out.println(
                "FILING STATUS ERROR : "
                        + e.getMessage());

        return null;
    }
}

public List<DefectResponse>
getDefectListByTokenNumber(
        String tokenNumber) {

    try {

        return caseApiService
                .getDefectListByTokenNumber(
                        tokenNumber);

    } catch (Exception e) {

        System.out.println(
                "DEFECT API ERROR : "
                        + e.getMessage());

        return java.util.Collections
                .emptyList();
    }
}

public PhysicalFilingStatusResponse
getPhysicalFilingStatus(
        String tokenNumber) {

    PhysicalFilingStatusResponse response =
            new PhysicalFilingStatusResponse();

    response.setFilingDetails(
            getFilingStatus(
                    tokenNumber));

    response.setDefects(
            getDefectListByTokenNumber(
                    tokenNumber));

    return response;
}

    public ViewMoreResponse getViewMoreDetails(
            Long caseId) {

        ViewMoreResponse response =
                new ViewMoreResponse();

        response.setCaseDetails(
                caseApiService.getCaseDetailsByCaseId(
                        caseId));

        response.setPartyDetails(
                caseApiService.getPartyDetailsByCaseId(
                        caseId));

        response.setAdvocateDetails(
                caseApiService.getAdvocateDetailsByCaseId(
                        caseId));

        response.setIaDetails(
                caseApiService.getIADetailsByCaseId(
                        caseId));

        response.setListingHistory(
                caseApiService.getListingHistoryByCaseId(
                        caseId));

        response.setLowerCourtDetails(
                caseApiService.getLowerCourtDetailByCaseId(
                        caseId));

        Map caseDetails =
                (Map) response.getCaseDetails();

        if (caseDetails != null) {

            Object cinoObject =
                    caseDetails.get("CINO");

            if (cinoObject != null &&
                    !cinoObject.toString()
                            .trim()
                            .isEmpty()) {

                response.setActDetails(
                        caseApiService.getActDetailsByCINO(
                                cinoObject.toString()));
            }
        }

        return response;
    }
}