package com.cloud0072.apigrid.framework.exception;

import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.exception.BackendException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.naming.AuthenticationException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public AjaxResult handleException(Exception e) {
        return AjaxResult.error(e.getMessage());
    }

    @ExceptionHandler(BackendException.class)
    public AjaxResult handleBackendException(BackendException e) {
        return AjaxResult.error(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
    }

    @ExceptionHandler(AuthenticationException.class)
    public AjaxResult handleAuthenticationException(AuthenticationException e) {
        return AjaxResult.error(HttpStatus.UNAUTHORIZED.value(), e.getMessage());
    }

}
