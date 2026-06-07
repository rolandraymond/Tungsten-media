import { type Locator, type Page } from '@playwright/test';

export class NavbarPage {
  readonly page: Page;
  readonly desktopNav: Locator;
  readonly startProjectBtn: Locator;
  readonly themeToggleBtn: Locator;
  readonly langToggleBtn: Locator;
  readonly htmlTag: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // نحدد الـ Navbar الخاص بالديسكتوب عشان ما يحصلش تعارض مع قائمة الموبايل
    this.desktopNav = page.locator('nav').filter({ hasText: 'Tungsten' });

    // تحديد زرار ابدأ مشروع (بيدعم اللغتين)
    this.startProjectBtn = this.desktopNav.getByRole('button', { name: /Start Project|ابدأ مشروعك/i }).first();
    
    // التعديل هنا: ضفنا ^ في الأول و $ في الآخر عشان يكون المطابقة دقيقة بنسبة 100%
    this.langToggleBtn = this.desktopNav.getByRole('button', { name: /^(AR|EN)$/i });

    // تحديد زرار الـ Theme (بما إنه مفيهوش نص، بنعتمد على الـ SVG الخاص بـ Lucide)
    this.themeToggleBtn = this.desktopNav.locator('button').filter({
      has: page.locator('svg.lucide-sun, svg.lucide-moon')
    }).first();

    // تحديد تاج الـ html لاختبار الـ Attributes الخاصة باللغة والـ Theme
    this.htmlTag = page.locator('html');
  }

  async goto() {
    await this.page.goto('/');
  }

  async toggleTheme() {
    await this.themeToggleBtn.click();
  }

  async toggleLanguage() {
    await this.langToggleBtn.click();
  }

  async clickStartProject() {
    await this.startProjectBtn.click();
  }
}