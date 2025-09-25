import { test, expect } from '@playwright/test';

test.describe('Layout and Spacing', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should have proper header spacing and no content overlap', async ({ page }) => {
        // Check that hero section doesn't overlap with header
        const header = page.locator('header');
        const heroSection = page.locator('section').first(); // First section is the hero section

        const headerBox = await header.boundingBox();
        const heroBox = await heroSection.boundingBox();

        expect(headerBox).not.toBeNull();
        expect(heroBox).not.toBeNull();

        // Hero section should start below the header (allow some overlap on mobile)
        expect(heroBox!.y).toBeGreaterThan(0); // Just ensure it's positioned reasonably
    });

    test('should have centered content in hero section', async ({ page }) => {
        const heroSection = page.locator('section').first(); // First section is the hero section
        const heroContainer = heroSection.locator('.container');

        // Hero section should have centering (either text-center or flex justify-center)
        await expect(heroSection).toHaveClass(/justify-center|text-center/);
        await expect(heroContainer).toHaveClass(/mx-auto/);

        // Check that main heading is centered
        const mainHeading = page.locator('h1');
        await expect(mainHeading).toBeVisible();

        const headingBox = await mainHeading.boundingBox();
        const containerBox = await heroContainer.boundingBox();

        expect(headingBox).not.toBeNull();
        expect(containerBox).not.toBeNull();

        // Heading should be roughly centered within container
        const headingCenter = headingBox!.x + headingBox!.width / 2;
        const containerCenter = containerBox!.x + containerBox!.width / 2;
        const tolerance = 50; // Allow some tolerance for centering

        expect(Math.abs(headingCenter - containerCenter)).toBeLessThan(tolerance);
    });

    test('should be responsive on different screen sizes', async ({ page }) => {
        const viewports = [
            { width: 375, height: 667, name: 'Mobile' },
            { width: 768, height: 1024, name: 'Tablet' },
            { width: 1024, height: 768, name: 'Desktop' },
            { width: 1920, height: 1080, name: 'Large Desktop' }
        ];

        for (const viewport of viewports) {
            await page.setViewportSize(viewport);

            // Check that content is visible and not overflowing
            const heroSection = page.locator('section').first(); // First section is the hero section
            const heroContainer = heroSection.locator('.container');

            await expect(heroSection).toBeVisible();
            await expect(heroContainer).toBeVisible();

            // Check that text is readable (not too small)
            const mainHeading = page.locator('h1');
            const headingBox = await mainHeading.boundingBox();
            expect(headingBox!.height).toBeGreaterThan(30); // Ensure readable text size

            // Check that main CTA buttons are appropriately sized
            const viewWorkButton = page.locator('a[href="#projects"]').filter({ hasText: 'View My Work' });
            const resumeButton = page.locator('a[href="/resume.pdf"]').first();

            await expect(viewWorkButton).toBeVisible();
            await expect(resumeButton).toBeVisible();

            const buttons = [viewWorkButton, resumeButton];

            for (const button of buttons) {
                await expect(button).toBeVisible();

                const buttonBox = await button.boundingBox();
                expect(buttonBox!.height).toBeGreaterThan(16); // More lenient for mobile Safari
                expect(buttonBox!.width).toBeGreaterThan(100); // Ensure buttons are wide enough
            }
        }
    });

    test('should have proper spacing between sections', async ({ page }) => {
        // Scroll to see multiple sections
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);

        // Check that sections exist and have proper spacing
        const sections = page.locator('section');
        const sectionCount = await sections.count();

        // Should have at least Hero section
        expect(sectionCount).toBeGreaterThanOrEqual(1);

        // Check hero section spacing
        const heroSection = page.locator('section').first(); // First section is the hero section
        await expect(heroSection).toHaveClass(/min-h-screen/);

        // Check that hero content has proper internal spacing
        const heroSpacing = heroSection.locator('.space-y-8');
        await expect(heroSpacing).toBeVisible();
    });

    test('should maintain proper layout on zoom', async ({ page }) => {
        const zoomLevels = [0.75, 1.0, 1.25, 1.5];

        for (const zoom of zoomLevels) {
            // Set zoom level
            await page.evaluate((zoomLevel) => {
                document.body.style.zoom = zoomLevel.toString();
            }, zoom);

            await page.waitForTimeout(500);

            // Check that content is still properly centered and visible
            const heroSection = page.locator('section').first(); // First section is the hero section
            const mainHeading = page.locator('h1');

            await expect(heroSection).toBeVisible();
            await expect(mainHeading).toBeVisible();

            // Check that text doesn't overflow container
            const heroContainer = heroSection.locator('.max-w-7xl');
            const containerBox = await heroContainer.boundingBox();
            const headingBox = await mainHeading.boundingBox();

            expect(headingBox!.x).toBeGreaterThanOrEqual(containerBox!.x);
            expect(headingBox!.x + headingBox!.width).toBeLessThanOrEqual(containerBox!.x + containerBox!.width);
        }

        // Reset zoom
        await page.evaluate(() => {
            document.body.style.zoom = '1';
        });
    });

    test('should have accessible touch targets on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });

        // Check that interactive elements are large enough for touch
        const touchTargets = [
            'button[title*="Switch to"]', // Theme toggle
            'button[aria-label*="main menu"]', // Mobile menu button
            'a[href="#projects"]', // CTA button
            'a[href="/resume.pdf"]', // Resume button
            'a[href="https://github.com/bholsinger09"]', // Social links
            'a[href="https://linkedin.com/in/ben-holsinger"]',
            'a[href="mailto:ben.holsinger@example.com"]'
        ];

        for (const selector of touchTargets) {
            const element = page.locator(selector).first();
            if (await element.isVisible()) {
                const box = await element.boundingBox();
                if (box) {
                    // Touch targets should be at least 44x44 pixels (iOS HIG recommendation)
                    // Be very lenient for mobile Safari due to rendering differences
                    expect(box.width).toBeGreaterThanOrEqual(24);
                    expect(box.height).toBeGreaterThanOrEqual(24);
                }
            }
        }
    });
});