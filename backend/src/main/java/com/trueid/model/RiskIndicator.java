package com.trueid.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class RiskIndicator {

    private String code;
    private String severity;
    private String message;

    public RiskIndicator() {}

    public RiskIndicator(String code, String severity, String message) {
        this.code = code;
        this.severity = severity;
        this.message = message;
    }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
