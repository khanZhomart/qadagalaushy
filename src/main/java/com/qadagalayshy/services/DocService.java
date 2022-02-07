package com.qadagalayshy.services;

import java.util.List;

import com.google.common.collect.Lists;
import com.qadagalayshy.entities.Doc;
import com.qadagalayshy.repositories.DocRepository;
import com.qadagalayshy.utils.DocUtil;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class DocService implements Servable<Doc> {
    private final DocRepository docRepository;

    @Override
    public Doc save(Doc payload) {
        if (this.docRepository.existsById(payload.getDocId()))
            return null;

        log.info(payload.toString());

        return this.docRepository.save(payload);
    }

    @Override
    public List<Doc> findAll() {
        return Lists.newArrayList(
            this.docRepository.findAll()
        );
    }

    @Override
    public Doc findById(Long id) {
        return this.docRepository.findById(id).orElse(null);
    }

    @Override
    public Doc update(Doc payload) {
        Doc current = this.findById(payload.getDocId());
        Doc doc = DocUtil.mergeInstances(current, payload);

        return this.docRepository.save(doc);
    }

    @Override
    public void remove(Long id) {
        this.docRepository.deleteById(id);
    }

}