package com.example.Demo.exception;

import com.example.Demo.dto.response.DemoResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class APIExceptionHandler {
    /**
     * Handle bad request exception.
     *
     * @param e RuntimeException
     * @return ResponseEntity
     */
    @ExceptionHandler({ RuntimeException.class })
    public ResponseEntity<?> handleBadRequestException(RuntimeException e) {
        return ResponseEntity.status(400).body(
                DemoResponse.builder()
                        .success(false)
                        .message(e.getMessage())
                        .data(null)
                        .build()
        );
    }

    /**
     * Handle internal error exception.
     *
     * @param ignored Exception (ignored)
     * @return ResponseEntity
     */
    @ExceptionHandler({ Exception.class })
    public ResponseEntity<?> handleInternalError(Exception ignored) {
        return ResponseEntity.status(500).body(
                DemoResponse.builder()
                        .success(false)
                        .message("Internal server error")
                        .data(null)
                        .build()
        );
    }
}
