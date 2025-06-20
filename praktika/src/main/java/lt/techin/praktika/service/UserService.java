package lt.techin.praktika.service;

import lt.techin.praktika.model.User;
import lt.techin.praktika.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

  private final UserRepository userRepository;

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public List<User> findAllUsers() {
    return this.userRepository.findAll();
  }

  public User saveUser(User user) {
    return this.userRepository.save(user);
  }

  public boolean existsUserByUsername(String username) {
    return this.userRepository.existsByUsername(username);
  }

  public Optional<User> findUserByUsername(String username) {
    return this.userRepository.findByUsername(username);
  }

  public User findByUsername(String username) {
    return userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
  }

  public Optional<User> findUserById(long id) {
    return userRepository.findById(id);
  }

  public void deleteUserByID(long id) {
    this.userRepository.deleteById(id);
  }
}

