package com.trueid.service;

import com.trueid.model.RiskIndicator;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    public record AiResult(String status, String risk, int confidence,
                           boolean nameMatch, boolean documentValid,
                           List<RiskIndicator> riskIndicators) {}

    // MOCK: replace this with a call to Karnika's POST /ai/analyze later.
    // For testing, a file name containing "fake" returns a rejected result.
    public AiResult analyze(String originalFileName, String documentType) {
        String name = originalFileName == null ? "" : originalFileName.toLowerCase();

        if (name.contains("fake")) {
            return new AiResult("REJECTED", "HIGH", 38, false, false, List.of(
                    new RiskIndicator("IMAGE_TAMPERING", "HIGH", "Potential alteration detected"),
                    new RiskIndicator("NAME_MISMATCH", "MEDIUM", "Name does not match the account")));
        }

        return new AiResult("VERIFIED", "LOW", 96, true, true, List.of());
    }
}
