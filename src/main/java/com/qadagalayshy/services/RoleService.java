package com.qadagalayshy.services;

import java.util.List;

import com.qadagalayshy.entities.Role;
import com.qadagalayshy.repositories.RoleRepository;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RoleService implements Servable<Role> {
    private final RoleRepository roleRepository;

    @Override
    public Role save(Role payload) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Role> findAll() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Role> findById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Role update(Role payload) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void remove(Long id) {
        // TODO Auto-generated method stub
        
    }

}