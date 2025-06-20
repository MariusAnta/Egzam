package lt.techin.praktika.service;

import jakarta.transaction.Transactional;
import lt.techin.praktika.model.Tour;
import lt.techin.praktika.model.User;
import lt.techin.praktika.repository.TourRepository;
import lt.techin.praktika.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TourService {

  private final TourRepository tourRepository;
  private final UserRepository userRepository;

  public TourService(TourRepository tourRepository, UserRepository userRepository) {
    this.tourRepository = tourRepository;
    this.userRepository = userRepository;
  }

  public List<Tour> getAllTours() {
    return tourRepository.findAll();
  }

  public Optional<Tour> getTourById(Long id) {
    return tourRepository.findById(id);
  }

  public Tour saveTour(Tour tour) {
    return tourRepository.save(tour);
  }

  public void deleteTour(Long id) {
    tourRepository.deleteById(id);
  }

  @Transactional
  public void toggleLike(Long tourId, Long userId) {
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
    Tour tour = tourRepository.findById(tourId)
            .orElseThrow(() -> new RuntimeException("Tour not found"));

    if (user.getLikedTours().contains(tour)) {
      user.getLikedTours().remove(tour);
      tour.setLikes(tour.getLikes() - 1);
    } else {
      user.getLikedTours().add(tour);
      tour.setLikes(tour.getLikes() + 1);
    }

    userRepository.save(user);
    tourRepository.save(tour);
  }
}