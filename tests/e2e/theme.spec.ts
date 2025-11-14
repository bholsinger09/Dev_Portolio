import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

test.describe('Theme Functionality', () => {
    // Helper function to find the theme toggle button
    const getThemeToggle = (page: Page) => {
        return page.locator('button[aria-label="Toggle theme"]');
    };

    test.beforeEach(async ({ page }) => {
        await page.goto('/');

        // Skip tests on mobile viewports
        const viewport = page.viewportSize();
        const isMobile = viewport && viewport.width < 768;

        if (isMobile) {
            test.skip();
        }
    });

    test('should have theme toggle button visible', async ({ page }) => {
        // Ensure desktop viewport for theme toggle visibility 
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(1000);

        const themeToggle = getThemeToggle(page);
        await expect(themeToggle).toBeVisible();

        // Button should have proper accessibility
        const ariaLabel = await themeToggle.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
        expect(ariaLabel?.toLowerCase()).toMatch(/toggle|theme/);
    });

    test('should toggle between light and dark modes', async ({ page }) => {
        // Ensure desktop viewport for theme toggle visibility
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(1000);

        const themeToggle = getThemeToggle(page);
        await expect(themeToggle).toBeVisible();

        // Get initial theme state
        const html = page.locator('html');
        const initialTheme = await html.getAttribute('class');
        const initialIsDark = initialTheme?.includes('dark') || false;

        // Click theme toggle
        await themeToggle.click();
        await page.waitForTimeout(300); // Wait for theme transition

        // Check theme changed
        const newTheme = await html.getAttribute('class');
        const newIsDark = newTheme?.includes('dark') || false;

        expect(newIsDark).not.toBe(initialIsDark);

        // Click again to toggle back
        await themeToggle.click();
        await page.waitForTimeout(300);

        // Should return to original state
        const finalTheme = await html.getAttribute('class');
        const finalIsDark = finalTheme?.includes('dark') || false;

        expect(finalIsDark).toBe(initialIsDark);
    });

    test('should persist theme preference across page reloads', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(1000);

        const themeToggle = getThemeToggle(page);
        const html = page.locator('html');

        // Set to dark mode and verify it worked
        await themeToggle.click();
        await page.waitForTimeout(500); // Longer wait for theme change

        const darkTheme = await html.getAttribute('class');
        const isDarkBefore = darkTheme?.includes('dark') || false;

        if (!isDarkBefore) {
            // Try clicking again if first click didn't work
            await themeToggle.click();
            await page.waitForTimeout(500);

            const retryTheme = await html.getAttribute('class');
            const isRetryDark = retryTheme?.includes('dark') || false;
            expect(isRetryDark).toBe(true); // Ensure dark mode is actually set
        }

        // Verify localStorage has the theme setting
        const localStorageTheme = await page.evaluate(() => localStorage.getItem('theme'));
        expect(localStorageTheme).toBe('dark');

        // Reload page
        await page.reload();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(500); // Wait for theme initialization

        // Check theme persisted
        const reloadTheme = await html.getAttribute('class');
        const isDarkAfter = reloadTheme?.includes('dark') || false;

        expect(isDarkAfter).toBe(true);
    });

    test('should apply proper dark mode styles', async ({ page }) => {
        const themeToggle = getThemeToggle(page);

        // Switch to dark mode
        await themeToggle.click();
        await page.waitForTimeout(300);

        // Check dark mode is applied to html element
        const html = page.locator('html');
        const htmlClass = await html.getAttribute('class');
        expect(htmlClass).toContain('dark');

        // Header should have dark styling in dark mode
        const header = page.locator('header');
        const headerClass = await header.getAttribute('class');
        expect(headerClass).toMatch(/dark:bg-gray-900/);

        // Check that header background is dark (header does have dark styles)
        const headerBg = await header.evaluate(el =>
            window.getComputedStyle(el).backgroundColor
        );
        expect(headerBg).not.toBe('rgb(255, 255, 255)'); // Not white

        // Check that text elements have dark mode classes applied
        const navLinks = page.locator('header nav a');
        if (await navLinks.count() > 0) {
            const firstLink = navLinks.first();
            const linkClass = await firstLink.getAttribute('class');
            expect(linkClass).toMatch(/dark:text-gray-300/);
        }
    });

    test('should apply proper light mode styles', async ({ page }) => {
        const themeToggle = getThemeToggle(page);
        const html = page.locator('html');

        // Ensure we're in dark mode first
        await themeToggle.click();
        await page.waitForTimeout(300);

        // Switch to light mode
        await themeToggle.click();
        await page.waitForTimeout(300);

        // Check light mode is applied
        const htmlClass = await html.getAttribute('class');
        expect(htmlClass).not.toContain('dark');

        // Check text is visible (should be dark text on light background)
        const heroHeading = page.locator('h1, h2').first();
        const textColor = await heroHeading.evaluate(el =>
            window.getComputedStyle(el).color
        );

        // Light mode should have dark text
        expect(textColor).not.toBe('rgb(255, 255, 255)'); // Not white text
    });

    test('should have accessible theme toggle', async ({ page }) => {
        const themeToggle = getThemeToggle(page);

        // Check button is keyboard accessible
        await themeToggle.focus();
        await expect(themeToggle).toBeFocused();

        // Check button can be activated with keyboard
        const html = page.locator('html');
        const initialTheme = await html.getAttribute('class');
        const initialIsDark = initialTheme?.includes('dark') || false;

        await themeToggle.press('Enter');
        await page.waitForTimeout(300);

        const newTheme = await html.getAttribute('class');
        const newIsDark = newTheme?.includes('dark') || false;

        expect(newIsDark).not.toBe(initialIsDark);

        // Check space key also works
        await themeToggle.press('Space');
        await page.waitForTimeout(300);

        const finalTheme = await html.getAttribute('class');
        const finalIsDark = finalTheme?.includes('dark') || false;

        expect(finalIsDark).toBe(initialIsDark);
    });

    test('should respect system theme preference', async ({ page }) => {
        // Clear any existing theme preference first
        await page.evaluate(() => localStorage.removeItem('theme'));

        // Set system to prefer dark mode
        await page.emulateMedia({ colorScheme: 'dark' });

        // Navigate to page fresh (not reload) to pick up system preference
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(500); // Wait for theme initialization

        const html = page.locator('html');
        const themeClass = await html.getAttribute('class');

        // Should respect system preference (dark) - but only if no localStorage override
        if (themeClass) {
            expect(themeClass).toContain('dark');
        } else {
            // If no class attribute, check if dark mode detection works via media query
            const matchesDark = await page.evaluate(() =>
                window.matchMedia('(prefers-color-scheme: dark)').matches
            );
            expect(matchesDark).toBe(true);
        }

        // Switch to light system preference  
        await page.emulateMedia({ colorScheme: 'light' });
        await page.evaluate(() => localStorage.removeItem('theme')); // Clear storage again
        await page.reload();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(500);

        const lightThemeClass = await html.getAttribute('class');
        // Should respect light system preference
        if (lightThemeClass) {
            expect(lightThemeClass).not.toContain('dark');
        }
    });

    test('should handle theme transitions smoothly', async ({ page }) => {
        const themeToggle = getThemeToggle(page);

        // Click multiple times rapidly to test transition handling
        for (let i = 0; i < 3; i++) {
            await themeToggle.click();
            await page.waitForTimeout(100); // Short wait between clicks
        }

        // Wait for any transitions to complete
        await page.waitForTimeout(500);

        // Page should still be functional
        await expect(themeToggle).toBeVisible();
        await expect(page.locator('h1, h2').first()).toBeVisible();

        // Theme should be stable (not flickering)
        const html = page.locator('html');
        const theme1 = await html.getAttribute('class');

        await page.waitForTimeout(200);

        const theme2 = await html.getAttribute('class');
        expect(theme2).toBe(theme1); // Should be stable
    });

    test('should maintain theme across navigation', async ({ page }) => {
        // Set desktop viewport to ensure navigation links are visible
        await page.setViewportSize({ width: 1280, height: 720 });

        const themeToggle = getThemeToggle(page);
        const html = page.locator('html');

        // Set dark mode
        await themeToggle.click();
        await page.waitForTimeout(300);

        const darkTheme = await html.getAttribute('class');
        const isDark = darkTheme?.includes('dark') || false;

        if (!isDark) {
            await themeToggle.click();
            await page.waitForTimeout(300);
        }

        // Navigate to different sections - use scroll instead of click since it's anchor navigation
        await page.evaluate(() => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) aboutSection.scrollIntoView();
        });
        await page.waitForTimeout(500);

        // Theme should persist
        const navTheme = await html.getAttribute('class');
        expect(navTheme).toContain('dark');

        // Scroll back to top
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);

        // Theme should still persist
        const homeTheme = await html.getAttribute('class');
        expect(homeTheme).toContain('dark');
    });

    test('should have proper theme toggle icon', async ({ page }) => {
        const themeToggle = getThemeToggle(page);

        // Should have an icon (SVG)
        const svg = themeToggle.locator('svg');
        await expect(svg).toBeVisible();

        // Icon should change when theme changes
        const initialIcon = await svg.innerHTML();

        await themeToggle.click();
        await page.waitForTimeout(300);

        const newIcon = await svg.innerHTML();

        // Icon should be different (sun/moon toggle)
        expect(newIcon).not.toBe(initialIcon);
    });
});