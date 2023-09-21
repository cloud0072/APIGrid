package com.cloud0072.apigrid.common.exception;

/**
 * 业务异常
 *
 * @author ruoyi
 */
public final class BackendException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    /**
     * 错误码
     */
    private Integer code;

    /**
     * 错误提示
     */
    private String message;

    /**
     * 错误明细，内部调试错误
     */
    private String detailMessage;

    /**
     * 空构造方法，避免反序列化问题
     */
    public BackendException() {
    }

    public BackendException(String message) {
        this.message = message;
    }

    public BackendException(String message, Integer code) {
        this.message = message;
        this.code = code;
    }

    public String getDetailMessage() {
        return detailMessage;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public Integer getCode() {
        return code;
    }

    public BackendException setMessage(String message) {
        this.message = message;
        return this;
    }

    public BackendException setDetailMessage(String detailMessage) {
        this.detailMessage = detailMessage;
        return this;
    }
}