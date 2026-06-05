// // REST controller for chatbot requests

package com.ahc.chatbot.controller;

import com.ahc.chatbot.model.ChatRequest;
import com.ahc.chatbot.model.ChatResponse;
import com.ahc.chatbot.service.ChatbotService;

import com.ahc.chatbot.model.ViewMoreRequest;
import com.ahc.chatbot.model.ViewMoreResponse;

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