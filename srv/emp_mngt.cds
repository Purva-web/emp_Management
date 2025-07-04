using { empMgmt as emp } from '../db/schema';

service employee {
    entity employee_details as projection on emp.EMPLOYEE_DETAILS;
    entity address_details as projection on emp.ADDRESS_DETAILS;
    entity student_details as projection on emp.STUDENT_DETAILS;

    action post_std_data (
        rollno: Integer,
        name: String,
        phone: String,
        email: String,
        age: String,
        gender: String,
        address: String,
        subject: String,
        division: String,
        marks: Integer
    ) returns String;

    action post_emp_data (id: Integer, name: String, phone: String, email: String) returns String;
    action post_address_data (pincode: Integer, city: String, state: String, landmark: String) returns String;
    action post_multiple_address_data(details: many address_details) returns String;
    action post_multiple_emp_data (details : many employee_details) returns String;
    action post_multiple_std_data(details: many student_details) returns String;


}
