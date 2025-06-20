package lt.techin.praktika.dto.tour;

import java.time.LocalDate;
import java.util.List;

public record GroupTourResponseDTO(
        Long id,
        String title,
        double price,
        int durationMinutes,
        int likes,
        String imageBase64,
        Integer maxGroupSize,
        String guideName,
        List<LocalDate> availableDates
) {
}
