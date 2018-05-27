package com.zc.system.databinding;

import java.text.SimpleDateFormat;

import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.support.WebBindingInitializer;
import org.springframework.web.context.request.WebRequest;

import com.zc.common.utils.DateUtil;



public class DataBinding implements WebBindingInitializer {

    public void initBinder(WebDataBinder binder, WebRequest request) {
        SimpleDateFormat dateFormat = new SimpleDateFormat(DateUtil.DATE_FORMAT);
        dateFormat.setLenient(false);

        SimpleDateFormat datetimeFormat = new SimpleDateFormat(DateUtil.DATETIME_FORMAT);
        datetimeFormat.setLenient(false);

        binder.registerCustomEditor(java.util.Date.class, new CustomDateEditor(dateFormat, true));
        binder.registerCustomEditor(java.sql.Timestamp.class, new CustomTimestampEditor(
                datetimeFormat, true));
    }
}
