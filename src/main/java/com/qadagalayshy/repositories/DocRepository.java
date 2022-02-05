package com.qadagalayshy.repositories;

import com.qadagalayshy.entities.Doc;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocRepository extends CrudRepository<Doc, Long> {
    
}