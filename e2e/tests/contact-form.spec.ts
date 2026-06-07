/* import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';

test.describe('Contact Form Verification', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.goto();
  });

  test('1.1 Should show validation errors when submitting an empty form', async ({ page }) => {
    // الضغط على زرار الإرسال وهو فاضي
    await contactPage.submit();

    // التحقق من ظهور رسائل الخطأ للحقوق المطلوبة
    const errorMessages = page.locator('text=/required|مطلوب|ملء/i');
    
    // نتأكد إن في رسائل خطأ ظهرت على الشاشة فعلياً
    await expect(errorMessages.first()).toBeVisible();
  });

  test('1.2 Should successfully fill form fields and retain values', async () => {
    const testData = {
      name: 'Mario Morris',
      email: 'mario@example.com',
      message: 'Automated test message for Tungsten framework.'
    };

    // ملء البيانات
    await contactPage.fillForm(testData.name, testData.email, testData.message);

    // التحقق من أن القيم مكتوبة وصحيحة داخل الحقول قبل الإرسال
    await expect(contactPage.nameInput).toHaveValue(testData.name);
    await expect(contactPage.emailInput).toHaveValue(testData.email);
    await expect(contactPage.messageInput).toHaveValue(testData.message);
  });
}); */