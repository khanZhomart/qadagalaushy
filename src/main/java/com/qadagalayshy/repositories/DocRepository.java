package com.qadagalayshy.repositories;

import com.qadagalayshy.entities.Doc;
import com.qadagalayshy.entities.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocRepository extends CrudRepository<Doc, Long> {
    
    Iterable<Doc> findAllByResponsibleEmployee(User user);
}