namespace empMgmt;
using {empMgmt.GENDER_MASTER, empMgmt.ADDRESS_MASTER} from '../db/MASTER_TABLES';

entity EMPLOYEE_DETAILS {
   
  key   ID           : Integer64;
        NAME         : String(40);
        PHONE        : String(20);  
        EMAIL        : String(40);              
}

entity ADDRESS_DETAILS {
   
  key   PINCODE      : Integer64;
        CITY         : String(40);
        STATE        : String(20);  
        LANDMARK     : String(40);              
}


entity STUDENT_DETAILS {
   
  key   ROLLNO       : Integer64;
        NAME         : String(40);
        PHONE        : String(20);  
        EMAIL        : String(40);              
        AGE          : String(40);
        GENDER       : String(40);
        ADDRESS      : String(40);
        SUBJECT      : String(40);
        DIVISION     : String(10);
        MARKS        : Integer64;  
        TO_GENDER_DESC : Association to GENDER_MASTER 
                         on TO_GENDER_DESC.GENDER = GENDER;
        TO_ADDRESS_DESC : Association to ADDRESS_MASTER 
                         on TO_ADDRESS_DESC.ADDRESS = ADDRESS;
}