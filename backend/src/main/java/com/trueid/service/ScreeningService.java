package com.trueid.service;

import com.trueid.model.RiskIndicator;
import com.trueid.model.Screening;
import com.trueid.model.User;
import com.trueid.repository.ScreeningRepository;
import com.trueid.repository.UserRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ScreeningService {

    private static final Set<String> ALLOWED_TYPES =
            Set.of("image/jpeg", "image/png", "application/pdf");

    private final ScreeningRepository screeningRepository;
    private final UserRepository userRepository;
    private final AIService aiService;

    public ScreeningService(ScreeningRepository screeningRepository,
                            UserRepository userRepository,
                            AIService aiService) {
        this.screeningRepository = screeningRepository;
        this.userRepository = userRepository;
        this.aiService = aiService;
    }

    public Map<String, Object> create(String email, String documentType,
                                      String purpose, MultipartFile file) throws IOException {
        if (documentType == null || documentType.isBlank()) {
            throw new IllegalArgumentException("documentType is required");
        }
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("A document file is required");
        }
        if (file.getContentType() == null || !ALLOWED_TYPES.contains(file.getContentType())) {
            throw new IllegalArgumentException("Only JPG, PNG or PDF files are allowed");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Save the file with a random name
        Path uploadDir = Paths.get("uploads");
        Files.createDirectories(uploadDir);
        String original = file.getOriginalFilename() == null ? "document" : file.getOriginalFilename();
        String extension = original.contains(".")
                ? original.substring(original.lastIndexOf('.')) : "";
        Path target = uploadDir.resolve(UUID.randomUUID() + extension);
        Files.copy(file.getInputStream(), target);

        // Run AI analysis (mock for now)
        AIService.AiResult result = aiService.analyze(original, documentType);

        Screening screening = new Screening();
        screening.setUser(user);
        screening.setDocumentType(documentType);
        screening.setPurpose(purpose);
        screening.setOriginalFileName(original);
        screening.setFilePath(target.toString());
        screening.setStatus(result.status());
        screening.setRisk(result.risk());
        screening.setConfidence(result.confidence());
        screening.setNameMatch(result.nameMatch());
        screening.setDocumentValid(result.documentValid());
        screening.setRiskIndicators(new ArrayList<>(result.riskIndicators()));
        screening = screeningRepository.save(screening);

        screening.setScreeningId("SCR-" + (1000 + screening.getId()));
        screening = screeningRepository.save(screening);

        return toMap(screening);
    }

    public List<Map<String, Object>> history(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        List<Map<String, Object>> list = new ArrayList<>();
        for (Screening s : screeningRepository.findByUserIdOrderByCreatedAtDesc(user.getId())) {
            list.add(toMap(s));
        }
        return list;
    }

    public Map<String, Object> getOne(String email, String screeningId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Screening s = screeningRepository.findByScreeningIdAndUserId(screeningId, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Screening not found"));
        return toMap(s);
    }

    private Map<String, Object> toMap(Screening s) {
        List<Map<String, Object>> indicators = new ArrayList<>();
        for (RiskIndicator r : s.getRiskIndicators()) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("code", r.getCode());
            m.put("severity", r.getSeverity());
            m.put("message", r.getMessage());
            indicators.add(m);
        }

        Map<String, Object> map = new LinkedHashMap<>();
        map.put("screeningId", s.getScreeningId());
        map.put("documentType", s.getDocumentType());
        map.put("purpose", s.getPurpose());
        map.put("status", s.getStatus());
        map.put("risk", s.getRisk());
        map.put("confidence", s.getConfidence());
        map.put("nameMatch", s.getNameMatch());
        map.put("documentValid", s.getDocumentValid());
        map.put("riskIndicators", indicators);
        map.put("createdAt", s.getCreatedAt().toString());
        return map;
    }
}
