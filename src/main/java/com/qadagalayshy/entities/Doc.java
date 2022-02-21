package com.qadagalayshy.entities;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "docs")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Data
public class Doc {
    
    @Id
    private Long docId;

    @OneToOne
    @JoinColumn(name = "doc_user", referencedColumnName = "userId")
    private User responsibleEmployee;

    private String agency;
    private String division;

    @DateTimeFormat(pattern = "dd.MM.yyyy")
    private Date assignmentDate;

    private String report;

    private Boolean legal;
}
