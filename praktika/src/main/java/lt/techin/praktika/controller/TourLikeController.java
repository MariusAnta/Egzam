package lt.techin.praktika.controller;

import lt.techin.praktika.model.User;
import lt.techin.praktika.service.TourLikeService;
import lt.techin.praktika.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TourLikeController {

  private final TourLikeService tourLikeService;
  private final UserService userService; // ← Turi gražinti prisijungusį vartotoją

  public TourLikeController(TourLikeService tourLikeService, UserService userService) {
    this.tourLikeService = tourLikeService;
    this.userService = userService;
  }

  @PutMapping("/tours/{id}/like")
  public ResponseEntity<?> likeTour(@PathVariable Long id, Principal principal) {
    User user = userService.findByUsername(principal.getName());

    boolean liked = tourLikeService.likeTour(user, id); // Pakeista: turi grąžinti ar jau buvo like
    if (!liked) {
      return ResponseEntity.status(409).body("Jau pažymėta kaip patinka."); // 409 Conflict
    }

    return ResponseEntity.ok().build();
  }

  @GetMapping("tours/liked")
  public List<Long> getUserLikedTours(Principal principal) {
    User user = userService.findByUsername(principal.getName());
    return tourLikeService.getLikedTourIds(user);
  }
}

