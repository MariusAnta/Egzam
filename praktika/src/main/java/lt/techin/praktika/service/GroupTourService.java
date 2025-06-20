package lt.techin.praktika.service;

import lt.techin.praktika.model.GroupTour;
import lt.techin.praktika.repository.GroupTourRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupTourService {

  private final GroupTourRepository groupTourRepository;

  public GroupTourService(GroupTourRepository groupTourRepository) {
    this.groupTourRepository = groupTourRepository;
  }

  public List<GroupTour> getAllGroupTours() {
    return groupTourRepository.findAll();
  }

  public Optional<GroupTour> getGroupTourById(Long id) {
    return groupTourRepository.findById(id);
  }

  public GroupTour saveGroupTour(GroupTour groupTour) {
    return groupTourRepository.save(groupTour);
  }

  public void deleteGroupTour(Long id) {
    groupTourRepository.deleteById(id);
  }
}
