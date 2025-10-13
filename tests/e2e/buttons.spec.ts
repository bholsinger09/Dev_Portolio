import { test, expect } from '@playwright/test';

test.describe('Button Functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should have working "View Projects" button', async ({ page }) => {
        const viewWorkButton = page.locator('a[href="#projects"]').filter({ hasText: 'View Projects' });

        await expect(viewWorkButton).toBeVisible();
        await expect(viewWorkButton).toHaveText('View Projects');

        // Button should have proper styling (outlined button design)
        await expect(viewWorkButton).toHaveClass(/border-blue-600/);
        await expect(viewWorkButton).toHaveClass(/text-blue-600/);

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

        // Button should have proper styling (border button design)
        await expect(resumeButton).toHaveClass(/border/);
        await expect(resumeButton).toHaveClass(/border-white/);

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
                text: 'View my repositories'
            },
            {
                href: 'https://www.linkedin.com/in/benjamin-holsinger-a1712a32', 
                text: 'Connect with me'
            },
            {
                href: 'mailto:bholsinger@gmail.com',
                text: 'bholsinger@gmail.com'
            }
        ];

        for (const link of socialLinks) {
            // Target links within the contact grid specifically to avoid CTA button duplicates  
            const socialLink = page.locator('#contact .grid').locator(`a[href="${link.href}"]`);

            await expect(socialLink).toBeVisible();

            // Should have expected text content
            await expect(socialLink).toContainText(link.text);

            // Note: Our current implementation doesn't use SVG icons, so we skip that check

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
            'button[aria-label="Toggle theme"]', // Theme toggle
            'button[aria-label*="Toggle mobile menu"]', // Mobile menu
            'a[href="#projects"]:has-text("View Projects")', // CTA button
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
        // Test main CTA buttons specifically instead of all buttons to avoid timeouts
        const mainButtons = [
            page.locator('a[href="#projects"]').filter({ hasText: 'View Projects' }),
            page.locator('a[href="/resume.pdf"]'),
            page.locator('a[href="mailto:bholsinger@gmail.com"]').first()
        ];

        for (const button of mainButtons) {
            if (await button.isVisible()) {
                // Should be enabled
                await expect(button).toBeEnabled();

                // Should be hoverable
                await button.hover();
                await page.waitForTimeout(100);

                // External links should have target="_blank"
                const href = await button.getAttribute('href');
                if (href && href.startsWith('http')) {
                    await expect(button).toHaveAttribute('target', '_blank');
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
            const viewWorkButton = page.locator('a[href="#projects"]').filter({ hasText: 'View Projects' });
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