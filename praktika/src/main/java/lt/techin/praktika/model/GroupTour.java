package lt.techin.praktika.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;
import java.util.List;

@Entity
@DiscriminatorValue("GROUP")
public class GroupTour extends Tour {

  private int maxGroupSize;
  private String guideName;

  public GroupTour() {
    super();
  }

  public GroupTour(int durationMinutes, double price, int likes, String contentType,
                   List<LocalDate> availableDates, byte[] imageData,
                   String title, int maxGroupSize, String guideName) {
    super(durationMinutes, price, likes, contentType, availableDates, imageData, title);
    this.maxGroupSize = maxGroupSize;
    this.guideName = guideName;
  }

  public int getMaxGroupSize() {
    return maxGroupSize;
  }

  public void setMaxGroupSize(int maxGroupSize) {
    this.maxGroupSize = maxGroupSize;
  }

  public String getGuideName() {
    return guideName;
  }

  public void setGuideName(String guideName) {
    this.guideName = guideName;
  }
}
