package com.qadagalayshy.utils;

import com.qadagalayshy.entities.Doc;

public class DocUtil {
    
    public static Doc mergeInstances(Doc doc1, Doc doc2) {
        return Doc.builder()
            .docId(doc1.getDocId())
            .responsibleEmployee(doc2.getResponsibleEmployee() == null ? doc1.getResponsibleEmployee() : doc2.getResponsibleEmployee())
            .agency(doc2.getAgency() == null ? doc1.getAgency() : doc2.getAgency())
            .division(doc2.getDivision() == null ? doc1.getDivision() : doc2.getDivision())
            .assignmentDate(doc2.getAssignmentDate() == null ? doc1.getAssignmentDate() : doc2.getAssignmentDate())
            .report(doc2.getReport() == null ? doc1.getReport() : doc2.getReport())
            .legal(doc2.getLegal() == null ? doc1.getLegal() : doc2.getLegal())
            .build();
    }
}
