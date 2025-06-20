package lt.techin.praktika.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tour_likes", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "tour_id"})
})
public class TourLike {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(optional = false)
  @JoinColumn(name = "tour_id")
  private Tour tour;

  // Konstruktoriai, getteriai, setteriai
  public TourLike() {
  }

  public TourLike(User user, Tour tour) {
    this.user = user;
    this.tour = tour;
  }

  public Long getId() {
    return id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Tour getTour() {
    return tour;
  }

  public void setTour(Tour tour) {
    this.tour = tour;
  }
}

