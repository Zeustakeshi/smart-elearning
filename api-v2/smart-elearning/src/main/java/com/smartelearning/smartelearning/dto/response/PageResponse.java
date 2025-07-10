/*
 *  PageResponse
 *  @author: minhhieuano
 *  @created 7/10/2025 7:58 PM
 * */


package com.smartelearning.smartelearning.dto.response;


import lombok.Data;

import java.util.List;

@Data
public class PageResponse<T> {
    private int totalPages;
    private int totalElements;
    private int size;
    private List<T> content;
    private boolean first;
    private boolean last;
    private int pageNumber;
    private boolean empty;
}