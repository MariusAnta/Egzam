package lt.techin.praktika.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  @NotBlank(message = "Role name cannot be empty.")
  private String name;

  @ManyToMany(mappedBy = "roles")
  private final List<User> users = new ArrayList<>();

  public Role(String name) {
    this.name = name;
  }

  public Role() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String getAuthority() {
    return this.name;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;                      // tas pats objektas
    if (o == null || getClass() != o.getClass()) return false;  // ne tas pats tipas arba null

    Role role = (Role) o;

    return name != null ? name.equals(role.name) : role.name == null;  // lyginame pagal name
  }

  @Override
  public int hashCode() {
    return name != null ? name.hashCode() : 0;
  }
}
