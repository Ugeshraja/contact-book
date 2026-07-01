package com.contactbook.repository;

import com.contactbook.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Repository interface - Spring Data JPA automatically implements this
 * for us at runtime. It gives us save(), findAll(), findById(), deleteById()
 * for free, and we add one custom search query below.
 */
public interface ContactRepository extends JpaRepository<Contact, Long> {

    /**
     * Searches contacts whose name OR mobile number contains the given keyword.
     * Case-insensitive search on the name field.
     */
    @Query("SELECT c FROM Contact c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR c.mobile LIKE CONCAT('%', :keyword, '%')")
    List<Contact> searchByNameOrMobile(@Param("keyword") String keyword);
}
