package lt.techin.praktika.dto.tour;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record SoloTourRequestDTO(
        @NotBlank
        String title,

        @NotNull
        Double price,

        @NotNull
        Integer durationMinutes,

        int likes,

        String imageBase64,

        String contactEmail,

        @NotNull
        List<LocalDate> availableDates
) {
}
