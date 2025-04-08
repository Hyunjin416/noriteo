package com.ptu.noriteo.model;


import lombok.Data;

import java.util.Date;

@Data
public class Users {
    private Long userId;
    private String provider;
    private String providerId;
    private String userEmail;
    private String password;
    private Long roleId = 2L;
    private String userName;
    private String gender;
    private String mobile;
    private String phone;
    private String birth;
    private String zipcode;
    private String address1;
    private String address2;
    private Date userRegDate;
    private String originUser;
    private String sysUser;
}
