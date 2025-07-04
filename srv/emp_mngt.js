const cds = require('@sap/cds');
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');
const hdbext = require("@sap/hdbext");
const { request } = require('http');
const { join } = require('path');
const dbClass = require("sap-hdbext-promisfied");

module.exports = cds.service.impl(async function () {
    const client = await dbClass.createConnectionFromEnv();
    const dbconn = new dbClass(client);

    this.on('post_emp_data', async (req) => {
        const { id, name, phone, email } = req.data;
        try {
            await INSERT.into('EMPMGMT_EMPLOYEE_DETAILS').entries({
                ID: id, NAME: name, PHONE: phone, EMAIL: email
            });
            return "success";
        } catch (error) {
            console.error("Error in post_emp_data:", error);
            return "error";
        }
    });


    this.on('post_address_data', async (req) => {
        const { pincode, city, state, landmark } = req.data;
        try {
            await INSERT.into('EMPMGMT_ADDRESS_DETAILS').entries({
                PINCODE: pincode, CITY: city, STATE: state, LANDMARK: landmark
            });
            return "success";
        } catch (error) {
            console.error("Error in post_address_data:", error);
            return "error";
        }
    });


    this.on('post_multiple_address_data', async (req) => {
        const { details } = req.data;
        try {
            const sp = await dbconn.loadProcedurePromisified(hdbext, null, 'ADDRESS_DATA');
            await dbconn.callProcedurePromisified(sp, details);
            return "success";
        } catch (error) {
            console.error("Error in post_multiple_address_data:", error);
            return "error";
        }
    });


    this.on('post_multiple_emp_data', async (req) => {
        const { details } = req.data;
        try {

            var validPhoneNumber = details[0].PHONE

            for (let i = 0; i < details.length; i++) {

                if (validPhoneNumber.length < 11 && validPhoneNumber.length > 9) {
                    const sp = await dbconn.loadProcedurePromisified(hdbext, null, 'EMP_DATA');
                    await dbconn.callProcedurePromisified(sp, [details[i]]);

                } else {
                    req.reject("invalid phone number entered");
                }
            }
            return "success";
        } catch (error) {
            console.error("Error in post_multiple_emp_data:", error);
            return "error";
        }
    });


    this.on('post_std_data', async (req) => {
        const { rollno, name, phone, email, age, gender, address, subject, division, marks } = req.data;
        try {
            await INSERT.into('STUDENT_DETAILS').entries({
                ROLLNO: rollno,
                NAME: name,
                PHONE: phone,
                EMAIL: email,
                AGE: age,
                GENDER: gender,
                ADDRESS: address,
                SUBJECT: subject,
                DIVISION: division,
                MARKS: marks
            });
            return "success";
        } catch (error) {
            console.error("Error in post_std_data:", error);
            return "error";
        }
    });


    this.on('post_multiple_std_data', async (req) => {
        const { details } = req.data;
        try {

            var name;
            for (let i = 0; i < details.length; i++) {
                const validMarks = details[i].MARKS;
                const validAge = details[i].AGE;
                const validDivision = details[i].DIVISION

                var duplicateName = await SELECT`NAME`.from`EMPMGMT_STUDENT_DETAILS`;
                for (let j = 0; j < duplicateName.length; j++) {
                    name = details[i].NAME;
                    if (duplicateName[j].NAME == name) {
                        req.reject("This name is already registered, choose another name")
                    }
                }

                var duplicateEmail = await SELECT`EMAIL`.from`EMPMGMT_STUDENT_DETAILS`;
                for (let j = 0; j < duplicateEmail.length; j++) {
                    email = details[i].EMAIL;
                    if (duplicateEmail[j].EMAIL == email) {
                        req.reject("This email is already registered, choose another email")
                    }
                }
  

                const errors = [];
            if (validMarks > 100)
            {
                errors.push("Marks must be less than 100")
            }
            if (validAge > 30)
            {
                errors.push("Age should be less than 30")
            }
            if (!(validDivision =='A' || validDivision =='B' || validDivision == 'C' || validDivision === 'D'))
            {
                errors.push("Divsion should be either A,B,C or D")
            }

            if (errors.length > 0) {
                req.reject(
                    `Invalid data for student '${details[i].NAME}' at index ${i}: ${errors.join(", ")}`
                );
            }

            const sp = await dbconn.loadProcedurePromisified(hdbext, null, 'STUDENT_DATA');
            await dbconn.callProcedurePromisified(sp, [details[i]]);
        }

        return "success";
    } catch (error) {
        console.error("Error in post_multiple_std_data:", error);
        return "error";
    }
});
});

                // if (validMarks < 100 && validAge < 30 && validDivision == 'A' || validDivision == 'B' || validDivision == 'C' || validDivision === 'D') {
//                     const sp = await dbconn.loadProcedurePromisified(hdbext, null, 'STUDENT_DATA');
//                     await dbconn.callProcedurePromisified(sp, [details[i]]);
//                 } else {
//                     req.reject(`Invalid data for student: Marks must be < 100 and Age must be < 30 and Division should be A,B,C or D`);
//                 }
//             }
//             }
//             {
//             return "success";
//         } catch (error) {
//             console.error("Error in post_multiple_std_data:", error);
//             return "error";
//         }
//     });
// });