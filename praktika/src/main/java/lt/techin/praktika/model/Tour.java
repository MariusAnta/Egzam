package lt.techin.praktika.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tour_type")
public abstract class Tour {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;
  private int durationMinutes;
  private double price;
  private String contentType; // pvz., "image/jpeg", "image/png"
  private int likes = 0;

  @ElementCollection
  @CollectionTable(name = "tour_dates", joinColumns = @JoinColumn(name = "tour_id"))
  @Column(name = "date")
  private List<LocalDate> availableDates;

  @Lob
  @Column(name = "image_data", columnDefinition = "LONGBLOB")
  private byte[] imageData;

  @ManyToMany(mappedBy = "likedTours")
  private List<User> likedByUsers = new ArrayList<>();


  public Tour(int durationMinutes, double price, int likes, String contentType, List<LocalDate> availableDates, byte[] imageData, String title) {
    this.durationMinutes = durationMinutes;
    this.price = price;
    this.likes = likes;
    this.contentType = contentType;
    this.availableDates = availableDates;
    this.imageData = imageData;
    this.title = title;
  }

  public Tour() {
  }

  public Long getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public int getDurationMinutes() {
    return durationMinutes;
  }

  public void setDurationMinutes(int durationMinutes) {
    this.durationMinutes = durationMinutes;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public String getContentType() {
    return contentType;
  }

  public void setContentType(String contentType) {
    this.contentType = contentType;
  }

  public byte[] getImageData() {
    return imageData;
  }

  public void setImageData(byte[] imageData) {
    this.imageData = imageData;
  }

  public int getLikes() {
    return likes;
  }

  public void setLikes(int likes) {
    this.likes = likes;
  }

  public List<LocalDate> getAvailableDates() {
    return availableDates;
  }

  public void setAvailableDates(List<LocalDate> availableDates) {
    this.availableDates = availableDates;
  }

}