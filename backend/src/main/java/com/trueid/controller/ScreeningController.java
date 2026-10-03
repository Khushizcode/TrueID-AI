package com.trueid.controller;

import com.trueid.service.ScreeningService;
import java.io.IOException;
import java.util.Map;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/screening")
public class ScreeningController {

    private final ScreeningService screeningService;

    public ScreeningController(ScreeningService screeningService) {
        this.screeningService = screeningService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> create(Authentication authentication,
                                    @RequestParam String documentType,
                                    @RequestParam(required = false) String purpose,
                                    @RequestParam("document") MultipartFile document) {
        try {
            return ResponseEntity.ok(screeningService.create(
                    authentication.getName(), documentType, purpose, document));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (IOException e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Could not save the uploaded file"));
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> history(Authentication authentication) {
        return ResponseEntity.ok(screeningService.history(authentication.getName()));
    }

    @GetMapping("/{screeningId}")
    public ResponseEntity<?> getOne(Authentication authentication,
                                    @PathVariable String screeningId) {
        try {
            return ResponseEntity.ok(screeningService.getOne(
                    authentication.getName(), screeningId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }
}
