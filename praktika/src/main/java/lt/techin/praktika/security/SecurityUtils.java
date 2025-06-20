package lt.techin.praktika.security;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

public class SecurityUtils {
  public static String getCurrentAuthenticatedUsername() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getName())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Vartotojas neprisijungęs.");
    }
    return authentication.getName();
  }
}
