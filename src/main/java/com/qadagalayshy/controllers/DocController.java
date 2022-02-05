package com.qadagalayshy.controllers;

import com.qadagalayshy.entities.Doc;
import com.qadagalayshy.services.DocService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/doc")
@AllArgsConstructor
class DocController {
    private final DocService docService;

    @GetMapping("/")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(
            this.docService.findAll()
        );
    }
    
    @GetMapping("/{docId}")
    public ResponseEntity<?> findById(@PathVariable String docId) throws NumberFormatException {
        return ResponseEntity.ok().body(
            this.docService.findById(Long.parseLong(docId))
        );
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Doc doc) {
        return ResponseEntity.ok().body(
            this.docService.save(doc)
        );
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody Doc doc) {
        return ResponseEntity.ok().body(
            this.docService.update(doc)
        );
    }

    @PostMapping("/remove/{docId}")
    public ResponseEntity<?> remove(@PathVariable String docId) throws NumberFormatException {
        return null;
    }
}
