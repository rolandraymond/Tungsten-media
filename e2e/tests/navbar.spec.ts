import { test, expect } from '@playwright/test';
import { NavbarPage } from '../pages/NavbarPage';

test.describe('Navbar Global States', () => {
  let navbar: NavbarPage;

  // قبل كل تيست، بنفتح الصفحة الرئيسية وبنجهز الـ POM
  test.beforeEach(async ({ page }) => {
    navbar = new NavbarPage(page);
    await navbar.goto();
  });

  test('Should toggle Dark and Light theme correctly', async () => {
    // الحالة الافتراضية في الـ Context هي dark
    await expect(navbar.htmlTag).toHaveClass(/dark/);

    // نضغط على زرار تغيير الـ Theme
    await navbar.toggleTheme();

    // نتأكد إن كلاس الـ dark اتشال (بقى Light mode)
    await expect(navbar.htmlTag).not.toHaveClass(/dark/);
  });

  test('Should change language to Arabic, update text and document direction', async () => {
    // الحالة الافتراضية هي الإنجليزي
    await expect(navbar.htmlTag).toHaveAttribute('lang', 'en');
    await expect(navbar.htmlTag).toHaveAttribute('dir', 'ltr');
    await expect(navbar.startProjectBtn).toHaveText('Start Project');

    // نضغط على زرار اللغة
    await navbar.toggleLanguage();

    // نتأكد إن الـ Attributes اتغيرت لدعم الـ RTL
    await expect(navbar.htmlTag).toHaveAttribute('lang', 'ar');
    await expect(navbar.htmlTag).toHaveAttribute('dir', 'rtl');

    // نتأكد إن النص جوه الزرار اتترجم فعلياً
    await expect(navbar.startProjectBtn).toHaveText('ابدأ مشروعك');
  });

  test('Should navigate to contact page when Start Project is clicked', async ({ page }) => {
    // نضغط على زرار ابدأ مشروع
    await navbar.clickStartProject();

    // نتأكد إن الـ URL اتغير لـ /contact
    await expect(page).toHaveURL(/\/contact/);
  });
});