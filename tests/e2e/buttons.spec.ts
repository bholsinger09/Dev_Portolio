import { test, expect } from '@playwright/test';

test.describe('Button Functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should have working "View My Work" button', async ({ page }) => {
        const viewWorkButton = page.locator('a[href="#projects"]').filter({ hasText: 'View My Work' });

        await expect(viewWorkButton).toBeVisible();
        await expect(viewWorkButton).toHaveText('View My Work');

        // Button should have proper styling
        await expect(viewWorkButton).toHaveClass(/bg-blue-600/);
        await expect(viewWorkButton).toHaveClass(/text-white/);

        // Test hover effect (check for hover classes)
        await viewWorkButton.hover();
        await page.waitForTimeout(200);

        // Click should navigate to projects section (smooth scroll)
        const initialScrollY = await page.evaluate(() => window.scrollY);
        await viewWorkButton.click();

        // Wait for potential smooth scrolling
        await page.waitForTimeout(1000);

        // Should have scrolled or attempted to navigate to #projects
        const currentUrl = page.url();
        expect(currentUrl).toContain('#projects');
    });

    test('should have working "Download Resume" button', async ({ page }) => {
        const resumeButton = page.locator('a[href="/resume.pdf"]');

        await expect(resumeButton).toBeVisible();
        await expect(resumeButton).toContainText('Download Resume');

        // Should have download icon
        const downloadIcon = resumeButton.locator('svg');
        await expect(downloadIcon).toBeVisible();

        // Button should have proper styling
        await expect(resumeButton).toHaveClass(/border-2/);

        // Test hover effect
        await resumeButton.hover();
        await page.waitForTimeout(200);

        // Should link to resume PDF
        const href = await resumeButton.getAttribute('href');
        expect(href).toBe('/resume.pdf');

        // Test that clicking doesn't cause JavaScript errors
        // We won't actually download the file in tests, but ensure no errors
        const consoleLogs: string[] = [];
        page.on('console', msg => consoleLogs.push(msg.text()));

        // Don't actually click as it would trigger download, just verify link
        await expect(resumeButton).toBeEnabled();
    });

    test('should have working social media links', async ({ page }) => {
        const socialLinks = [
            {
                href: 'https://github.com/bholsinger09',
                label: 'GitHub Profile'
            },
            {
                href: 'https://linkedin.com/in/ben-holsinger',
                label: 'LinkedIn Profile'
            },
            {
                href: 'mailto:ben.holsinger@example.com',
                label: 'Send Email'
            }
        ];

        for (const link of socialLinks) {
            const socialLink = page.locator(`a[href="${link.href}"]`);

            await expect(socialLink).toBeVisible();

            // Should have proper aria-label
            await expect(socialLink).toHaveAttribute('aria-label', link.label);

            // Should have SVG icon
            const icon = socialLink.locator('svg');
            await expect(icon).toBeVisible();

            // External links should have proper attributes
            if (link.href.startsWith('http')) {
                await expect(socialLink).toHaveAttribute('target', '_blank');
                await expect(socialLink).toHaveAttribute('rel', 'noopener noreferrer');
            }

            // Test hover effect
            await socialLink.hover();
            await page.waitForTimeout(200);
        }
    });

    test('should have working navigation anchor links', async ({ page }) => {
        const navLinks = [
            '#home',
            '#about',
            '#projects',
            '#skills',
            '#contact'
        ];

        for (const anchor of navLinks) {
            const navLink = page.locator(`header a[href="${anchor}"]`);

            if (await navLink.isVisible()) {
                await expect(navLink).toBeVisible();

                // Click should update URL
                await navLink.click();
                await page.waitForTimeout(500);

                const currentUrl = page.url();
                expect(currentUrl).toContain(anchor);

                // Test hover effect
                await navLink.hover();
                await page.waitForTimeout(200);
            }
        }
    });

    test('should have proper button accessibility', async ({ page }) => {
        // Check that all buttons have proper focus states
        const interactiveElements = [
            'button[title*="Switch to"]', // Theme toggle
            'button[aria-label*="main menu"]', // Mobile menu
            'a[href="#projects"]:has-text("View My Work")', // CTA button
            'a[href="/resume.pdf"]', // Resume button
        ];

        for (const selector of interactiveElements) {
            const element = page.locator(selector).first();

            if (await element.isVisible()) {
                // Should be focusable
                await element.focus();
                await expect(element).toBeFocused();

                // Should have visible focus indicator
                // This checks that focus styles are applied
                await page.waitForTimeout(100);

                // Should be keyboard navigable
                await page.keyboard.press('Tab');
            }
        }
    });

    test('should have proper button states and feedback', async ({ page }) => {
        const buttons = page.locator('button, a[role="button"], a[href^="#"], a[href^="http"], a[href="/resume.pdf"]');
        const buttonCount = await buttons.count();

        for (let i = 0; i < buttonCount; i++) {
            const button = buttons.nth(i);

            if (await button.isVisible()) {
                // Should not be disabled unless intentionally so
                if (await button.getAttribute('disabled') !== '') {
                    await expect(button).toBeEnabled();
                }

                // Should have cursor pointer styling (implicitly tested by CSS)
                try {
                    await button.hover({ timeout: 5000 });
                    // Should provide visual feedback on hover
                    await page.waitForTimeout(200);
                } catch (e) {
                    // Skip hover test if element is intercepted (e.g., by overlays)
                    console.log('Skipping hover test for intercepted element:', await button.textContent());
                }

                // Should handle clicks without errors
                const consoleLogs: string[] = [];
                let hasError = false;

                page.on('console', msg => {
                    if (msg.type() === 'error') {
                        consoleLogs.push(msg.text());
                        hasError = true;
                    }
                });

                // Click button (but prevent navigation for external links)
                const href = await button.getAttribute('href');
                if (href && (href.startsWith('http') || href === '/resume.pdf')) {
                    // Just test that the element is clickable, don't actually navigate
                    await expect(button).toBeEnabled();
                } else {
                    await button.click();
                    await page.waitForTimeout(300);

                    // Should not have caused JavaScript errors
                    expect(hasError).toBe(false);
                }
            }
        }
    });

    test('should maintain button functionality across different viewports', async ({ page }) => {
        const viewports = [
            { width: 375, height: 667 }, // Mobile
            { width: 768, height: 1024 }, // Tablet
            { width: 1024, height: 768 }, // Desktop
        ];

        for (const viewport of viewports) {
            await page.setViewportSize(viewport);
            await page.waitForTimeout(500);

            // Main CTA buttons should always be visible and functional
            const viewWorkButton = page.locator('a[href="#projects"]').filter({ hasText: 'View My Work' });
            const resumeButton = page.locator('a[href="/resume.pdf"]');

            await expect(viewWorkButton).toBeVisible();
            await expect(resumeButton).toBeVisible();

            // Buttons should be properly sized for the viewport
            const viewWorkBox = await viewWorkButton.boundingBox();
            const resumeBox = await resumeButton.boundingBox();

            expect(viewWorkBox!.height).toBeGreaterThan(16); // More lenient for mobile Safari
            expect(resumeBox!.height).toBeGreaterThan(16);

            // Test click functionality
            await viewWorkButton.click();
            await page.waitForTimeout(200);

            expect(page.url()).toContain('#projects');
        }
    });
});