package lt.techin.praktika.service;


import lt.techin.praktika.model.SoloTour;
import lt.techin.praktika.repository.SoloTourRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SoloTourService {

  private final SoloTourRepository soloTourRepository;

  public SoloTourService(SoloTourRepository soloTourRepository) {
    this.soloTourRepository = soloTourRepository;
  }

  public List<SoloTour> getAllSoloTours() {
    return soloTourRepository.findAll();
  }

  public Optional<SoloTour> getSoloTourById(Long id) {
    return soloTourRepository.findById(id);
  }

  public SoloTour saveSoloTour(SoloTour soloTour) {
    return soloTourRepository.save(soloTour);
  }

  public void deleteSoloTour(Long id) {
    soloTourRepository.deleteById(id);
  }
}
