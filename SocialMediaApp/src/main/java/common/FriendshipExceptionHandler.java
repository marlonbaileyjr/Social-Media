package common;

import com.example.lasya.SocialMediaApp.exception.FriendshipNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.reactive.result.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class FriendshipExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler({FriendshipNotFoundException.class})
    public final ResponseEntity<String> handleFriendshipNotFoundException(FriendshipNotFoundException ex, WebRequest request) {
        return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
