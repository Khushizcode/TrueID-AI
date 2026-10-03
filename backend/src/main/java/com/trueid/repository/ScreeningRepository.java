package com.trueid.repository;

import com.trueid.model.Screening;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScreeningRepository extends JpaRepository<Screening, Long> {
    List<Screening> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<Screening> findByScreeningIdAndUserId(String screeningId, Long userId);
}