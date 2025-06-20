package lt.techin.praktika.repository;

import lt.techin.praktika.model.SoloTour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoloTourRepository extends JpaRepository<SoloTour, Long> {


}
