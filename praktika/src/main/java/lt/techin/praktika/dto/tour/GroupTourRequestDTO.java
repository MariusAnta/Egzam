package lt.techin.praktika.dto.tour;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record GroupTourRequestDTO(
        String title,
        double price,
        int durationMinutes,
        int likes,
        String imageBase64,
        Integer maxGroupSize,
        String guideName,
        @NotNull
        List<LocalDate> availableDates
) {
}
