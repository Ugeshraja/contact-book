package com.contactbook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity class that maps to the "contacts" table in MySQL.
 * Every field here becomes a column in the table.
 */
@Entity
@Table(name = "contacts")
@Data                 // Lombok: generates getters, setters, toString, equals, hashCode
@NoArgsConstructor     // Lombok: generates empty constructor (required by JPA)
@AllArgsConstructor    // Lombok: generates constructor with all fields
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "mobile", nullable = false, length = 10)
    private String mobile;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "city", length = 100)
    private String city;
}
