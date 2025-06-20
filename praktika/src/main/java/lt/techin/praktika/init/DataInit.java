package lt.techin.praktika.init;

import lt.techin.praktika.model.Role;
import lt.techin.praktika.model.User;
import lt.techin.praktika.repository.RoleRepository;
import lt.techin.praktika.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInit implements CommandLineRunner {
  private final RoleRepository roleRepository;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public DataInit(RoleRepository roleRepository,
                  UserRepository userRepository,
                  PasswordEncoder passwordEncoder) {
    this.roleRepository = roleRepository;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public void run(String... args) {
    // 1. Create roles
    Role userRole = roleRepository.findByName("ROLE_USER")
            .orElseGet(() -> roleRepository.save(new Role("ROLE_USER")));

    Role adminRole = roleRepository.findByName("ROLE_ADMIN")
            .orElseGet(() -> roleRepository.save(new Role("ROLE_ADMIN")));

    // 2. Create admin user if not exists
    String adminUsername = "admin";
    if (userRepository.findByUsername(adminUsername).isEmpty()) {
      String encodedPassword = passwordEncoder.encode("admin");
      User adminUser = new User(encodedPassword, adminUsername, List.of(userRole, adminRole));
      userRepository.save(adminUser);
      System.out.println("Admin user created.");
    }
  }
}

