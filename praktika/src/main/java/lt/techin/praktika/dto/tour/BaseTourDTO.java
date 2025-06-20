package lt.techin.praktika.dto.tour;

public record BaseTourDTO(
        String title,
        double price,
        int durationMinutes,
        int likes,
        String imageBase64
) {
}
