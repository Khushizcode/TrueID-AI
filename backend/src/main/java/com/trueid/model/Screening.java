package com.trueid.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "screenings")
public class Screening {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String screeningId;

    @ManyToOne(optional = false)
    private User user;

    private String documentType;
    private String purpose;
    private String originalFileName;
    private String filePath;

    private String status;
    private String risk;
    private Integer confidence;
    private Boolean nameMatch;
    private Boolean documentValid;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "screening_risk_indicators",
            joinColumns = @JoinColumn(name = "screening_id"))
    private List<RiskIndicator> riskIndicators = new ArrayList<>();

    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() { return id; }
    public String getScreeningId() { return screeningId; }
    public void setScreeningId(String screeningId) { this.screeningId = screeningId; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getDocumentType() { return documentType; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }
    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
    public String getOriginalFileName() { return originalFileName; }
    public void setOriginalFileName(String originalFileName) { this.originalFileName = originalFileName; }
    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getRisk() { return risk; }
    public void setRisk(String risk) { this.risk = risk; }
    public Integer getConfidence() { return confidence; }
    public void setConfidence(Integer confidence) { this.confidence = confidence; }
    public Boolean getNameMatch() { return nameMatch; }
    public void setNameMatch(Boolean nameMatch) { this.nameMatch = nameMatch; }
    public Boolean getDocumentValid() { return documentValid; }
    public void setDocumentValid(Boolean documentValid) { this.documentValid = documentValid; }
    public List<RiskIndicator> getRiskIndicators() { return riskIndicators; }
    public void setRiskIndicators(List<RiskIndicator> riskIndicators) { this.riskIndicators = riskIndicators; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}