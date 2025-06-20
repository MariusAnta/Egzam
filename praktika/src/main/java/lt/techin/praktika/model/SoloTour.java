package lt.techin.praktika.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;
import java.util.List;

@Entity
@DiscriminatorValue("SOLO")
public class SoloTour extends Tour {


  private String contactEmail;

  public SoloTour() {
    super();
  }

  public SoloTour(int durationMinutes, double price, int likes, String contentType, List<LocalDate> availableDates, byte[] imageData, String title, String contactEmail) {
    super(durationMinutes, price, likes, contentType, availableDates, imageData, title);
    this.contactEmail = contactEmail;
  }

  public String getContactEmail() {
    return contactEmail;
  }

  public void setContactEmail(String contactEmail) {
    this.contactEmail = contactEmail;
  }
}
