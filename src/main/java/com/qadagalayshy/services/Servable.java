package com.qadagalayshy.services;

import java.util.List;

interface Servable<T> {

    T save(T payload);
    List<T> findAll();
    T findById(Long id);
    T update(T payload);
    void remove(Long id);
}