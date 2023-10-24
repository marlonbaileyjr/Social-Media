package common;

import com.example.lasya.SocialMediaApp.exception.LikeNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.reactive.result.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class LikeExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler({LikeNotFoundException.class})
    public final ResponseEntity<String> handleLikeNotFoundException(LikeNotFoundException ex, WebRequest request) {
        return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
