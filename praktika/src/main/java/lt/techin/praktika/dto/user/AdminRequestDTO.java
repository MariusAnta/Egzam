package lt.techin.praktika.dto.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AdminRequestDTO(
        @NotNull
        @Size(min = 5, max = 100)
        String password,

        @NotNull
        @Size(min = 5, max = 100)
        String username
) {
}
