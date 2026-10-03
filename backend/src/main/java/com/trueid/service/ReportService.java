package com.trueid.service;

import com.trueid.model.Screening;
import com.trueid.model.User;
import com.trueid.repository.ScreeningRepository;
import com.trueid.repository.UserRepository;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    private final ScreeningRepository screeningRepository;
    private final UserRepository userRepository;

    public ReportService(ScreeningRepository screeningRepository,
                         UserRepository userRepository) {
        this.screeningRepository = screeningRepository;
        this.userRepository = userRepository;
    }

    public Map<String, Object> summary(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Screening> list =
                screeningRepository.findByUserIdOrderByCreatedAtDesc(user.getId());

        int total = list.size();
        int verified = 0, review = 0, rejected = 0;
        int low = 0, medium = 0, high = 0;
        int confidenceSum = 0, confidenceCount = 0;
        Map<String, Integer> byDocumentType = new LinkedHashMap<>();

        for (Screening s : list) {
            if ("VERIFIED".equals(s.getStatus())) verified++;
            else if ("REVIEW".equals(s.getStatus())) review++;
            else if ("REJECTED".equals(s.getStatus())) rejected++;

            if ("LOW".equals(s.getRisk())) low++;
            else if ("MEDIUM".equals(s.getRisk())) medium++;
            else if ("HIGH".equals(s.getRisk())) high++;

            if (s.getConfidence() != null) {
                confidenceSum += s.getConfidence();
                confidenceCount++;
            }

            String type = s.getDocumentType() == null ? "Unknown" : s.getDocumentType();
            byDocumentType.merge(type, 1, Integer::sum);
        }

        Map<String, Object> riskLevels = new LinkedHashMap<>();
        riskLevels.put("low", low);
        riskLevels.put("medium", medium);
        riskLevels.put("high", high);

        List<Map<String, Object>> recent = new ArrayList<>();
        for (Screening s : list.stream().limit(5).toList()) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("screeningId", s.getScreeningId());
            m.put("documentType", s.getDocumentType());
            m.put("status", s.getStatus());
            m.put("risk", s.getRisk());
            m.put("confidence", s.getConfidence());
            m.put("createdAt", s.getCreatedAt().toString());
            recent.add(m);
        }

        Map<String, Object> report = new LinkedHashMap<>();
        report.put("totalScreenings", total);
        report.put("verified", verified);
        report.put("review", review);
        report.put("rejected", rejected);
        report.put("verificationRate", total == 0 ? 0 : Math.round(verified * 100.0 / total));
        report.put("averageConfidence",
                confidenceCount == 0 ? 0 : Math.round((double) confidenceSum / confidenceCount));
        report.put("riskLevels", riskLevels);
        report.put("byDocumentType", byDocumentType);
        report.put("recentScreenings", recent);
        return report;
    }
}
