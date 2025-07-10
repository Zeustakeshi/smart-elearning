/*
 *  PageMapper
 *  @author: minhhieuano
 *  @created 7/10/2025 8:14 PM
 * */

package com.smartelearning.smartelearning.mapper;

import com.smartelearning.smartelearning.dto.response.PageResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring")
public interface PageMapper {

    PageMapper INSTANCE = Mappers.getMapper(PageMapper.class);

    @Mapping(source = "totalPages", target = "totalPages")
    @Mapping(source = "totalElements", target = "totalElements")
    @Mapping(source = "size", target = "size")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "first", target = "first")
    @Mapping(source = "last", target = "last")
    @Mapping(source = "number", target = "pageNumber")
    @Mapping(source = "empty", target = "empty")
    PageResponse toPageableResponse(Page page);
}