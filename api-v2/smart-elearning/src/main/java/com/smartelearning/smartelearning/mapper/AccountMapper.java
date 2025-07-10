/*
 *  AccountMapper
 *  @author: minhhieuano
 *  @created 7/9/2025 10:56 PM
 * */

package com.smartelearning.smartelearning.mapper;

import com.smartelearning.smartelearning.dto.request.CreateAccountRequest;
import com.smartelearning.smartelearning.dto.response.AccountPublicInfoResponse;
import com.smartelearning.smartelearning.dto.response.AccountResponse;
import com.smartelearning.smartelearning.entity.Account;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AccountMapper {
    AccountMapper INSTANCE = Mappers.getMapper(AccountMapper.class);

    Account toAccount(CreateAccountRequest request);

    AccountResponse toAccountResponse(Account account);

    AccountPublicInfoResponse toAccountPublicInfoResponse(Account account);
}
