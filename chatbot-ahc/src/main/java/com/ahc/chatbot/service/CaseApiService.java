// handle communication with the case-details API.

package com.ahc.chatbot.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.ahc.chatbot.model.CaseDetailsRequest;
import com.ahc.chatbot.model.CaseDetailsResponse;

@Service
public class CaseApiService {

    private static final String API_URL =
            "http://192.168.0.114/testapi/API/CaseStatus/BriefCaseDetailsByTypeNoYear";

    private static final String BASE_URL =
            "http://192.168.0.114/testapi/API/CaseStatus/";

    @Autowired
    private RestTemplate restTemplate;

    public CaseDetailsResponse getBriefCaseDetails(
            CaseDetailsRequest request) {

        return restTemplate.postForObject(
                API_URL,
                request,
                CaseDetailsResponse.class
        );
    }

    public Object getCaseDetailsByCaseId(
            Long caseId) {

        return restTemplate.postForObject(
                BASE_URL + "CaseDetailsByCaseId",
                java.util.Collections.singletonMap(
                        "Caseid",
                        caseId),
                Object.class
        );
    }

    public Object getPartyDetailsByCaseId(
            Long caseId) {

        return restTemplate.postForObject(
                BASE_URL + "PartyDetailsByCaseId",
                java.util.Collections.singletonMap(
                        "Caseid",
                        caseId),
                Object.class
        );
    }

    public Object getAdvocateDetailsByCaseId(
            Long caseId) {

        return restTemplate.postForObject(
                BASE_URL + "AdvocateDetailsByCaseId",
                java.util.Collections.singletonMap(
                        "Caseid",
                        caseId),
                Object.class
        );
    }

    public Object getIADetailsByCaseId(
            Long caseId) {

        return restTemplate.postForObject(
                BASE_URL + "IADetailsListByCaseId",
                java.util.Collections.singletonMap(
                        "Caseid",
                        caseId),
                Object.class
        );
    }

    public Object getListingHistoryByCaseId(
            Long caseId) {

        return restTemplate.postForObject(
                BASE_URL + "ListingHistoryByCaseId",
                java.util.Collections.singletonMap(
                        "Caseid",
                        caseId),
                Object.class
        );
    }

    public Object getLowerCourtDetailByCaseId(
            Long caseId) {

        Map<String, Object> request =
                new HashMap<>();

        request.put(
                "Caseid",
                caseId);

        return restTemplate.postForObject(
                BASE_URL + "LowerCourtDetailByCaseId",
                request,
                Object.class);
    }

    public Object getActDetailsByCINO(
            String cino) {

        Map<String, Object> request =
                new HashMap<>();

        request.put(
                "CINO",
                cino);

        return restTemplate.postForObject(
                BASE_URL + "ActDetailsByCINO",
                request,
                Object.class);
    }
}