package lt.techin.praktika.controller;


import jakarta.validation.Valid;
import lt.techin.praktika.dto.tour.*;
import lt.techin.praktika.model.GroupTour;
import lt.techin.praktika.model.SoloTour;
import lt.techin.praktika.service.GroupTourService;
import lt.techin.praktika.service.SoloTourService;
import lt.techin.praktika.service.TourService;
import lt.techin.praktika.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;

import static lt.techin.praktika.dto.tour.TourMapper.decodeImage;

@RestController

@RequestMapping("/api")
public class TourController {

  private final SoloTourService soloTourService;
  private final GroupTourService groupTourService;
  private final UserService userService;
  private final TourService tourService;

  @Autowired
  public TourController(SoloTourService soloTourService,
                        GroupTourService groupTourService, UserService userService, TourService tourService) {
    this.soloTourService = soloTourService;
    this.groupTourService = groupTourService;
    this.userService = userService;
    this.tourService = tourService;
  }

  // SOLO TOURS

  @GetMapping("/tours/solo")
  public ResponseEntity<List<SoloTourResponseDTO>> getAllSoloTours() {
    List<SoloTour> solos = soloTourService.getAllSoloTours();
    return ResponseEntity.ok(TourMapper.toSoloTourDtoList(solos));
  }

  @PostMapping("/tours/solo")
  public ResponseEntity<Object> saveSoloTour(@Valid @RequestBody SoloTourRequestDTO soloTourRequestDTO) {

    SoloTour savedSoloTour = this.soloTourService.saveSoloTour(TourMapper.toSoloModel(soloTourRequestDTO));

    return ResponseEntity.created(
                    ServletUriComponentsBuilder.fromCurrentRequest()
                            .path("/{id}")
                            .buildAndExpand(savedSoloTour.getId())
                            .toUri())
            .body(TourMapper.toSoloTourDto(savedSoloTour));
  }

  // Group TOURS

  @GetMapping("/tours/group")
  public ResponseEntity<List<GroupTourResponseDTO>> getAllGroupTours() {
    List<GroupTour> groups = groupTourService.getAllGroupTours();
    return ResponseEntity.ok(TourMapper.toGroupTourDtoList(groups));
  }

  @PostMapping("/tours/group")
  public ResponseEntity<Object> saveGroupTour(@Valid @RequestBody GroupTourRequestDTO groupTourRequestDTO) {

    GroupTour savedGroupTour = this.groupTourService.saveGroupTour(
            TourMapper.toGroupModel(groupTourRequestDTO)
    );

    return ResponseEntity.created(
                    ServletUriComponentsBuilder.fromCurrentRequest()
                            .path("/{id}")
                            .buildAndExpand(savedGroupTour.getId())
                            .toUri())
            .body(TourMapper.toGroupTourDto(savedGroupTour));
  }

  @DeleteMapping("/tours/solo/{id}")
  public ResponseEntity<Object> deleteSoloTour(@PathVariable long id) {
    Optional<SoloTour> soloTourOptional = this.soloTourService.getSoloTourById(id);
    if (soloTourOptional.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    this.soloTourService.deleteSoloTour(id);
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/tours/group/{id}")
  public ResponseEntity<Object> deleteGroupTour(@PathVariable long id) {
    Optional<GroupTour> groupTourOptional = this.groupTourService.getGroupTourById(id);
    if (groupTourOptional.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    this.groupTourService.deleteGroupTour(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/tours/solo/{id}")
  public ResponseEntity<Object> updateSoloTour(@PathVariable long id, @RequestBody SoloTourRequestDTO soloTourRequestDTO) {

    Optional<SoloTour> soloTourFromDb = this.soloTourService.getSoloTourById(id);

    if (soloTourFromDb.isPresent()) {
      SoloTour updatedSoloTour = soloTourFromDb.get();

      updatedSoloTour.setContactEmail(soloTourRequestDTO.contactEmail());
      updatedSoloTour.setAvailableDates(soloTourRequestDTO.availableDates());
      updatedSoloTour.setPrice(soloTourRequestDTO.price());
      updatedSoloTour.setTitle(soloTourRequestDTO.title());
      updatedSoloTour.setLikes(soloTourRequestDTO.likes());
      updatedSoloTour.setImageData(decodeImage(soloTourRequestDTO.imageBase64()));

      SoloTour tour = this.soloTourService.saveSoloTour(updatedSoloTour);

      return ResponseEntity.ok(TourMapper.toSoloTourDto(tour));
    }

    SoloTour savedSoloTour = this.soloTourService.saveSoloTour(TourMapper.toSoloModel(soloTourRequestDTO));

    return ResponseEntity.created(
                    ServletUriComponentsBuilder.fromCurrentRequest()
                            .path("/{id}")
                            .buildAndExpand(savedSoloTour.getId())
                            .toUri())
            .body(TourMapper.toSoloTourDto(savedSoloTour));
  }

  @PutMapping("/tours/group/{id}")
  public ResponseEntity<Object> updateGroupTour(@PathVariable long id, @RequestBody GroupTourRequestDTO groupTourRequestDTO) {

    Optional<GroupTour> groupTourFromDb = this.groupTourService.getGroupTourById(id);

    if (groupTourFromDb.isPresent()) {
      GroupTour updatedGroupTour = groupTourFromDb.get();

      updatedGroupTour.setDurationMinutes(groupTourRequestDTO.durationMinutes());
      updatedGroupTour.setPrice(groupTourRequestDTO.price());
      updatedGroupTour.setLikes(groupTourRequestDTO.likes());
      updatedGroupTour.setAvailableDates(groupTourRequestDTO.availableDates());
      updatedGroupTour.setImageData(decodeImage(groupTourRequestDTO.imageBase64()));
      updatedGroupTour.setTitle(groupTourRequestDTO.title());
      updatedGroupTour.setMaxGroupSize(groupTourRequestDTO.maxGroupSize());
      updatedGroupTour.setGuideName(groupTourRequestDTO.guideName());

      GroupTour tour = this.groupTourService.saveGroupTour(updatedGroupTour);

      return ResponseEntity.ok(TourMapper.toGroupTourDto(tour));
    }

    GroupTour savedGroupTour = this.groupTourService.saveGroupTour(TourMapper.toGroupModel(groupTourRequestDTO));

    return ResponseEntity.created(
                    ServletUriComponentsBuilder.fromCurrentRequest()
                            .path("/{id}")
                            .buildAndExpand(savedGroupTour.getId())
                            .toUri())
            .body(TourMapper.toGroupTourDto(savedGroupTour));
  }

}
