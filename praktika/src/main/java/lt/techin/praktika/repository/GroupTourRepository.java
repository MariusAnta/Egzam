package lt.techin.praktika.repository;

import lt.techin.praktika.model.GroupTour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupTourRepository extends JpaRepository<GroupTour, Long> {


}
