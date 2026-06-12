// // REST controller for chatbot requests
package com.ahc.chatbot.controller;

import com.ahc.chatbot.model.*;
import com.ahc.chatbot.service.ChatbotService;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ChatbotController {

    private final ChatbotService chatbotService;

    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping("/case-details")
    public ChatResponse getCaseDetails(
            @RequestBody ChatRequest request) {

        System.out.println(
                "===== REQUEST RECEIVED =====");

        System.out.println(
                "Case Type: "
                        + request.getCaseType());

        System.out.println(
                "Case Number: "
                        + request.getCaseNumber());

        System.out.println(
                "Case Year: "
                        + request.getCaseYear());

        return chatbotService.getCaseDetails(request);
    }

    @PostMapping("/filing-status")
public FilingStatusResponse getFilingStatus(
        @RequestBody FilingStatusRequest request) {

    System.out.println(
            "===== FILING STATUS REQUEST =====");

    System.out.println(
            "Token Number: "
                    + request.getTokenNumber());

    return chatbotService.getFilingStatus(
            request.getTokenNumber());
}

@PostMapping("/defects")
public List<DefectResponse>
getDefects(
        @RequestBody
        FilingStatusRequest request) {

    return chatbotService
            .getDefectListByTokenNumber(
                    request.getTokenNumber());
}

@PostMapping("/physical-filing-status")
public PhysicalFilingStatusResponse
getPhysicalFilingStatus(
        @RequestBody
        FilingStatusRequest request) {

    return chatbotService
            .getPhysicalFilingStatus(
                    request.getTokenNumber());
}

    @PostMapping("/view-more")
public ViewMoreResponse viewMore(
        @RequestBody ViewMoreRequest request) {

    System.out.println(
            "===== VIEW MORE REQUEST =====");

    System.out.println(
            "Case Id: "
                    + request.getCaseId());

    return chatbotService.getViewMoreDetails(
            request.getCaseId());
}
}