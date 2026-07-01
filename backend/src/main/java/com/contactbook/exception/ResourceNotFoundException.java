package com.contactbook.exception;

/**
 * Thrown when a contact is looked up by id but doesn't exist in the database.
 * Caught by GlobalExceptionHandler and turned into a clean 404 response.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
