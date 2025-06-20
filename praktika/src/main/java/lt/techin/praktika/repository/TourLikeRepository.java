package lt.techin.praktika.repository;

import lt.techin.praktika.model.Tour;
import lt.techin.praktika.model.TourLike;
import lt.techin.praktika.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourLikeRepository extends JpaRepository<TourLike, Long> {

  boolean existsByUserAndTour(User user, Tour tour);

  List<TourLike> findByUser(User user);
}
