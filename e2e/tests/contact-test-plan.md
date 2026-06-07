<!-- ### 1. Contact Form Verification
**Test File:** `e2e/tests/contact-form.spec.ts`

#### 1.1 Submit contact form with missing required fields
**Steps:**
1. Navigate to the contact page (`/contact`).
2. Click the Submit (إرسال) button without filling any fields.
**Verify:** Validation error messages appear for the required fields (Name, Email, Message).

#### 1.2 Fill and verify form fields
**Steps:**
1. Navigate to the contact page (`/contact`).
2. Fill the Name field with "Mario Morris".
3. Fill the Email field with "mario@example.com".
4. Fill the Message field with "Automated test message for Tungsten framework."
**Verify:** The entered values are correctly reflected in the input fields. -->