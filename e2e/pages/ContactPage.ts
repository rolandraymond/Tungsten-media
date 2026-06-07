/* import { type Locator, type Page } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // استخدام User-facing locators مرنة تدعم العربي والإنجليزي
    this.nameInput = page.getByLabel(/Name|الاسم/i);
    this.emailInput = page.getByLabel(/Email|البريد/i);
    this.messageInput = page.getByLabel(/Message|الرسالة/i);
    
    // زرار الإرسال
    this.submitBtn = page.getByRole('button', { name: /Submit|إرسال/i });
  }

  async goto() {
    // 1. نفتح الصفحة الرئيسية الأول (عشان نضمن إن React والسيرفر حملوا تماماً)
    await this.page.goto('/');
    
    // 2. ندوس على لينك صفحة التواصل من الـ Navbar (بنختار اللينك عن طريق الـ href بتاعه عشان نضمن الدقة في اللغتين)
    await this.page.locator('a[href="/contact"]').first().click();

    // 3. نستنى لحد ما الصفحة تحمل وكل الـ API requests تخلص
    await this.page.waitForLoadState('networkidle');
  }

  async fillForm(name: string, email: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.messageInput.fill(message);
  }

  async submit() {
    await this.submitBtn.click();
  }
} */