package lt.techin.praktika.service;

import lt.techin.praktika.model.Tour;
import lt.techin.praktika.model.TourLike;
import lt.techin.praktika.model.User;
import lt.techin.praktika.repository.TourLikeRepository;
import lt.techin.praktika.repository.TourRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TourLikeService {

  private final TourRepository tourRepository;
  private final TourLikeRepository tourLikeRepository;

  public TourLikeService(TourRepository tourRepository, TourLikeRepository tourLikeRepository) {
    this.tourRepository = tourRepository;
    this.tourLikeRepository = tourLikeRepository;
  }

  public boolean likeTour(User user, Long tourId) {
    Tour tour = tourRepository.findById(tourId)
            .orElseThrow(() -> new RuntimeException("Tour not found"));

    // Jei jau pažymėjo kaip patinka — nieko nedarom
    if (tourLikeRepository.existsByUserAndTour(user, tour)) {
      return false;
    }

    // Sukuriam naują "like" įrašą
    tourLikeRepository.save(new TourLike(user, tour));

    // Padidinam like skaičių (jeigu naudoji atskirą lauką)
    tour.setLikes(tour.getLikes() + 1);
    tourRepository.save(tour);

    return true;
  }


  public List<Long> getLikedTourIds(User user) {
    return tourLikeRepository.findByUser(user)
            .stream()
            .map(tourLike -> tourLike.getTour().getId())
            .toList();
  }
}

