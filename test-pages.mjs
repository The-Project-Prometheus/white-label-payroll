import { chromium } from 'playwright';
const BASE = 'http://localhost:3001';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  // Login
  await page.goto(`${BASE}/auth/login`, { waitUntil: 'networkidle' });
  const hasTitle = (await page.textContent('body')).includes('Payroll Management System');
  results.push({ test: 'Login page', pass: hasTitle });

  // Quick login
  const btn = await page.$('button:has-text("System Admin")');
  if (btn) { await btn.click(); await page.waitForTimeout(1500); }
  const loggedIn = !page.url().includes('login');
  results.push({ test: 'Login works', pass: loggedIn });

  if (loggedIn) {
    const pages = [
      { path: '/', expected: 'Dashboard' },
      { path: '/employees', expected: 'Employees' },
      { path: '/salary-grades', expected: 'Grade' },
      { path: '/allowances', expected: 'Allowance' },
      { path: '/loans', expected: 'Loan' },
      { path: '/payroll', expected: 'Payroll' },
      { path: '/leave', expected: 'Leave' },
      { path: '/reports', expected: 'Reports' },
    ];
    for (const { path, expected } of pages) {
      await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      const body = await page.textContent('body');
      const pass = body.includes(expected);
      results.push({ test: `${path} → "${expected}"`, pass });
      if (!pass) console.log(`  ❌ ${path}: missing "${expected}"`);
    }
  }

  await browser.close();
  const passed = results.filter(r => r.pass).length;
  console.log(`\n${passed}/${results.length} tests passed`);
  results.filter(r => !r.pass).forEach(r => console.log(`  ❌ ${r.test}`));
  if (passed === results.length) console.log('✅ ALL TESTS PASSED');
}
run().catch(e => { console.error(e); process.exit(1); });
