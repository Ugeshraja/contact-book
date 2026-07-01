package com.contactbook.service;

import com.contactbook.dto.ContactDTO;

import java.util.List;

/**
 * Service layer contract. The controller talks to this interface,
 * and ContactServiceImpl provides the actual logic.
 * Keeping an interface makes the code easier to test and extend.
 */
public interface ContactService {

    List<ContactDTO> getAllContacts();

    ContactDTO getContactById(Long id);

    ContactDTO createContact(ContactDTO contactDTO);

    ContactDTO updateContact(Long id, ContactDTO contactDTO);

    void deleteContact(Long id);

    List<ContactDTO> searchContacts(String keyword);
}
