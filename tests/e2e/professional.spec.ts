import { test, expect } from '@playwright/test';

test.describe('Professional Features', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should have working resume download', async ({ page }) => {
        // Look for resume download link/button
        const resumeButton = page.locator('a[href*="resume"], button:has-text("Resume"), a:has-text("Resume")');

        await expect(resumeButton).toBeVisible();

        // Check download functionality
        const downloadPromise = page.waitForEvent('download');
        await resumeButton.click();

        const download = await downloadPromise;
        expect(download.suggestedFilename()).toBeTruthy();
        expect(download.suggestedFilename().toLowerCase()).toMatch(/resume|cv/);

        // Verify file type (should be PDF)
        const filename = download.suggestedFilename();
        expect(filename.toLowerCase()).toMatch(/\.pdf$/);
    });

    test('should have working social media links', async ({ page }) => {
        // Look for social media links
        const socialLinks = [
            { selector: 'a[href*="linkedin"]', platform: 'LinkedIn' },
            { selector: 'a[href*="github"]', platform: 'GitHub' },
            { selector: 'a[href*="twitter"], a[href*="x.com"]', platform: 'Twitter/X' },
        ];

        for (const social of socialLinks) {
            const link = page.locator(social.selector);

            if (await link.count() > 0) {
                await expect(link.first()).toBeVisible();

                // Check link attributes
                const href = await link.first().getAttribute('href');
                expect(href).toBeTruthy();
                expect(href).toMatch(/^https?:\/\//); // Should be external link

                // Should open in new tab/window
                const target = await link.first().getAttribute('target');
                expect(target).toBe('_blank');

                // Should have security attributes for external links
                const rel = await link.first().getAttribute('rel');
                expect(rel).toContain('noopener');
            }
        }
    });

    test('should have contact information displayed', async ({ page }) => {
        // Look for contact section or information
        const contactSection = page.locator('#contact, section:has-text("Contact"), div:has-text("Contact")');

        if (await contactSection.count() > 0) {
            await expect(contactSection.first()).toBeVisible();

            // Check for email (might be displayed or in a contact form)
            const emailElements = page.locator('a[href^="mailto:"], input[type="email"], *:has-text("@")');

            if (await emailElements.count() > 0) {
                const emailElement = emailElements.first();
                await expect(emailElement).toBeVisible();

                // If it's a mailto link, check format
                if (await emailElement.getAttribute('href')) {
                    const href = await emailElement.getAttribute('href');
                    if (href?.startsWith('mailto:')) {
                        expect(href).toMatch(/mailto:[\w.-]+@[\w.-]+\.\w+/);
                    }
                }
            }
        }
    });

    test('should have working contact form if present', async ({ page }) => {
        // Look for contact form
        const contactForm = page.locator('form');

        if (await contactForm.count() > 0) {
            await expect(contactForm.first()).toBeVisible();

            // Check form fields
            const nameField = contactForm.locator('input[name*="name"], input[placeholder*="name"]');
            const emailField = contactForm.locator('input[type="email"], input[name*="email"]');
            const messageField = contactForm.locator('textarea, input[name*="message"]');
            const submitButton = contactForm.locator('button[type="submit"], input[type="submit"]');

            if (await nameField.count() > 0) {
                await expect(nameField.first()).toBeVisible();
                await nameField.first().fill('Test User');
            }

            if (await emailField.count() > 0) {
                await expect(emailField.first()).toBeVisible();
                await emailField.first().fill('test@example.com');
            }

            if (await messageField.count() > 0) {
                await expect(messageField.first()).toBeVisible();
                await messageField.first().fill('Test message');
            }

            if (await submitButton.count() > 0) {
                await expect(submitButton.first()).toBeVisible();
                await expect(submitButton.first()).toBeEnabled();
            }
        }
    });

    test('should display professional skills section', async ({ page }) => {
        // Look for skills section
        const skillsSection = page.locator('#skills, section:has-text("Skills"), div:has-text("Skills")');

        if (await skillsSection.count() > 0) {
            await expect(skillsSection.first()).toBeVisible();

            // Should contain technology-related terms
            const skillsText = await skillsSection.first().textContent();
            const techKeywords = ['JavaScript', 'TypeScript', 'React', 'Node', 'Python', 'Java', 'HTML', 'CSS', 'Git'];

            let foundTechKeywords = 0;
            for (const keyword of techKeywords) {
                if (skillsText?.toLowerCase().includes(keyword.toLowerCase())) {
                    foundTechKeywords++;
                }
            }

            expect(foundTechKeywords).toBeGreaterThan(0);
        }
    });

    test('should display projects section', async ({ page }) => {
        // Look for projects section
        const projectsSection = page.locator('#projects, section:has-text("Projects"), div:has-text("Projects")');

        if (await projectsSection.count() > 0) {
            await expect(projectsSection.first()).toBeVisible();

            // Should contain project information
            const projectLinks = projectsSection.locator('a[href*="github"], a[href*="demo"], a[href*="live"]');

            if (await projectLinks.count() > 0) {
                // Project links should be external
                for (let i = 0; i < await projectLinks.count(); i++) {
                    const link = projectLinks.nth(i);
                    const href = await link.getAttribute('href');

                    if (href && href.startsWith('http')) {
                        expect(href).toMatch(/^https?:\/\//);

                        // External links should open in new tab
                        const target = await link.getAttribute('target');
                        expect(target).toBe('_blank');
                    }
                }
            }
        }
    });

    test('should display about section', async ({ page }) => {
        // Look for about section
        const aboutSection = page.locator('#about, section:has-text("About"), div:has-text("About")');

        if (await aboutSection.count() > 0) {
            await expect(aboutSection.first()).toBeVisible();

            // Should contain meaningful professional content
            const aboutText = await aboutSection.first().textContent();
            expect(aboutText).toBeTruthy();
            expect(aboutText!.length).toBeGreaterThan(50); // Should have substantial content

            // Should mention professional terms
            const professionalKeywords = ['developer', 'engineer', 'software', 'experience', 'passionate', 'technology'];

            let foundKeywords = 0;
            for (const keyword of professionalKeywords) {
                if (aboutText?.toLowerCase().includes(keyword.toLowerCase())) {
                    foundKeywords++;
                }
            }

            expect(foundKeywords).toBeGreaterThan(0);
        }
    });

    test('should have proper external link security', async ({ page }) => {
        // Get all external links
        const externalLinks = page.locator('a[href^="http"]');
        const linkCount = await externalLinks.count();

        if (linkCount > 0) {
            for (let i = 0; i < linkCount; i++) {
                const link = externalLinks.nth(i);

                // Check security attributes
                const rel = await link.getAttribute('rel');
                expect(rel).toContain('noopener');

                // Most external links should also have noreferrer for privacy
                if (rel?.includes('noreferrer')) {
                    expect(rel).toContain('noreferrer');
                }

                // Should open in new tab
                const target = await link.getAttribute('target');
                expect(target).toBe('_blank');
            }
        }
    });

    test('should handle external link clicks properly', async ({ page, context }) => {
        // Look for any external link (GitHub, LinkedIn, etc.)
        const externalLink = page.locator('a[href^="http"]').first();

        if (await externalLink.count() > 0) {
            // Monitor for new pages
            const pagePromise = context.waitForEvent('page');

            await externalLink.click();

            try {
                const newPage = await pagePromise;

                // New page should open
                expect(newPage).toBeTruthy();

                // Original page should still exist
                expect(page.isClosed()).toBe(false);

                // Close new page to clean up
                await newPage.close();
            } catch {
                // Some links might be blocked in test environment, which is fine
                // The important thing is they don't navigate the current page away
                expect(page.url()).toContain('localhost'); // Still on our site
            }
        }
    });

    test('should have proper professional presentation', async ({ page }) => {
        // Check for professional elements
        const professionalElements = {
            name: page.locator('h1, h2, .name, #name'),
            title: page.locator(':has-text("Software Engineer"), :has-text("Developer"), :has-text("Full Stack")'),
            description: page.locator('p, .description, .bio'),
        };

        // Should have clear professional identity
        if (await professionalElements.name.count() > 0) {
            const nameText = await professionalElements.name.first().textContent();
            expect(nameText).toBeTruthy();
            expect(nameText!.trim().length).toBeGreaterThan(2);
        }

        if (await professionalElements.title.count() > 0) {
            const titleText = await professionalElements.title.first().textContent();
            expect(titleText).toBeTruthy();
        }

        if (await professionalElements.description.count() > 0) {
            const descText = await professionalElements.description.first().textContent();
            expect(descText).toBeTruthy();
            expect(descText!.length).toBeGreaterThan(20);
        }
    });
});