package lt.techin.praktika.dto.tour;

import lt.techin.praktika.model.GroupTour;
import lt.techin.praktika.model.SoloTour;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

public class TourMapper {

  public static SoloTourResponseDTO toSoloTourDto(SoloTour solo) {
    return new SoloTourResponseDTO(
            solo.getId(),
            solo.getTitle(),
            solo.getPrice(),
            solo.getDurationMinutes(),
            solo.getLikes(),
            encodeImage(solo.getImageData()),
            solo.getContactEmail(),
            solo.getAvailableDates()
    );
  }

  public static GroupTourResponseDTO toGroupTourDto(GroupTour group) {
    return new GroupTourResponseDTO(
            group.getId(),
            group.getTitle(),
            group.getPrice(),
            group.getDurationMinutes(),
            group.getLikes(),
            encodeImage(group.getImageData()),
            group.getMaxGroupSize(),
            group.getGuideName(),
            group.getAvailableDates()
    );
  }

  // DTO -> Model (SoloTour)
  public static SoloTour toSoloModel(SoloTourRequestDTO dto) {
    return new SoloTour(
            dto.durationMinutes(),
            dto.price(),
            dto.likes(), // numatytas 0, jei neateina
            null, // contentType – jei iš base64 galima atspėti, galima papildyti
            dto.availableDates(),
            decodeImage(dto.imageBase64()),
            dto.title(),
            dto.contactEmail()
    );
  }

  // DTO -> Model (GroupTour)
  public static GroupTour toGroupModel(GroupTourRequestDTO dto) {
    return new GroupTour(
            dto.durationMinutes(),
            dto.price(),
            dto.likes(), // numatytas 0, jei neateina
            null, // contentType – jei iš base64 galima atspėti, galima papildyti
            dto.availableDates(),
            decodeImage(dto.imageBase64()),
            dto.title(),
            dto.maxGroupSize(),
            dto.guideName()
    );
  }

  // Sąrašų konvertavimo metodai
  public static List<SoloTourResponseDTO> toSoloTourDtoList(List<SoloTour> solos) {
    return solos.stream()
            .map(TourMapper::toSoloTourDto)
            .collect(Collectors.toList());
  }

  public static List<GroupTourResponseDTO> toGroupTourDtoList(List<GroupTour> groups) {
    return groups.stream()
            .map(TourMapper::toGroupTourDto)
            .collect(Collectors.toList());
  }

  public static String encodeImage(byte[] imageData) {
    if (imageData == null) return null;
    return Base64.getEncoder().encodeToString(imageData);
  }

  public static byte[] decodeImage(String base64) {
    if (base64 == null) return null;
    return Base64.getDecoder().decode(base64);
  }
}
