package com.zc.common.exception;

public class ZCException
  extends GenericException
{
  private static final long serialVersionUID = 1L;
  
  public ZCException(String message)
  {
    super(message);
    this.errorMessage = message;
  }
  
  public ZCException(String errcode, String message)
  {
    super(message);
    this.errorCode = errcode;
    this.errorMessage = message;
  }
  
  public ZCException(Exception oriEx)
  {
    super(oriEx);
  }
  
  public ZCException(Throwable oriEx)
  {
    super(oriEx);
  }
  
  public ZCException(String message, Exception oriEx)
  {
    super(message, oriEx);
    this.errorMessage = message;
  }
  
  public ZCException(String message, Throwable oriEx)
  {
    super(message, oriEx);
    this.errorMessage = message;
  }
}
