// contain the chatbot conversation logic and business rules

package com.ahc.chatbot.service;

import org.springframework.stereotype.Service;

import com.ahc.chatbot.model.ChatRequest;
import com.ahc.chatbot.model.ChatResponse;

@Service
public class ChatbotService {

    public ChatResponse getCaseDetails(
            ChatRequest request) {

        ChatResponse response =
                new ChatResponse();

        response.setCaseNumber(
                request.getCaseNumber()
        );

        response.setStatus(
                "Pending"
        );

        response.setPetitioner(
                request.getPetitionerName() != null
                        ? request.getPetitionerName()
                        : "Not Provided"
        );

        response.setRespondent(
                request.getRespondentName() != null
                        ? request.getRespondentName()
                        : "Not Provided"
        );

        response.setNextHearingDate(
                "20-Jul-2026"
        );

        return response;
    }
}