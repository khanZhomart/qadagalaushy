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
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/doc")
@AllArgsConstructor
@Slf4j
class DocController {
    private final DocService docService;

    @GetMapping("/")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(
            this.docService.findAll()
        );
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<?> findAllByUser(@PathVariable String username) {
        return ResponseEntity.ok().body(
            this.docService.findAllByUsername(username)
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
        log.warn(doc.toString());
        return ResponseEntity.ok().body(
            this.docService.update(doc)
        );
    }

    @PostMapping("/remove/{docId}")
    public ResponseEntity<?> remove(@PathVariable String docId) throws NumberFormatException {
        this.docService.remove(Long.parseLong(docId));

        return ResponseEntity.ok("success");
    }
}