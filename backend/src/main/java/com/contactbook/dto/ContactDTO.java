package com.contactbook.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object used to receive/send contact data through the API.
 * We keep this separate from the Entity so validation rules live here
 * and the frontend only ever talks to this shape of object.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactDTO {

    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be exactly 10 digits")
    private String mobile;

    @Email(message = "Email should be valid")
    private String email;

    private String city;
}
