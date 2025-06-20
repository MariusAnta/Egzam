package lt.techin.praktika.dto.tour;

import java.time.LocalDate;
import java.util.List;

public record SoloTourResponseDTO(
        Long id,
        String title,
        double price,
        int durationMinutes,
        int likes,
        String imageBase64,
        String contactEmail,
        List<LocalDate> availableDates
) {
}
