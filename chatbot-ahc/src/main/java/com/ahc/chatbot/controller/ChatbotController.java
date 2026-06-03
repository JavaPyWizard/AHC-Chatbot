// // REST controller for chatbot requests

package com.ahc.chatbot.controller;

import com.ahc.chatbot.model.ChatRequest;
import com.ahc.chatbot.model.ChatResponse;
import com.ahc.chatbot.service.ChatbotService;

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

    public ChatbotController(
            ChatbotService chatbotService) {

        this.chatbotService =
                chatbotService;
    }

    @PostMapping("/case-details")
    public ChatResponse getCaseDetails(
            @RequestBody ChatRequest request) {

        System.out.println(
                "===== REQUEST RECEIVED =====");

        System.out.println(
                "Case Number: "
                        + request.getCaseNumber());

        System.out.println(
                "Filing Year: "
                        + request.getFilingYear());

        System.out.println(
                "Case Type: "
                        + request.getCaseType());

        System.out.println(
                "Petitioner Name: "
                        + request.getPetitionerName());

        System.out.println(
                "Respondent Name: "
                        + request.getRespondentName());

        System.out.println(
                "Advocate Name: "
                        + request.getAdvocateName());

        System.out.println(
                "Judge Name: "
                        + request.getJudgeName());

        System.out.println(
                "Court Number: "
                        + request.getCourtNumber());

        System.out.println(
                "District: "
                        + request.getDistrict());

        return chatbotService
                .getCaseDetails(request);
    }
}