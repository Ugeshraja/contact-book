package com.contactbook.serviceimpl;

import com.contactbook.dto.ContactDTO;
import com.contactbook.entity.Contact;
import com.contactbook.exception.ResourceNotFoundException;
import com.contactbook.repository.ContactRepository;
import com.contactbook.service.ContactService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Actual business logic for contact CRUD + search.
 * Converts between Entity (Contact) and DTO (ContactDTO) so the rest of
 * the app never has to deal with JPA entities directly.
 */
@Service
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    // Constructor injection - Spring automatically provides the repository bean
    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public List<ContactDTO> getAllContacts() {
        return contactRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ContactDTO getContactById(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found with id: " + id));
        return convertToDTO(contact);
    }

    @Override
    public ContactDTO createContact(ContactDTO contactDTO) {
        Contact contact = new Contact();
        // Copy fields from DTO to entity, ignore id (auto-generated)
        BeanUtils.copyProperties(contactDTO, contact);
        contact.setId(null);
        Contact saved = contactRepository.save(contact);
        return convertToDTO(saved);
    }

    @Override
    public ContactDTO updateContact(Long id, ContactDTO contactDTO) {
        Contact existing = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found with id: " + id));

        existing.setName(contactDTO.getName());
        existing.setMobile(contactDTO.getMobile());
        existing.setEmail(contactDTO.getEmail());
        existing.setCity(contactDTO.getCity());

        Contact updated = contactRepository.save(existing);
        return convertToDTO(updated);
    }

    @Override
    public void deleteContact(Long id) {
        Contact existing = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found with id: " + id));
        contactRepository.delete(existing);
    }

    @Override
    public List<ContactDTO> searchContacts(String keyword) {
        return contactRepository.searchByNameOrMobile(keyword)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Helper: Entity -> DTO
    private ContactDTO convertToDTO(Contact contact) {
        ContactDTO dto = new ContactDTO();
        BeanUtils.copyProperties(contact, dto);
        return dto;
    }
}
